// Đây là cách gọi API cũ, tên ban đầu là clientAPI, hiện cách gọi API đang xài useFetch của Nuxt hỗ trợ
import axios from 'axios'

const clientAPI = (url?: string) => {
  // Sử dụng URL trực tiếp thay vì useRuntimeConfig (không hoạt động ngoài Nuxt context)
  const baseURL = url && url.length > 0 ? url : 'http://localhost:3000/api'

  return axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  })
}

export default clientAPI
