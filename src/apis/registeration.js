import { fetch } from './fetch'

export const registration = (data) => {
    return fetch("post", "/register", data)
        .then(res => {
            if(res.data === "Registered") {
                console.log(res.data)
                return false
            } else {
                console.log(data)
                return true
            }
        })
}