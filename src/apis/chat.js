import { fetch } from './fetch'
import { messages } from 'src/states/chatStates'

export const sendMessage = (data) => {
    return fetch("post", "/chat/sendChatMessage", data)
        .then(res => {
            return res
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