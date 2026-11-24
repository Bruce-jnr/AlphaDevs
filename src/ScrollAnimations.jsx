import { useLayoutEffect } from 'react'
import './ScrollAnimations.css'

const targets = [
  '.about-portrait', '.about-content', '.section-heading', '.services > article',
  '.projects > article', '.process > h2', '.process article', '.contact > div',
  '.enquiry-form-section > h2', '.enquiry-form-section > p', '.enquiry-form',
].join(', ')

export default function ScrollAnimations() {
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return
    const main = document.querySelector('main')
    if (!main) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const seen = new WeakSet()
    const animations = new Set()
    const pending = new Set()
    function reveal(element) {
      element.removeAttribute('data-scroll-pending')
      pending.delete(element)
    }
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting, intersectionRatio } of entries) {
        if (!isIntersecting || intersectionRatio < 0.12) continue
        observer.unobserve(target)
        reveal(target)
        if (motionPreference.matches || target.contains(document.activeElement)) continue
        const portrait = target.matches('.about-portrait')
        const aboutCopy = target.matches('.about-content')
        const isCard = target.matches('.services > article, .projects > article')
        const position = isCard ? [...target.parentElement.children].indexOf(target) % 3 : 0
        const start = portrait ? 'translateX(-22px)' : aboutCopy ? 'translateX(22px)' : 'translateY(22px)'
        const animation = target.animate([
          { opacity: 0, transform: start, ...(portrait ? { filter: 'blur(3px)' } : {}) },
          { opacity: 1, transform: 'translate(0)', ...(portrait ? { filter: 'blur(0)' } : {}) },
        ], { duration: portrait ? 850 : 650, delay: position * 85, fill: 'backwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
        animations.add(animation)
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation))
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })

    function register() {
      main.querySelectorAll(targets).forEach(element => {
        if (!seen.has(element)) {
          seen.add(element)
          if (motionPreference.matches || element.getBoundingClientRect().bottom <= 100) return
          element.setAttribute('data-scroll-pending', '')
          pending.add(element)
          observer.observe(element)
        }
      })
    }
    function stopMotion() {
      if (motionPreference.matches) {
        animations.forEach(animation => animation.cancel())
        pending.forEach(element => { observer.unobserve(element); reveal(element) })
      }
    }
    function revealFocused(event) {
      const element = event.target.closest('[data-scroll-pending]')
      if (element) { observer.unobserve(element); reveal(element) }
    }
    register()
    const mutations = new MutationObserver(register)
    mutations.observe(main, { childList: true, subtree: true })
    motionPreference.addEventListener('change', stopMotion)
    main.addEventListener('focusin', revealFocused)
    return () => {
      observer.disconnect()
      mutations.disconnect()
      motionPreference.removeEventListener('change', stopMotion)
      main.removeEventListener('focusin', revealFocused)
      animations.forEach(animation => animation.cancel())
      pending.forEach(reveal)
    }
  }, [])
  return null
}
