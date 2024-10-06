import type { TextContent } from './textContent'
import { seniority } from './textContent'

export const TextContentEN: TextContent = {
  seo: {
    description:
      'Martin Kollár - a web developer focused on innovation and creativity. An overview of my experience with programming, projects, and experience in the field of web development.',
    keywords:
      'Martin Kollar, Web Developer, Programmer, Programming Experience, Project Management, Full Stack Developer, Software Engineering, Web Design, User Experience, Frontend Development, Backend Development, Application Development, Coding Projects',
  },
  navbar: { home: 'Home', about: 'About me', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
  home: { title: 'Home', description: 'Vitajte na domovskej stránke' },
  about: {
    title: 'About me',
    description: 'Welcome to the homepage',
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
            'I experimented with multiple languages, game engines, and frameworks. Started exploring ways to make my code cleaner and efficient.',
          year: 2021,
        },
        {
          title: 'Got Job at Binary Confidence s.r.o.',
          description:
            'Got my first job as a backend developer in Binary Confidence s.r.o. Worked with technologies such as Ansible, Hyper-V, Linux, etc..  Met with new concepts, technologies, interesting projects, and great people, furthering my knowledge.',
          year: 2023,
        },
        {
          title: 'Graduated highschool',
          description: 'Lorem ipsum dolor sit amed',
          year: 2024,
        },
      ],
    },
    interestsAndHobbies: {
      title: 'Interests and hobbies',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab',
    },
  },
  experience: {
    slideshowItems: [
      {
        title: 'Web app development',
        description: 'Web development ako jedno z mojich hlavných zameraní ma',
      },
      {
        title: 'Mobile app development',
        description: 'Web development ako jedno z mojich hlavných zameraní ma',
      },
      {
        title: 'Game development',
        description: 'Web development ako jedno z mojich hlavných zameraní ma',
      },
    ],
    title: 'Experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab',

    graph: {
      title: 'Programming languages',
      valueTitle: 'Hours spent',
    },
    skillTree: {
      title: 'Skill tree',
      categories: [
        {
          name: 'Programming languages',
          items: [
            {
              name: 'Python',
              description: 'Python',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'Typescript',
              description: 'Typescript',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'Javascript',
              description: 'Javascript',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'C#',
              description: 'C#',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'C++',
              description: 'C++',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: 'Web application development',
          items: [
            {
              name: 'Next.js',
              description: 'Next.js',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'SvelteKit',
              description: 'SvelteKit',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Vue.js',
              description: 'Vue.js',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Angular',
              description: 'Angular',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: 'Mobile app development',

          items: [
            {
              name: 'Kotlin',
              description: 'Kotlin',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Flutter',
              description: 'Flutter',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: 'Game development',
          items: [
            {
              name: 'Unity',
              description: 'Unity',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Unreal engine',
              description: 'Unreal engine',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: 'Cloud deployment',
          items: [
            {
              name: 'Amazon Web Services (AWS)',
              description: 'Amazon Web Services (AWS)',

              seniority: seniority.JUNIOR,
            },
            {
              name: 'Google Cloud Platform (GCP)',
              description: 'Google Cloud Platform (GCP)',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Microsoft Azure',
              description: 'Microsoft Azure',
              seniority: seniority.JUNIOR,
            },
          ],
        },
      ],
    },
  },
  projects: {
    title: 'Projects',
    description: 'Welcome to the projects page',
  },
  contact: {
    title: 'Contact',
    description: 'Welcome to the contact page',
    text: 'In case of interest, do not hesitate to contact me:',
  },
  footer: {
    text: 'Made with ❤️ by Martin Kollár',
  },
}
