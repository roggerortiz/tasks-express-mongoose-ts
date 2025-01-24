import MongooseHelper from '@/helpers/MongooseHelper'
import PaginationHelper from '@/helpers/PaginationHelper'
import { Model } from '@/types/mongoose/Model'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { HydratedDocument } from 'mongoose'

export default class BaseModel {
  static async paginate<T, RT>(model: Model<T>, pager: Pager, filters: any): Promise<Paging<RT>> {
    const aggregation: any = await MongooseHelper.aggregation(model, pager, filters)
    const total_items: number = PaginationHelper.totalItems(aggregation)
    const page_count: number = PaginationHelper.pageCount(pager.page_size, total_items)
    const data: RT[] = PaginationHelper.data(aggregation)
    const paging: Paging<RT> = { pager: { ...pager, total_items, page_count }, data }
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
