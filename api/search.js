// ============================================================
// api/search.js - Full Text Search for Legal Sections & Dictionary
// Complete Search Across BNS, BNSS, BSA, and Legal Dictionary
// ============================================================

import { SECTIONS_DB } from './sections.js';

// ============================================================
// COMPLETE LEGAL DICTIONARY (70+ Terms)
// ============================================================
const LEGAL_DICTIONARY = [
  // Criminal Law Terms
  { term: "Abetment", definition: "Encouragement or assistance to commit a crime (BNS 48)", category: "criminal" },
  { term: "Acquittal", definition: "A judgment that a person is not guilty of the offence charged", category: "criminal" },
  { term: "Anticipatory Bail", definition: "Bail granted before arrest (BNSS 482 - CrPC 438)", category: "criminal" },
  { term: "Arrest", definition: "Taking a person into custody by legal authority (BNSS 60)", category: "criminal" },
  { term: "Bail", definition: "Release of accused on security (BNSS 480 - CrPC 437)", category: "criminal" },
  { term: "Charge", definition: "Formal accusation of an offence", category: "criminal" },
  { term: "Chargesheet", definition: "Police report after investigation (BNSS 193 - CrPC 173)", category: "criminal" },
  { term: "Cheating", definition: "Fraudulent deception (BNS 318 - IPC 420)", category: "criminal" },
  { term: "Cognizable", definition: "Offence where police can arrest without warrant (BNSS 173)", category: "criminal" },
  { term: "Conviction", definition: "Judgment of guilt against an accused person", category: "criminal" },
  { term: "Cruelty", definition: "Wilful conduct causing suffering (BNS 85 - IPC 498A)", category: "criminal" },
  { term: "Defamation", definition: "False statement harming reputation (BNS 356 - IPC 499)", category: "criminal" },
  { term: "Dowry", definition: "Property given by bride's family to groom (Dowry Act 1961)", category: "family" },
  { term: "Evidence", definition: "Information presented to prove facts in court (BSA 63 - Evidence Act 65B)", category: "procedure" },
  { term: "FIR", definition: "First Information Report (BNSS 173 - CrPC 154)", category: "criminal" },
  { term: "Forgery", definition: "Making false document with intent to deceive (BNS 338)", category: "criminal" },
  { term: "Homicide", definition: "Killing of a human being (BNS 103 - IPC 302)", category: "criminal" },
  { term: "Judgment", definition: "Final decision of court (BNSS 428 - CrPC 353)", category: "procedure" },
  { term: "Jurisdiction", definition: "Authority of court to hear cases", category: "procedure" },
  { term: "Kidnapping", definition: "Taking person away without consent (BNS 137 - IPC 363)", category: "criminal" },
  { term: "Maintenance", definition: "Financial support (BNSS 144 - CrPC 125)", category: "family" },
  { term: "Murder", definition: "Unlawful killing with intent (BNS 103 - IPC 302)", category: "criminal" },
  { term: "Rape", definition: "Sexual assault without consent (BNS 64 - IPC 375)", category: "criminal" },
  { term: "Robbery", definition: "Theft with force or threat (BNS 304 - IPC 390)", category: "criminal" },
  { term: "Stalking", definition: "Repeated unwanted attention (BNS 69 - IPC 354D)", category: "criminal" },
  { term: "Theft", definition: "Dishonest taking of property (BNS 303 - IPC 379)", category: "criminal" },
  { term: "Treason", definition: "Betrayal of one's country (BNS 152)", category: "criminal" },
  
  // Procedure Law Terms
  { term: "Affidavit", definition: "A written statement confirmed by oath (BNSS 424 - CrPC 296)", category: "procedure" },
  { term: "Appeal", definition: "Application to higher court to reverse decision (BNSS 415 - CrPC 372)", category: "procedure" },
  { term: "Custody", definition: "Physical detention of a person", category: "procedure" },
  { term: "Interrogation", definition: "Questioning of accused or witnesses", category: "procedure" },
  { term: "Investigation", definition: "Police inquiry into offence (BNSS 176 - CrPC 156)", category: "procedure" },
  { term: "Magistrate", definition: "Judicial officer of lower court (BNSS 10)", category: "procedure" },
  { term: "Notice", definition: "Formal legal communication", category: "procedure" },
  { term: "Plea", definition: "Accused's response to charge", category: "procedure" },
  { term: "Summons", definition: "Court order to appear (BNSS 68 - CrPC 61)", category: "procedure" },
  { term: "Surety", definition: "Person guaranteeing bail conditions", category: "procedure" },
  { term: "Trial", definition: "Court proceeding to determine guilt", category: "procedure" },
  { term: "Warrant", definition: "Court order for arrest (BNSS 69 - CrPC 70)", category: "procedure" },
  
  // Constitutional Terms
  { term: "Article 14", definition: "Right to Equality (Constitution of India)", category: "constitution" },
  { term: "Article 19", definition: "Right to Freedom of Speech and Expression", category: "constitution" },
  { term: "Article 21", definition: "Right to Life and Personal Liberty", category: "constitution" },
  { term: "Article 22", definition: "Protection against Arrest and Detention", category: "constitution" },
  { term: "Article 32", definition: "Right to Constitutional Remedies", category: "constitution" },
  { term: "Article 226", definition: "High Court's Power to Issue Writs", category: "constitution" },
  { term: "Habeas Corpus", definition: "Writ to produce detained person before court", category: "constitution" },
  { term: "Mandamus", definition: "Writ commanding public authority to perform duty", category: "constitution" },
  { term: "Quo Warranto", definition: "Writ questioning authority to hold office", category: "constitution" },
  { term: "Certiorari", definition: "Writ to quash lower court decision", category: "constitution" },
  { term: "Prohibition", definition: "Writ to prevent lower court from exceeding jurisdiction", category: "constitution" },
  
  // Legislation Terms
  { term: "BNS", definition: "Bharatiya Nyaya Sanhita - New criminal code (358 Sections)", category: "legislation" },
  { term: "BNSS", definition: "Bharatiya Nagarik Suraksha Sanhita (531 Sections)", category: "legislation" },
  { term: "BSA", definition: "Bharatiya Sakshya Adhiniyam - New evidence act (170 Sections)", category: "legislation" },
  { term: "IPC", definition: "Indian Penal Code - Old criminal law (Replaced by BNS)", category: "legislation" },
  { term: "CrPC", definition: "Code of Criminal Procedure - Old code (Replaced by BNSS)", category: "legislation" },
  { term: "Evidence Act", definition: "Indian Evidence Act - Old act (Replaced by BSA)", category: "legislation" },
  { term: "IT Act", definition: "Information Technology Act 2000 - Cyber Law", category: "legislation" },
  { term: "RTI Act", definition: "Right to Information Act 2005", category: "legislation" },
  { term: "Domestic Violence Act", definition: "Protection of Women from Domestic Violence Act 2005", category: "legislation" },
  { term: "POSH Act", definition: "Sexual Harassment of Women at Workplace Act 2013", category: "legislation" },
  
  // Family Law Terms
  { term: "Adoption", definition: "Legal process of becoming parent", category: "family" },
  { term: "Child Custody", definition: "Guardianship of a child after divorce", category: "family" },
  { term: "Divorce", definition: "Legal dissolution of marriage", category: "family" },
  { term: "Maintenance", definition: "Financial support for family (BNSS 144)", category: "family" },
  { term: "Marriage", definition: "Legal union between two persons", category: "family" },
  { term: "Hindu Marriage Act", definition: "Act governing Hindu marriages (1955)", category: "family" },
  { term: "Special Marriage Act", definition: "Interfaith marriage act (1954)", category: "family" },
  
  // Cyber Law Terms
  { term: "Cyber Crime", definition: "Criminal activity using computers/Internet", category: "cyber" },
  { term: "Data Theft", definition: "Stealing digital information (IT Act 2000)", category: "cyber" },
  { term: "Hacking", definition: "Unauthorized access to computer systems (IT Act 2000)", category: "cyber" },
  { term: "Phishing", definition: "Fraudulent email to steal information", category: "cyber" },
  { term: "Virus", definition: "Malicious software (IT Act 2000)", category: "cyber" },
  { term: "Section 66D", definition: "Online Fraud - IT Act 2000", category: "cyber" },
  { term: "Section 66C", definition: "Identity Theft - IT Act 2000", category: "cyber" },
  
  // General Legal Terms
  { term: "Act", definition: "A bill passed by Parliament/Legislature", category: "general" },
  { term: "Amendment", definition: "Change in law", category: "general" },
  { term: "Bill", definition: "Proposed legislation", category: "general" },
  { term: "Enactment", definition: "Passing of a law", category: "general" },
  { term: "Ordinance", definition: "Law promulgated by executive", category: "general" },
  { term: "Precedent", definition: "Previous court decisions used as guide", category: "general" },
  { term: "Statute", definition: "Formal written law", category: "general" },
  { term: "Tribunal", definition: "Quasi-judicial body", category: "general" }
];

