import reactIcon from '../assets/images/technology/react-tech-icon.png';
import npmIcon from '../assets/images/technology/npm-tech-icon.png';
import awsIcon from '../assets/images/technology/aws-tech-icon.png';
import nodejsIcon from '../assets/images/technology/nodejs-tech-icon.png';
import pythonIcon from '../assets/images/technology/python-tech-icon.png';

export const technologies = [
  {
    id: 'nodejs',
    name: 'node',
    fontColor: '#3C873A',
    fontWeight: '900',
    firstLogo: nodejsIcon,
    backgroundImage: nodejsIcon,
    description: 'A majority of my backend and overall engineering background is using javascript (ECMA6+) and nodejs. NodeJS is a great tool for building out API\'s and other related work.'
  },
  {
    id: 'aws',
    name: 'aws',
    font: 'Lato sans-serif',
    fontWeight: '900',
    fontColor: '#FF9900',
    fontSize: '1.2em',
    firstLogo: awsIcon,
    backgroundImage: awsIcon,
    description: 'AWS is my prefered cloud provider for sure. I really enjoy learning more and more about AWS as I use more and more services. I genuinely enjoy using it and learning more!'
  },
  {
    id: 'npm',
    name: 'npm',
    fontColor: '#CC3534',
    fontWeight: '900',
    firstLogo: npmIcon,
    backgroundImage: npmIcon,
    description: 'Node Package Manager, lets all be grateful for npm.'
  },
  {
    id: 'react',
    name: 'react',
    fontColor: '#61DBFB',
    fontWeight: '600',
    firstLogo: reactIcon,
    backgroundImage: reactIcon,
    description: 'React is by far my front end framework of choice. It truly puts back the programming into front-end, opposed to back in the day using jQuery... I am very grateful for React.'
  },
  {
    id: 'python',
    name: 'python',
    fontColor: '#306998',
    fontWeight: '600',
    firstLogo: pythonIcon,
    backgroundImage: pythonIcon,
    description: '(3.8) I don\'t have too much experience with Python, but I really believe in being a polyglot engineer and solving problems with the best solutions. For things like ETL, Machine Learning, AI..etc Python is a great tool!'
  }
];