import { types } from 'mobx-state-tree'
import { login, user } from './loginStates'
import { getDatetime, randomNumber } from 'src/utils'

const chatMessageData = types
    .model({
        message: types.string,
        from: types.number,
        to: types.number,
        date: types.string,
        time: types.string,
        chatID: types.string,
        messageID: types.string,
        orderID: types.number
    })

export const chatMessages = types
    .model({
        messages: types.array(chatMessageData)
    })
    .views(self => ({
        getChats() {
            let chats = self.messages.map(x => x.chatID)
            let result = [...new Set(chats)]
            return result
        },
        getMessagesByChatID(id) {
            return self.messages.filter(x => x.chatID === id)
        },
        getReplyTo(chatID) {
            let from = self.getMessagesByChatID(chatID)[0].from
            let to = self.getMessagesByChatID(chatID)[0].to
            return from === user.getID() ? to : from
        }
    }))
    .actions(self => ({
        firstMessage(item) {
            self.messages.clear()
            self.messages.push(item)
        },
        restoreMessages(item) {
            self.messages.clear()
            item.forEach(data => self.messages.push(data))
            console.log(JSON.stringify(self.messages))
        }
    }))
    .create({
        messages: []
    })

const messageData = types
    .model({
        chatID: types.string,
        messageID: types.number,
        message: types.string,
        clientID: types.number,
        expired: types.boolean,
        workerID: types.number,
        sendTime: types.string,
        sendBy: types.number,
        date: types.string,
        time: types.string,
    })