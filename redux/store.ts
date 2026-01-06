import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./slices/projectSlice";
import blogReducer from "./slices/blogSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    blog: blogReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/AUTH"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
