import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (firstname, lastname, patronymic, birthdate, phonenumber, email, password) => {
    const {data} = await $host.post('api/user/registration', {firstname, lastname, patronymic, birthdate, phonenumber, email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
        return null
    }
}

export const profile = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    return data
}

export const leaveReview = async (goodId, userId, rate, dignity, flaws, comment) => {
    const {data} = await $authHost.post('api/review', {goodId, userId, rate, dignity, flaws, comment})
    return data
}

export const fetchUserReview = async (userId, goodId) => {
    const {data} = await $host.get('api/review/user', {params: {userId, goodId}})
    return data
}

export const updateReview = async(goodId, userId, rate, dignity, flaws, comment) => {
    const {data} = await $authHost.put('api/review', {goodId, userId, rate, dignity, flaws, comment})
    return data
}

export const fetchReviews = async (goodId) => {
    const {data} = await $host.get('api/review', {params: {goodId}})
    return data
}

export const updateProfile = async (newData) => {
    const {data} = await $authHost.put('api/user', newData)
    return data
}

export const appendQuestion = async (role, id, message) => {
    const {data} = await $authHost.post('api/question', {role, id, message})
    return data
}

export const fetchQuestions = async (role, id) => {
    const {data} = await $authHost.get('api/question', {params: {role, id}})
    return data
}