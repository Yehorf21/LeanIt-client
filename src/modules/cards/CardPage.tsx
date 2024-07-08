import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ExploreMore } from '../explore-more/ExploreMore';

import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { EffectCards } from 'swiper/modules';

import { useEffect, useMemo, useState } from 'react';
import { cardContext, generateSlug, ungenerateSlug } from '../../helpers';
import { FlashCard } from '../flashcard/FlashCard';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LikedArticle, postLiked, removeLiked } from '../../api/auth';
import { useNotification } from '../../hooks';
import { actions as userActions } from '../../store/reducers/userReducer';
import {
  AnkiCard,
  CardArticleType,
  CardType,
  getCard,
  getCards,
  GrammarType,
  searchCards,
} from '../../api/cards';

interface Props {
  type: 'grammar' | 'video';
}

export const CardPage: React.FC<Props> = ({ type }) => {
  const { cardId } = useParams();
  const [card, setCard] = useState<CardArticleType | GrammarType | null>(null);
  const { user, liked } = useAppSelector((state) => state.user);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [areTopicsShown, setAreTopicsShown] = useState(false);

  const articleBorder = areTopicsShown ? '0px' : '24px';


  const handleGoBack = () => {
    navigate(-1);
  };

  // const isLiked = useMemo(() => {
  //   return liked.some((article) => article.articleId === 1); // for now
  // }, [liked]);

  // State

  const addLiked = (value: LikedArticle) => {
    dispatch(userActions.addLiked(value));
  };

  const deleteLiked = (id: number) => {
    dispatch(userActions.removeLiked(id));
  };

  const handleHeart = async () => {
    // const likedArticle = {
    //   articleId: 1, // for now
    //   type,
    // };
    // if (!user.name) {
    //   addNotification('You need to log in first', 'Error');
    //   return;
    // }
    // if (!isLiked) {
    //   addLiked(likedArticle);
    //   postLiked(likedArticle).catch(() => {
    //     addNotification('There was an error', 'Error');
    //     deleteLiked(1);
    //   });
    //   return;
    // }
    // deleteLiked(1);
    // removeLiked(1).catch(() => {
    //   addNotification('Favorite did not get removed', 'Error');
    //   addLiked(likedArticle);
    // });
  };

  const handleTopics = () => {
    setAreTopicsShown(!areTopicsShown);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedTitles: string[] = [];

      getCards(type, 0, 7)
        .then((res) =>
          res.data.content.map((card: CardType) =>
            fetchedTitles.push(card.title)
          )
        )
        .catch(() =>
          addNotification('Related topics could not get fetched', 'Error')
        );

      setRelatedTopics(fetchedTitles);
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      searchCards(ungenerateSlug(cardId as string))
        .then((res) => getCard(type, res.data[0].id))
        .then((res) => setCard(res.data))
        .catch(() => addNotification('Something went wrong', 'Error'));
    };

    fetchCard();
  }, [cardId]);

  return (
    <section className="padding pt-10 lg:pt-20 pb-[100px] flex flex-col gap-8 lg:gap-[53px] min-h-[70vh]">
      <div className="flex flex-col justify-center lg:justify-normal lg:items-center lg:flex-row gap-2 lg:gap-4">
        <button
          className="arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8"
          onClick={handleGoBack}
        />

        <h3 className="font-secondary text-primary text-32 lg:text-64 font-bold uppercase">
          {card?.title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-14 lg:gap-6">
        <article className="p-4 lg:p-6 lg:w-[70%] flex flex-col gap-6 lg:gap-10 bg-white rounded-[24px]">
          <div className="w-[100%] h-[55vw] lg:h-[34vw]">
            <iframe
              src={card?.videoUrl}
              className="h-[100%] w-[100%] rounded-[16px]"
              allowFullScreen
            />
          </div>

          {type === 'video' ? (
            <>
              <div className="w-[100%] flex items-center justify-end">
                <button
                  className="flex justify-center items-center h-10 w-10 bg-additional-light rounded-full"
                  onClick={handleHeart}
                >
                  <div
                    className={cn('like h-6 w-6 bg-no-repeat bg-contain z-20', {
                      // 'like-added': isLiked,
                    })}
                  />
                </button>
              </div>

              <p className="font-main text-14 xl:text-16 text-text-secondary">
                {card?.description}
              </p>

              <h4 className="font-secondary text-28 lg:text-38 font-semibold text-primary">
                Flashcards:
              </h4>

              <div className="flex justify-center">
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="mySwiper swiper-cards self-center"
                  cardsEffect={{
                    slideShadows: false,
                  }}
                >
                  {card?.ankiCards.map((flashcard: AnkiCard, i: number) => (
                    <SwiperSlide key={i}>
                      <FlashCard
                        card={flashcard}
                        backgroundColor={
                          (i + 1) % 2 !== 0 ? '#FEF99F' : '#C8ACFD'
                        }
                        key={i}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <a
                className="mt-10 flex justify-center items-center gap-2 h-16 w-[100%] sm:max-w-[373px] sm:self-start bg-primary rounded-[100px] font-main text-white font-semibold uppercase"
                href={card?.href}
                target="_blank"
              >
                <p className="font-main text-16 lg:text-20 text-white font-semibold uppercase">
                  View original video
                </p>

                <div className="chevron-light bg-no-repeat bg-contain h-6 w-6" />
              </a>
            </>
          ) : (
            <>
              <div className="w-[100%] flex items-center justify-between">
                <a
                  href={card?.videoUrl}
                  className="lg:pl-6 flex gap-2 lg:gap-4 items-center justify-center"
                >
                  <p className="font-main text-16 lg:text-20 font-semibold text-text-primary uppercase">
                    View original video
                  </p>

                  <div className="chevron-dark bg-no-repeat bg-contain h-2 sm:h-3 w-2 sm:w-3" />
                </a>

                <button
                  className="flex justify-center items-center h-10 w-10 bg-additional-light rounded-full"
                  onClick={handleHeart}
                >
                  <div
                    className={cn('like h-6 w-6 bg-no-repeat bg-contain z-20', {
                      // 'like-added': isLiked,
                    })}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
                <h4 className="font-secondary text-28 lg:text-38 font-bold text-primary">
                  {card?.title}
                </h4>

                <p
                  className="font-main text-20 lg:text-24 text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: card?.mainSubTitle as string,
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
                <h5 className="font-main text-20 sm:text-28 font-semibold text-primary">
                  {card?.secondTitle}
                </h5>

                <ul className="pl-5 flex flex-col gap-4 lg:gap-6 list-[circle]">
                  {card?.underTitleList.map((point) => (
                    <li
                      className="font-main text-20 lg:text-24 text-text-secondary"
                      key={point}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
                <h5 className="font-main text-20 sm:text-28 font-semibold text-primary">
                  {card?.thirdTitle}
                </h5>

                <p
                  className="font-main text-20 lg:text-24 text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: card?.thirdSubTitle as string,
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10">
                <h5 className="font-main text-20 sm:text-28 font-semibold text-primary">
                  {card?.fourthTitle}
                </h5>

                <p
                  className="font-main text-20 lg:text-24 text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: card?.fourthSubTitle as string,
                  }}
                />
              </div>

              <a
                className="mt-10 flex justify-center items-center gap-2 h-16 w-[100%] sm:max-w-[373px] sm:self-start bg-primary rounded-[100px] font-main text-white font-semibold uppercase"
                href={card?.href}
                target="_blank"
              >
                <p className="font-main text-16 lg:text-20 text-white font-semibold uppercase">
                  View original article
                </p>

                <div className="chevron-light bg-no-repeat bg-contain h-6 w-6" />
              </a>
            </>
          )}
        </article>

        <article
          className="relative p-6 flex flex-col gap-6 lg:gap-8 w-[100%] sm:max-w-[500px] lg:w-[30%] h-fit bg-additional rounded-[24px] transition-all duration-300"
          style={{
            borderBottomLeftRadius: articleBorder,
            borderBottomRightRadius: articleBorder,
          }}
        >
          <button
            className="p-0 w-fit text-left font-secondary text-28 lg:text-38 font-semibold text-primary"
            onClick={handleTopics}
          >
            Related topics
          </button>

          {areTopicsShown && (
            <ul
              className={cn(
                'topics-shown flex flex-col gap-6 lg:gap-8 bg-additional rounded-b-[24px] w-[100%] z-10 absolute top-[90px] left-0 p-6 pt-0 lg:pt-2'
              )}
            >
              {relatedTopics.map((topic) => (
                <a href={`/video/${generateSlug(topic)}`} key={topic}>
                  <li className="font-main text-16 lg:text-20 text-text-secondary font-semibold uppercase">
                    {topic}
                  </li>
                </a>
              ))}
            </ul>
          )}
        </article>
      </div>

      <ExploreMore type={type} isNoMargin />
    </section>
  );
};

export default CardPage;
