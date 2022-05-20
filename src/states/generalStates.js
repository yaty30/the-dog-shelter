import { types } from 'mobx-state-tree'

export const messageBar = types
    .model({
        status: types.boolean,
        message: types.string,
        severity: types.string
    })
    .actions(self => ({
        open(message, severity) {
            self.status = true
            self.message = message
            self.severity = severity
        },
        close() {
            self.status = false
            setTimeout(() => {
                self.clear()
            }, 1000)
        },
        clear() {
            self.message = ""
            self.severity = "warning"
        }
    }))
    .create({
        status: false,
        message: "",
        severity: "warning"
    })