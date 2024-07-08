import cn from 'classnames';
import { useNotification } from '../../hooks';

interface Props {
  title: string;
  type: 'Success' | 'Error';
}

export const Notification: React.FC<Props> = ({ title, type }) => {
  const { removeNotification } = useNotification();

  return (
    <article
      className={cn(
        'notification-shown fixed top-20 left-0 right-0 p-6 m-auto sm:p-10 w-[80vw] sm:w-[60vw] max-w-[513px] flex flex-col gap-6 rounded-[24px] z-[100]',
        {
          'bg-[#8BC302]': type === 'Success',
          'bg-[#F2BF3D]': type === 'Error',
        }
      )
    }
    >
      <div
        className={cn(
          'h-[90px] w-[90px] bg-contain bg-no-repeat',
          {
            'notification-success': type === 'Success',
            'notification-error': type === 'Error',
          }
        )}
      />

      <div className="flex flex-col gap-2">
        <h5 className="font-main text-20 text-text-primary">{title}</h5>

        <h4 className={cn('font-secondary text-28 font-semibold', {
          'text-primary': type === 'Success',
          'text-[#FF3E14]': type === 'Error',
        })}>{type}</h4>
      </div>

      <button className='w-[40%] bg-primary pt-[10px] pb-[10px] rounded-[80px] text-16 lg:text-20 font-semibold text-white uppercase self-end' onClick={removeNotification}>Got it!</button>
    </article>
  );
};
