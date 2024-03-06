// src/actions/smoothScroll.js
export function smoothScroll(node) {
  const handleClick = event => {
    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor) return

    event.preventDefault()
    const targetId = anchor.getAttribute('href')
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  node.addEventListener('click', handleClick)

  return {
    destroy() {
      node.removeEventListener('click', handleClick)
    },
  }
}
