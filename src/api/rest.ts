import { serialize } from 'object-to-formdata'
import axios, {
  AxiosPromise,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { Rest } from '.'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

function handlePromise<T>(axiosPromise: AxiosPromise): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axiosPromise
      .then((response: AxiosResponse) => {
        resolve(response.data as T)
      })
      .catch(({ request, message, response }: AxiosError) => {
        const restError: Rest.Error = {
          isRestError: true,
          message: 'Something went wrong',
        }

        if (request) {
          restError.message = 'Cannot connect to server'
        }

        if (message) {
          restError.message = message
        }

        if (response) {
          if (response.status) {
            restError.status = response.status
          }

          if (response.data.message) {
            restError.message = response.data.message
          }

          if (response.data.errors) {
            restError.errors = response.data.errors
          }

          restError.body = response.data
        }

        reject(restError)
      })
  })
}

export default (resource: string): Rest => {
  return {
    index<T>(params: PlainObject = {}): Promise<T> {
      return handlePromise(instance.get(`${resource}`, { params }))
    },
    show<T>(id: number | string = ''): Promise<T> {
      return handlePromise(instance.get(`${resource}/${id}`))
    },
    post<T>(payload: PlainObject = {}): Promise<T> {
      return handlePromise(instance.post(`${resource}`, payload))
    },
    postUpload<T>(payload: PlainObject = {}): Promise<T> {
      const formData = serialize(payload, {
        indices: true,
        nullsAsUndefineds: true,
      })

      return handlePromise(
        instance.post(`${resource}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      )
    },
    put<T>(id: number | string, payload: PlainObject = {}): Promise<T> {
      return handlePromise(instance.put(`${resource}/${id}`, payload))
    },
    putUpload<T>(id: number | string, payload: PlainObject = {}): Promise<T> {
      const formData = serialize(payload, {
        indices: true,
        nullsAsUndefineds: true,
      })

      return handlePromise(
        instance.post(`${resource}/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      )
    },
    patch<T>(id: number | string, payload: PlainObject = {}): Promise<T> {
      return handlePromise(instance.patch(`${resource}/${id}`, payload))
    },
    delete<T>(id: number | string): Promise<T> {
      return handlePromise(instance.delete(`${resource}/${id}`))
    },
  }
}
