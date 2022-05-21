import { EnergySavingsLeaf } from '@mui/icons-material'
import { type } from '@testing-library/user-event/dist/type'
import { types } from 'mobx-state-tree'
import { breedList } from 'src/utils'

export const searchDog = types
    .model({
        breed: types.string,
        gender: types.string,
        seterillsed: types.string,
        location: types.string
    })
    .actions(self => ({
        setBreed(data) {
            self.breed = data
        },
        setGender(data) {
            self.gender = data
        },
        setSeterillsed(data) {
            self.seterillsed = data
        },
        setLocation(data) {
            self.location = data
        },
        clear() {
            self.breed = ""
            self.gender = ""
            self.seterillsed = ""
            self.location = ""
        }
    }))
    .create({
        breed: "",
        gender: "",
        seterillsed: "",
        location: ""
    })

export const editDogData = types
    .model({
        id: types.number,
        name: types.string,
        gender: types.string,
        location: types.string,
        seterillsed: types.boolean,
        breed: types.string,
        birthday: types.string,
        mircochipNo: types.string,
        intake: types.string,
        description: types.string,
        profileImage: types.string,
        notes: types.string,
        size: types.string,
        weight: types.number
    })
    .views(self => ({
        getData() {
            let data = {
                id: self.id,
                name: self.name,
                gender: self.gender,
                location: self.location,
                seterillsed: self.seterillsed,
                breed: self.breed,
                birthday: self.birthday,
                mircochipNo: self.mircochipNo,
                intake: self.intake,
                description: self.description,
                profileImage: self.profileImage,
                notes: self.notes,
                size: self.size,
                weight: self.weight
            }

            return data
        }
    }))
    .actions(self => ({
        prepareEditData(data) {
            self.id = data.id
            self.name = data.name
            self.gender = data.gender
            self.location = ""
            self.seterillsed = data.seterillsed
            self.breed = data.breed
            self.birthday = data.birthday
            self.mircochipNo = data.mircochipNo
            self.intake = data.intake
            self.description = data.description
            self.profileImage = data.profileImage
            self.notes = data.notes
            self.size = data.size
            self.weight = data.weight
        }
    }))
    .create({
        id: 0,
        name: "",
        gender: "",
        location: "",
        seterillsed: false,
        breed: "",
        birthday: "",
        mircochipNo: "",
        intake: "",
        description: "",
        profileImage: "",
        notes: "",
        size: "",
        weight: 0
    })

export const dogListTabs = types
    .model({
        type: types.string
    })
    .actions(self => ({
        setType(type) {
            self.type = type
        }
    }))
    .create({
        type: ""
    })

const dogListData = types
    .model({
        id: types.number,
        name: types.string,
        gender: types.string,
        location: types.string,
        seterillsed: types.boolean,
        breed: types.string,
        birthday: types.string,
        mircochipNo: types.string,
        intake: types.string,
        description: types.string,
        profileImage: types.string,
        notes: types.string,
        size: types.string,
        weight: types.number
    })

export const dogList = types
    .model({
        list: types.array(dogListData)
    })
    .views(self => ({
        getDog(id) {
            return self.list.filter(x => x.id === id)
        },
        getDogList(type, currentPage) {
            const list = self.list.filter(x => x.size.includes(type))
            const qty = 6
            const start = qty * (currentPage - 1)
            const end = qty * currentPage
            const result = currentPage === 1 ? list.slice(0, 6) : list.slice(start, end)

            return result
        },
        getPageNumber(type) {
            const list = self.list.filter(x => x.size.includes(type))
            return Math.ceil(list.length / 6)
        },
        searchDog() {
            let isSeterillsed = searchDog.seterillsed === "yes" ? true : false
            let list = self.list
            const breed = searchDog.breed !== "" ? list.filter(x => x.breed === searchDog.breed) : list
            const gender = searchDog.gender !== "" ? breed.filter(x => x.gender.toLowerCase() === searchDog.gender.toLowerCase()) : breed
            const location = searchDog.location !== "" ? gender.filter(x => x.location === searchDog.location) : gender
            const seterillsed = searchDog.seterillsed !== "" ? location.filter(x => x.seterillsed === isSeterillsed) : location

            return seterillsed
        }
    }))
    .actions(self => ({
        restoreList(item) {
            item.forEach(data =>
                self.list.push(data)
            )
        },
        editDog(id, data) {
            let index = self.list.findIndex(x => x.id === id)
            self.list[index] = data

            console.log(index)
        },
        removeDog(id) {
            let index = self.list.findIndex(x => x.id === id)
            console.log(index)
            self.list.splice(index, 1)
        },
        createNew(item) {
            self.list.push({
                id: item.id,
                name: item.name,
                gender: item.gender,
                location: item.location,
                seterillsed: item.seterillsed,
                breed: item.breed,
                birthday: item.birthday,
                mircochipNo: item.mircochipNo,
                intake: item.intake,
                description: item.description,
                profileImage: item.profileImage,
                notes: item.notes,
                size: item.size,
                weight: item.weight
            })
        },
        clear() {
            self.list.clear()
        }
    }))
    .create({
        list: [
            {
                id: 0, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[0].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "L", weight: 3.5
            },
            {
                id: 1, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[1].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "", size: "L", weight: 3.5
            },
            {
                id: 2, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[2].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 3, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[3].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "L", weight: 3.5
            },
            {
                id: 4, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[4].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "", size: "L", weight: 3.5
            },
            {
                id: 5, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[5].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 6, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: false,
                breed: breedList()[6].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "L", weight: 3.5
            },
            {
                id: 7, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: false,
                breed: breedList()[7].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "", size: "L", weight: 3.5
            },
            {
                id: 8, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: false,
                breed: breedList()[8].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 9, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: false,
                breed: breedList()[9].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "L", weight: 3.5
            },
            {
                id: 10, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[10].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "", size: "L", weight: 3.5
            },
            {
                id: 11, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[11].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 12, name: "Bean", gender: "Male", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[12].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "L", weight: 3.5
            },
            {
                id: 13, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[13].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "", size: "L", weight: 3.5
            },
            {
                id: 14, name: "Bean", gender: "Female", location: "Wan Chai Centre", seterillsed: true,
                breed: breedList()[14].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 15, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[15].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 16, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[16].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 17, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[17].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "M", weight: 3.5
            },
            {
                id: 18, name: "Bean", gender: "Female", location: "Hong Kong Head Centre", seterillsed: true,
                breed: breedList()[18].name, birthday: "2017-11-01", mircochipNo: "123456789", intake: "Rescued by Inspectors",
                description: "Bean is a furkid who loses his eyesight due to congenital problems; this condition makes him look as if he is smiling all the time. Since Flash is visually impaired, he can only sense his surroundings by bumping into things, which can be quite confusing sometimes.",
                profileImage: "https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg",
                notes: "VSO/BTSO", size: "S", weight: 3.5
            },
        ]
    })