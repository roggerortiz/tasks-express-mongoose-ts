import MongooseHelper from '@/helpers/MongooseHelper'
import SortDirection from '@/types/enums/SortDirection'
import AggregateOpt from '@/types/mongoose/AggregateOpt'
import { Model } from '@/types/mongoose/Model'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { HydratedDocument, PipelineStage } from 'mongoose'

export default class BaseModel {
  static async aggregate<T, RT>(
    model: Model<T>,
    pager: Pager,
    filters: any,
    extra?: AggregateOpt
  ): Promise<Paging<RT>> {
    const pageSize: number = pager.page_size || 0
    const pageIndex: number = pager.page_index || 1
    const sortField: string = pager?.sort_field?.trim()?.toLowerCase() || 'date'
    const sortDirection: string = pager?.sort_direction?.trim() || SortDirection.ASC

    const match: any = MongooseHelper.aggregateMatch(filters)
    const sort: any = MongooseHelper.aggregateSort(sortField, sortDirection)
    const facet: any = MongooseHelper.aggregateFacet(pageSize, pageIndex, extra)
    const pipeline: PipelineStage[] = [{ $match: match }, { $sort: sort }, { $facet: facet }]
    const aggregation: any = await model.aggregate(pipeline)

    const paging: Paging<RT> = {
      pager: {
        page_size: pageSize,
        page_index: pageIndex,
        page_count: 0,
        sort_field: sortField,
        sort_direction: sortDirection,
        total_items: 0
      },
      data: []
    }

    if (!aggregation?.length) {
      return paging
    }

    const totalItems: number = aggregation[0].count[0]?.Count ?? 0
    const pageCount: number = pageSize ? Math.ceil(totalItems / pageSize) : 1
    const data: RT[] = aggregation[0]?.data ?? []

    paging.pager.page_count = pageCount
    paging.pager.total_items = totalItems
    paging.data = data

    return paging
  }

  static toJSON<T, RT>(document: HydratedDocument<T> | null, omit?: string[]): RT | null {
    if (!document) {
      return null
    }

    const { _id, ...data } = document.toJSON({ useProjection: true })

    omit?.forEach((field: string) => {
      Reflect.deleteProperty(data, field)
    })

    return { id: _id, ...data } as RT
  }
}
