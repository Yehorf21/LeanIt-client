import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CardType, SearchCardType } from '../../api/cards';
import { getLiked, LikedArticle } from '../../api/user';

export interface User {
  id: number;
  email: string;
  name: string;
  imageId: number;
}

export interface Notification {
  title: string;
  type: 'Success' | 'Error';
}

export interface UserData {
  user: User;
  liked: LikedArticle[];
  posted: SearchCardType[];
  notification: Notification;
}

export const emptyUser = {
  id: 0,
  email: '',
  name: '',
  imageId: 1,
};

export const emptyNotification: Notification = {
  title: '',
  type: 'Success',
};

const initialState: UserData = {
  user: emptyUser,
  liked: [],
  posted: [],
  notification: emptyNotification,
};

export const fetchLikedArticles = createAsyncThunk(
  'likedArticles/fetchLikedArticles',
  async (_, thunkAPI) => {
    try {
      const fetchedArticles = await getLiked();
      return fetchedArticles.flatMap(article => article.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch liked articles');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setUserImage: (state, action: PayloadAction<number>) => {
      state.user.imageId = action.payload;
    },

    pushToLiked: (state, action: PayloadAction<LikedArticle[]>) => {
      state.liked.push(...action.payload);
    },

    setNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedArticles.fulfilled, (state, action: PayloadAction<LikedArticle[]>) => {
        state.liked = action.payload;
      })
  }
});

export default userSlice.reducer;
export const { actions } = userSlice;
