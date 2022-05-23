import { fetch } from './fetch'
import { user } from '../states/loginStates'

export const login = (data) => {
    return fetch("post", "/login", data)
        .then(res => {
            if(typeof(res.data) === "string") {
                return false
            } else {
                user.setData(res.data)
                console.log(res.data)
                return true
            }
        })
}