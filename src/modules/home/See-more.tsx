import { Card } from '../cards/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tooltip } from 'react-tooltip';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { EffectCube, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { CardType, CardTypes, getCards } from '../../api/cards';
import { useMediaQuery } from 'react-responsive';
import { useNotification } from '../../hooks';

interface CubeCards {
  grammar: CardType[];
  video: CardType[];
  resources: CardType[];
}

const initialCubeState: CubeCards = {
  grammar: [],
  video: [],
  resources: [],
};

export const SeeMore = () => {
  const [isShown, setIsShown] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { addNotification } = useNotification();

  const [cubeCards, setCubeCards] = useState(initialCubeState);

  const pages: CardTypes[] = ['grammar', 'video', 'resources'];
  const mobileCubes = isMobile ? 1 : undefined;

  const cardSettings = {
    bgColor: '#EEE6FE',
    hasButton: true,
  };

  const handleHover = () => {
    setTimeout(() => {
      setIsShown(false);
    }, 3000);
  };

  // for mobile and tablet users
  const handleClick = () => {
    setTimeout(() => {
      setIsShown(false);
    }, 5000);
  };

  const fetchCards = async () => {
    try {
      for (const category of pages) {
        const fetchedCards = (await getCards(category, 0, mobileCubes)).data
          .content;
        console.log(fetchedCards);

        setCubeCards((cards) => {
          return { ...cards, [category]: fetchedCards };
        });
      }
    } catch {
      addNotification('Cube cards could not get fetched', 'Error');
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <section className="margin-top padding mb-[100px] flex flex-col gap-6 lg:gap-10">
      <h4 className="font-secondary text-28 lg:text-38 font-semibold text-primary">
        Check this out
      </h4>

      {isShown && <Tooltip id="cube" className="tooltip" />}

      <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-10 sm:gap-[100px] lg:gap-0 justify-center lg:ml-[60px] desktop:ml-20">
        {pages.map((category) => {
          // On mobile, there's no cube effect
          if (cubeCards[category]?.length) {
            return isMobile ? (
              <Card
                card={cubeCards[category][0]}
                settings={cardSettings}
                key={category}
              />
            ) : (
              <Swiper
                effect={'cube'}
                grabCursor={true}
                cubeEffect={{
                  shadow: false,
                  slideShadows: false,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                modules={[EffectCube, Pagination]}
                autoplay={true}
                className="mySwiperCards"
                key={category}
                loop={true}
              >
                {cubeCards[category].map((card, index) => (
                  <SwiperSlide
                    data-tooltip-id="cube"
                    data-tooltip-content="Swipe right"
                    onMouseEnter={handleHover}
                    onClick={handleClick}
                    key={card.id}
                  >
                    <Card
                      card={cubeCards[category][index]}
                      settings={cardSettings}
                      key={category}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            );
          }
        })}
      </div>
    </section>
  );
};
