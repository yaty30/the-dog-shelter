import { fetch } from './fetch'
import { dogList } from 'src/states/dogStates'
import { favouriteList } from 'src/states/favouriteListStates'

export const restoreDogList = () => {
    return fetch("get", "/dog/getAllDogs")
        .then((res) => {
            let list = res.data.map(x => ({
                id: +x.id,
                name: x.name,
                gender: x.gender,
                location: x.location,
                seterillsed: x.seterillsed,
                breed: x.breed,
                birthday: x.birthday,
                mircochipNo: x.mircochipNo,
                intake: x.intake,
                description: x.description,
                profileImage: x.profileImage,
                notes: x.notes,
                size: x.size,
                weight: x.weight
            }))
            dogList.restoreList(list)
        })
}

export const addDog = (data) => {
    return fetch("post", "/dog/addDog", data)
        .then((x) => {
            setTimeout(() => {
                restoreDogList()
            }, 700)

            console.log(x)
            return x
        })
}

export const removeDog = (data) => {
    return fetch("post", "/dog/removeDog", data)
        .then((x) => {
            setTimeout(() => {
                dogList.removeDog(data.id)
            }, 600)
        })
}

export const editDog = (data) => {
    return fetch("post", "/dog/updateDog", data)
        .then((x) => {
            return x
        })
}

export const getFavouriteList = (id) => {
    return fetch("get", `/dog/favouriteList/getList?id=${id}`)
        .then((res) => {
            console.log(res.data)
            favouriteList.restoreList(res.data)
        })
}

export const addFavourite = (data) => {
    return fetch("post", "/dog/favouriteList/add", data)
        .then((res) => {
            console.log(res.data)
            favouriteList.restoreList(res.data)
        })
}

export const removeFavourite = (data) => {
    return fetch("post", "/dog/favouriteList/remove", data)
        .then((res) => {
            favouriteList.restoreList(res.data)
        })
}