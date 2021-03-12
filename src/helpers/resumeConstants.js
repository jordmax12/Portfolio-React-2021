import nextcrewIcon from '../assets/images/logos/nextcrew-logo.jpg';
import newserIcon from '../assets/images/logos/newser-logo.png';
import fcbIcon from '../assets/images/logos/fcb-logo.jpg';
import syngentaIcon from '../assets/images/logos/syngenta-logo.png';

export const resume = [
    {
        title: "Nextcrew",
        name: "Nextcrew",
        id: "nextcrew",
        key: '1',
        stack: [
        "csharp",
        "javascript"
        ],
        externals: 'https://nextcrew.com',
        position: "Junior Software Engineer",
        background: "nextcrew.jpg",
        firstLogo: nextcrewIcon,
        backgroundImage: nextcrewIcon,
        duration: 'February 2015 - May 2016',
        description: 'As a junior developer working directly under the CTO, I was able to get more responsibility than your average junior/entry level engineer. I had the opportunity to build out 3rd party integrations using ASP.NET, a mobile app using Cordova that was launched on the App store and Google Play store as well ad revamp their mobile and desktop website to be responsive using HTML5 and CSS.'
    },
    {
        title: "Newser",
        name: "Newser",
        id: "newser",
        key: '2',
        stack: [
          "csharp",
          "javascript",
          "xamarin",
          "msql"
        ],
        externals: 'https://newser.com',
        position: "Software Engineer",
        background: "newser.jpg",
        firstLogo: newserIcon,
        backgroundImage: newserIcon,
        duration: "May 2016 - July 2017",
        description: 'Again, working directly under the CTO I was able to wear a lot of hats. I successfully built out a mobile app using the Xamarin framework. This was able to be ported using C# code into both native iOS and Androtitle apps. I was also built out our mobile website using Bootstrap, and worked heavily on the desktop website.'
      },
      {
        title: "FCB Chicago",
        name: "FCB Chicago",
        id: "fcb",
        key: '3',
        stack: [
          "nodejs",
          "reactjs",
          "graphql",
          "aws",
          "mysql"
        ],
        externals: 'https://fcbnorthamerica.com',
        position: "Software Engineer",
        background: "fcb.jpg",
        firstLogo: fcbIcon,
        backgroundImage: fcbIcon,
        duration: "July 2017 - July 2019",
        description: 'FCB is an ad agency, which gave me the opportunity to get my feet wet with consulting. I also jumped into the nodejs world at FCB, and built a lot of client work and internal tools for our vtitleeo editors, designers and UI/UX engineers. Along with that, I got to work with brand new technologies and cloud services. Specifically building out microservices using AWS SageMaker, Azure Computer Vision and Google Vtitleeo Intelligence to facilitate in an ETL process.'
      },
      {
        title: "Syngenta",
        name: "Syngenta",
        id: "syngenta",
        key: '4',
        stack: [
          "nodejs",
          "reactjs",
          "serverless",
          "aws",
          "python",
          "dynamodb",
          "mysql",
          "postgres",
          "neo4j"
        ],
        externals: 'https://www.syngenta.com/en',
        position: "Senior Software Engineer",
        background: "syngenta.jpg",
        firstLogo: syngentaIcon,
        backgroundImage: syngentaIcon,
        duration: "July 2019 - Present",
        description: 'At Syngenta I took less of a front end role, and took on a lot more dev ops responsibilities. Primarily dealing with backend and infrastructure using nodejs, python, aws and the serverless framework. I successully built out a portfolio of microservices facilitating in: seed contracting, authentication using AWS Cognito with passwordless login and SSO integrations, notifcation service using Twilio and AWS SES, and many more. I often utilized a publisher/subscriber design pattern using AWS SQS and SNS. I also got the opportunity to build out a complete ETL pipeline using python and got to work with new serverless resources like AWS Athena and Glue.'
      }
  ]