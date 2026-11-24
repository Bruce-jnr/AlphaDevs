import { useState } from 'react'
import './TechMarquee.css'

const technologies = [
  ['React', 'react'], ['Node.js', 'nodejs'], ['TypeScript', 'typescript'],
  ['Python', 'python'], ['Next.js', 'nextjs'], ['PostgreSQL', 'postgresql'],
  ['MySQL', 'mysql'], ['MongoDB', 'mongodb'],
]

export default function TechMarquee() {
  const [paused, setPaused] = useState(false)
  return <section className="tech-marquee" aria-label="Our technology stack">
    <div className="wrap tech-marquee-layout">
      <div className="tech-marquee-heading"><span>THE TOOLS BEHIND<br />THE IDEAS</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume scrolling' : 'Pause scrolling'}</button></div>
      <div className={`tech-marquee-viewport${paused ? ' is-paused' : ''}`}>
        <div className="tech-marquee-track">
          {[0, 1].map(copy => <ul className="tech-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {technologies.map(([name, icon]) => <li key={name}><img src={`/stack/${icon}.svg`} width="30" height="30" alt="" /><span>{name}</span></li>)}
          </ul>)}
        </div>
      </div>
    </div>
  </section>
}
