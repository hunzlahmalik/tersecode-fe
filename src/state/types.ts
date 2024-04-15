import store from "state";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
