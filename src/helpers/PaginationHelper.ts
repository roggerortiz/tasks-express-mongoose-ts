export default class PaginationHelper {
  static pageCount(page_size: number, total_items: number): number {
    return page_size ? Math.ceil(total_items / page_size) : 1
  }
}
