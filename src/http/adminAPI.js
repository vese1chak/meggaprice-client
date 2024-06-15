import {$authHost, $host} from "./index";

export const createApplication = async (name, email, phone, password, reason) => {
    const {data} = await $authHost.post('api/application', {name, email, phone, password, reason})
}

export const fetchApplications = async () => {
    const {data} = await $host.get('api/application')
    return data
}

export const isApplicationExist = async (email) => {
    const {data} = await $host.get('api/application/candidate', {params: {email}})
    if (data) {
        return true
    } else {
        return false
    }
}

export const createSeller = async (name, email, phonenumber, password) => {
    const {data} = await $authHost.post('api/seller', {name, email, phonenumber, password})
}

export const fetchDialogs = async () => {
    const {data} = await $authHost.get('api/question/dialogs')
    return data
}