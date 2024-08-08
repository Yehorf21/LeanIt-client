import { getLocalWithExpiry } from '../helpers';
import { User } from '../store/reducers/userReducer';
import { instance } from './instance';

interface Login {
  email: string;
  password: string;
}

interface Signup extends Login {
  repeatPassword: string;
}

interface Profile {
  name: string;
  email: string;
}

interface Password {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export interface LikedArticle {
  articleId: number;
  type: string;
}

const token = getLocalWithExpiry('user')?.value;

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const sendAuth = (
  type: 'login' | 'registration',
  data: Login | Signup
) => {
  const { email, password } = data;

  return instance.post(
    `auth/${type}`,
    type === 'login' ? { email, password } : data
  );
};

export const getProfile = () => {
  return instance.get<User>('profile', authHeader);
};

export const updateProfile = ({ name, email }: Profile) => {
  return instance.put('profile/update-info', { name, email }, authHeader);
};

export const updatePassword = (value: Password) => {
  return instance.put('profile/update-password', value, authHeader);
};

export const updateImage = (imageId: number) => {
  return instance.put('profile/update-image', { imageId }, authHeader);
};

export const postLiked = (article: LikedArticle) => {
  return instance.post('profile/favorites', article, authHeader);
};

export const removeLiked = (id: number) => {
  return instance.delete(`profile/favorites/${id}`, authHeader);
};

const categories = ['grammar', 'video', 'resources'];

export const getLiked = async () => {
  const promises = categories.map((category) => {
    return instance.get(
      `profile/favorites?size=20&type=${category}`,
      authHeader
    );
  });

  return await Promise.all(promises);
};
