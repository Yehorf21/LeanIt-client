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
  return instance.get<User>('profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = ({ name, email }: Profile) => {
  return instance.put('profile/update-info', { name, email }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassword = (value: Password) => {
  return instance.put('profile/update-password', value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateImage = (imageId: number) => {
  return instance.put('profile/update-image', { imageId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postLiked = (article: LikedArticle) => {
  return instance.post('profile/favorites', article, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeLiked = (id: number) => {
  return instance.delete(`profile/favorite/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getLiked = (page: number) => {
  return instance.get(`profile/favorites?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};