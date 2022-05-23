import { fetch } from './fetch'
import { user } from '../states/loginStates'

export const login = (data) => {
    return fetch("post", "/login", data)
        .then(res => {
            if(typeof(res.data) === "string") {
                return false
            } else {
                console.log(res.data)
                user.setData(res.data)
                return true
            }
        })
}