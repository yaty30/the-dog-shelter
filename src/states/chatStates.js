import { types } from 'mobx-state-tree'
import { user } from './loginStates'
import { getDatetime, randomNumber } from 'src/utils'

const messageData = types
    .model({
        chatID: types.number,
        messageID: types.number,
        message: types.string,
        date: types.string,
        time: types.string,
        sendBy: types.number,
        workerID: types.number
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
            return list[0].sendBy
        },
        getRooms() {
            const messages = self.list.filter(x => x.workerID === 1) //user.id
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
            const messages = self.list.filter(x => x.workerID === 1) //user.id
            let list = self.getRooms()
            
            messages.map(x =>
                list[list.findIndex(r => r.chatID === x.chatID)].messages.push({
                    chatID: x.chatID,
                    messageID: x.messageID,
                    message: x.message,
                    date: x.date,
                    time: x.time,
                    sendBy: x.sendBy,
                    workerID: x.workerID
                })
            )

            return list
        }
    }))
    .actions(self => ({
        sendMessage(data) {
            console.log(data)
            self.list.push({
                chatID: data.chatID,
                messageID: randomNumber(999, 99999),
                message: data.message,
                date: getDatetime("date"),
                time: getDatetime("time"),
                sendBy: user.id,
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
                chatID: 111,
                messageID: 93101,
                message: "test1",
                date: "",
                time: "8:23 PM",
                sendBy: 1,
                workerID: 1
            },
            {
                chatID: 324,
                messageID: 123,
                message: "test2",
                date: "",
                time: "8:23 PM",
                sendBy: 0,
                workerID: 1
            },
            {
                chatID: 324,
                messageID: 32423,
                message: "test3",
                date: "",
                time: "8:23 PM",
                sendBy: 0,
                workerID: 1
            },
            {
                chatID: 324,
                messageID: 29341234,
                message: "test4",
                date: "",
                time: "8:23 PM",
                sendBy: 0,
                workerID: 1
            },
            {
                chatID: 324,
                messageID: 4234234,
                message: "test5",
                date: "",
                time: "8:23 PM",
                sendBy: 0,
                workerID: 1
            },
            {
                chatID: 111,
                messageID: 45235,
                message: "test6",
                date: "",
                time: "8:23 PM",
                sendBy: 0,
                workerID: 1
            },
            {
                chatID: 111,
                messageID: 2341234,
                message: "test7",
                date: "",
                time: "8:23 PM",
                sendBy: 1,
                workerID: 1
            },
            {
                chatID: 324,
                messageID: 9314401,
                message: "test8",
                date: "",
                time: "8:23 PM",
                sendBy: 1,
                workerID: 1
            },
            {
                chatID: 111,
                messageID: 931121101,
                message: "test9",
                date: "",
                time: "8:23 PM",
                sendBy: 1,
                workerID: 1
            },
        ]
    })