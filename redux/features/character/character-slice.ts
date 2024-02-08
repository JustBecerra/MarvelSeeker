import { CharacterType } from "@/types/CharacterTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
type initialStateType = {
  character: CharacterType;
  status: string;
  error: string;
};

const initialState: initialStateType = {
  character: {
    id: 0,
    name: "",
    description: "",
    modified: Date,
    resourceURI: "",
    urls: [],
    thumbnail: {
      type: "",
      url: "",
    },
    stories: {
      available: 0,
      returned: 0,
      collectionURI: "",
      items: [],
    },
    comics: {
      available: 0,
      returned: 0,
      collectionURI: "",
      items: [],
    },
    events: { available: 0, returned: 0, collectionURI: "", items: [] },
    series: {
      available: 0,
      returned: 0,
      collectionURI: "",
      items: [],
    },
  },
  status: "",
  error: "",
} as unknown as initialStateType;

const ts = Date.now().toString();

const fetchCharacters = createAsyncThunk("character", async () => {
  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/comics",
      {
        params: {
          apikey: process.env.public_key,
          ts: ts,
          hash: CryptoJS.MD5(
            ts +
              process.env.MARVEL_PRIVATE_KEY +
              process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
          ).toString(),
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
});

export const characters = createSlice({
  name: "character",
  initialState,
  reducers: {
    getCharacters: (state, action: PayloadAction<CharacterType>) => {
      state.character = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.character = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { fetchCharacters };
export const { getCharacters } = characters.actions;
export default characters.reducer;
