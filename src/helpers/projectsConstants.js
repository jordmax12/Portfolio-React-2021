import reactIcon from '../assets/images/technology/react-tech-icon.png';
import npmIcon from '../assets/images/technology/npm-tech-icon.png';
import awsIcon from '../assets/images/technology/aws-tech-icon.png';
import nodejsIcon from '../assets/images/technology/nodejs-tech-icon.png';
import pythonIcon from '../assets/images/technology/python-tech-icon.png';

export const technologies = [
  {
    id: 'nodejs',
    name: 'NodeJS',
    firstLogo: nodejsIcon,
    backgroundImage: nodejsIcon,
    description: `I have the most as well as recent experience in React compared to other technology in my list. I have created and architected web projects from scratch as well as jumped on ongoing projects.
    <br/><br/>I am familiar with recent techniques and libraries used in react like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, css in js, etc.`,
    projects: ['snapteam', 'nykaa', 'wakency'],
  },
  {
    id: 'aws',
    name: 'AWS',
    firstLogo: awsIcon,
    backgroundImage: awsIcon, //but recently have not touched on Android development so have to freshen up a bit on it.
    description: `I started my development journey with Android and have the most experience in it along with React.<br/><br/>
    I have complete lifecycle experience on Android app developement from creating to publishing and managing, and have experience with needed android libraries which includes: Retrofit, Dagger, Picasso, ActiveAndroid, etc.`,
    projects: ['vc_music_player', 'measure']
  },
  {
    id: 'npm',
    name: 'NPM',
    firstLogo: npmIcon,
    backgroundImage: npmIcon,
    description: `I have created and published a React-Native app for iOS and Android so i am familiar with its lifecycle, while working with React-Native CLI.<br/><br/>
    I have contributed some bug fixes to some open source React-Native libraries during my period developing on react native.
    `,
    projects: ['lighthouse', 'pulse']
  },
  {
    id: 'react',
    name: 'React',
    firstLogo: reactIcon,
    backgroundImage: reactIcon,
    description: `I have a bit of experience in Laravel and backend development although have not created any project from scratch but have worked on seperate modules and features.<br/><br/>
    I am familiar with backend development and the frameworks features like: MVC architecture, HTML template engine (blade), Eloquent ORM, Artisan and Seeders.`,
    projects: ['benefactory', 'snapteam']
  },
  {
    id: 'python',
    name: 'Python',
    firstLogo: pythonIcon,
    backgroundImage: pythonIcon,
    description: 'I have experience in creating an electron app with the help of React while also considering platform specific technicalities during development like, Desktop/Web notifications, screen routing, storage.<br/><br/>Written configurations to bundle Web app and Electron app seperatly for both.',
    projects: ['snapteam']
  }
];

export const projects = [
  {
    title: "simple-fs",
    key: '1',
    stack: [
      "npm",
      "nodejs"
    ],
    externals: 'https://www.npmjs.com/package/@npmpackageschicago/simple-fs',
    description: 'Just a simple fs repo that helps using the fs system with promises and more functionality. Meant to be built upon over time.'
  },
  {
    title: "serverless-generator",
    key: '2',
    stack: [
      "npm",
      "nodejs",
      "aws"
    ],
    externals: 'https://www.npmjs.com/package/@npmpackageschicago/serverless-generator',
    description: 'CLI tool that prompts the user to select the options they desire, and we do all the setup work for you. Create as many resources as you like. Currently supports: Elasticsearch, DynamoDB, SQS, SNS, S3, ApiGateway, RDS MySQL and RDS Postgres.'
  },
  {
    title: "enogen",
    key: '3',
    stack: [
      "aws",
      "nodejs"
    ],
    externals: 'enogen.pdf',
    description: 'Built a series of microservices which services multiple applications interacting with modularized api\'s. This was a product being used by a multitude of our teams and is involved with millions of dollars of transactions a year.'
  },
  {
    title: "databus ETL",
    key: '4',
    stack: [
      "python",
      "aws"
    ],
    externals: 'databus.pdf',
    description: 'ETL pipeline built with python. This project was fun because I\'ve never used Python before so this was a learning experience, but in a fun way. Also got to experiment with new AWS services such as Glue and Athena to query raw S3 data.'
  },
  {
    title: "agriedge",
    key: '5',
    stack: [
      "nodejs",
      "react"
    ],
    externals: [
      'agriedge.pdf'
    ],
    description: 'Web based API and React app designed to help sales reps and growers figure out how to get the most rebate out of their purchases, designed specifically to look at soil conditions, weather patterns..etc to recommend the best product.'
  },
  {
    title: 'FCB AI',
    key: '6',
    stack: [
      "nodejs"
    ],
    externals: [
      
    ],
    description: 'Collection of small independent services that analyzed, tagged and retrieved metadata for an array of different media types using various intelligent machine learning API\'s such as: Google, AWS and Microsoft.'
  }
]