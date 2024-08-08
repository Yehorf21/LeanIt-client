import { Suspense, lazy, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import {
  fetchLikedArticles,
  User,
  actions as userActions,
} from './store/reducers/userReducer.ts';

import { NavBar } from './modules/navbar/NavBar.tsx';
import { Footer } from './modules/footer/Footer.tsx';

import { Loader } from './modules/loader/Loader.tsx';

const AuthPage = lazy(() => import('./modules/auth/AuthPage.tsx'));

const Home = lazy(() => import('./modules/home/Home.tsx'));

const CardsGrid = lazy(() => import('./modules/cards/CardsGrid.tsx'));

const ResourcesPage = lazy(
  () => import('./modules/resources/ResourcesPage.tsx')
);

const CardPage = lazy(() => import('./modules/cards/CardPage.tsx'));

const Profile = lazy(() => import('./modules/profile/Profile.tsx'));

import { NotFound } from './modules/notfound/NotFound.tsx';

import './App.css';
import { useMediaQuery } from 'react-responsive';
import { Notification } from './modules/notification/Notification.tsx';
import { getLiked, getProfile, LikedArticle } from './api/user.ts';
import { useNotification } from './hooks.ts';
import { getLocalWithExpiry, setLocalWithExpiry } from './helpers.ts';

/*

  Checked components:

  - AuthPage
  - Explore More
  - Flashcard (add anki)
  - Footer
  - Home
  - Loader
  - Menu
  - NavBar
  - NotFound
  - Notification
  - Profile
  - ResourcesPage
  - 

  To check:

  - Card
  - CardPage
  - CardsGrid

  TO DO:
  
  * Add image to empty liked

  * Add logic for adding / removing liked

  * Name and email not showing
  
*/

function App() {
  const { user, notification } = useAppSelector((state) => state.user);
  const { title, type } = notification;

  const dispatch = useAppDispatch();
  const { addNotification } = useNotification();

  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const mainCardsPages = ['Grammar', 'Video'];

  const noFooterPages = ['/login', '/signup', '/profile'];
  const noNavBarPages = ['/login', '/signup'];

  const isNoFooter = noFooterPages.find((e) => e === location.pathname);
  const isNoNavBar = noNavBarPages.find((e) => e === location.pathname);

  const authTypes: ('login' | 'signup')[] = ['login', 'signup'];

  const addUser = (user: User) => {
    dispatch(userActions.setUser(user));
  };

  const getBodyBg = (path: string) => {
    if (path === '/') {
      return '#FFFFFF';
    } else if (path === '/login' && isMobile) {
      return '#FDF00E';
    } else if (path === '/signup' && isMobile) {
      return '#C8ACFD';
    }

    return '#EEE6FE';
  };

  const changeBodyColor = (color: string) => {
    document.body.style.backgroundColor = color;
  };

  useEffect(() => {
    changeBodyColor(getBodyBg(pathname));
  }, [pathname]);

  useEffect(() => {
    const isLoggedIn = getLocalWithExpiry('user');

    const fetchUser = async () => {
      const fetchedUser = (await getProfile()).data;
      if (isLoggedIn) {
        addUser(fetchedUser);
      }
    };

    fetchUser();
  }, []);

  // solves the problem of not displaying the logged-in notification correctly after page reloads when user logs in
  useEffect(() => {
    const isLoggedIn = getLocalWithExpiry('user');
    const wasLoggedInShown = getLocalWithExpiry('logged-in-notification');

    if (!wasLoggedInShown && isLoggedIn) {
      addNotification('You logged in!', 'Success');
      setLocalWithExpiry('logged-in-notification', 'shown', 3600000);
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = getLocalWithExpiry('user');

    if (!isLoggedIn && pathname === '/liked') {
      navigate('/blocked');
    }
  }, [user.name]);

  useEffect(() => {
    const isLoggedIn = getLocalWithExpiry('user');

    if (isLoggedIn) {
      dispatch(fetchLikedArticles());
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <header>
        {!isNoNavBar && <NavBar />}
        {title && <Notification title={title} type={type} />}
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />

              <Route path="home" element={<Navigate to="/" />} />

              {authTypes.map((type) => (
                <Route
                  key={type}
                  path={type}
                  element={<AuthPage type={type} />}
                />
              ))}

              <Route path="profile" element={<Profile />} />

              {mainCardsPages.map((cardsPage) => (
                <Route path={cardsPage.toLowerCase()} key={cardsPage}>
                  <Route index element={<CardsGrid title={cardsPage} />} />

                  <Route
                    path=":cardId"
                    element={<CardPage type={cardsPage.toLowerCase()} />}
                  />
                </Route>
              ))}

              <Route path="resources" element={<ResourcesPage />} />

              <Route path="liked" element={<CardsGrid title="Liked" />} />

              <Route
                path="posted"
                element={<NotFound type="inDevelopment" />}
              />
            </Route>

            <Route path="blocked" element={<NotFound type="notLoggedIn" />} />

            <Route path="*" element={<NotFound type="nonExistent" />} />
          </Routes>
        </Suspense>
      </main>

      <footer>{!isNoFooter && <Footer />}</footer>
    </div>
  );
}

export default App;
