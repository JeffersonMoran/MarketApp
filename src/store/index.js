import { createStore, combineReducers, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

import thunk from "redux-thunk";
import userReducer from "./user";

import { persistStore, persistReducer } from "redux-persist";

// Persistor Configuration to whitelist and blacklist any reducer
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userReducer"]
};

const combinedReducer = combineReducers({
  userReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
window.store = store;
export const persistor = persistStore(store);
