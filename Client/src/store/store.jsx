import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import emailReducer from "./emailSlice"
import notificationReducer from "./notificationSlice"

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

// Redux Persist configuration for auth Reducer
const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "role", "isLoggedIn","userId"],
};

const persistEmailConfig = {
    key: "email",
    storage,
    whitelist: ["email"],
}

const persistNotificationConfig = {
    key: "notification",
    storage,
    whitelist: ['notifications', 'readNotifications'],
}

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedEmailReducer = persistReducer(persistEmailConfig, emailReducer);
const persistedNotificationReducer = persistReducer(persistNotificationConfig, notificationReducer);

// ✅ Correct middleware setup
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        email: persistedEmailReducer,
        notification: persistedNotificationReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }), // ✅ Correctly append thunk
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
