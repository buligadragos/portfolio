import React from 'react';
import PropTypes from 'prop-types';
import {
  IconTemperature,
  IconFacebook,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconPlayStore,
  IconLocation,
  IconTwitter,
  IconZap,
  IconContact,
  IconHome,
  IconArchive,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'Archive':
      return <IconArchive />;
    case 'Temperature':
      return <IconTemperature />;
    case 'Facebook':
      return <IconFacebook />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Location':
      return <IconLocation />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Zap':
      return <IconZap />;
    case 'Contact':
      return <IconContact />;
    case 'Home':
      return <IconHome />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
