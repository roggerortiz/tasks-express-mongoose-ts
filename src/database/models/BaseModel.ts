import MongooseHelper from '@/helpers/MongooseHelper'
import AggregateOpt from '@/types/core/AggregateOpt'
import Pager from '@/types/core/Pager'
import Paging from '@/types/core/Paging'
import SortDirection from '@/types/enums/SortDirection'
import { Model } from '@/types/mongoose/Model'
import { HydratedDocument, PipelineStage } from 'mongoose'

export default class BaseModel {
  static async aggregate<T, RT>(
    model: Model<T>,
    pager: Pager,
    filters: any,
    extra?: AggregateOpt
  ): Promise<Paging<RT>> {
    const pageSize: number = pager.pageSize || 0
    const pageIndex: number = pager.pageIndex || 1
    const sortField: string = pager?.sortField?.trim()?.toLowerCase() || 'date'
    const sortDirection: string = pager?.sortDirection?.trim() || SortDirection.DESC

    const match: any = MongooseHelper.aggregateMatch(filters)
    const sort: any = MongooseHelper.aggregateSort(sortField, sortDirection)
    const facet: any = MongooseHelper.aggregateFacet(pageSize, pageIndex, extra)
    const pipeline: PipelineStage[] = [{ $match: match }, { $sort: sort }, { $facet: facet }]
    const aggregation: any = await model.aggregate(pipeline)

    const paging: Paging<RT> = {
      pager: {
        pageSize,
        pageIndex,
        pageCount: 0,
        sortField,
        sortDirection,
        totalItems: 0
      },
      data: []
    }

    if (!aggregation?.length) {
      return paging
    }

    const totalItems: number = aggregation[0].count[0]?.Count ?? 0
    const pageCount: number = pageSize ? Math.ceil(totalItems / pageSize) : 1
    const data: RT[] = aggregation[0]?.data ?? []

    paging.pager.pageCount = pageCount
    paging.pager.totalItems = totalItems
    paging.data = data

    return paging
  }

  static toJSON<T, RT>(document: HydratedDocument<T> | null): RT | null {
    if (!document) {
      return null
    }

    const { _id, ...data } = document.toJSON({ useProjection: true })
    return { id: _id, ...data } as RT
  }
}
