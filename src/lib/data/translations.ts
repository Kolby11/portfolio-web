export type lang = 'sk' | 'en' | 'de'

export enum seniority {
  JUNIOR = 'junior',
  MEDIOR = 'medior',
  SENIOR = 'senior',
}

export type BaseTranslation = {
  seo: {
    description: Record<lang, string>
    keywords: Record<lang, string>
  }
  navbar: {
    [key: string]: Record<lang, string>
  }
  home: {
    title: Record<lang, string>
    description: Record<lang, string>
  }
  about: {
    title: Record<lang, string>
    description: Record<lang, string>
    timeline: {
      title: Record<lang, string>
      sections: {
        title: Record<lang, string>
        year: number
        description: Record<lang, string>
      }[]
    }
    interestsAndHobbies: {
      title: Record<lang, string>
      description: Record<lang, string>
    }
  }
  skills: {
    title: Record<lang, string>
    description: Record<lang, string>
    graph: {
      title: Record<lang, string>
      valueTitle: Record<lang, string>
    }
    skillTree: {
      title: Record<lang, string>
      categories: {
        name: Record<lang, string>
        items: {
          name: string
          seniority: seniority
        }[]
      }[]
    }
  }
  projects: {
    title: Record<lang, string>
    description: Record<lang, string>
  }
  contact: {
    title: Record<lang, string>
    description: Record<lang, string>
    text: Record<lang, string>
  }
  footer: {
    text: Record<lang, string>
  }
}

