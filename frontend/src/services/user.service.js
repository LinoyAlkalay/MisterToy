import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login(credentials) {
    return httpService.post(BASE_URL + 'login', credentials)
    .then(_setLoggedinUser)
    .catch(err => {
        console.log('err:', err)
        throw new Error('Invalid login')
    })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return httpService.post(BASE_URL + 'signup', user)
        .then(_setLoggedinUser)
}

// function updateScore(diff) {
//     return userService.getById(getLoggedinUser()._id)
//         .then(user => {
//             if (user.score + diff < 0) return Promise.reject('No credit')
//             user.score += diff
//             return storageService.put(STORAGE_KEY, user)
//                 .then((user) => {
//                     _setLoggedinUser(user)
//                     return user.score
//                 })
//         })
// }

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}



