import { seniority, type TextContent } from './textContent'

export const TextContentDE: TextContent = {
  seo: {
    description:
      'Martin Kollár - webdeveloper so zameraním na inovácie a kreativitu. Prehľad mojich skúseností s programovaním, projektami a zručnosťami v oblasti web developmentu.',
    keywords:
      'Martin Kollár, Web Developer, Programátor, Programovacie Zručnosti, Projektový Manažment, Full Stack Developer, Softvérové Inžinierstvo, Web Dizajn, Používateľská Skúsenosť, Vývoj Frontendu, Vývoj Backendu, Vývoj Aplikácií, Programovacie Projekty',
  },
  navbar: { home: 'Haus', about: 'Über mich', experience: 'Fahigkeiten', projects: 'Projekten', contact: 'Kontakt' },
  home: { title: 'Domov', description: 'Vitajte na domovskej stránke' },
  about: {
    title: 'Über mich',
    description: 'Vitajte na stránke o mne',
    timeline: {
      title: 'Zeitachse',
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
          title: 'Ukončenie štúdia na strednej škol',
          description:
            'Ako moju maturitnú prácu som mal za projekt moju web aplikáciu veľkého rozsahu. Naučil som sa veľa o projektovej architektúre, cloudovom nasadení, škálovateľnosti, web developmente a bol som schopný aplikovať moje vedomosti v reálnom projekte.',
          year: 2024,
        },
      ],
    },
    interestsAndHobbies: {
      title: 'Záujmy a koníčky',
      description:
        'Vo voľnom čase sa venujem posilňovaniu, ale s kamarátmi si tiež rád zahrám akýkoľvek iný šport. Taktiež sa učím hrať na gitare. Baví ma spoznávať nové technológie, či už v oblasti programovania, robotiky alebo raketovej vedy. Rád experimentujem so zaujímavými nápadmi a pretváram ich do svojich hobby projektov.',
    },
  },
  experience: {
    slideshowItems: [
      {
        title: 'Web development',
        description: 'Web development ako jedno z mojich hlavných zameraní ma',
      },
    ],
    title: 'Skúsenosti',
    description:
      'Moja špecializácia je najmä vo fullstack developmente webových aplikácií a ich nasadenia do produkcie na cloud, no aktívne sa venujem aj iným odvetviam ako je backend development pre aplikácie. Ďalej som pracoval v oblasti game a mobile developmentu',

    graph: {
      title: 'Programovacie jazyky',
      valueTitle: 'Strávené hodiny',
    },
    skillTree: {
      title: 'Skill tree',
      categories: [
        {
          name: 'Programovacie jazyky',
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
          name: 'Vývoj webových aplikácii',
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
          name: 'Vývoj mobilných aplikácii',

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
          name: 'Vývoj hier',
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
          name: 'Nasadenie do cloudu',
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
          ],
        },
      ],
    },
  },
  projects: {
    title: 'Projekty',
    description: 'Vitajte na stránke kontaktu',
  },
  contact: {
    title: 'Kontakt',
    description: 'Vitajte na stránke kontaktu',
    text: 'V prípade záujmu ma neváhajte kontaktovať:',
  },
  footer: {
    text: 'Vytvoril so ❤️ Martin Kollár',
  },
}
