import MongooseHelper from '@/helpers/MongooseHelper'
import PaginationHelper from '@/helpers/PaginationHelper'
import { Model } from '@/types/mongoose/Model'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { HydratedDocument } from 'mongoose'

export default class BaseModel {
  static async paginate<T, RT>(model: Model<T>, pager: Pager, filters: any, omit?: string[]): Promise<Paging<RT>> {
    const { count: total_items, data } = await MongooseHelper.aggregate<T, RT>(model, pager, filters, omit)
    const page_count: number = PaginationHelper.pageCount(pager.page_size, total_items)
    return {
      pager: {
        ...pager,
        page_count,
        total_items
      },
      data
    }
  }

  static toJSON<T, RT>(document: HydratedDocument<T> | null, omit?: string[]): RT | null {
    const object: any = document?.toJSON({ useProjection: true })
    return object ? MongooseHelper.toJSON<RT>(object, omit) : null
  }
}