export const translations: BaseTranslation = {
  seo: {
    description: {
      sk: 'Martin Kollár - webdeveloper so zameraním na inovácie a kreativitu. Prehľad mojich skúseností s programovaním, projektami a zručnosťami v oblasti web developmentu.',
      en: 'Martin Kollár - a web developer focused on innovation and creativity. An overview of my experience with programming, projects, and skills in the field of web development.',
      de: 'Martin Kollár - ein Webentwickler mit Schwerpunkt auf Innovation und Kreativität. Ein Überblick über meine Erfahrungen mit Programmierung, Projekten und Fähigkeiten im Bereich der Webentwicklung.',
    },
    keywords: {
      sk: 'Martin Kollár, Web Developer, Programátor, Programovacie Zručnosti, Projektový Manažment, Full Stack Developer, Softvérové Inžinierstvo, Web Dizajn, Používateľská Skúsenosť, Vývoj Frontendu, Vývoj Backendu, Vývoj Aplikácií, Programovacie Projekty',
      en: 'Martin Kollar, Web Developer, Programmer, Programming Skills, Project Management, Full Stack Developer, Software Engineering, Web Design, User Experience, Frontend Development, Backend Development, Application Development, Coding Projects',
      de: 'Martin Kollar, Webentwickler, Programmierer, Programmierfähigkeiten, Projektmanagement, Full-Stack-Entwickler, Softwareingenieurwesen, Webdesign, Benutzererfahrung, Frontend-Entwicklung, Backend-Entwicklung, Anwendungsentwicklung, Programmierprojekte',
    },
  },
  navbar: {
    home: {
      sk: 'Domov',
      en: 'Home',
      de: 'Haus',
    },
    about: {
      sk: 'O mne',
      en: 'About me',
      de: 'Über mich',
    },
    skills: {
      sk: 'Zručnosti',
      en: 'Skills',
      de: 'Fahigkeiten',
    },
    projects: {
      sk: 'Projekty',
      en: 'Projects',
      de: 'Projekten',
    },
    contact: {
      sk: 'Kontakt',
      en: 'Contact',
      de: 'Kontakt',
    },
  },
  home: {
    title: {
      sk: 'Domov',
      en: 'Home',
      de: 'Haus',
    },
    description: {
      sk: 'Vitajte na domovskej stránke',
      en: 'Welcome to the homepage',
      de: 'Willkommen auf der Hausseite',
    },
  },
  about: {
    title: {
      sk: 'O mne',
      en: 'About me',
      de: 'Über mich',
    },
    description: {
      sk: 'Vitajte na stránke o mne',
      en: 'Welcome to the about me page',
      de: 'Willkommen auf der Über mich Seite',
    },
    timeline: {
      title: { sk: 'Časová os', en: 'Timeline', de: 'Zeitachse' },
      sections: [
        {
          title: { sk: 'Prvé riadky kódu', en: 'First lines of code', de: 'Erste Zeilen des Codes' },
          year: 2019,
          description: {
            sk: 'V roku 2019 som sa prvýkrát dostal k programovaniu a začal som sa učiť základy programovania v jazyku Python. Po nastúpení na strednú školu som sa začal intenzívne venovať programovaniu a web developmentu.',
            en: 'In 2019, I started programming for the first time and learned the basics of programming in Python. After entering high school, I started to devote myself intensively to programming and web development.',
            de: 'Im Jahr 2019 stieg ich zum ersten Mal in die Programmierung ein und begann, die Grundlagen der Python-Programmierung zu erlernen. Nach dem Abitur begann ich, mich intensiv der Programmierung und Webentwicklung zu widmen.',
          },
        },
        {
          title: {
            sk: 'Začal som programovať konzistentne',
            en: 'Started coding consistently',
            de: '!Translate - Started coding consistently',
          },
          description: {
            sk: 'Experimentoval som s viacerými programovacími jazykmi, hernými enginami a frameworkami. Začal som sa zaoberať spôsobmi ako robiť môj kód čistejší a efektívnejší. Vytvoril som viacero menších projektov, ktoré mi pomohli získať skúsenosti a zlepšiť sa.',
            en: 'Experimented with multiple languages, game engines, and frameworks. Started exploring ways to make my code cleaner and efficient.',
            de: '!Translate - Experimented with multiple languages, game engines, and frameworks. Started exploring ways to make my code cleaner and efficient.',
          },
          year: 2021,
        },
        {
          title: {
            sk: 'Dostal som prácu v Binary Confidence s.r.o.',
            en: 'Got Job at Binary Confidence s.r.o.',
            de: 'Got Job at Binary Confidence s.r.o.',
          },
          description: {
            sk: 'Dostal som moju prvú prácu ako backend developer v Binary Confidence s.r.o. Pracoval som s technológiami ako Ansible a Hyper-V, kde som pracoval s virtualizáciou a sieťovými technológiami. Vytváral som multiplatformové automatizačné aplikácie v Pythone pre operačné systémy Windows a Linux. Stretol som sa s novými konceptami, technológiami, zaujímavými projektami a úžasnými ľuďmi, čo ďalej rožšílo moje poznatky.',
            en: 'Got my first job as a backend developer in Binary Confidence s.r.o. Worked with technologies such as Ansible, Hyper-V, Linux, etc..  Met with new concepts, technologies, interesting projects, and great people, furthering my knowledge. ',
            de: '!Translate - Got my first job as a backend developer in Binary Confidence s.r.o. Worked with technologies such as Ansible, Hyper-V, Linux, etc..  Met with new concepts, technologies, interesting projects, and great people, furthering my knowledge. ',
          },
          year: 2023,
        },
        {
          title: {
            sk: '!Translate - Graduated highschool',
            en: 'Graduated highschool',
            de: '!Translate - Graduated highschool',
          },
          description: {
            sk: '!Translate - For my graduation project I worked on my own first large-scale fullstack web application. I learned a lot about web development, and I was able to apply my knowledge in a real-world project. I also learned a lot about project architecture, cloud and deployment. ',
            en: 'For my graduation project I worked on my own first large-scale fullstack web application. I learned a lot about web development, and I was able to apply my knowledge in a real-world project. I also learned a lot about project architecture, cloud and deployment. ',
            de: '!Translate - For my graduation project I worked on my own first large-scale fullstack web application. I learned a lot about web development, and I was able to apply my knowledge in a real-world project. I also learned a lot about project architecture, cloud and deployment. ',
          },
          year: 2024,
        },
      ],
    },
    interestsAndHobbies: {
      title: { sk: 'Záujmy a koníčky', en: 'Interests and hobbies', de: 'Interessen und Hobbys' },
      description: {
        sk: 'Vo voľnom čase sa venujem posilňovaniu, ale s kamarátmi si tiež rád zahrám akýkoľvek iný šport. Taktiež sa učím hrať na gitare. Zaujímam sa o nové technológie, či už v oblasti programovania, robotiky alebo raketovej vedy a rád sa učím nové veci.',
        en: 'In my free time, I workout at the gym, but I also like to play any other sport with my friends. I am also learning to play the guitar. I am interested in new technologies, be it in the field of programming, robotics or rocket science and I like to learn new things.',
        de: 'In meiner Freizeit mache ich Krafttraining, treibe aber auch gerne andere Sportarten mit meinen Freunden. Ich lerne auch Gitarre spielen. Ich interessiere mich für neue Technologien, sei es im Bereich Programmierung, Robotik oder Raketenwissenschaft und lerne gerne Neues.',
      },
    },
  },
  skills: {
    title: {
      sk: 'Zručnosti',
      en: 'Skills',
      de: 'Fahigkeiten',
    },
    description: {
      sk: 'Moja špecializácia je najmä vo fullstack developmente webových aplikácií a ich nasadenia do produkcie na cloud, no aktívne sa venujem aj iným odvetviam ako je backend development pre aplikácie. Ďalej som pracoval v oblasti game a mobile developmentu',
      en: '!Translate - Moja špecializácia je najmä vo fullstack developmente webových aplikácií a ich nasadenia do produkcie na cloud, no aktívne sa venujem aj iným odvetviam ako je backend development pre aplikácie. Ďalej som pracoval v oblasti game a mobile developmentu',
      de: '!Translate - Moja špecializácia je najmä vo fullstack developmente webových aplikácií a ich nasadenia do produkcie na cloud, no aktívne sa venujem aj iným odvetviam ako je backend development pre aplikácie. Ďalej som pracoval v oblasti game a mobile developmentu',
    },
    graph: {
      title: {
        sk: 'Programovacie jazyky',
        en: 'Programming languages',
        de: 'Programmiersprachen',
      },
      valueTitle: {
        sk: 'Strávené hodiny',
        en: 'Hours spent',
        de: 'Stunden verbracht',
      },
    },
    skillTree: {
      title: {
        sk: '!Translate - Skill tree',
        en: 'Skill tree',
        de: '!Translate - Skill tree',
      },
      categories: [
        {
          name: {
            sk: 'Programovacie jazyky',
            en: 'Programming languages',
            de: '!Translate - Programming language',
          },
          items: [
            {
              name: 'Python',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'Typescript',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'Javascript',
              seniority: seniority.MEDIOR,
            },
            {
              name: 'c#',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'c++',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: {
            sk: 'Vývoj webových aplikácii',
            en: 'Web application Development',
            de: '!Translate - Web application Development',
          },
          items: [
            {
              name: 'Next.js',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'SvelteKit',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Vue.js',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Angular',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: {
            sk: 'Vývoj mobilných aplikácii',
            en: 'Mobile application Development',
            de: '!Translate - Mobile application Development',
          },
          items: [
            {
              name: 'Kotlin',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Flutter',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: {
            sk: 'Vývoj hier',
            en: 'Game development',
            de: '!Translate - Game development',
          },
          items: [
            {
              name: 'Unity',
              seniority: seniority.JUNIOR,
            },
            {
              name: 'Unreal engine',
              seniority: seniority.JUNIOR,
            },
          ],
        },
        {
          name: {
            sk: 'Nasadenie do cloudu',
            en: 'Cloud deployment',
            de: '!Translate - Cloud deploymet',
          },
          items: [
            { name: 'Amazon Web Services (AWS)', seniority: seniority.JUNIOR },
            { name: 'Google Cloud Platform (GCP)', seniority: seniority.JUNIOR },
          ],
        },
      ],
    },
  },
  projects: {
    title: { sk: 'Projekty', en: 'Projects', de: 'Projekten' },
    description: {
      sk: 'Vitajte na stránke kontaktu',
      en: 'Welcome to the contact page',
      de: 'Willkommen auf der Kontakt Seite',
    },
  },
  contact: {
    title: { sk: 'Kontakt', en: 'Contact', de: 'Kontakt' },
    description: {
      sk: 'Vitajte na stránke kontaktu',
      en: 'Welcome to the contact page',
      de: 'Willkommen auf der Kontakt Seite',
    },
    text: {
      sk: 'V prípade záujmu ma neváhajte kontaktovať:',
      en: 'In case of interest, do not hesitate to contact me:',
      de: 'Im Falle von Interesse, zögern Sie nicht, mich zu kontaktieren:',
    },
  },
  footer: {
    text: {
      sk: 'Vytvoril so ❤️ Martin Kollár',
      en: 'Made with ❤️ by Martin Kollár',
      de: 'Hergestellt mit ❤️ von Martin Kollár',
    },
  },
}
