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

export const messages = types
    .model({
        list: types.array(messageData)
    })
    .views(self => ({
        getMessageByChatID(id) {
            const list = self.getMessage()
            return list.filter(x => x.chatID === id)
        },
        getClientByChatID(id) {
            let list = self.list.filter(x => x.chatID === id)
            return list[0].clientID
        },
        getRooms() {
            const messages = self.list
            const roomsPre = messages.map(x => ({
                chatID: x.chatID,
                messages: []
            }))
            const rooms = [...new Set(roomsPre)]
            const roomList = []
            rooms.map(x =>
                roomList.filter(u => u.chatID === x.chatID).length === 0 && roomList.push(x)
            )

            return roomList
        },
        getMessage() {
            const messages = self.list
            let list = self.getRooms()

            messages.map(x =>
                list[list.findIndex(r => r.chatID === x.chatID)].messages.push({
                    chatID: x.chatID,
                    messageID: x.messageID,
                    message: x.message,
                    date: x.date,
                    time: x.time,
                    clientID: x.clientID,
                    workerID: x.workerID,
                    sendBy: x.sendBy,
                    sendTime: x.sendTime
                })
            )

            return list
        }
    }))
    .actions(self => ({
        restoreMessage(data) {
            self.list.clear()
            data.forEach(item =>
                self.list.push(item)
            )
        },
        sendMessage(data) {
            console.log(data)
            self.list.push({
                chatID: data.chatID,
                messageID: randomNumber(999, 99999),
                message: data.message,
                date: getDatetime("date"),
                time: getDatetime("time"),
                clientID: user.id,
                workerID: data.workerID
            })
        },
        deleteMessage(id) {
            let index = self.list.findIndex(x => x.messageID === id)
            self.list.splice(index, 1)
        },
        clear() {
            self.list.clear()
        }
    }))
    .create({
        list: []
    })