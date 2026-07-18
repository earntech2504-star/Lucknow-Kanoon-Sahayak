// api/search.js - Full Text Search

import { SECTIONS_DB } from './sections.js';

const LEGAL_DICTIONARY = [
  { term: "Abetment", definition: "Encouragement or assistance to commit a crime", category: "criminal" },
  { term: "Acquittal", definition: "A judgment that a person is not guilty", category: "criminal" },
  { term: "Affidavit", definition: "A written statement confirmed by oath", category: "procedure" },
  { term: "Anticipatory Bail", definition: "Bail granted before arrest (BNSS 482)", category: "criminal" },
  { term: "Appeal", definition: "Application to higher court to reverse decision", category: "procedure" },
  { term: "Arrest", definition: "Taking a person into custody by legal authority", category: "criminal" },
  { term: "Bail", definition: "Release of accused on security (BNSS 480)", category: "criminal" },
  { term: "BNS", definition: "Bharatiya Nyaya Sanhita - New criminal code", category: "legislation" },
  { term: "BNSS", definition: "Bharatiya Nagarik Suraksha Sanhita", category: "legislation" },
  { term: "BSA", definition: "Bharatiya Sakshya Adhiniyam - New evidence act", category: "legislation" },
  { term: "Chargesheet", definition: "Police report after investigation (BNSS 193)", category: "criminal" },
  { term: "Cheating", definition: "Fraudulent deception (BNS 318)", category: "criminal" },
  { term: "Cognizable", definition: "Offence where police can arrest without warrant", category: "criminal" },
  { term: "Cruelty", definition: "Wilful conduct causing suffering (BNS 85)", category: "criminal" },
  { term: "Defamation", definition: "False statement harming reputation (BNS 356)", category: "criminal" },
  { term: "Dowry", definition: "Property given by bride's family to groom", category: "family" },
  { term: "Evidence", definition: "Information presented to prove facts in court", category: "procedure" },
  { term: "FIR", definition: "First Information Report (BNSS 173)", category: "criminal" },
  { term: "Forgery", definition: "Making false document with intent to deceive", category: "criminal" },
  { term: "Habeas Corpus", definition: "Writ to produce detained person before court", category: "constitution" },
  { term: "Homicide", definition: "Killing of a human being", category: "criminal" },
  { term: "Judgment", definition: "Final decision of court", category: "procedure" },
  { term: "Jurisdiction", definition: "Authority of court to hear cases", category: "procedure" },
  { term: "Kidnapping", definition: "Taking person away without consent (BNS 73)", category: "criminal" },
  { term: "Maintenance", definition: "Financial support (BNSS 144)", category: "family" },
  { term: "Murder", definition: "Unlawful killing with intent (BNS 103)", category: "criminal" },
  { term: "Rape", definition: "Sexual assault without consent (BNS 64)", category: "criminal" },
  { term: "Robbery", definition: "Theft with force or threat", category: "criminal" },
  { term: "Stalking", definition: "Repeated unwanted attention (BNS 69)", category: "criminal" },
  { term: "Theft", definition: "Dishonest taking of property (BNS 303)", category: "criminal" }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(200).json({
      results: [],
      total: 0,
      status: 'success',
      message: 'Please enter at least 2 characters'
    });
  }

  try {
    const query = q.toLowerCase().trim();
    const results = [];

    // Search in Sections
    for (const [actName, actData] of Object.entries(SECTIONS_DB)) {
      for (const chapter of actData.chapters) {
        for (const section of chapter.sections) {
          const titleMatch = section.title.toLowerCase().includes(query);
          const textMatch = section.text.toLowerCase().includes(query);
          const numberMatch = section.number.toLowerCase().includes(query);
          
          if (titleMatch || textMatch || numberMatch) {
            let score = 0;
            if (titleMatch) score += 10;
            if (numberMatch) score += 8;
            if (textMatch) score += 3;
            
            results.push({
              type: 'section',
              act: actName,
              number: section.number,
              title: section.title,
              text: section.text.slice(0, 300) + (section.text.length > 300 ? '...' : ''),
              score
            });
          }
        }
      }
    }

    // Search in Dictionary
    for (const dict of LEGAL_DICTIONARY) {
      const termMatch = dict.term.toLowerCase().includes(query);
      const defMatch = dict.definition.toLowerCase().includes(query);
      
      if (termMatch || defMatch) {
        let score = 0;
        if (termMatch) score += 8;
        if (defMatch) score += 3;
        
        results.push({
          type: 'dictionary',
          term: dict.term,
          definition: dict.definition,
          category: dict.category,
          score
        });
      }
    }

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    // Return top 50 results
    res.status(200).json({
      results: results.slice(0, 50),
      total: results.length,
      status: 'success'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
}
