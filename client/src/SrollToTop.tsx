import { useEffect } from "react";
import { useLocation } from "react-router";
//import ReactGA from 'react-ga4';

const ScrollToTop = (props: any) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

//   useEffect(() => {
//     ReactGA.set({ page: location.pathname });
//     ReactGA.pageview(location.pathname);
//   }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;