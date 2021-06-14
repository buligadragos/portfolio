import { useState, useEffect } from 'react';
const _ = require('lodash');

export default function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = _.debounce(() => {
      setWindowDimensions(getWindowDimensions());
    }, 300);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasWindow]);

  return windowDimensions;

}
