import { types } from 'mobx-state-tree'

export const floatingMenu = types
    .model({
        clickedMenu: types.string
    })
    .views(self => ({
        open(name) {
            return self.clickedMenu === name
        }
    }))
    .actions(self => ({
        setClicked(name) {
            self.clickedMenu = name
        },
        cancle() {
            self.clickedMenu = ""
        }
    }))
    .create({
        clickedMenu: ""
    })