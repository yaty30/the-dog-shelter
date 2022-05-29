import { fetch } from './fetch'
import { user, userProfile } from '../states/loginStates'
import { getFavouriteList } from './dogs'
import { getMessageByID, getWorkerMessageByID } from './chat'

export const login = (data) => {
    return fetch("post", "/login", data)
        .then(res => {
            if (res.data === "incorrect" || res.data === "no_user") {
                return false
            } else {
                user.setData(res.data)
                userProfile.setData(res.data)
                console.log(res.data)
                res.data.userType !== 'worker' && getFavouriteList(`${res.data.id}`)
                return true
            }
        })
}