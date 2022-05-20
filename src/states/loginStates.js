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
        loginTime: types.string
    })
    .actions(self => ({
        setData(data) {
            self.id = data.id
            self.username = data.username
            self.userType = data.userType
            self.loginDate = ""
            self.loginTime = ""
        }
    }))
    .create({
        id: 0,
        username: "",
        userType: "",
        loginDate: "",
        loginTime: ""
    })