export const projects = [
  {
    title: "simple-fs",
    key: '1',
    stack: [
      "npm"
    ],
    externals: 'https://www.npmjs.com/package/@npmpackageschicago/simple-fs',
    description: 'Just a simple fs repo that helps using the fs system with promises and more functionality. Meant to be built upon over time.'
  },
  {
    title: "serverless-generator",
    key: '2',
    stack: [
      "npm"
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
    description: 'Built a series of microservices using nodejs and serverless framework as IaC that assisted in the contracting of products to customers. Heavily utilized MVC and pub/sub design patterns.'
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
    title: 'Infusion Squad',
    key: '6',
    stack: [
      "nodejs",
      "aws"
    ],
    externals: 'https://www.amazon.com/Bioverativ-Infusion-Squad/dp/B07N395L84',
    description: 'Interactive Alexa app to help the Hemophilia community, specifically children. It provides a way to interact and obtain information for patients and their care givers about their existing condition and the overall infusion process.'
  },
  {
    title: 'react-barebondes-modal',
    key: '7',
    stack: [
      "npm",
      "react"
    ],
    externals: 'https://www.npmjs.com/package/react-barebones-modal',
    description: 'Simple react barebones modal component.'
  },
  {
    title: 'react-lightbox-slider',
    key: '8',
    stack: [
      "npm",
      "react"
    ],
    externals: 'https://www.npmjs.com/package/react-barebones-modal',
    description: 'React component that is a image slider and shows a lightbox if you click on an image.'
  },
  {
    title: 'Authentication Microservice',
    key: '9',
    stack: [
      "nodejs",
      "aws"
    ],
    externals: 'cognito-auth-flow.pdf',
    description: 'Microservice to handle login across all applications. Built to allow multiple forms of login including: email/pw, SSO w/ Federated Identities, and SMS passwordless login.'
  },
  {
    title: 'Notification Microservice',
    key: '10',
    stack: [
      "nodejs",
      "aws"
    ],
    externals: [],
    description: 'Microservice for in-house use to deliver notifications using email or sms message. Utilized AWS SES and Twilio.'
  },
  {
    title: 'Alexa Analytics Miner',
    key: '11',
    stack: [
      "nodejs",
      "react",
      "aws"
    ],
    externals: 'alexa-miner-project.pdf',
    description: 'Fun tool that enabled users to use an Alexa right from their browser. Record a question, and send it off to Alexa. Our process parsed the result, sent it through transcribe and stored the text result in DynamoDB.'
  },
  {
    title: 'Eloctate',
    key: '12',
    stack: [
      "react"
    ],
    externals: 'https://www.eloctate.com/',
    description: 'Eloctate is a medicine aimed to help people with Hemophilia A. It is a branch of Bioverativ (Sanofi). This website was developed to help people with Hemophilia A by getting them resources they need.'
  },
  {
    title: 'Alprolix',
    key: '13',
    stack: [
      "react"
    ],
    externals: 'https://www.alprolix.com/',
    description: 'Alprolix is a medicine aimed to help people with Hemophilia B. It is a branch of Bioverativ (Sanofi). This website was developed to help people with Hemophilia B by getting them resources they need.'
  }
]