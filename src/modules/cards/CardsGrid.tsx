import { useNavigate } from 'react-router-dom';
import { Card } from './Card';
import { useEffect, useMemo, useState } from 'react';
import { CardType, getCards } from '../../api/cards';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actions as cardsActions } from '../../store/reducers/cardsReducer';
import { useNotification } from '../../hooks';
import { NotFound } from '../notfound/NotFound';

interface Props {
  title: 'Grammar' | 'Video' | 'Liked';
}

export const CardsGrid: React.FC<Props> = ({ title }) => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const { cards } = useAppSelector((state) => state.cards);
  const { liked } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { addNotification } = useNotification();

  const navigate = useNavigate();

  const cardSettings = {
    isGrid: true,
    bgColor: '#FFFFFF',
    hasButton: false,
  };

  // State

  const setCards = (values: CardType[]) => {
    dispatch(cardsActions.setCards(values));
  };

  const addCards = (values: CardType[]) => {
    dispatch(cardsActions.addCards(values));
  };

  const handleNumberOfPages = () => setNumberOfPages(numberOfPages + 1);

  // Navigation

  const handleGoBack = () => {
    navigate(-1);
  };

  // API

  type CardSetter = (data: CardType[]) => void;

  const fetchCards = async (setter: CardSetter, page: number) => {
    getCards(title, page)
      .then((res) => setter(res.data.content))
      .catch(() => addNotification('Cards did not load', 'Error'));
  };

  // Lifecycle methods

  useEffect(() => {
    if (title !== 'Liked') {
      fetchCards(setCards, 0);

      return;
    }
  }, [title]);

  useEffect(() => {
    if (numberOfPages !== 0) {
      if (title !== 'Liked') {
        fetchCards(addCards, numberOfPages);
      }
    }
  }, [numberOfPages]);

  useEffect(() => {
    const fetchMaxPages = async () => {
      try {
        const fetchedMaxPages = (await getCards(title)).data.totalPages;
        setMaxPages(fetchedMaxPages);
      } catch {
        addNotification('Could not fetch max pages', 'Error');
      }
    };

    if (title !== 'Liked') {
      fetchMaxPages();
    }
  }, [title]);

  const shownCards = useMemo(() => {
    return title !== 'Liked' ? cards : liked;
  }, [cards, liked]);

  const isEmpty = title === 'Liked' && !liked?.length;

  return isEmpty ? (
    <NotFound type="noFavorites" />
  ) : (
    <section className="padding pt-[100px] pb-[100px] lg:pt-[200px] flex flex-col gap-8 lg:gap-12">
      <div className="flex flex-col justify-center lg:justify-normal lg:items-center lg:flex-row gap-2 lg:gap-4">
        {/* Arrow */}
        <button
          className="arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8"
          onClick={handleGoBack}
        />

        <h3 className="font-secondary text-primary text-32 lg:text-64 font-bold uppercase">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-6 justify-items-center">
        {shownCards.map((card, i) => (
          <Card card={card} settings={cardSettings} key={i} />
        ))}
      </div>

      {numberOfPages !== maxPages - 1 && title !== 'Liked' && (
        <button
          className="flex items-center justify-center gap-4 w-[100%] h-14 lg:h-16 sm:max-w-[292px] bg-additional rounded-[100px]"
          onClick={handleNumberOfPages}
        >
          <p className="font-main text-16 lg:text-20 text-primary font-semibold uppercase">
            Show more
          </p>

          <div className="chevron-dark bg-no-repeat bg-contain h-4 w-4" />
        </button>
      )}
    </section>
  );
};

export default CardsGrid;
