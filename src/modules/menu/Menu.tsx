import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { emptyUser, actions as userActions } from '../../store/reducers/userReducer';

export const Menu = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const pages = ['grammar', 'video', 'resources'];

  const handleLogOut = () => {
    dispatch(userActions.setUser(emptyUser));

    localStorage.removeItem('user');
    localStorage.removeItem('logged-in-notification');
  };

  return (
    <aside className="menu-animation padding pt-[72px] flex flex-col justify-between absolute top-[84px] left-0 right-0 bottom-0 bg-additional z-30">
      <ul className="flex flex-col gap-10 padding-0">
        {pages.map((page) => (
          <li
            className="font-secondary text-32 sm:text-64 font-bold text-primary uppercase cursor-pointer"
            key={page}
          >
            <a className="nav-link relative" href={`/${page}`}>
              {page}
            </a>
          </li>
        ))}

        <hr className="-ml-5 sm:-ml-8 w-[100vw] h-[1px] bg-white" />

        {user?.name && (
          <a href="/profile" className="flex justify-between items-center">
            <div className="flex gap-4 sm:gap-6 items-center">
              <img
                src={`/images/profile/profile-${user?.imageId || 1}.png`}
                alt="profile"
                className="h-[52px] w-[52px] sm:h-20 sm:w-20 rounded-full object-center"
              />

              <h5 className="font-main text-20 sm:text-28 text-text-primary font-semibold">
                {user?.name}
              </h5>
            </div>

            <button className="chevron-dark h-6 w-6 bg-contain bg-no-repeat" />
          </a>
        )}
      </ul>

      <div className="mb-20 flex items-center gap-4 self-center sm:self-end sm:mr-3">
        {user?.name ? (
          <a
            href="/"
            className="font-main text-20 sm:text-28 font-semibold text-primary uppercase"
            onClick={handleLogOut}
          >
            Log Out
          </a>
        ) : (
          <>
            <a
              href="/login"
              className="font-main w-40 text-16 sm:text-20 font-semibold uppercase"
            >
              Log In
            </a>

            <a
              href="/signup"
              className="flex justify-center items-center h-12 w-40 bg-secondary rounded-[80px] font-main text-16 sm:text-20 font-semibold uppercase"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </aside>
  );
};
