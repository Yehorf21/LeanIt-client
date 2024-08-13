import { useMemo, useState } from 'react';
import cn from 'classnames';

import { CardSettings, generateSlug, shortenDescription } from '../../helpers';
import { useNotification, useResponsiveValues } from '../../hooks';
import { CardType } from '../../api/cards';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as cardsActions } from '../../store/reducers/cardsReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchLikedArticles } from '../../store/reducers/userReducer';
import { postLiked, removeLiked } from '../../api/user';

interface Props {
  card: CardType;
  settings: CardSettings;
}

export const Card: React.FC<Props> = ({ card, settings }) => {
  const { user, liked } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { addNotification } = useNotification();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isGrid, bgColor, hasButton } = settings;

  const { getResponsiveValue } = useResponsiveValues();

  const { title, imageUrl, description, href, type, id } = card;
  const cardType = type.toLowerCase();

  const link = '/' + cardType + '/' + generateSlug(title);

  // Responsiveness

  const getWidth = isGrid
    ? getResponsiveValue('335', '450', '608')
    : getResponsiveValue('280', '300', '387');

  // Favorites management

  const likedPost = useMemo(() => {
    return liked.find((article) => article.id === id && article.type === type);
  }, [liked, id, type]);


  const handleHeart = async () => {
    const likedArticle = {
      articleId: id,
      type,
    };

    if (!user.name) {
      addNotification('You need to log in first', 'Error');
      return;
    }

    try {
      if (!likedPost) {
        await postLiked(likedArticle);
      } else {
        await removeLiked(likedPost?.favoriteId);
      }

      dispatch(fetchLikedArticles());
    } catch {
      addNotification('Action failed', 'Error');
    }
  };

  // Route management

  const resourcesPaths = ['/', '/liked'];
  const isExternalResource =
    cardType !== 'resources' ||
    resourcesPaths.some((resourcePath) => pathname === resourcePath);

  const handlePickedCard = (value: CardType) => {
    if (isExternalResource) {
      type === 'resources' ? window.open(href, '_blank') : navigate(link);
    } else {
      dispatch(cardsActions.addPickedCard(value));
    }

    window.scrollTo(0, 0);
  };

  const getPath = () => {
    if (pathname === '/resources') {
      return false;
    }

    if (pathname.includes('-')) {
      return false;
    }

    if (pathname === '/') {
      return false;
    }

    return true;
  };

  return (
    <article
      className={`self-center flex flex-col gap-6 p-4 col-span-2 sm:col-span-3 lg:col-span-6 h-fit rounded-[24px]`}
      style={{
        maxWidth: +getWidth,
        backgroundColor: bgColor,
        width: isGrid ? '100%' : getResponsiveValue('65vw', '35vw', '25vw'),
      }}
    >
      <div className="relative">
        <button
          className={cn('h-[150px] sm:h-[200px] w-[100%]', {
            'h-[200px] sm:h-[250px] lg:h-[300px]': getPath(),
          })}
          onClick={() => handlePickedCard(card)}
        >
          <div
            className={cn('h-[100%] w-[100%]', {
              'skeleton-card-image': !isImageLoaded,
            })}
          >
            <img
              className="h-[100%] w-[100%] object-cover rounded-[16px]"
              style={{
                opacity: isImageLoaded ? 1 : 0,
              }}
              src={imageUrl}
              alt="card-image"
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </button>

        <button
          className="absolute flex justify-center items-center h-10 w-10 top-6 right-6 bg-white rounded-full"
          onClick={handleHeart}
        >
          <div
            className={cn('like h-6 w-6 bg-no-repeat bg-contain z-20', {
              'like-added': likedPost,
            })}
          />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h5 className="font-main text-20 xl:text-28 h-[60px] lg:h-20 text-primary font-bold overflow-hidden">
          {title}
        </h5>

        <p className="font-main text-14 xl:text-16 text-text-secondary">
          {shortenDescription(description, 105)}
        </p>
      </div>

      {hasButton && (
        <button
          className="flex items-center justify-center gap-2 w-1/2 h-12 bg-additional rounded-[80px]"
          onClick={() => handlePickedCard(card)}
        >
          <p className="font-main text-16 lg:text-20 text-primary font-semibold uppercase">
            View
          </p>

          <div className="chevron-dark bg-no-repeat bg-contain h-2 sm:h-3 w-2 sm:w-3" />
        </button>
      )}
    </article>
  );
};