// ============================================================
// COMPLETE SECTIONS DB FALLBACK (In case import fails)
// ============================================================
const FALLBACK_SECTIONS = {
    'BNS': {
        chapters: [
            {
                name: 'General Provisions',
                sections: [
                    { number: 'BNS 1', title: 'Short Title and Commencement', text: 'This Act may be called the Bharatiya Nyaya Sanhita, 2023.' },
                    { number: 'BNS 2', title: 'Definition of Offences', text: 'Defines various offences under the new criminal code.' }
                ]
            },
            {
                name: 'Offences Against the State',
                sections: [
                    { number: 'BNS 152', title: 'Treason', text: 'Acts against the security of the State.' }
                ]
            },
            {
                name: 'Offences Against the Human Body',
                sections: [
                    { number: 'BNS 64', title: 'Rape', text: 'Sexual assault without consent. 10 years minimum.' },
                    { number: 'BNS 69', title: 'Stalking', text: 'Repeated unwanted attention.' },
                    { number: 'BNS 85', title: 'Cruelty', text: 'Cruelty by husband or relatives. 3 years.' },
                    { number: 'BNS 103', title: 'Murder', text: 'Causing death with intention. Death or Life.' },
                    { number: 'BNS 137', title: 'Kidnapping', text: 'Taking person away without consent.' }
                ]
            },
            {
                name: 'Offences Against Property',
                sections: [
                    { number: 'BNS 303', title: 'Theft', text: 'Taking movable property without consent. 3 years.' },
                    { number: 'BNS 304', title: 'Robbery', text: 'Theft with violence. 7 years.' },
                    { number: 'BNS 318', title: 'Cheating', text: 'Fraudulent deception. 7 years.' },
                    { number: 'BNS 338', title: 'Forgery', text: 'Making false document with intent.' }
                ]
            },
            {
                name: 'Offences Against Reputation',
                sections: [
                    { number: 'BNS 356', title: 'Defamation', text: 'False statement harming reputation. 2 years.' }
                ]
            }
        ]
    },
    'BNSS': {
        chapters: [
            {
                name: 'General Provisions',
                sections: [
                    { number: 'BNSS 1', title: 'Short Title', text: 'Bharatiya Nagarik Suraksha Sanhita, 2023' },
                    { number: 'BNSS 10', title: 'Magistrates', text: 'Powers of Judicial Magistrates.' },
                    { number: 'BNSS 60', title: 'Arrest', text: 'Procedure for arrest without warrant.' }
                ]
            },
            {
                name: 'FIR and Investigation',
                sections: [
                    { number: 'BNSS 173', title: 'FIR', text: 'First Information Report (CrPC 154).' },
                    { number: 'BNSS 176', title: 'Investigation', text: 'Police investigation powers (CrPC 156).' },
                    { number: 'BNSS 193', title: 'Chargesheet', text: 'Police report after investigation (CrPC 173).' }
                ]
            },
            {
                name: 'Maintenance and Family Law',
                sections: [
                    { number: 'BNSS 144', title: 'Maintenance', text: 'Maintenance for wife, children, parents (CrPC 125).' }
                ]
            },
            {
                name: 'Bail and Custody',
                sections: [
                    { number: 'BNSS 480', title: 'Regular Bail', text: 'Grant of bail (CrPC 437).' },
                    { number: 'BNSS 482', title: 'Anticipatory Bail', text: 'Pre-arrest bail (CrPC 438).' },
                    { number: 'BNSS 484', title: 'Bail Bond', text: 'Execution of bail bond (CrPC 441).' }
                ]
            },
            {
                name: 'Trial and Procedure',
                sections: [
                    { number: 'BNSS 428', title: 'Judgment', text: 'Judgment of court (CrPC 353).' },
                    { number: 'BNSS 415', title: 'Appeal', text: 'Appeals from lower courts (CrPC 372).' }
                ]
            }
        ]
    },
    'BSA': {
        chapters: [
            {
                name: 'General Provisions',
                sections: [
                    { number: 'BSA 1', title: 'Short Title', text: 'Bharatiya Sakshya Adhiniyam, 2023' }
                ]
            },
            {
                name: 'Evidence Types',
                sections: [
                    { number: 'BSA 63', title: 'Electronic Evidence', text: 'Admissibility of electronic evidence (Evidence Act 65B).' }
                ]
            }
        ]
    }
};

