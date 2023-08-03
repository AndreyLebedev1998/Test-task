import { configureStore } from "@reduxjs/toolkit";
import { lettersReducer, oneLettersReducer } from "./slices/letters";
import { folderReducer, oneFolderReducer } from "./slices/folders";

export const store = configureStore({
  reducer: {
    letters: lettersReducer,
    oneLetter: oneLettersReducer,
    folders: folderReducer,
    oneFolder: oneFolderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
