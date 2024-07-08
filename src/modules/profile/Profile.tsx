import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { Circles } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { profileImages } from '../../helpers';
import {
  emptyUser,
  actions as userActions,
} from '../../store/reducers/userReducer';
import { updateImage, updatePassword, updateProfile } from '../../api/auth';
import { Notification } from '../notification/Notification';
import { useNotification } from '../../hooks';

interface FormOne {
  email: string;
  name: string;
}

interface FormTwo {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const initialFormTwo: FormTwo = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
};

type Submit = 'first' | 'second' | null;

export const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  const { addNotification } = useNotification();
  const dispatch = useAppDispatch();

  const initialFormOne: FormOne = {
    email: '',
    name: '',
  };

  const [formOneInput, setFormOneInput] = useState<FormOne>(initialFormOne);
  const { email, name } = formOneInput;

  const [formTwoInput, setFormTwoInput] = useState<FormTwo>(initialFormTwo);
  const { oldPassword, newPassword, repeatPassword } = formTwoInput;

  const [isSubmitting, setIsSubmitting] = useState<Submit>(null);

  const [isCameraClicked, setIsCameraClicked] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();

  const pagesContext = [
    {
      img: 'images/liked.png',
      title: 'Liked',
      icon: 'like-added',
    },
    {
      img: 'images/posted.png',
      title: 'Posted',
      icon: 'post-filled',
    },
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogOut = () => {
    dispatch(userActions.setUser(emptyUser));

    localStorage.removeItem('user');
    localStorage.removeItem('logged-in-notification');
  };

  const handleInputOne = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof FormOne
  ) => {
    setFormOneInput((input) => ({ ...input, [type]: e.target.value }));
  };

  const handleInputTwo = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof FormTwo
  ) => {
    setFormTwoInput((input) => ({ ...input, [type]: e.target.value }));
  };

  const handleRequest = async (type: 'first' | 'second') => {
    setIsSubmitting(type);
    try {
      if (type === 'first') {
        await updateProfile(formOneInput);

        addNotification('Profile data got updated', 'Success');
        return;
      }

      await updatePassword(formTwoInput);
      addNotification('Password was updated', 'Success');
    } catch {
      addNotification('Something went wrong', 'Error');
    } finally {
      setIsSubmitting(null);
    }
  };

  const setUserImage = (imageId: number) => {
    dispatch(userActions.setUserImage(imageId));
  };

  const isInputValid = (type: 'first' | 'second') => {
    if (type === 'first') {
      if (!email.trim() || !name.trim()) {
        addNotification('Enter valid data in all fields', 'Error');

        return false;
      }
    }

    if (type === 'second') {
      if (
        !oldPassword.trim() ||
        !newPassword.trim() ||
        !repeatPassword.trim()
      ) {
        addNotification('Enter valid data in all fields', 'Error');

        return false;
      }

      if (newPassword !== repeatPassword) {
        addNotification('Passwords must match', 'Error');

        return false;
      }
    }

    return true;
  };

  const handleForm = (e: React.FormEvent, type: 'first' | 'second') => {
    e.preventDefault();

    if (!isInputValid(type)) {
      return;
    }

    handleRequest(type);
    setFormOneInput(initialFormOne);
    setFormTwoInput(initialFormTwo);
  };

  const handleUserImage = async (imageId: number) => {
    try {
      await updateImage(imageId);
      setUserImage(imageId);

      addNotification('Image was updated', 'Success');
    } catch {
      <Notification title="Image could not be updated" type="Error" />;
    }
  };

  useEffect(() => {
    setFormOneInput(initialFormOne);
  }, []);

  useEffect(() => {
    setIsCameraClicked(false);
  }, [user?.imageId]);

  return (
    <section className="padding mt-10 lg:mt-20 pb-10 lg:pb-[150px]">
      <div className="mb-10 lg:mb-12 flex justify-normal items-center gap-7">
        {/* Arrow */}
        <button
          className="arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8"
          onClick={handleGoBack}
        />

        <h4 className="font-secondary text-primary text-28 lg:text-38 font-bold">
          My Profile
        </h4>
      </div>

      <div className="flex flex-col lg:flex-row gap-[72px]">
        <div className="lg:w-[50%] flex flex-col gap-[96px] lg:gap-[274px] lg:order-1">
          <div className="flex flex-col items-center gap-6 lg:gap-10">
            <h5 className="font-main text-20 lg:text-28 text-text-primary font-semibold">
              Replace photo
            </h5>
            <div className="relative">
              <img
                src={`/images/profile/profile-${user?.imageId || 1}.png`}
                alt="profile"
                className="w-40 h-40 lg:w-[200px] lg:h-[200px] rounded-full"
              />

              <button
                className="absolute -bottom-7 left-14 lg:left-[72px] flex justify-center items-center h-12 w-12 lg:h-14 lg:w-14 bg-secondary rounded-full"
                onClick={() => setIsCameraClicked(!isCameraClicked)}
              >
                <div
                  className={cn(
                    'camera h-6 lg:h-8 w-6 lg:w-8 bg-contain bg-no-repeat',
                    {
                      'camera-filled': isCameraClicked,
                    }
                  )}
                ></div>
              </button>

              {isCameraClicked && (
                <ul className="profile-images absolute left-[14px] lg:left-[unset] top-[200px] lg:top-[256px] h-fit z-50 flex flex-col gap-8 lg:gap-[50px] rounded-[24px] bg-additional p-6 lg:p-10">
                  {profileImages.map((img) => {
                    if (img !== user?.imageId) {
                      return (
                        <li>
                          <button
                            className="h-20 w-20 lg:h-[120px] lg:w-[120px] bg-contain bg-center rounded-full"
                            style={{
                              backgroundImage: `url(/images/profile/profile-${img}.png)`,
                            }}
                            onClick={() => handleUserImage(img)}
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-20 lg:gap-[134px] sm:self-center">
            {pagesContext.map((page) => (
              <a
                href={`/${page.title.toLowerCase()}`}
                className="group relative flex sm:w-[70vw] lg:w-[503px] items-center gap-6 max-w-[503px] bg-[#FEF99F] p-6 lg:p-10 rounded-[24px] cursor-pointer"
                key={page.title}
              >
                <div
                  className={`${page.icon} h-6 w-6 bg-contain bg-no-repeat`}
                />

                <h4 className="font-secondary text-28 lg:text-38 text-primary">
                  {page.title}
                </h4>

                <img
                  className="absolute bottom-10 lg:group-hover:bottom-[104px] left-0 rounded-[16px] rounded-b-none w-[100%] h-[100%] object-cover object-top -z-10 transition-all duration-300 ease-in-out"
                  src={page.img}
                  alt="page-image"
                />
              </a>
            ))}
          </div>

          {isDesktop && (
            <a
              href="/"
              className="-mt-[216px] w-[292px] font-main text-16 sm:text-20 font-semibold text-primary uppercase self-end"
              onClick={handleLogOut}
            >
              Log Out
            </a>
          )}
        </div>

        <div className="lg:w-[50%] flex flex-col gap-[90px] lg:gap-20">
          <form
            action="#"
            className="flex flex-col gap-8 lg:gap-10"
            onSubmit={(e) => handleForm(e, 'first')}
          >
            <legend className="font-main text-20 sm:text-28 font-semibold text-text-primary">
              Edit info
            </legend>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  Email
                </h5>

                <input
                  type="email"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder={'Enter your email'}
                  value={email}
                  onChange={(e) => handleInputOne(e, 'email')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  Name or Nickname
                </h5>

                <input
                  type="text"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => handleInputOne(e, 'name')}
                />
              </div>
            </div>

            <button className="flex justify-center items-center h-14 sm:h-16 max-w-[500px] lg:max-w-[292px] bg-primary rounded-[100px] font-main text-white text-16 sm:text-20 font-semibold uppercase">
              {isSubmitting === 'first' ? (
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
                'Save'
              )}
            </button>
          </form>

          <form
            action="#"
            className="flex flex-col gap-8 lg:gap-10"
            onSubmit={(e) => handleForm(e, 'second')}
          >
            <legend className="font-main text-20 sm:text-28 font-semibold text-text-primary">
              Change password
            </legend>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  Current Password
                </h5>

                <input
                  type="password"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => handleInputTwo(e, 'oldPassword')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  New Password
                </h5>

                <input
                  type="password"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => handleInputTwo(e, 'newPassword')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary">
                  Confirm Password
                </h5>

                <input
                  type="password"
                  className="pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary"
                  placeholder="Confirm new password"
                  value={repeatPassword}
                  onChange={(e) => handleInputTwo(e, 'repeatPassword')}
                />
              </div>
            </div>

            <button className="flex justify-center items-center h-14 sm:h-16 max-w-[500px] lg:max-w-[292px] bg-primary rounded-[100px] font-main text-white text-16 sm:text-20 font-semibold uppercase">
              {isSubmitting === 'second' ? (
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
                'Save'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
