import { useLocation } from 'react-router-dom';

const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    return { label: value.charAt(0).toUpperCase() + value.slice(1), path };
  });
};

export default useBreadcrumbs;
