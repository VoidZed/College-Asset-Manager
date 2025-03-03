//redux central store to combine the slice

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

// Redux Persist configuration
const persistConfig = {
    key: "auth",
    storage, // Stores data in localStorage
    whitelist: ["user", "role", "isLoggedIn"],
};


// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with persistedReducer
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore Redux Persist actions
            },
        }),
});


// Create a persistor
export const persistor = persistStore(store);

export default store;