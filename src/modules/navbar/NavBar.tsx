import { useMediaQuery } from 'react-responsive';
import { RefObject, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { Menu } from '../menu/Menu';
import { generateSlug, profilePopUp } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  emptyUser,
  actions as userActions,
} from '../../store/reducers/userReducer';
import { CardType, SearchCardType, searchCards } from '../../api/cards';
import { Circles } from 'react-loader-spinner';
import { useNotification } from '../../hooks';
import { actions as cardsActions } from '../../store/reducers/cardsReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from '../link/Link';

interface SearchCards {
  cards: SearchCardType[];
  loading: boolean;
}

export const NavBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const [input, setInput] = useState('');
  const [searchValues, setSearchValues] = useState<SearchCards>({
    cards: [],
    loading: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchAnimationShown, setSearchAnimationShown] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { cards, loading } = searchValues;

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const loaderSize = isMobile ? 24 : 32;
  const pages = ['grammar', 'video', 'resources'];

  const refSearchInput: RefObject<HTMLInputElement> = useRef(null);
  const refSearchResult: RefObject<HTMLInputElement> = useRef(null);

  const handleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => setIsSearchOpen(!isSearchOpen);

  // State

  const setPickedCard = (value: CardType) => {
    dispatch(cardsActions.addPickedCard(value));
  };

  // Search login

  const handleLink = (card: SearchCardType) => {
    setIsSearchOpen(false);
    setInput('');

    if (card.type === 'resources') {
      setPickedCard(card);

      navigate('/resources');
      return;
    }

    navigate(`/${card.type}/${generateSlug(card.title)}`);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isMobile) {
      return;
    }

    if (!refSearchResult.current?.contains(e.relatedTarget)) {
      setIsSearchOpen(false);
      setInput('');
      setSearchAnimationShown(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAnimationShown(true);
    setInput(e.target.value);
  };

  const handleLogOut = () => {
    dispatch(userActions.setUser(emptyUser));

    localStorage.removeItem('user');
    localStorage.removeItem('logged-in-notification');
  };

  // Lifecycle methods

  useEffect(() => {
    const handleScrolling = () => {
      isMenuOpen
        ? (document.body.style.overflowY = 'hidden')
        : (document.body.style.overflowY = 'unset');
    };

    handleScrolling();
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    refSearchInput.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const handleSearchCards = async () => {
      setSearchValues((values) => ({ ...values, loading: true }));
      try {
        const cards = (await searchCards(input.trim())).data;
        setSearchValues((values) => ({ ...values, cards: cards }));
      } catch {
        addNotification('Search failed', 'Error');
      } finally {
        setSearchValues((values) => ({ ...values, loading: false }));
      }
    };

    if (input.trim()) {
      handleSearchCards();
    }
  }, [input]);

  return (
    <div className="">
      <nav
        className="padding flex justify-between items-center h-[84px] lg:h-[104px] z-[9999]"
        style={{
          backgroundColor: isMenuOpen ? '#C8ACFD' : '#FDF00E',
        }}
      >
        <div className="flex gap-[60px] items-center">
          {/* Logo */}
          <Link path="/">
            <div className="logo h-[30px] lg:h-12 w-[100px] lg:w-40 bg-no-repeat bg-contain" />
          </Link>

          {isDesktop && (
            <ul className="flex gap-6 xl:gap-10 padding-0 items-center h-14">
              {pages.map((page) => (
                <li
                  className="font-main text-20 font-semibold uppercase cursor-pointer"
                  key={page}
                >
                  <Link className="nav-link relative pb-[14px]" path={`/${page}`}>
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-8 lg:gap-6 justify-center items-center z-[9999]">
          {/* Search */}

          {!isMenuOpen && (
            <div className="relative">
              {loading ? (
                <Circles
                  height={loaderSize}
                  width={loaderSize}
                  color="#C8ACFD"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass="mb-[6px] relative right-[100px] sm:right-[170px] lg:right-[210px]"
                  visible={true}
                />
              ) : (
                <button
                  className={cn(
                    'search h-6 sm:h-8 w-6 sm:w-8 bg-no-repeat bg-contain transition-all ease-in-out duration-500',
                    {
                      'search-icon-animation':
                        isSearchOpen && !searchAnimationShown,
                      '-translate-x-[100px] sm:-translate-x-[170px] lg:-translate-x-[210px]':
                        isSearchOpen && searchAnimationShown,
                    }
                  )}
                  onClick={handleSearch}
                />
              )}

              <div
                className={cn(
                  'absolute -bottom-2 -left-[100px] sm:-left-[170px] lg:-left-[210px]',
                  {
                    invisible: !isSearchOpen,
                  }
                )}
              >
                <input
                  type="text"
                  className="pl-7 sm:pl-9 pb-3 h-9 sm:h-11 w-[140px] sm:w-[200px] lg:w-[250px] bg-transparent border-b-[3px] border-b-additional outline-none font-main text-text-secondary text-20 lg:text-24"
                  value={input}
                  onChange={handleInput}
                  onBlur={handleBlur}
                  ref={refSearchInput}
                />
              </div>

              {input.trim() &&
                (cards?.length ? (
                  <article
                    className="flex flex-col items-center absolute -left-[130px] sm:-left-[195px] lg:-left-[260px] top-12 sm:top-14 w-[200px] sm:w-[250px] lg:w-[350px] h-fit bg-[#FEF99F] rounded-[16px]"
                    ref={refSearchResult}
                  >
                    {cards.map((card, i) => (
                      <>
                        <button
                          onClick={() => handleLink(card)}
                          className="p-4 sm:p-6 lg:p-10 flex gap-6 sm:gap-8 lg:gap-16 h-fit w-[100%] hover:bg-additional-light rounded-[16px]"
                        >
                          <img
                            className="w-10 h-10 sm:h-14 sm:w-14 rounded-[24px] object-cover border-2 border-additional"
                            src={card.imageUrl}
                            alt="search-card image"
                          />

                          <p className="font-main font-semibold text-14 sm:text-16 text-primary">
                            {card.title}
                          </p>
                        </button>

                        {i !== cards.length - 1 && (
                          <hr className="h-1 w-[90%] bg-additional" />
                        )}
                      </>
                    ))}
                  </article>
                ) : (
                  <article
                    className="p-4 sm:p-6 lg:p-10 absolute -left-[130px] sm:-left-[195px] lg:-left-[260px] top-12 sm:top-14 w-[200px] sm:w-[250px] lg:w-[350px] h-fit bg-[#FEF99F] rounded-[16px]"
                    ref={refSearchResult}
                  ></article>
                ))}
            </div>
          )}

          {isDesktop && (
            <>
              {/* Divider */}
              <div className="h-12 w-[2px] bg-[#8C8C8C]" />

              {user?.name ? (
                <>
                  <button
                    className="relative"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <img
                      src={`/images/profile/profile-${user?.imageId || 1}.png`}
                      alt="profile"
                      className="h-[52px] w-[52px] rounded-full object-center"
                    />

                    {isProfileOpen && (
                      <article className="profile-images absolute right-0 top-[100px] h-fit min-w-[503px] z-50 flex flex-col gap-8 rounded-[24px] bg-additional p-10">
                        {profilePopUp.map((link) => (
                          <Link
                            path={link.href}
                            className="flex gap-6 items-center"
                            key={link.title}
                          >
                            <div
                              className={`${link.icon} h-8 w-8 bg-contain bg-no-repeat`}
                            />
                            <h4 className="font-secondary text-28 lg:text-38 text-primary">
                              {link.title}
                            </h4>
                          </Link>
                        ))}

                        <div className="flex justify-start items-end">
                          <a
                            href="/"
                            className="mt-8 ml-12 font-main text-16 sm:text-20 font-semibold text-primary uppercase self-start"
                            onClick={handleLogOut}
                          >
                            Log Out
                          </a>

                          <div className="close absolute top-10 right-10 h-8 w-8 bg-no-repeat bg-contain" />
                        </div>
                      </article>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="font-main text-20 font-semibold uppercase"
                  >
                    Log In
                  </a>

                  <a
                    href="/signup"
                    className="flex justify-center items-center h-12 w-[126px] bg-additional rounded-[80px] font-main text-20 font-semibold uppercase"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </>
          )}

          {!isDesktop && (
            // Menu
            <button
              className={cn(
                'menu h-6 sm:h-8 w-6 sm:w-8 bg-no-repeat bg-contain',
                {
                  close: isMenuOpen,
                }
              )}
              onClick={handleMenu}
            />
          )}
        </div>
      </nav>

      {isMenuOpen && <Menu />}
    </div>
  );
};