// Use imported DB or fallback
const SECTIONS = SECTIONS_DB || FALLBACK_SECTIONS;

// ============================================================
// MAIN API HANDLER
// ============================================================
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed',
            allowed: ['GET', 'OPTIONS'],
            status: 'error'
        });
    }

    const { q, type, limit = 50, act, fuzzy = false } = req.query;

    // Validate query
    if (!q || q.length < 1) {
        return res.status(200).json({
            results: [],
            total: 0,
            status: 'success',
            message: 'Please enter a search query',
            suggestions: [
                'Try: FIR, Bail, Cheating, BNS 318, Murder, Maintenance',
                'Try: Section 173, Anticipatory Bail, Cyber Crime',
                'Try: IPC to BNS conversion, BNSS 480, Evidence 63'
            ]
        });
    }

    try {
        const query = q.toLowerCase().trim();
        const results = [];
        const startTime = Date.now();

        // ============================================================
        // 1. SEARCH IN SECTIONS (BNS, BNSS, BSA)
        // ============================================================
        if (!type || type === 'sections' || type === 'all') {
            const acts = act ? [act.toUpperCase()] : ['BNS', 'BNSS', 'BSA'];
            
            for (const actName of acts) {
                const actData = SECTIONS[actName];
                if (!actData) continue;

                for (const chapter of actData.chapters || []) {
                    for (const section of chapter.sections || []) {
                        const numberMatch = section.number.toLowerCase().includes(query);
                        const titleMatch = section.title.toLowerCase().includes(query);
                        const textMatch = section.text.toLowerCase().includes(query);
                        
                        if (numberMatch || titleMatch || textMatch) {
                            // Calculate relevance score
                            let score = 0;
                            let matchedIn = [];
                            
                            if (numberMatch) {
                                score += 10;
                                matchedIn.push('number');
                            }
                            if (titleMatch) {
                                score += 8;
                                matchedIn.push('title');
                            }
                            if (textMatch) {
                                score += 3;
                                matchedIn.push('text');
                            }
                            
                            // Boost score for exact matches
                            if (section.number.toLowerCase() === query) score += 20;
                            if (section.title.toLowerCase() === query) score += 15;
                            
                            results.push({
                                type: 'section',
                                act: actName,
                                chapter: chapter.name || 'General',
                                number: section.number,
                                title: section.title,
                                text: section.text,
                                snippet: getSnippet(section.text, query),
                                score: score,
                                matchedIn: matchedIn,
                                category: 'legal'
                            });
                        }
                    }
                }
            }
        }

        // ============================================================
        // 2. SEARCH IN DICTIONARY
        // ============================================================
        if (!type || type === 'dictionary' || type === 'all') {
            for (const dict of LEGAL_DICTIONARY) {
                const termMatch = dict.term.toLowerCase().includes(query);
                const defMatch = dict.definition.toLowerCase().includes(query);
                const categoryMatch = dict.category.toLowerCase().includes(query);
                
                if (termMatch || defMatch || categoryMatch) {
                    let score = 0;
                    let matchedIn = [];
                    
                    if (termMatch) {
                        score += 8;
                        matchedIn.push('term');
                    }
                    if (defMatch) {
                        score += 5;
                        matchedIn.push('definition');
                    }
                    if (categoryMatch) {
                        score += 3;
                        matchedIn.push('category');
                    }
                    
                    // Boost for exact term match
                    if (dict.term.toLowerCase() === query) score += 15;
                    
                    results.push({
                        type: 'dictionary',
                        term: dict.term,
                        definition: dict.definition,
                        category: dict.category,
                        score: score,
                        matchedIn: matchedIn
                    });
                }
            }
        }

        // ============================================================
        // 3. SUGGESTIONS / RELATED SEARCHES
        // ============================================================
        if (results.length === 0) {
            const suggestions = generateSuggestions(query);
            return res.status(200).json({
                results: [],
                total: 0,
                status: 'success',
                message: 'No results found',
                suggestions: suggestions,
                searchTime: `${Date.now() - startTime}ms`
            });
        }

        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);

        // Apply limit
        const limitNum = parseInt(limit) || 50;
        const paginatedResults = results.slice(0, limitNum);

        // ============================================================
        // 4. GROUP RESULTS BY TYPE
        // ============================================================
        const grouped = {
            sections: paginatedResults.filter(r => r.type === 'section'),
            dictionary: paginatedResults.filter(r => r.type === 'dictionary')
        };

        // ============================================================
        // 5. RESPONSE
        // ============================================================
        res.status(200).json({
            results: paginatedResults,
            total: results.length,
            grouped: grouped,
            stats: {
                totalFound: results.length,
                sectionsFound: grouped.sections.length,
                dictionaryFound: grouped.dictionary.length,
                searchTime: `${Date.now() - startTime}ms`
            },
            query: query,
            filters: { type: type || 'all', act: act || 'all' },
            status: 'success',
            suggestions: generateSuggestions(query, results)
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            error: error.message,
            status: 'error',
            message: 'Failed to perform search'
        });
    }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Get highlighted snippet from text
