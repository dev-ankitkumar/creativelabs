import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "https://stgphys.appsndevs.com/labmatrics/api/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, tokenCheck) {
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }
  if (tokenCheck) {
    return await axiosApi.get(url, config).then(response => response.data)
  } else {
    return await axiosApi.get(url).then(response => response.data)
  }
}

export async function post(url, data, tokenCheck) {
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, tokenCheck) {
  const config = {
    headers: { Authorization: `Bearer ${tokenCheck}` },
  }
  console.log("url", url)
  console.log("data", data)
  console.log(
    "axios",
    axiosApi
      .put(url, { ...data }, { ...config })
      .then(response => response.data)
  )
  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
