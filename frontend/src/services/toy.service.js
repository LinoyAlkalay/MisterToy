import { httpService } from './http.service'

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
    return httpService.get('toy', { params: { filterBy, sortBy } })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy(name = '', price = 0, createdAt = Date.now(), inStock = true, labels = []) {
    return { name, price, createdAt, inStock, labels }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: '' }
}

// function getDefaultSort() {
//     return { name: null, createdAt: null, price: null }
// }

function getDefaultSort() {
    return { by: 'name', asc: true }
}


