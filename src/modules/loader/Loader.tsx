import { Comment } from 'react-loader-spinner';
import { useResponsiveValues } from '../../hooks';

export const Loader = () => {
  const { getResponsiveValue } = useResponsiveValues();

  const size = getResponsiveValue('80', '160', '320');

  return (
    <div className="flex justify-center items-center h-[80vh] w-[100vw]">
      <Comment
        visible={true}
        height={size}
        width={size}
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#C8ACFD"
      />
    </div>
  );
};
