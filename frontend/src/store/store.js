import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './reducers/toy.reducer'

const rootReducer = combineReducers({
    toyModule: toyReducer,
})

export const store = createStore(rootReducer)

// For debug 
store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})
