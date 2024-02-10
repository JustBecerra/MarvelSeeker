import { CharacterType } from "@/types/CharacterTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import md5 from "md5";
type initialStateType = {
  characters: CharacterType[];
  filteredCharacters: CharacterType[];
  favoriteCharacters: CharacterType[];
  showFavorites: boolean;
  searchBar: string;
  status: string;
  error: string;
};

const initialState: initialStateType = {
  characters: [],
  filteredCharacters: [],
  favoriteCharacters: [],
  showFavorites: false,
  searchBar: "",
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
      `${apiBaseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`
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
    filterCharacters: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm !== "") {
        state.filteredCharacters = state.characters.filter((char) =>
          char.name.toLowerCase().includes(searchTerm)
        );
      } else {
        state.filteredCharacters = state.characters;
      }
    },
    addFavoriteCharacters: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const favoriteChar = state.characters.find((char) => char.id === id);

      if (favoriteChar) {
        const isAlreadyFavorite = state.favoriteCharacters.some(
          (char) => char.id === favoriteChar.id
        );

        if (isAlreadyFavorite) {
          state.favoriteCharacters = state.favoriteCharacters.filter(
            (char) => char.id !== id
          );
        } else {
          state.favoriteCharacters.push(favoriteChar);
        }
      }
    },
    activateFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
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
        state.filteredCharacters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { fetchCharacters };
export const { filterCharacters, addFavoriteCharacters, activateFavorites } =
  characters.actions;
export default characters.reducer;
