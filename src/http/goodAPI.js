import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createGood = async (good) => {
    const {data} = await $authHost.post('api/good', good)
    return data
}

// export const isGoodExist = async (title) => {
//     const {data} = await $authHost.get('api/good/existing', {params: {title}})
//     console.log(data)
//     if (data.length) {
//         return true
//     } else {
//         return false
//     }
// }

export const fetchGoods = async (typeId) => {
    const {data} = await $host.get('api/good', {params: {
            typeId
        }})
    return data
}

export const fetchUserGood = async (userId, type) => {
    const {data} = await $authHost.get('api/usergood', {params: {
            userId, type
        }})
    return data
}

export const fetchOneGood = async (id) => {
    const {data} = await $host.get('api/good/' + id)
    return data
}

export const appendToUsergood = async (type) => {
    const {data} = await $authHost.post('api/usergood', type)
    return data
}