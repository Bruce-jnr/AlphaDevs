import './SystemProjectPreview.css'

export default function SystemProjectPreview({ project }) {
  return <div className={`preview system-preview ${project.theme}`} aria-hidden="true">
    <div className="mock-nav"><b>{project.brand}</b><span>Illustrative interface</span></div>
    {project.theme === 'admissions' ? <div className="system-screen"><h4>Every application, in view.</h4><div className="admission-stages"><span>Applications <b>24</b></span><span>In review <b>12</b></span><span>Admitted <b>8</b></span></div><div className="system-table"><div><span>Applicant</span><span>Programme</span><span>Status</span></div>{[['Applicant A','Science','Review'],['Applicant B','Business','Admitted'],['Applicant C','Arts','Submitted']].map(row => <div key={row[0]}>{row.map(cell => <span key={cell}>{cell}</span>)}</div>)}</div></div>
      : project.theme === 'school' ? <div className="system-screen"><h4>A connected school day.</h4><div className="school-tabs"><span>Attendance</span><span>Timetable</span><span>Fees</span></div><div className="school-schedule">{[['08:00','Mathematics','Class A'],['09:00','English','Class B'],['10:30','Science','Class A']].map(([time, subject, group]) => <div key={time}><time>{time}</time><span>{subject}</span><b>{group}</b></div>)}</div><small className="system-caption">Sample timetable · School administration</small></div>
      : <div className="pos-screen"><div><h4>Ready for the next sale.</h4><div className="pos-products">{[['Notebook','GH₵ 25'],['Water bottle','GH₵ 40'],['Desk lamp','GH₵ 120'],['Pen set','GH₵ 15']].map(([name, price]) => <div key={name}><span className="product-swatch"/><span>{name}</span><b>{price}</b></div>)}</div></div><aside><strong>Current sale</strong><span>Notebook × 2</span><span>Pen set × 1</span><div><span>Total</span><b>GH₵ 65</b></div><span className="pos-checkout">Checkout</span><small>Sample transaction</small></aside></div>}
  </div>
}
