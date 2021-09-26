export interface Paginator<T> {
  data: T[]
  meta: {
    current_page: number
    total: number
    per_page: number
  }
}
