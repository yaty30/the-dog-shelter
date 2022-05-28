import { fetch } from './fetch'
import { chatMessages, messages } from 'src/states/chatStates'
import { user } from '../states/loginStates'

export const restoreMessages = () => {
    return fetch("get", `/chat/restoreMessage?userID=${user.getID()}`)
        .then(res => {
            chatMessages.restoreMessages(res.data)
        })
}

export const sendMessage = (data) => {
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




export const getMessages = (chatID) => {
    return fetch("get", `/chat/client/getChatMessages?chatID=${chatID}`)
        .then(res => {
            console.log(res.data)
            messages.restoreMessage(res.data)
            return res
        })
}

export const getMessageByID = (id) => {
    console.log(id)
    return fetch("get", `/chat/clientGetMessagesByID?clientID=${id}`)
        .then(res => {
            console.log(res.data)
            messages.restoreMessage(res.data)
            return res
        })
}

export const getWorkerMessageByID = (id) => {
    console.log(id)
    return fetch("get", `/chat/workerGetMessagesByID?workerID=${id}`)
        .then(res => {
            console.log(res.data)
            messages.restoreMessage(res.data)
            return res
        })
}