function getSnippet(text, query, maxLength = 200) {
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(query);
    
    if (index === -1) {
        return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
    }
    
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 50);
    const snippet = text.slice(start, end);
    
    return (start > 0 ? '...' : '') + snippet + (end < text.length ? '...' : '');
}

// Generate search suggestions
function generateSuggestions(query, results = []) {
    const suggestions = [];
    
    // Common legal queries
    const commonQueries = [
        'FIR', 'Bail', 'Cheating', 'Murder', 'Maintenance',
        'BNS 318', 'BNSS 173', 'BNSS 480', 'BNS 103',
        'Anticipatory Bail', 'Cyber Crime', 'Rape', 'Theft',
        'Right to Life', 'Arrest', 'Evidence', 'Appeal'
    ];
    
    // If no results, suggest common queries
    if (results.length === 0) {
        const filtered = commonQueries
            .filter(q => q.toLowerCase().includes(query.toLowerCase()) || 
                         query.toLowerCase().includes(q.toLowerCase()))
            .slice(0, 5);
        
        if (filtered.length === 0) {
            suggestions.push(...commonQueries.slice(0, 5));
        } else {
            suggestions.push(...filtered);
        }
    } else {
        // Suggest related terms from results
        const uniqueTerms = new Set();
        for (const result of results.slice(0, 10)) {
            if (result.type === 'dictionary' && result.term) {
                uniqueTerms.add(result.term);
            }
            if (result.type === 'section' && result.number) {
                uniqueTerms.add(result.number);
            }
        }
        suggestions.push(...Array.from(uniqueTerms).slice(0, 5));
    }
    
    return suggestions;
}

// ============================================================
// EXPORT FOR TESTING
// ============================================================
export { LEGAL_DICTIONARY, getSnippet, generateSuggestions };
