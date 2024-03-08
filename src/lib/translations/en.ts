import type { BaseTranslation } from './loadTranslations'

export const translationEN: BaseTranslation = {
  seo: {
    description:
      'Martin Kollár - a web developer focused on innovation and creativity. An overview of my experience with programming, projects, and skills in the field of web development.',
    keywords:
      'Martin Kollar, Web Developer, Programmer, Programming Skills, Project Management, Full Stack Developer, Software Engineering, Web Design, User Experience, Frontend Development, Backend Development, Application Development, Coding Projects',
  },
  navbar: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    contact: 'Contact',
  },
  home: {
    title: 'Home',
    description: 'Welcome to the home page',
  },
  about: {
    title: 'About',
    description: 'Welcome to the about page',
    timeline: {
      title: 'Timeline',
      sections: [
        {
          title: 'First lines of code',
          year: 2019,
          description:
            'In 2019, I started programming for the first time and learned the basics of programming in Python. After entering high school, I started to devote myself intensively to programming and web development.',
        },
        {
          title: 'Started coding consistently',
          description:
            'Experimented with multiple languages, game engines, and frameworks. Started exploring ways to make my code cleaner and efficient.',
          year: 2021,
        },
        {
          title: 'Got Job at Binary Confidence s.r.o.',
          description:
            'Got my first job as a backend developer in Binary Confidence s.r.o. Worked with technologies such as Ansible, Hyper-V, Linux, etc..  Met with new concepts, technologies, interesting projects, and great people, furthering my knowledge. ',
          year: 2023,
        },
        {
          title: 'Graduated highschool',
          description:
            'For my graduation project I worked on my own first large-scale fullstack web application. I learned a lot about web development, and I was able to apply my knowledge in a real-world project. I also learned a lot about project architecture, cloud and deployment. ',
          year: 2024,
        },
      ],
    },
    interestsAndHobbies: {
      title: 'Interests and hobbies',
      description:
        'In my free time, I workout at the gym, but I also like to play any other sport with my friends. I am also learning to play the guitar. I am interested in new technologies, be it in the field of programming, robotics or rocket science and I like to learn new things.',
    },
  },
  skills: {
    title: 'Skills',
    description: 'Welcome to the skills page',
  },
  contact: {
    title: 'Contact',
    description: 'Welcome to the contact page',
  },
  footer: {
    text: 'Made with ❤️ by Martin Kollár',
  },
}
