import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchCardType } from '../../api/cards';
import { LikedArticle } from '../../api/auth';

// export interface Post {
//   id: number;
//   title: string;
//   descrtiption: string;
//   imageUrl: string;
//   href: string;
// }

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

    setLiked: (state, action: PayloadAction<LikedArticle[]>) => {
      state.liked = (action.payload);
    },

    pushToLiked: (state, action: PayloadAction<LikedArticle[]>) => {
      state.liked.push(...action.payload);
    },

    addLiked: (state, action: PayloadAction<LikedArticle>) => {
      state.liked.push(action.payload);
    },

    addPosted: (state, action: PayloadAction<SearchCardType>) => {
      state.posted.push(action.payload);
    },

    removeLiked: (state, action: PayloadAction<number>) => {
      state.liked = state.liked.filter((liked) => liked.articleId !== action.payload);
    },

    removePosted: (state, action: PayloadAction<number>) => {
      state.posted = state.posted.filter(
        (posted) => posted.id !== action.payload
      );
    },

    setNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
