import { useState } from 'react'

import './ContactForm.css'

export default function ContactForm() {
  const [status, setStatus] = useState('')


  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Project enquiry from ${data.get('name').trim()}`
    const body = `Name: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\n\nProject details:\n${data.get('message').trim()}`
    window.location.href = `mailto:asarebruce@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Your email app will open with your enquiry. Please send it there to complete your message. If it does not open, email asarebruce@gmail.com directly.')
  }
  return <section className="enquiry-form-section wrap" aria-labelledby="enquiry-heading">
    <h2 id="enquiry-heading">Tell us about <em>your project.</em></h2>
    <p>Share what you have in mind. This form opens your email app with a draft addressed to Alpha Devs.</p>
    <form className="enquiry-form" onSubmit={submit}>
      <div className="enquiry-fields">
        <label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="Full name" /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
      </div>
      <label>Project details<textarea name="message" required minLength={10} maxLength={4000} rows={6} placeholder="What would you like to build? Tell us about your goals, timeline, and anything else we should know." /></label>
      <button className="button primary" type="submit">Prepare project enquiry</button>
      <p className="enquiry-status" role="status">{status}</p>
    </form>
  </section>
}
