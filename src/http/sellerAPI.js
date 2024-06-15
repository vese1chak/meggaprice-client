import {$sellerHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const sellerLogin = async (email, password) => {
    const {data} = await $sellerHost.post('api/seller/login', {email, password})
    localStorage.setItem('tokenSeller', data.token)
    return jwtDecode(data.token)
}

export const checkSeller = async () => {
    try {
        const {data} = await $sellerHost.get('api/seller/auth')
        localStorage.setItem('tokenSeller', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
        return null
    }
}

export const profileSeller = async (id) => {
    const {data} = await $host.get('api/seller/' + id)
    return data
}

export const changeInfo = async (id) => {
    const {data} = await $host.get('api/seller/' + id)
    return data
}

export const fetchSellerGoods = async (sellerId) => {
    const {data} = await $host.get('api/seller/', {params: {sellerId}})
    return data
}