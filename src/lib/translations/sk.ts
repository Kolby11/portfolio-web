import type { BaseTranslation } from './loadTranslations'

export const translationSK: BaseTranslation = {
  seo: {
    description:
      'Martin Kollár - webdeveloper so zameraním na inovácie a kreativitu. Prehľad mojich skúseností s programovaním, projektami a zručnosťami v oblasti web developmentu.',
    keywords:
      'Martin Kollár, Web Developer, Programátor, Programovacie Zručnosti, Projektový Manažment, Full Stack Developer, Softvérové Inžinierstvo, Web Dizajn, Používateľská Skúsenosť, Vývoj Frontendu, Vývoj Backendu, Vývoj Aplikácií, Programovacie Projekty',
  },
  navbar: {
    home: 'Domov',
    about: 'O mne',
    skills: 'Zručnosti',
    contact: 'Kontakt',
  },
  home: {
    title: 'Domov',
    description: 'Vitajte na domovskej stránke',
  },
  about: {
    title: 'O mne',
    description: 'Vitajte na stránke o mne',
    timeline: {
      title: 'Časová os',
      sections: [
        {
          title: 'Prvé riadky kódu',
          year: 2019,
          description:
            'V roku 2019 som sa prvýkrát dostal k programovaniu a začal som sa učiť základy programovania v jazyku Python. Po nastúpení na strednú školu som sa začal intenzívne venovať programovaniu a web developmentu.',
        },
        {
          title: 'Začal som programovať konzistentne',
          description:
            'Experimentoval som s viacerými programovacími jazykmi, hernými enginami a frameworkami. Začal som sa zaoberať spôsobmi ako robiť môj kód čistejší a efektívnejší. Vytvoril som viacero menších projektov, ktoré mi pomohli získať skúsenosti a zlepšiť sa.',
          year: 2021,
        },
        {
          title: 'Dostal som prácu v Binary Confidence s.r.o.',
          description:
            'Dostal som moju prvú prácu ako backend developer v Binary Confidence s.r.o. Pracoval som s technológiami ako Ansible a Hyper-V, kde som pracoval s virtualizáciou a sieťovými technológiami. Vytváral som multiplatformové automatizačné aplikácie v Pythone pre operačné systémy Windows a Linux. Stretol som sa s novými konceptami, technológiami, zaujímavými projektami a úžasnými ľuďmi, čo ďalej rožšílo moje poznatky.',
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
      title: 'Záujmy a koníčky',
      description:
        'Vo voľnom čase sa venujem posilňovaniu, ale s kamarátmi si tiež rád zahrám akýkoľvek iný šport. Taktiež sa učím hrať na gitare. Zaujímam sa o nové technológie, či už v oblasti programovania, robotiky alebo raketovej vedy a rád sa učím nové veci.',
    },
  },
  skills: {
    title: 'Zručnosti',
    description: 'Vitajte na stránke zručností',
  },
  contact: {
    title: 'Kontakt',
    description: 'Vitajte na stránke kontaktu',
  },
  footer: {
    text: 'Vytvoril so ❤️ Martin Kollár',
  },
}
