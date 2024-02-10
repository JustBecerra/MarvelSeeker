import { ComicType } from "@/types/ComicTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import md5 from "md5";
type initialStateType = {
  comics: ComicType[];
  comicsById: ComicType[];
  status: string;
  statusById: string;
  error: string;
};

const initialState: initialStateType = {
  comics: [],
  comicsById: [],
  status: "",
  statusById: "",
  error: "",
} as initialStateType;

const ts = Date.now().toString();
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const hash = md5(ts + privateKey + publicKey);

const fetchComics = createAsyncThunk("comics", async () => {
  try {
    const apiBaseURL = "http://gateway.marvel.com/v1/public";
    const response = await axios.get(
      `${apiBaseURL}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
});

const fetchComicById = createAsyncThunk(
  "comics/fetchComicById",
  async (comicId: number) => {
    try {
      const apiBaseURL = "http://gateway.marvel.com/v1/public";
      const response = await axios.get(
        `${apiBaseURL}/characters/${comicId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`
      );
      return response.data.data.results;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }
);

export const comics = createSlice({
  name: "comics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comics = action.payload;
      })
      .addCase(fetchComics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(fetchComicById.pending, (state) => {
        state.status = "loading"; // Use a different action type or state property for fetchComicById.pending
      })
      .addCase(fetchComicById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comicsById = action.payload;
      })
      .addCase(fetchComicById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { fetchComics, fetchComicById };
export const {} = comics.actions;
export default comics.reducer;
