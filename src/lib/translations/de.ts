import type { BaseTranslation } from './loadTranslations'

export const translationDE: BaseTranslation = {
  navbar: {
    home: 'Haus',
    about: 'Über mich',
    skills: 'Fahigkeiten',
    contact: 'Kontakt',
  },
  home: {
    title: 'Haus',
    description: 'Willkommen auf der Hausseite',
  },
  about: {
    title: 'Über mich',
    description: 'Willkommen auf der Über mich Seite',
    timeline: {
      title: 'Zeitachse',
      sections: [
        {
          title: 'Erste Zeilen des Codes',
          year: 2019,

          description:
            'Im Jahr 2019 stieg ich zum ersten Mal in die Programmierung ein und begann, die Grundlagen der Python-Programmierung zu erlernen. Nach dem Abitur begann ich, mich intensiv der Programmierung und Webentwicklung zu widmen.',
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
      title: 'Interessen und Hobbys',
      description:
        'In meiner Freizeit mache ich Krafttraining, treibe aber auch gerne andere Sportarten mit meinen Freunden. Ich lerne auch Gitarre spielen. Ich interessiere mich für neue Technologien, sei es im Bereich Programmierung, Robotik oder Raketenwissenschaft und lerne gerne Neues.',
    },
  },
  skills: {
    title: 'Fahigkeiten',
    description: 'Willkommen auf der Fahigkeiten Seite',
  },
  contact: {
    title: 'Kontakt',
    description: 'Willkommen auf der Kontaktseite',
  },
  footer: {
    text: 'Hergestellt mit ❤️ von Martin Kollár',
  },
}
