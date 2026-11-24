import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const links = [['Home', 'home'], ['About', 'about'], ['Expertise', 'expertise'], ['Work', 'work'], ['Contact', 'contact']]

export default function Navbar({ brandMark }) {
  const [open, setOpen] = useState(false)
  const drawer = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    const panel = drawer.current
    if (!open) return
    panel.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 761px)')
    const closeOnDesktop = () => { if (desktop.matches) panel.close() }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      document.body.style.overflow = previousOverflow
      if (panel.open) panel.close()
    }
  }, [open])

  function close() { drawer.current.close() }
  function closeOnBackdrop(event) {
    if (event.target !== drawer.current) return
    const bounds = drawer.current.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
  }

  return <header className="site-header"><div className="wrap navbar-inner">
    <a className="brand" href="#home" aria-label="Alpha Devs home">{brandMark}<span>alpha<span>devs</span><small>TECH SOLUTIONS</small></span></a>
    <nav className="desktop-navigation" aria-label="Main navigation">{links.slice(0, 4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <a className="button header-cta" href="#contact">Let’s talk <i /></a>
    <button ref={trigger} className="drawer-trigger" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" /></svg></button>
  </div>
    <dialog ref={drawer} className="mobile-drawer" id="mobile-navigation" aria-labelledby="drawer-title" onClick={closeOnBackdrop} onClose={() => { setOpen(false); if (window.matchMedia('(max-width: 760px)').matches) trigger.current?.focus() }}>
      <div className="drawer-top"><h2 id="drawer-title">Explore Alpha Devs</h2><button autoFocus className="drawer-close" onClick={close} aria-label="Close navigation"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg></button></div>
      <nav aria-label="Mobile navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}</nav>
      <div className="drawer-contact"><p>Have an idea in mind?</p><a className="button primary" href="mailto:asarebruce@gmail.com" onClick={close}>Start a conversation</a><a className="drawer-email" href="mailto:asarebruce@gmail.com" onClick={close}>asarebruce@gmail.com</a></div>
    </dialog>
  </header>
}
