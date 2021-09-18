import { useEffect } from 'react';

// We are excluding this from loading at build time in gatsby-node.js
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, Power1, Power0 } from 'gsap';

const scroll = {
  // Locomotive Scroll
  // https://github.com/locomotivemtl/locomotive-scroll#instance-options
  container: '#___gatsby',
  options: {
    smooth: true,
    smoothMobile: false,
    getDirection: true,
    touchMultiplier: 2.5,
    lerp: 0.1,
  },
};

const Scroll = callbacks => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector(scroll.container),
      ...scroll.options,
    });

    setTimeout(function() {
      locomotiveScroll.update();
    }, 100);

    // Exposing to the global scope for ease of use.
    window.scroll = locomotiveScroll;

    locomotiveScroll.on('scroll', ScrollTrigger.update);
    locomotiveScroll.on('scroll', func => {
      // Update `data-direction` with scroll direction.
      document.documentElement.setAttribute('data-direction', func.direction);
    });

    ScrollTrigger.scrollerProxy(scroll.container, {
      scrollTop(value) {
        return arguments.length
          ? locomotiveScroll.scrollTo(value, 0, 0)
          : locomotiveScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(scroll.container).style.transform ? 'transform' : 'fixed',
    });

    //ADD HERE
    const DOM = {
      scrollbar: document.querySelector('#scrollbar'),
      nav: document.querySelector('#nav-bar'),
      social: document.querySelector('#social'),
      hero: document.querySelector('#hero'),
    };

    gsap.to(
      [DOM.nav, DOM.social, DOM.hero],
      {
        duration: 0.9,
        ease: 'back.out',
        startAt: { opacity: 0, scale: 1.2 },
        scale: 1,
        opacity: 1,
        delay: -0.5,
      },
      'a',
    );

    //SCROLLBAR:
    gsap.from(scroll.container, {
      scrollTrigger: {
        trigger: scroll.container,
        scroller: scroll.container,
        scrub: true,
        markers: false,
        start: 'top',
        end: 'bottom bottom',
        onUpdate: self => {
          gsap.to(DOM.scrollbar, {
            scaleY: self.progress.toFixed(3),
            ease: Power0.easeOut,
            transformOrigin: 'top center',
          });
        },
      },
    });

    gsap.set('#dragos .letter', { opacity: 1 });
    gsap.set('#buliga .letter', { opacity: 1 });
    gsap.set('#bar_top', { scaleX: 0, transformOrigin: 'left' });
    gsap.set('#bar_bottom', { scaleX: 0, transformOrigin: 'right' });
    gsap.set('#B_masked', { x: -20, transformOrigin: 'left' });
    gsap.set('#D_masked', { x: 20, transformOrigin: 'right' });

    const tl = gsap.timeline({
      paused: true,
      delay: 1,
      markers: true,
      scrollTrigger: {
        trigger: '#logo',
        scroller: scroll.container,
        scrub: false,
        start: 'top -64',
        end: 99999,
        onUpdate: ({ direction, isActive }) => {
          if (direction === -1 && isActive === false) {
            tl.reverse();
          }
          if (direction === 1 && isActive === false) {
            tl.play();
          } else if (direction === 1 && isActive === true) {
            tl.play();
          }
        },
      },
    });

    tl.to('#bar_top', { duration: 0.5, scaleX: 1, ease: Power1.easeInOut }, 'a')
      .to('#bar_bottom', { duration: 0.5, scaleX: 1, ease: Power1.easeInOut }, 'a')
      .to(
        '#buliga .letter',
        { duration: 0.1, opacity: 0, stagger: 0.075, ease: Power1.easeInOut },
        'a',
      )
      .to(
        '#dragos .letter',
        { duration: 0.1, opacity: 0, stagger: 0.075, ease: Power1.easeInOut },
        'a',
      )
      .to('#bar_top', { duration: 0.5, x: 20, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#bar_bottom', { duration: 0.5, x: -20, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#B_masked', { duration: 0.5, x: 0, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#D_masked', { duration: 0.5, x: 0, ease: Power1.easeInOut }, `b-=${0.2}`)
      .to('#bar_top', { duration: 0.5, x: 49, scaleX: 0.26, ease: Power1.easeInOut }, `c-=${0.1}`)
      .to(
        '#bar_bottom',
        { duration: 0.5, x: -49, scaleX: 0.26, ease: Power1.easeInOut },
        `c-=${0.1}`,
      )
      .to('#B_masked', { duration: 0.5, x: 34, ease: Power1.easeInOut }, `c-=${0.1}`)
      .to('#D_masked', { duration: 0.5, x: -34, ease: Power1.easeInOut }, `c-=${0.1}`);

    const lsUpdate = () => {
      if (locomotiveScroll) {
        locomotiveScroll.update();
      }
    };

    ScrollTrigger.addEventListener('refresh', lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      if (locomotiveScroll) {
        ScrollTrigger.removeEventListener('refresh', lsUpdate);
        locomotiveScroll.destroy();
        tl.kill();
        ScrollTrigger.refresh();
        gsap.set('#bar_bottom', { clearProps: 'all' });
        gsap.set('#bar_top', { clearProps: 'all' });
      }
    };
  }, [callbacks]);

  return null;
};

export default Scroll;
