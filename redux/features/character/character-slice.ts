import { CharacterType } from "@/types/CharacterTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import md5 from "md5";
type initialStateType = {
  characters: CharacterType[];
  status: string;
  error: string;
};

const initialState: initialStateType = {
  characters: [],
  status: "",
  error: "",
} as initialStateType;

const ts = Date.now().toString();
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const hash = md5(ts + privateKey + publicKey);

const fetchCharacters = createAsyncThunk("characters", async () => {
  try {
    const apiBaseURL = "http://gateway.marvel.com/v1/public";
    const response = await axios.get(
      `${apiBaseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
});

export const characters = createSlice({
  name: "characters",
  initialState,
  reducers: {
    getCharacters: (state, action: PayloadAction<CharacterType[]>) => {
      state.characters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload;
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
