import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './reducers/toy.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer)

// For debug 
store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})
