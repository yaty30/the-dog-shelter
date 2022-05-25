import { fetch } from './fetch'

export const sendMessage = (data) => {
    return fetch("post", "/contact/sendMessage", data)
        .then(res => {
            return res
        })
}