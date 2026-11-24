import './AIProjectPreview.css'

export default function AIProjectPreview({ project }) {
  return <div className={`preview ai-preview ${project.theme}`} aria-hidden="true">
    <div className="mock-nav"><b>{project.brand}</b><span>Illustrative interface</span></div>
    {project.theme === 'assistant' ? <div className="ai-conversation"><span className="ai-question">What does our returns policy say?</span><div className="ai-answer"><strong>Answers from your knowledge base</strong><p>Find relevant policies and help your team respond with context.</p><span>Sources: Returns policy · Support guide</span></div><div className="ai-input">Ask about your documents…</div></div>
      : project.theme === 'forecast' ? <div className="forecast-view"><h4>Plan for what comes next.</h4><div className="forecast-legend"><span>Historical demand</span><span>Model forecast</span></div><div className="forecast-bars">{[32,45,39,56,48,65,58,72,68,81,77,90].map((value, index) => <i key={index} className={index > 7 ? 'predicted' : ''} style={{ height: `${value}%` }} />)}</div><span className="ai-caption">Demand forecasting · Sample data</span></div>
      : <div className="classification-view"><h4>Turn feedback into insight.</h4>{[['“The setup was easy.”', 'Positive'], ['“Delivery took longer than expected.”', 'Negative'], ['“Can I change my plan?”', 'Neutral']].map(([text, label]) => <div className="classification-row" key={text}><span>{text}</span><b className={label.toLowerCase()}>{label}</b></div>)}<span className="ai-caption">Sentiment classification · Sample output</span></div>}
  </div>
}
