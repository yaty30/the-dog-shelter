import { type } from '@testing-library/user-event/dist/type'
import { types } from 'mobx-state-tree'

export const preFillEmail = types
    .model({
        value: types.string
    })
    .actions(self => ({
        setEmail(val) {
            self.value = val
        }
    }))
    .create({
        value: ""
    })

export const registerForm = types
    .model({
        email: types.string,
        name: types.string,
        phone: types.number,
        gender: types.string,
        haveDog: types.boolean,
        purpose: types.string,
        isAdult: types.maybeNull(types.boolean),
        isStaff: types.maybeNull(types.boolean),
        signUpCode: types.maybeNull(types.string),
    })
    .actions(self => ({
        setData(data) {
            self.email = data.email
            self.name = data.name
            self.phone = data.phone
            self.gender = data.gender
            self.haveDog = data.haveDog
            self.purpose = data.purpose
            self.isAdult = data.isAdult
            self.isStaff = data.isStaff
            self.signUpCode = data.signUpCode

            console.log(data)
        }
    }))
    .create({
        email: "",
        name: "",
        phone: 0,
        gender: "",
        haveDog: false,
        purpose: "",
        isAdult: null,
        isStaff: null,
        signUpCode: null
    })