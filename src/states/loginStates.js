import { types } from 'mobx-state-tree'

export const login = types
    .model({
        isLogin: types.boolean
    })
    .actions(self => ({
        setLogin(login) {
            self.isLogin = login
        }
    }))
    .create({
        isLogin: true
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
        },
        logout() {
            self.id = 0
            self.username = ""
            self.userType = ""
            self.loginDate = ""
            self.loginTime = ""
            self.token = ""

            login.setLogin(false)
        }
    }))
    .create({
        id: 0,
        username: "",
        userType: "",
        loginDate: "",
        loginTime: "",
        token: ""
    })