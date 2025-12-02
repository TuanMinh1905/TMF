export function useApiFetch<T = unknown>(path: string) {
  const config = useRuntimeConfig()

  const defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    'accept-version': '1.0.0',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.public.apiToken}`,
  }

  return useFetch<T>(`https://pepeapi-vv2pcyowoa-as.a.run.app/api/${path}`, {
    key: path, // đây là tên sẽ hiện trong nuxt dev tool á, tên API ở payload ( đặt key : category all thì trên payload hiện category-all)
    baseURL: config.public.apiUrl || '',
    headers: {
      ...defaultHeaders,
    },
  })
}
