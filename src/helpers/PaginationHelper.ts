export default class PaginationHelper {
  static data(aggregation: any) {
    if (!aggregation?.length) {
      return 0
    }

    return aggregation[0]?.data ?? []
  }

  static totalItems(aggregation: any) {
    if (!aggregation?.length || !aggregation[0]?.count?.length) {
      return 0
    }

    return aggregation[0].count[0].Count ?? 0
  }

  static pageCount(page_size: number, total_items: number) {
    return page_size ? Math.ceil(total_items / page_size) : 1
  }
}
