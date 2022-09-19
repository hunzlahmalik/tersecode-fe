import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userReducer } from "./user/reducer";
import { profileReducer } from "./profile/reducer";
import { LOG_OUT } from "./actions";

const persistConfig = {
  key: "root",
  whitelist: ["user", "problems"],
  blacklist: ["profile"],
  storage,
  version: 1,
};

const appReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT.type) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
    console.log("LOG_OUT");
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
