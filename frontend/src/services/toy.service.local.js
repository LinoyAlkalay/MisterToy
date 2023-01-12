import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { utilService } from './http.service'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    const { name, price, inStock } = filterBy
    // const { name, createdAt, price } = sortBy
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            if (sortBy.createdAt !== null) {
                toys.sort((t1, t2) => (t2.createdAt - t1.createdAt) * (-1))
            }
            if (sortBy.price !== null) {
                toys.sort((t1, t2) => (t2.price - t1.price) * (-1))
            }
            if (sortBy.name !== null) {
                toys.sort((t1, t2) => t2.name.localeCompare(t1.name) * (-1))
            }

            if (name) {
                const regex = new RegExp(name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (price) toys = toys.filter(toy => toy.price >= price)

            if (inStock) toys = toys.filter(toy => toy.inStock)

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', price = 0, createdAt = Date.now(), inStock = true, labels = []) {
    return { name, price, createdAt, inStock, labels }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: '' }
}

function getDefaultSort() {
    return { name: null, createdAt: null, price: null }
}

function _createToys() {
    let toys = storageService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.unshift(_createToy('robot', 45, 1631031801011, false, ['On wheels', 'Box game', 'Art']))
        toys.unshift(_createToy('car', 30, 1631031801011, true, ['On wheels', 'Box game', 'Art']))
        toys.unshift(_createToy('lego', 40, 1631031801011, false, ['On wheels', 'Box game', 'Art']))
        toys.unshift(_createToy('doll', 30, 1631031801011, true, ['On wheels', 'Box game', 'Art']))
        toys.unshift(_createToy('teddy', 50, 1631031801011, true, ['On wheels', 'Box game', 'Baby']))
        storageService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, createdAt, inStock, labels) {
    const toy = getEmptyToy(name, price, createdAt, inStock, labels)
    toy._id = utilService.makeId()
    return toy
}



