import type { Component } from 'svelte'
import type { SVGAttributes } from 'svelte/elements'
import LucideFacebook from '~icons/lucide/facebook'
import LucideGithub from '~icons/lucide/github'
import LucideInstagram from '~icons/lucide/instagram'
import LucideLinkedin from '~icons/lucide/linkedin'

export type SocialLinkProps = {
  href?: string
  label?: string
  icon?: Component<SVGAttributes<SVGSVGElement>, {}>
  alt?: string
}

export const socialLinks: SocialLinkProps[] = [
  {
    href: 'https://github.com/Kolby11',
    label: 'GitHub',
    icon: LucideGithub,
    alt: 'Github',
  },
  {
    href: 'https://www.linkedin.com/in/kollar-martin',
    label: 'LinkedIn',
    icon: LucideLinkedin,
    alt: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/_kolby_1',
    label: 'Instagram',
    icon: LucideInstagram,
    alt: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/martin.kollar.kolby',
    label: 'Facebook',
    icon: LucideFacebook,
    alt: 'Facebook',
  },
]
