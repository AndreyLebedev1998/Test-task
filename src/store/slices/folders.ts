import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Folder, Letters } from "../../types/data";

type FolderState = {
  customFolder: {
    data: Folder[];
    status: String;
  };
  oneCustomFolder: {
    data: Folder;
    status: String;
  };
  lettersInCustomFolders: {
    data: Letters[] | [];
    status: String;
  };
  /*  addLetters: {
    data: object;
    status: String;
  }; */
};

export type PatchFolder = {
  id: Number;
  status: String;
};

type changeFolder = {
  id: Number;
  name: String;
};

export const createCustomFolder = createAsyncThunk(
  "createCustomFolder",
  async (params: Folder): Promise<void> => {
    await axios.post("http://localhost:8000/folders", {
      name: params.name,
      letters: params.letters,
    });
  }
);

export const getCustomsFolder = createAsyncThunk(
  "createCustomFolder",
  async (): Promise<Folder[]> => {
    const { data } = await axios.get(`http://localhost:8000/folders`);
    return data;
  }
);

export const getOneCustomsFolder = createAsyncThunk(
  "getOneCustomsFolder",
  async (id: number): Promise<Folder> => {
    const { data } = await axios.get(`http://localhost:8000/folders/${id}`);
    return data;
  }
);

/* export const getLettersInCustomsFolder = createAsyncThunk<Letters[], number>(
  "getLettersInCustomsFolder",
  async (id) => {
    const { data } = await axios.get(`http://localhost:8000/folders/${id}`);
    return data.letters;
  }
); */

export const addLetterInCustomsFolder = createAsyncThunk(
  "getOneCustomsFolder",
  async (params: PatchFolder): Promise<void> => {
    await axios.patch(`http://localhost:8000/incomingLetters/${params.id}`, {
      status: params.status,
    });
  }
);

export const deleteCustomFolder = createAsyncThunk(
  "deleteCustomFolder",
  async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/folders/${id}`);
  }
);

export const changeNameCustomFolder = createAsyncThunk(
  "changeNameCustomFolder",
  async (params: changeFolder): Promise<void> => {
    await axios.patch(`http://localhost:8000/folders/${params.id}`, {
      name: params.name,
    });
  }
);

const initialState: FolderState = {
  customFolder: {
    data: [],
    status: "loading",
  },
  oneCustomFolder: {
    data: {
      name: undefined,
      letters: [],
    },
    status: "loading",
  },
  /*   addLetters: {
    data: {},
    status: "loading",
  }, */
  lettersInCustomFolders: {
    data: [],
    status: "loading",
  },
};

const folderSlice = createSlice({
  name: "folder",
  initialState: initialState.customFolder,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomsFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomsFolder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(getCustomsFolder.rejected, (state) => {
        state.status = "error";
      });
  },
});

const folderOneSlice = createSlice({
  name: "oneFolder",
  initialState: initialState.oneCustomFolder,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneCustomsFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneCustomsFolder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(getOneCustomsFolder.rejected, (state) => {
        state.status = "error";
      });
  },
});

/* const letterInFolderSlice = createSlice({
  name: "letterInFolder",
  initialState: initialState.lettersInCustomFolders,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLettersInCustomsFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLettersInCustomsFolder.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log(123);
        state.status = "loaded";
      })
      .addCase(getLettersInCustomsFolder.rejected, (state) => {
        state.status = "error";
      });
  },
}); */

/* const patchCustomFolderSlice = createSlice({
  name: "customFolderPatch",
  initialState: initialState.addLetters,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLetterInCustomsFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLetterInCustomsFolder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(addLetterInCustomsFolder.rejected, (state) => {
        state.status = "error";
      });
  },
}); */

export const folderReducer = folderSlice.reducer;
export const oneFolderReducer = folderOneSlice.reducer;
/* export const lettersInCustomFoldersReducer = letterInFolderSlice.reducer; */
/* export const patchCustomFolderReducer = patchCustomFolderSlice.reducer; */
