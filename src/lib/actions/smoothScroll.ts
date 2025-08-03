// src/actions/smoothScroll.js
export function smoothScroll(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    const targetElement = event.target as Element | null
    const anchor = targetElement?.closest('a[href^="#"]')
    if (!anchor) return

    event.preventDefault()
    const targetId = anchor.getAttribute('href')
    if (targetId) {
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  node.addEventListener('click', handleClick)

  return {
    destroy() {
      node.removeEventListener('click', handleClick)
    },
  }
}
