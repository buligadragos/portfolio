import React, { useEffect, useRef, useState } from 'react';
import { clamp, getOffsetTop } from '@utils';
import PropTypes from 'prop-types';

function ScrollAnimation({ render }) {
  const [progress, setProgress] = useState(0);
  const element = useRef();
  useEffect(() => {
    function handleScroll() {
      const $el = element.current;
      if ($el) {
        const scrollPosition = window.pageYOffset || window.scrollY;
        const topOfElement = getOffsetTop($el);
        const heightOfElement = $el.getBoundingClientRect().height;
        const menuHeight = 60;
        const progressOverElement =
          (scrollPosition - (topOfElement - menuHeight)) / heightOfElement || 0;
        const progress = clamp(progressOverElement, 0, 1);
        setProgress(progress);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [element]);

  return <div ref={element}>{render({ progress })}</div>;
}

export default ScrollAnimation;

ScrollAnimation.propTypes = {
  render: PropTypes.any,
};
