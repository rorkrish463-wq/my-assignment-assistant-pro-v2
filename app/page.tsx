'use client';
import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [rules, setRules] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setAnswer('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, rules })
    });
    const data = await res.json();
    setAnswer(data.answer || data.error || 'No response');
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
      <h1>Personal Assignment Assistant (Free)</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Paste assignment question here"
        style={{ width: '100%', height: 200, padding: 12, marginBottom: 12 }}
      />
      <textarea
        value={rules}
        onChange={(e) => setRules(e.target.value)}
        placeholder="Paste assignment instructions here"
        style={{ width: '100%', height: 150, padding: 12, marginBottom: 12 }}
      />
      <button onClick={generate} disabled={loading}
        style={{ padding: '12px 24px', fontSize: 16 }}>
        {loading ? 'Generating...' : 'Generate Answer'}
      </button>
      {answer && (
        <div style={{
          whiteSpace: 'pre-wrap',
          marginTop: 30,
          background: '#fff',
          padding: 20,
          borderRadius: 8,
          lineHeight: 1.7
        }}>
          {answer}
        </div>
      )}
    </main>
  );
}