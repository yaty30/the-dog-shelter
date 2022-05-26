import { types } from 'mobx-state-tree'
import { messages } from './chatStates'

export const login = types
    .model({
        isLogin: types.boolean
    })
    .views(self => ({
        Logined() {
            return self.isLogin === true
        }
    }))
    .actions(self => ({
        setLogin(login) {
            self.isLogin = login
        }
    }))
    .create({
        isLogin: false
    })

export const tempUser = types
    .model({
        id: types.number
    })
    .actions(self => ({
        setID(id) {
            self.id = id
        }
    }))
    .create({
        id: -1
    })

export const user = types
    .model({
        id: types.number,
        username: types.string,
        userType: types.string,
        loginDate: types.string,
        loginTime: types.string,
        token: types.string
    })
    .views(self => ({
        isClient() {
            return self.userType === "client"
        },
        isLogined() {
            return  self.id !== 0
        },
        getID() {
            return self.id
        },
        getToken() {
            return self.userType === "worker" ? self.token : ""
        }
    }))
    .actions(self => ({
        setData(data) {
            self.id = data.id
            self.username = data.username
            self.userType = data.userType
            self.loginDate = data.loginDate
            self.loginTime = data.loginTime
            self.token = `${data.token}`

            login.setLogin(true)
        },
        logout() {
            self.id = -1
            self.username = ""
            self.userType = ""
            self.loginDate = ""
            self.loginTime = ""
            self.token = ""

            messages.clear()

            login.setLogin(false)
        }
    }))
    .create({
        id: -1,
        username: "",
        userType: "",
        loginDate: "",
        loginTime: "",
        token: ""
    })