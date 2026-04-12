// Method 1: Using $state in a class-based store
export class SectionStore {
  currentSection = $state('')
  private sections: NodeListOf<HTMLElement> | null = null
  private initialized = false

  initialize() {
    if (this.initialized || typeof document === 'undefined') return
    
    this.sections = document.querySelectorAll('section')
    this.updateSection()

    window.addEventListener('scroll', this.updateSection)
    this.initialized = true
  }

  cleanup() {
    if (this.initialized) {
      window.removeEventListener('scroll', this.updateSection)
      this.initialized = false
    }
  }

  private updateSection = () => {
    if (!this.sections) return

    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10

    if (atBottom) {
      const lastSection = this.sections[this.sections.length - 1]
      if (lastSection && this.currentSection !== lastSection.id) {
        this.currentSection = lastSection.id
      }
      return
    }

    const threshold = window.innerHeight * 0.4

    this.sections.forEach((sec: HTMLElement) => {
      const rect = sec.getBoundingClientRect()
      if (rect.top <= threshold) {
        if (this.currentSection !== sec.id) {
          this.currentSection = sec.id
        }
      }
    })
  }
}

// Create singleton instance
export const sectionStore = new SectionStore()