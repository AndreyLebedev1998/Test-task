import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Letters } from "../../types/data";

type LettersState = {
  incomingLetters: {
    data: Letters[];
    status: String;
  };
  oneLetter: {
    data: Letters;
    status: String;
  };
};

export const getIncommingLetters = createAsyncThunk(
  "getIncommingLetters",
  async (): Promise<Letters[]> => {
    const { data } = await axios.get("http://localhost:8000/incomingLetters");

    return data;
  }
);

export const getOneLetter = createAsyncThunk(
  "getOneLetter",
  async (id: number): Promise<Letters> => {
    const { data } = await axios.get(
      `http://localhost:8000/incomingLetters/${id}`
    );

    return data;
  }
);

export const remoteLetter = createAsyncThunk(
  "remoteLetter",
  async (id: number): Promise<void> => {
    const { data } = await axios.patch(
      `http://localhost:8000/incomingLetters/${id}`,
      {
        status: "Удаленное",
      }
    );

    return data;
  }
);

export const spamLetter = createAsyncThunk(
  "spamLetter",
  async (id: number): Promise<void> => {
    const { data } = await axios.patch(
      `http://localhost:8000/incomingLetters/${id}`,
      {
        status: "Спам",
      }
    );

    return data;
  }
);

export const draftsLetter = createAsyncThunk(
  "draftsLetter",
  async (id: number): Promise<void> => {
    const { data } = await axios.patch(
      `http://localhost:8000/incomingLetters/${id}`,
      {
        status: "Черновик",
      }
    );

    return data;
  }
);

export const deleteOneLetter = createAsyncThunk(
  "deleteOneLetter",
  async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/incomingLetters/${id}`);
  }
);

const initialState: LettersState = {
  incomingLetters: {
    data: [],
    status: "loading",
  },
  oneLetter: {
    data: {
      userId: undefined,
      id: undefined,
      title: undefined,
      body: undefined,
      date: undefined,
      name: undefined,
      status: undefined,
    },
    status: "loading",
  },
};

const lettersSlice = createSlice({
  name: "letters",
  initialState: initialState.incomingLetters,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncommingLetters.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(getIncommingLetters.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(getIncommingLetters.rejected, (state) => {
        state.data = [];
        state.status = "error";
      });
  },
});

const oneLetterSlice = createSlice({
  name: "oneLetter",
  initialState: initialState.oneLetter,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneLetter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneLetter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(getOneLetter.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const lettersReducer = lettersSlice.reducer;
export const oneLettersReducer = oneLetterSlice.reducer;
