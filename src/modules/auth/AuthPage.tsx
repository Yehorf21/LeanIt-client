import { useState } from 'react';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { sendAuth } from '../../api/user.ts';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import {
  User,
  actions as userActions,
} from '../../store/reducers/userReducer.ts';
import { useNotification } from '../../hooks.ts';
import { authText, setLocalWithExpiry } from '../../helpers.ts';
import { Link } from '../link/Link.tsx';

interface Props {
  type: string;
}

interface Input {
  email: string;
  password: string;
  repeatPassword?: string;
}

const emptyInput = {
  email: '',
  password: '',
  repeatPassword: '',
};

export const AuthPage: React.FC<Props> = ({ type }) => {
  const [passwordShown, setIsPasswordShown] = useState<1 | 2 | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState<Input>(emptyInput);

  const dispatch = useAppDispatch();
  const { addNotification } = useNotification();

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const { email, password, repeatPassword } = input;

  const authType = type === 'signup' ? 'Sign Up' : 'Login';
  const bg = type === 'login' ? '#FDF00E' : '#C8ACFD';

  // State

  const addUser = (user: User) => {
    dispatch(userActions.setUser(user));
  };

  // Navigation

  const handleGoBack = () => {
    navigate(-1);
  };

  // Form logic

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof Input
  ) => {
    setInput((data) => ({ ...data, [type]: e.target.value }));
  };

  const handleAuth = async () => {
    const authType = type === 'signup' ? 'registration' : 'login';

    setIsSubmitting(true);
    try {
      const user = await sendAuth(authType, input);

      if (authType === 'registration') {
        addNotification('You signed up!', 'Success');

        navigate('/login');
        return;
      }

      if (authType === 'login') {
        addUser(user.data);
        setLocalWithExpiry('user', user.data.token, 3600000);
      }

      window.open('/', '_self');

      setInput(emptyInput);
    } catch (e) {
      addNotification(e.response.data.message, 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isInputValid = () => {
    if (!email.trim() || !password.trim()) {
      addNotification('Enter valid data in all fields', 'Error');

      return false;
    }

    if (type === 'signup') {
      if (!repeatPassword) {
        addNotification('Enter valid data in all fields', 'Error');

        return false;
      }

      if (password.trim().length < 8) {
        addNotification('Password is too short', 'Error');

        return false;
      }

      if (password !== repeatPassword) {
        addNotification('Passwords must match', 'Error');

        return false;
      }
    }

    return true;
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isInputValid()) {
      return;
    }

    handleAuth();
  };

  return (
    <section
      className="sm:my-16 lg:my-14 flex justify-center lg:justify-between padding"
      style={{
        backgroundColor: isMobile ? bg : '#EEE6FE',
      }}
    >
      <img
        src={`images/${type}.png`}
        alt={`${type} image`}
        className="relative top-[45px] hidden lg:block object-contain h-[90vh] w-[50vw] max-h-[850px] max-w-[630px]"
      />

      <article
        className="min-w-[90vw] sm:min-w-[unset] w-[75vw] lg:w-[50vw] max-w-[608px] h-max sm:px-8 sm:rounded-[24px]"
        style={{
          backgroundColor: bg,
        }}
      >
        <div className="flex pt-[17px] pb-[17px] sm:pt-6 sm:pb-6 justify-between items-center">
          {!isMobile && (
            <button
              className="arrow-left h-6 w-6 bg-contain bg-no-repeat"
              onClick={handleGoBack}
            />
          )}

          <Link path="/">
            <div className="logo h-[30px] sm:h-12 w-[100px] sm:w-40 bg-no-repeat bg-contain" />
          </Link>

          {isMobile && (
            <Link
              path="/"
              className="close h-6 sm:h-8 w-6 sm:w-8 bg-no-repeat bg-contain"
            />
          )}
        </div>

        <form
          action="#"
          className="pt-5 pb-4 sm:pb-8 sm:pt-0 flex flex-col gap-6 sm:gap-10"
          onSubmit={handleForm}
        >
          <h3 className="font-secondary text-32 sm:text-38 font-bold text-primary text-center uppercase">
            {authType}
          </h3>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="mb-2 sm:mb-[14px] flex flex-col gap-2">
              <p className="font-main text-14 sm:text-16 text-text-primary">
                Hey there!
                <br />
                <br />
                {type === 'login' ? authText.login : authText.signup}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                Email
              </h5>

              <input
                type="email"
                className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleInput(e, 'email')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                Password
              </h5>

              <label className="relative">
                <input
                  type={passwordShown === 1 ? 'text' : 'password'}
                  id="password"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] w-[100%] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => handleInput(e, 'password')}
                />

                <button
                  className={cn(
                    'absolute top-[17px] sm:top-6 right-6 sm:right-[30px] password h-6 w-6 bg-contain bg-center',
                    {
                      'password-close': passwordShown === 1,
                    }
                  )}
                  onClick={() =>
                    setIsPasswordShown(passwordShown === 1 ? null : 1)
                  }
                  type="button"
                />
              </label>
            </div>

            {type === 'signup' && (
              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  Confirm password
                </h5>

                <label className="relative">
                  <input
                    type={passwordShown === 2 ? 'text' : 'password'}
                    id="chech-password"
                    className="pt-[15px] pb-[15px] px-6 sm:px-[30px] w-[100%] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                    placeholder="Repeat your password"
                    value={repeatPassword}
                    onChange={(e) => handleInput(e, 'repeatPassword')}
                  />

                  <button
                    className={cn(
                      'absolute top-[17px] sm:top-6 right-6 sm:right-[30px] password h-6 w-6 bg-contain bg-center',
                      {
                        'password-close': passwordShown === 2,
                      }
                    )}
                    onClick={() =>
                      setIsPasswordShown(passwordShown === 2 ? null : 2)
                    }
                    type="button"
                  />
                </label>
              </div>
            )}

            <button className="mt-4 sm:mt-6 h-14 sm:h-16 flex justify-center items-center bg-primary rounded-[100px] font-main text-white text-16 sm:text-20 font-semibold uppercase">
              {isSubmitting ? (
                <Circles
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                authType
              )}
            </button>

            <div className="flex gap-1 self-center">
              <>
                <p className="font-main text-16 sm:text-24 text-text-secondary">
                  {type === 'signup'
                    ? 'Already have a profile?'
                    : 'No profile?'}
                </p>

                <Link
                  path={type === 'login' ? '/signup' : '/login'}
                  className="font-main text-16 sm:text-24 text-[#237AE0]"
                >
                  {type === 'signup' ? 'Log in' : 'Sign Up'}
                </Link>
              </>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
};

export default AuthPage;
