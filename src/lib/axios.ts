import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: 'https://api.github.com/users/',
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return config
  })
}
