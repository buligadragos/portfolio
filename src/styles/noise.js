import { keyframes, css } from 'styled-components';

import GrainImage from '../images/grain.png';

const Grain = keyframes`
  0%, 100% { transform:translate(0, 0); }
  10% { transform:translate(-5%, -10%); }
  20% { transform:translate(-15%, 5%); }
  30% { transform:translate(7%, -25%); }
  40% { transform:translate(-5%, 25%); }
  50% { transform:translate(-15%, 10%); }
  60% { transform:translate(15%, 0%); }
  70% { transform:translate(0%, 15%); }
  80% { transform:translate(3%, 35%); }
  90% { transform:translate(-10%, 10%); }
`;

const Noise = css`
  body::before {
    -webkit-animation: ${Grain} 10s steps(15) infinite;
    animation: ${Grain} 10s steps(15) infinite;
    background-image: url(${GrainImage});
    content: '';
    height: 300%;
    left: -50%;
    opacity: 0.75;
    position: fixed;
    top: -110%;
    width: 300%;
  }
`;

export default Noise;
