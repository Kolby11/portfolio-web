export enum LanguageCode {
  SK = 'sk',
  EN = 'en',
  DE = 'de',
}

export enum seniority {
  JUNIOR = 'junior',
  MEDIOR = 'medior',
  SENIOR = 'senior',
}

export type TextContent = {
  seo: {
    description: string
    keywords: string
  }
  navbar: {
    [key: string]: string
  }
  home: {
    title: string
    description: string
  }
  about: {
    title: string
    description: string
    timeline: {
      title: string
      sections: {
        title: string
        year: number
        description: string
      }[]
    }
    interestsAndHobbies: {
      title: string
      description: string
    }
  }
  experience: {
    slideshowItems: { title: string; description: string }[]
    title: string
    description: string
    graph: {
      title: string
      valueTitle: string
    }
    skillTree: {
      title: string
      categories: {
        name: string
        items: {
          name: string
          description: string
          seniority: seniority
        }[]
      }[]
    }
  }
  projects: {
    title: string
    description: string
  }
  contact: {
    title: string
    description: string
    text: string
  }
  footer: {
    text: string
  }
}
