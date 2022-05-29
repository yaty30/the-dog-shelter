import { fetch } from './fetch'
import { chatMessages } from 'src/states/chatStates'
import { user } from '../states/loginStates'

export const restoreMessages = () => {
    return fetch("get", `/chat/restoreMessage?userID=${user.getID()}`)
        .then(res => {
            console.error(res.data)
            chatMessages.restoreMessages(res.data)
        })
}

export const sendMessage = (data) => {
    console.log(data)
    return fetch("post", "/chat/replyMessage", data)
        .then(res => {
            restoreMessages()
            console.log(res.data)
        })
}

export const createNewChat = (data) => {
    return fetch("post", "/chat/createNewChat", data)
        .then(res => {
            chatMessages.firstMessage(res.data)
        })
}

export const deleteMessage = (data) => {
    console.log(data)
    return fetch("post", "/chat/deleteMessage", data)
        .then(res => {
            restoreMessages()
        })
}
