const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy, sortBy) {
    let { by, asc } = sortBy
    let { name, price, inStock } = filterBy
    if (asc) asc = JSON.parse(asc)
    if (inStock) inStock = JSON.parse(inStock)

    let filteredToys = toys

    filteredToys.sort((toy1, toy2) => {
        const dir = asc ? 1 : -1
        if (by === 'price') return (toy1.price - toy2.price) * dir
        if (by === 'name') return toy1.name.localeCompare(toy2.name) * dir
    })

    if (name) {
        const regex = new RegExp(name, 'i')
        filteredToys = toys.filter(toy => regex.test(toy.name))
    }

    if (price) filteredToys = toys.filter(toy => toy.price >= price)
    if (inStock) filteredToys = toys.filter(toy => toy.inStock)

    return Promise.resolve(filteredToys)
}

function getById(_id) {
    const toy = toys.find(toy => toy._id === _id)
    return Promise.resolve(toy)
}

function remove(_id) {
    const idx = toys.findIndex(toy => toy._id === _id)
    toys.splice(idx, 1)
    _saveToysToFile()
    return Promise.resolve()
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = { ...toys[idx], ...toy }
    } else {
        toy.createdAt = Date.now()
        toy._id = _makeId()
        toys.unshift(toy)
    }
    _saveToysToFile()
    return Promise.resolve(toy)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2))
}
