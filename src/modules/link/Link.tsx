import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  path: string;
  className?: string;
  children?: ReactNode;
}

export const Link: React.FC<Props> = ({ path, className, children = null }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigate(path);
    window.scrollTo(0, 0);
  };
  return (
    <a href={path} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
