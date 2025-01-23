import Pager from './Pager'

export default interface Paging<T> {
  pager: Pager
  data: T[]
}
