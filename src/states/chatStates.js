import { types } from 'mobx-state-tree'
import { login, user } from './loginStates'
import { getDatetime, randomNumber } from 'src/utils'

const messageData = types
    .model({
        chatID: types.string,
        messageID: types.number,
        message: types.string,
        clientID: types.number,
        expired: types.boolean,
        workerID: types.number,
        sendTime: types.string,
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
                    workerID: x.workerID
                })
            )

            return list
        }
    }))
    .actions(self => ({
        restoreMessage(data) {
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
        list: [
            {
                chatID: "PqSFoijsafWEOPKW",
                messageID: 93101,
                message: "test1",
                clientID: 1,
                expired: false,
                workerID: 1,
                sendTime: "8:25 PM",
                date: "",
                time: "",
            }
        ]
    })