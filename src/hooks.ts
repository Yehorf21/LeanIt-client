import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from './store/hooks';
import { emptyNotification, actions as userActions } from './store/reducers/userReducer';

export const useResponsiveValues = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640 });

  const getResponsiveValue = (
    mobile: string,
    tablet: string,
    desktop: string
  ) => {
    if (isDesktop) {
      return desktop;
    } else if (isTablet) {
      return tablet;
    }

    return mobile;
  };

  return { getResponsiveValue };
};

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const addNotification = (title: string, type: 'Success' | 'Error') => {
    dispatch(userActions.setNotification({ title, type }));
  };

  const removeNotification = () => {
    dispatch(userActions.setNotification(emptyNotification));
  };

  return { addNotification, removeNotification };
};
