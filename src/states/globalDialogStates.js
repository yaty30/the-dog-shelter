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
        registerForm: false
    })
