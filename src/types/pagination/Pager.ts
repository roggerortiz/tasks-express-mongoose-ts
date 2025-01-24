export default interface Pager {
  page_size: number
  page_index: number
  page_count: number
  sort_field: string
  sort_direction: string
  total_items: number
}
