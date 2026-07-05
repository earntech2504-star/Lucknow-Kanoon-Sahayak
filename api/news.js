export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const news = [
    {
      title: "Supreme Court: BNS 318 Cheating Requires Intent",
      description: "SC held that mere failure to repay loan doesn't constitute cheating under BNS 318.",
      source: "SCC Online",
      pubDate: new Date().toISOString(),
      link: "#",
      tags: ["SC", "BNS 318"]
    },
    {
      title: "BNSS 480: Magistrate Can Grant Bail in 7-Year Offences",
      description: "HC clarifies BNSS 480 empowers Magistrate to grant bail.",
      source: "LiveLaw",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      link: "#",
      tags: ["BNSS 480", "Bail"]
    },
    {
      title: "BSA 63: Certificate Mandatory for Electronic Evidence",
      description: "SC reiterates certificate under BSA 63(4) is mandatory.",
      source: "Bar & Bench",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      link: "#",
      tags: ["BSA 63", "Evidence"]
    },
    {
      title: "Lucknow HC: New Guidelines for BNSS 482",
      description: "Allahabad HC issued guidelines for anticipatory bail.",
      source: "LiveLaw",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      link: "#",
      tags: ["BNSS 482", "HC"]
    },
    {
      title: "CERT-In: New UPI Fraud Advisory",
      description: "CERT-In issued advisory about new UPI fraud techniques.",
      source: "CERT-In",
      pubDate: new Date(Date.now() - 345600000).toISOString(),
      link: "#",
      tags: ["Cyber", "UPI"]
    },
    {
      title: "Sonam Raja Raghuvanshi Case Update",
      description: "Lucknow HC scheduled hearing for 15 July 2026.",
      source: "LiveLaw",
      pubDate: new Date(Date.now() - 432000000).toISOString(),
      link: "#",
      tags: ["Sonam Raja", "Political"]
    },
    {
      title: "BNS 103: SC Revisits Death Penalty Test",
      description: "SC reconsidering rarest of rare doctrine.",
      source: "SC Observer",
      pubDate: new Date(Date.now() - 518400000).toISOString(),
      link: "#",
      tags: ["BNS 103", "Murder"]
    },
    {
      title: "BNSS 173: Mandatory FIR Registration",
      description: "SC reaffirms Lalita Kumari judgment.",
      source: "Indian Kanoon",
      pubDate: new Date(Date.now() - 604800000).toISOString(),
      link: "#",
      tags: ["BNSS 173", "FIR"]
    },
    {
      title: "Women Safety: New POCSO Guidelines",
      description: "HC issues guidelines for speedy trial.",
      source: "LiveLaw",
      pubDate: new Date(Date.now() - 691200000).toISOString(),
      link: "#",
      tags: ["Women", "POCSO"]
    },
    {
      title: "Cyber Crime: 500 Crore Fraud Busted",
      description: "Delhi Police busted major cyber crime racket.",
      source: "Bar & Bench",
      pubDate: new Date(Date.now() - 777600000).toISOString(),
      link: "#",
      tags: ["Cyber", "Fraud"]
    }
  ];

  return res.status(200).json({
    news: news,
    total: news.length,
    source: 'Static',
    lastUpdated: new Date().toISOString()
  });
}
