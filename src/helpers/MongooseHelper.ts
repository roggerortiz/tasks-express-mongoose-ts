import DatabaseField from '@/types/enums/DatabaseField'
import SortDirection from '@/types/enums/SortDirection'
import { Aggregate } from '@/types/mongoose/Aggregate'
import Pager from '@/types/pagination/Pager'
import mongoose, { Model, PipelineStage } from 'mongoose'
import EnvHelper from './EnvHelper'

export default class MongooseHelper {
  static async connect() {
    await mongoose.connect(EnvHelper.MONGO_URI)
  }

  static uniqueValidatorFn<T>(model: Model<T>, field: string) {
    return async function (value: any) {
      const self: any = this as any
      const filters: any = { [field]: { $ne: null, $eq: value } }

      if (!self._id && self.options._id) {
        filters._id = { $ne: self.options._id }
      }

      const count: number = await model.countDocuments(filters)
      return !count
    }
  }

  static toJSON<T>(object: any, omit?: string[]): T {
    const { _id, ...data } = object

    omit = [...(omit ?? []), DatabaseField.CREATED_AT, DatabaseField.UPDATED_AT]
    omit.forEach((field: string) => Reflect.deleteProperty(data, field))

    return { id: _id, ...data }
  }

  static async aggregate<T, RT>(model: Model<T>, pager: Pager, filters: any, omit?: string[]): Promise<Aggregate<RT>> {
    const { page_size, page_index, sort_field, sort_direction } = pager
    const match: any = this.aggregateMatch(filters)
    const sort: any = this.aggregateSort(sort_field, sort_direction)
    const facet: any = this.aggregateFacet(page_size, page_index)
    const pipeline: PipelineStage[] = [{ $match: match }, { $sort: sort }, { $facet: facet }]
    const aggregation: any = await model.aggregate(pipeline)
    const count: number = this.aggregateCount(aggregation)
    const data: RT[] = this.aggregateData<RT>(aggregation, omit)
    return { count, data }
  }

  private static aggregateMatch(filters: any) {
    const match: any = {}
    const entries: any[] = Object.entries(filters)

    entries
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key.toLowerCase() === DatabaseField.FREE_TEXT) {
          match.$text = { $search: value }
        } else {
          match[key] = value
        }
      })

    return match
  }

  private static aggregateSort(sort_field: string, sort_direction: string) {
    return { [sort_field]: sort_direction === SortDirection.ASC ? 1 : -1 }
  }

  private static aggregateFacet(pageSize: number, pageIndex: number) {
    const skip: number = (pageIndex - 1) * pageSize
    const limit: number = pageSize

    const facet: any = {
      count: [{ $count: 'Count' }],
      data: [{ $skip: skip }]
    }

    if (limit > 0) {
      facet.data.push({ $limit: limit })
    }

    return facet
  }

  private static aggregateCount(aggregation: any): number {
    if (!aggregation?.length || !aggregation[0]?.count?.length) {
      return 0
    }

    return aggregation[0].count[0].Count ?? 0
  }

  private static aggregateData<T>(aggregation: any, omit?: string[]): T[] {
    if (!aggregation?.length) {
      return []
    }

    const data: any[] = aggregation[0]?.data ?? []
    return data.map((item: any) => this.toJSON<T>(item, omit))
  }
}
