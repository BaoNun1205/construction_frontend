import { useEffect } from 'react'

// eslint-disable-next-line no-undef
type UseScrollAnimationsOptions = IntersectionObserverInit;

export default function useScrollAnimations(
  selector = '.fade-in-on, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in',
  options: UseScrollAnimationsOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  addClass = 'visible',
  deps: unknown[] = []
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add(addClass)
        }
      })
    }, options)

    const animatedElements = document.querySelectorAll(selector)
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
    // use provided deps when given, otherwise fall back to sensible defaults
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps.length ? deps : [selector, addClass, JSON.stringify(options)])
}