import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $sellerHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
const sellerInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('tokenSeller')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$sellerHost.interceptors.request.use(sellerInterceptor)

export {
    $host,
    $authHost,
    $sellerHost
}