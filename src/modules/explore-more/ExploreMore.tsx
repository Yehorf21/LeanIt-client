import { Swiper, SwiperSlide } from 'swiper/react';

import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { FreeMode } from 'swiper/modules';
import { Card } from '../cards/Card';
import { useMediaQuery } from 'react-responsive';
import { useNotification, useResponsiveValues } from '../../hooks';
import { CardType, getCards } from '../../api/cards';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as cardsActions } from '../../store/reducers/cardsReducer';
import { useEffect } from 'react';

interface Props {
  type: 'grammar' | 'video' | 'resources';
  isNoMargin?: boolean;
}

export const ExploreMore: React.FC<Props> = ({ type, isNoMargin }) => {
  const { cards } = useAppSelector((state) => state.cards);

  const dispatch = useAppDispatch();
  const { getResponsiveValue } = useResponsiveValues();
  const { addNotification } = useNotification();

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const cardSettings = {
    bgColor: '#FFFFFF',
    hasButton: true,
  };

  // State

  const setCards = (value: CardType[]) => {
    dispatch(cardsActions.setCards(value));
  };

  // API

  const fetchCards = async (page: number, size?: number) => {
    try {
      const fetchedCards = (await getCards(type, page, size)).data.content;

      setCards(fetchedCards);
    } catch {
      addNotification('Could not fetch cards for "Explore More"', 'Error');
    }
  };

  // Lifecycle methods

  useEffect(() => {
    const handleCards = async () => {
      const items = (await getCards(type)).data.totalElements;

      await fetchCards(0);

      if (type === 'resources') {
        fetchCards(0, items);
      }
    };

    handleCards();
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-6 lg:gap-10', {
        'mt-20 lg:mt-[120px]': !isNoMargin,
      })}
    >
      <h4 className="font-secondary text-28 lg:text-38 font-semibold text-primary">
        Explore more
      </h4>
      <Swiper
        slidesPerView={+getResponsiveValue('1.5', '2', '3')}
        spaceBetween={isDesktop ? 40 : 24}
        grabCursor={true}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper scroller"
      >
        {cards.map((card) => (
          <SwiperSlide className="scroller" key={card.id}>
            <Card card={card} settings={cardSettings} />
          </SwiperSlide>
        ))}

        {isMobile && (
          <SwiperSlide>
            <div className="w-[300px]" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
