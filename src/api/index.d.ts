export interface Rest {
  index<T>(params?: PlainObject): Promise<T>
  show<T>(id: number | string): Promise<T>
  post<T>(payload?: PlainObject): Promise<T>
  postUpload<T>(payload?: PlainObject): Promise<T>
  put<T>(id: number | string, payload?: PlainObject): Promise<T>
  putUpload<T>(id: number | string, payload?: PlainObject): Promise<T>
  patch<T>(id: number | string, payload?: PlainObject): Promise<T>
  delete<T>(id: number | string): Promise<T>
}

export namespace Rest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Error {
    isRestError: boolean
    status?: number
    message: string
    errors?: PlainObject<string[]>
    body?: unknown
  }
}
