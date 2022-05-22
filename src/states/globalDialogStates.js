import { types } from 'mobx-state-tree'

export const register = types
    .model({
        registerForm: types.boolean
    })
    .actions(self => ({
        setForm(status) {
            self.registerForm = status
        }
    }))
    .create({
        registerForm: false,
    })

export const instantChat = types
    .model({
        instantChat: types.boolean
    })
    .actions(self => ({
        setChat(status) {
            self.instantChat = status
        }
    }))
    .create({
        instantChat: false
    })