// api/trending.js
export default async function handler(req, res) {
  const topics = [
    { topic: 'BNS 318 vs IPC 420 — Cheating', views: '12.5K' },
    { topic: 'BNSS 173 — FIR process explained', views: '8.7K' },
    { topic: 'Women Helpline 181 — Know your rights', views: '6.3K' },
    { topic: 'Cyber fraud — How to report 1930', views: '5.1K' },
    { topic: 'SC landmark — Bail is rule', views: '4.8K' },
    { topic: 'Maintenance under BNSS 144', views: '3.9K' },
  ];
  res.status(200).json(topics);
}