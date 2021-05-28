module.exports = {
  email: 'hello@buligadragos.ro',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/buligadragos',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/buliga.dragos',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/buliga-dragos',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/BuligaDr',
    },
  ],

  colors: {
    accent: '#C7434E',
    dark: '#111216',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
