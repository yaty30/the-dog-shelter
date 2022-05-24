import { fetch } from './fetch'
import { user } from '../states/loginStates'
import { getFavouriteList } from './dogs'

export const login = (data) => {
    return fetch("post", "/login", data)
        .then(res => {
            if (res.data === "incorrect" || res.data === "no_user") {
                return false
            } else {
                user.setData(res.data)
                res.data.userType !== 'worker' && getFavouriteList(`${res.data.id}`)
                return true
            }
        })
}