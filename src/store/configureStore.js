import { createStore, combineReducers } from "redux";

import user from './reducer/user'
import breadcrumb from './reducer/breadcrumb'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({
    user: user,
    breadcrumb: breadcrumb
});

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)


const exportedObject = {
    store,
    persistor,
};

export default exportedObject