import { types } from 'mobx-state-tree'
import { dogList } from './dogStates'

export const favouriteList = types
    .model({
        list: types.array(types.number)
    })
    .views(self => ({
        onList(id) {
            return self.list.filter(x => x == id).length > 0
        },
        getList() {
            const list = self.list.map(x =>
                dogList.getDog(x)
            )

            return list.flat()
        }
    }))
    .actions(self => ({
        restoreList(item) {
            self.list.clear()
            item.map(x => self.list.push(x))
        },
        addFavourite(id) {
            self.list.push(id)

            console.log(JSON.stringify(self.list))
        },
        removeFavourite(id) {
            let index = self.list.findIndex(x => x === id)
            self.list.splice(index, 1)
            console.log(JSON.stringify(self.list))
        }
    }))
    .create({
        list: []
    })