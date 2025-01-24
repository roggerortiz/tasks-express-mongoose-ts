import SortDirection from '@/types/enums/SortDirection'
import Pager from '@/types/pagination/Pager'
import { Model, PipelineStage } from 'mongoose'

export default class MongooseHelper {
  private static fullText(phrase: string) {
    const exp: Array<string> = phrase.split(' ')
    return exp.map((word: string) => '"' + word + '"').join(' ')
  }

  private static aggregateMatch(filters: any) {
    const match: any = {}
    const entries: any[] = Object.entries(filters)

    entries
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        if (key.toLowerCase() === 'freetext') {
          match.$text = { $search: MongooseHelper.fullText(value) }
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

  static async aggregation<T>(model: Model<T>, pager: Pager, filters: any) {
    const { page_size, page_index, sort_field, sort_direction } = pager
    const match: any = this.aggregateMatch(filters)
    const sort: any = this.aggregateSort(sort_field, sort_direction)
    const facet: any = this.aggregateFacet(page_size, page_index)
    const pipeline: PipelineStage[] = [{ $match: match }, { $sort: sort }, { $facet: facet }]
    const aggregation: any = await model.aggregate(pipeline)
    return aggregation
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
}
