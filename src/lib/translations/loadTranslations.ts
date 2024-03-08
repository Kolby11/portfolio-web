import { translationDE } from '../translations/de'
import { translationEN } from '../translations/en'
import { translationSK } from '../translations/sk'

export async function loadTranslation(language: string) {
  switch (language) {
    case 'sk':
      return translationSK
    case 'en':
      return translationEN
    case 'de':
      return translationDE
    default:
      return translationEN
  }
}

export type BaseTranslation = {
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
  skills: {
    title: string
    description: string
  }
  contact: {
    title: string
    description: string
  }
  footer: {
    text: string
  }
}
