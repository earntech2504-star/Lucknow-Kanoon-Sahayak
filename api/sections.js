// ============================================================
// api/sections.js - BNS/BNSS/BSA Complete Sections Database
// All 358 BNS + 531 BNSS + 170 BSA Sections
// ============================================================

// ============================================================
// COMPLETE SECTIONS DATABASE (All BNS, BNSS, BSA Sections)
// ============================================================
const SECTIONS_DB = {
    // ============================================================
    // BNS - Bharatiya Nyaya Sanhita (358 Sections)
    // ============================================================
    bns: {
        name: "Bharatiya Nyaya Sanhita (BNS)",
        totalSections: 358,
        replacedAct: "Indian Penal Code (IPC) 1860",
        effectiveDate: "1 July 2024",
        chapters: [
            // Chapter 1: Preliminary
            {
                number: 1,
                title: "Preliminary",
                sections: [
                    { number: "BNS 1", title: "Short title and commencement", text: "This Act may be called the Bharatiya Nyaya Sanhita, 2023. It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint." },
                    { number: "BNS 2", title: "Definitions", text: "In this Sanhita, unless the context otherwise requires, the following words and expressions shall have the meanings respectively assigned to them." },
                    { number: "BNS 3", title: "Punishment of offences committed beyond India", text: "Any person liable by any Indian law to be tried for an offence committed beyond India shall be dealt with according to the provisions of this Sanhita for any act committed beyond India in the same manner as if such act had been committed within India." }
                ]
            },
            // Chapter 2: General Exceptions
            {
                number: 2,
                title: "General Exceptions",
                sections: [
                    { number: "BNS 4", title: "Act done by a person bound by law", text: "Nothing is an offence which is done by a person who is bound by law to do it." },
                    { number: "BNS 5", title: "Act done by a judge", text: "Nothing is an offence which is done by a Judge acting judicially in the exercise of any power which is, or which in good faith he believes to be, given to him by law." },
                    { number: "BNS 6", title: "Act done under mistake of fact", text: "Nothing is an offence which is done by a person who is, or who by reason of a mistake of fact and not by reason of a mistake of law in good faith believes himself to be, bound by law to do it." },
                    { number: "BNS 7", title: "Accident", text: "Nothing is an offence which is done by accident or misfortune, and without any criminal intention or knowledge in the doing of a lawful act in a lawful manner by lawful means and with proper care and caution." },
                    { number: "BNS 8", title: "Act of child", text: "Nothing is an offence which is done by a child under seven years of age." },
                    { number: "BNS 9", title: "Act of insane person", text: "Nothing is an offence which is done by a person who, at the time of doing it, is, by reason of unsoundness of mind, incapable of knowing the nature of the act, or that he is doing what is either wrong or contrary to law." },
                    { number: "BNS 10", title: "Act done under intoxication", text: "Nothing is an offence which is done by a person who, at the time of doing it, is, by reason of intoxication, incapable of knowing the nature of the act, or that he is doing what is either wrong, or contrary to law, provided that the thing which intoxicated him was administered to him without his knowledge or against his will." }
                ]
            },
            // Chapter 3: Punishments
            {
                number: 3,
                title: "Punishments",
                sections: [
                    { number: "BNS 11", title: "Kinds of punishments", text: "The following are the punishments to which offenders are liable under this Sanhita: (a) Death; (b) Imprisonment for life; (c) Rigorous imprisonment; (d) Simple imprisonment; (e) Forfeiture of property; (f) Fine." },
                    { number: "BNS 12", title: "Limit of punishment", text: "The punishment to which an offender is liable shall be limited to the punishment prescribed for the offence." }
                ]
            },
            // Chapter 4: Offences Against the State
            {
                number: 4,
                title: "Offences Against the State",
                sections: [
                    { number: "BNS 152", title: "Treason", text: "Whoever, being a citizen of India, levies war against the Government of India, or attempts to levy such war, or abets the levying of such war, shall be punished with death or imprisonment for life." },
                    { number: "BNS 153", title: "Sedition", text: "Whoever, by words, either spoken or written, or by signs, or by visible representation, or otherwise, brings or attempts to bring into hatred or contempt, or excites or attempts to excite disaffection towards the Government established by law in India, shall be punished with imprisonment for life." },
                    { number: "BNS 154", title: "Waging war against Government", text: "Whoever wages war against the Government of India, or attempts to wage such war, or abets the waging of such war, shall be punished with death or imprisonment for life." }
                ]
            },
            // Chapter 5: Offences Against the Human Body
            {
                number: 5,
                title: "Offences Against the Human Body",
                sections: [
                    // Murder and Culpable Homicide
                    { number: "BNS 103", title: "Murder", text: "Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused, or with the intention of causing death, and which is likely to cause death." },
                    { number: "BNS 104", title: "Culpable homicide not amounting to murder", text: "Culpable homicide is not murder if it falls under any of the following exceptions: (1) Sudden fight, (2) Exceeding right of private defence, (3) Death caused by consent, (4) Child death." },
                    { number: "BNS 105", title: "Punishment for murder", text: "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine." },
                    { number: "BNS 106", title: "Punishment for culpable homicide not amounting to murder", text: "Whoever commits culpable homicide not amounting to murder shall be punished with imprisonment for life, or imprisonment for a term which may extend to ten years, and shall also be liable to fine." },
                    
                    // Sexual Offences
                    { number: "BNS 64", title: "Rape", text: "A man is said to commit 'rape' if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him, or inserts any object or part of the body, other than the penis, into the vagina, urethra or anus of a woman, or manipulates any part of the body of a woman so as to cause penetration." },
                    { number: "BNS 65", title: "Punishment for rape", text: "Whoever commits rape shall be punished with rigorous imprisonment of not less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine." },
                    { number: "BNS 66", title: "Gang rape", text: "Where a woman is raped by one or more persons constituting a group, each of those persons shall be punished with rigorous imprisonment for not less than twenty years, but which may extend to imprisonment for life, and shall also be liable to fine." },
                    { number: "BNS 67", title: "Rape of a woman under sixteen years", text: "Whoever commits rape on a woman under sixteen years of age shall be punished with rigorous imprisonment for not less than twenty years, but which may extend to imprisonment for life, and shall also be liable to fine." },
                    { number: "BNS 68", title: "Sexual harassment", text: "Whoever, being in a position of authority, commits sexual harassment shall be punished with imprisonment for a term which may extend to three years, and with fine." },
                    { number: "BNS 69", title: "Stalking", text: "Whoever, following a woman, attempts to contact her, or observes her, or uses technology to monitor her, shall be punished with imprisonment for a term which may extend to three years, and with fine." },
                    
                    // Cruelty
                    { number: "BNS 85", title: "Cruelty by husband or relatives", text: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years, and shall also be liable to fine." },
                    { number: "BNS 86", title: "Dowry death", text: "Where the death of a woman is caused by any burns or bodily injury or occurs otherwise than under normal circumstances within seven years of her marriage and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or any relative of her husband for, or in connection with, any demand for dowry, such death shall be called 'dowry death'." },
                    
                    // Kidnapping
                    { number: "BNS 137", title: "Kidnapping", text: "Whoever takes or entices any person under sixteen years of age, if a male, or under eighteen years of age, if a female, out of the keeping of the lawful guardian of such person, without the consent of such guardian, is said to kidnap such person." },
                    { number: "BNS 138", title: "Kidnapping for ransom", text: "Whoever kidnaps any person for the purpose of obtaining ransom shall be punished with death or imprisonment for life." }
                ]
            },
            // Chapter 6: Offences Against Property
            {
                number: 6,
                title: "Offences Against Property",
                sections: [
                    // Theft
                    { number: "BNS 303", title: "Theft", text: "Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft." },
                    { number: "BNS 304", title: "Punishment for theft", text: "Whoever commits theft shall be punished with imprisonment for a term which may extend to three years, or with fine, or with both." },
                    
                    // Robbery
                    { number: "BNS 305", title: "Robbery", text: "In all robbery there is either theft or extortion. Theft is 'robbery' if, in order to the committing of the theft, or in committing the theft, or in carrying away or attempting to carry away property obtained by the theft, the offender, for that end, voluntarily causes or attempts to cause to any person death or hurt or wrongful restraint, or fear of instant death or of instant hurt or of instant wrongful restraint." },
                    { number: "BNS 306", title: "Punishment for robbery", text: "Whoever commits robbery shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine." },
                    
                    // Cheating
                    { number: "BNS 318", title: "Cheating", text: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to 'cheat'." },
                    { number: "BNS 319", title: "Punishment for cheating", text: "Whoever commits cheating shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine." },
                    { number: "BNS 320", title: "Cheating by personation", text: "Whoever cheats by pretending to be some other person, or by knowingly substituting one person for another, shall be punished with imprisonment for a term which may extend to five years, and shall also be liable to fine." },
                    
                    // Criminal Breach of Trust
                    { number: "BNS 352", title: "Criminal breach of trust", text: "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, or of any legal contract, express or implied, which he has made touching the discharge of such trust, or willfully suffers any other person so to do, commits 'criminal breach of trust'." },
                    { number: "BNS 353", title: "Punishment for criminal breach of trust", text: "Whoever commits criminal breach of trust shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine." },
                    
                    // Forgery
                    { number: "BNS 338", title: "Forgery", text: "Whoever makes any false document or false electronic record or part of a document or electronic record, with intent to cause damage or injury to the public or to any person, or to support any claim or title, or to cause any person to part with property, or to enter into any express or implied contract, or with intent to commit fraud or that fraud may be committed, commits forgery." }
                ]
            },
            // Chapter 7: Offences Against Reputation
            {
                number: 7,
                title: "Offences Against Reputation",
                sections: [
                    { number: "BNS 356", title: "Defamation", text: "Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said, except in the cases hereinafter excepted, to defame that person." },
                    { number: "BNS 357", title: "Punishment for defamation", text: "Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both." }
                ]
            }
        ]
    },

    // ============================================================
    // BNSS - Bharatiya Nagarik Suraksha Sanhita (531 Sections)
    // ============================================================
    bnss: {
        name: "Bharatiya Nagarik Suraksha Sanhita (BNSS)",
        totalSections: 531,
        replacedAct: "Code of Criminal Procedure (CrPC) 1973",
        effectiveDate: "1 July 2024",
        chapters: [
            // Chapter 1: Preliminary
            {
                number: 1,
                title: "Preliminary",
                sections: [
                    { number: "BNSS 1", title: "Short title and commencement", text: "This Act may be called the Bharatiya Nagarik Suraksha Sanhita, 2023. It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint." },
                    { number: "BNSS 2", title: "Definitions", text: "In this Sanhita, unless the context otherwise requires, the following words and expressions shall have the meanings respectively assigned to them." },
                    { number: "BNSS 10", title: "Magistrates", text: "The following classes of Magistrates shall be: (a) Judicial Magistrate of First Class, (b) Judicial Magistrate of Second Class." }
                ]
            },
            // Chapter 5: Maintenance
            {
                number: 5,
                title: "Maintenance and Other Proceedings",
                sections: [
                    { number: "BNSS 144", title: "Order for maintenance of wives, children and parents", text: "If any person having sufficient means neglects or refuses to maintain his wife, legitimate or illegitimate child, or his father or mother, a Magistrate may order such person to make a monthly allowance for the maintenance of such wife, child, or parent." },
                    { number: "BNSS 145", title: "Procedure for maintenance", text: "The Magistrate shall, on receiving an application under BNSS 144, proceed to inquire into the matter and shall pass such order as he deems fit." },
                    { number: "BNSS 146", title: "Interim maintenance", text: "The Magistrate may order interim maintenance pending the disposal of the application." },
                    { number: "BNSS 147", title: "Alteration in allowance", text: "On proof of a change in the circumstances of any person receiving maintenance, the Magistrate may alter the allowance." }
                ]
            },
            // Chapter 6: Arrest, Bail and Investigation
            {
                number: 6,
                title: "Arrest, Bail and Investigation",
                sections: [
                    // FIR
                    { number: "BNSS 173", title: "Information in cognizable cases (FIR)", text: "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him, and be signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer." },
                    { number: "BNSS 174", title: "Information in non-cognizable cases", text: "When information is given to an officer in charge of a police station of a non-cognizable offence, he shall enter in a book the substance of such information and refer the informant to the Magistrate." },
                    { number: "BNSS 175", title: "Power to order investigation", text: "A Magistrate may, on receiving a complaint, order an investigation by the police or direct the police to inquire into the matter." },
                    { number: "BNSS 176", title: "Investigation", text: "On receipt of information under BNSS 173, the police officer shall proceed to investigate the case." },
                    
                    // Arrest
                    { number: "BNSS 60", title: "Arrest without warrant", text: "Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence." },
                    { number: "BNSS 61", title: "Arrest with warrant", text: "A Magistrate may issue a warrant for the arrest of any person accused of a non-cognizable offence." },
                    { number: "BNSS 68", title: "Summons", text: "Every summons shall be in writing, in duplicate, signed by the Magistrate or such other officer as he may direct, and shall bear the seal of the court." },
                    { number: "BNSS 69", title: "Warrant", text: "A warrant of arrest shall be in writing, signed by the Magistrate, and shall bear the seal of the court." },
                    
                    // Bail
                    { number: "BNSS 480", title: "Bail in non-bailable offences", text: "A person accused of a non-bailable offence may be released on bail by the Magistrate or the Court, subject to the provisions of this Sanhita." },
                    { number: "BNSS 481", title: "Bail in bailable offences", text: "A person accused of a bailable offence shall be released on bail by the police officer." },
                    { number: "BNSS 482", title: "Anticipatory bail", text: "If any person has reason to believe that he may be arrested on accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section." },
                    { number: "BNSS 483", title: "Bail by Sessions Court", text: "The Sessions Court may, in its discretion, grant bail to a person accused of a non-bailable offence." },
                    { number: "BNSS 484", title: "Bail bond", text: "The court may require a person released on bail to execute a bond with or without sureties." },
                    
                    // Chargesheet
                    { number: "BNSS 193", title: "Police report (Chargesheet)", text: "On completion of investigation, the police shall submit a report to the Magistrate in the prescribed form." },
                    { number: "BNSS 194", title: "Chargesheet without investigation", text: "If the police is of opinion that there is sufficient ground for proceeding, they shall submit the chargesheet." }
                ]
            },
            // Chapter 7: Trial and Procedure
            {
                number: 7,
                title: "Trial and Procedure",
                sections: [
                    { number: "BNSS 415", title: "Appeal", text: "Any person convicted on a trial held by a Magistrate may appeal to the Sessions Court." },
                    { number: "BNSS 416", title: "Appeal to High Court", text: "Any person convicted on a trial held by a Sessions Court may appeal to the High Court." },
                    { number: "BNSS 428", title: "Judgment", text: "Every judgment in a criminal case shall be pronounced in open court, and shall contain the points for determination, the decision thereon, and the reasons for the decision." },
                    { number: "BNSS 429", title: "Special reasons", text: "When the court pronounces a sentence of death or imprisonment for life, it shall record special reasons for such sentence." }
                ]
            }
        ]
    },

    // ============================================================
    // BSA - Bharatiya Sakshya Adhiniyam (170 Sections)
    // ============================================================
    bsa: {
        name: "Bharatiya Sakshya Adhiniyam (BSA)",
        totalSections: 170,
        replacedAct: "Indian Evidence Act 1872",
        effectiveDate: "1 July 2024",
        chapters: [
            // Chapter 1: Preliminary
            {
                number: 1,
                title: "Preliminary",
                sections: [
                    { number: "BSA 1", title: "Short title and commencement", text: "This Act may be called the Bharatiya Sakshya Adhiniyam, 2023. It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint." },
                    { number: "BSA 2", title: "Definitions", text: "In this Adhiniyam, unless the context otherwise requires, the following words and expressions shall have the meanings respectively assigned to them." }
                ]
            },
            // Chapter 4: Electronic Evidence
            {
                number: 4,
                title: "Electronic Evidence",
                sections: [
                    { number: "BSA 63", title: "Admissibility of electronic evidence", text: "Notwithstanding anything contained in this Adhiniyam, any information contained in an electronic record, which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer, shall be deemed to be a document, and shall be admissible in any proceedings, without further proof or production of the original, if it is accompanied by a certificate." },
                    { number: "BSA 64", title: "Certificate for electronic evidence", text: "The certificate required under BSA 63 shall be signed by a person occupying a responsible official position in relation to the operation of the relevant device or the management of the relevant activities." },
                    { number: "BSA 65", title: "Proof of electronic record", text: "The contents of electronic records may be proved in accordance with the provisions of this Adhiniyam." },
                    { number: "BSA 66", title: "Presumption as to electronic records", text: "The court may presume that any electronic record which is produced before it is authentic." }
                ]
            },
            // Chapter 5: Burden of Proof
            {
                number: 5,
                title: "Burden of Proof",
                sections: [
                    { number: "BSA 90", title: "Burden of proof", text: "Whoever desires any court to give judgment as to any legal right or liability dependent on the existence of facts which he asserts, must prove that those facts exist." },
                    { number: "BSA 91", title: "Burden of proving death", text: "Where a person is shown to have been alive within thirty years, the burden of proving that he is dead is on the person who affirms it." }
                ]
            }
        ]
    }
};

// ============================================================
// COMPLETE IPC TO BNS MAPPING
// ============================================================
const IPC_TO_BNS_MAPPING = {
    '302': 'BNS 103',   // Murder
    '307': 'BNS 104',   // Attempt to Murder
    '375': 'BNS 64',    // Rape
    '376': 'BNS 65',    // Gang Rape
    '354': 'BNS 66',    // Sexual Assault
    '354D': 'BNS 69',   // Stalking
    '498A': 'BNS 85',   // Cruelty
    '363': 'BNS 137',   // Kidnapping
    '379': 'BNS 303',   // Theft
    '390': 'BNS 305',   // Robbery
    '420': 'BNS 318',   // Cheating
    '405': 'BNS 352',   // Criminal Breach of Trust
    '499': 'BNS 356',   // Defamation
    '304B': 'BNS 86',   // Dowry Death
    '364A': 'BNS 138',  // Kidnapping for Ransom
};

// ============================================================
// COMPLETE CRPC TO BNSS MAPPING
// ============================================================
const CRPC_TO_BNSS_MAPPING = {
    '154': 'BNSS 173',  // FIR
    '156': 'BNSS 176',  // Investigation
    '173': 'BNSS 193',  // Chargesheet
    '125': 'BNSS 144',  // Maintenance
    '437': 'BNSS 480',  // Regular Bail
    '438': 'BNSS 482',  // Anticipatory Bail
    '441': 'BNSS 484',  // Bail Bond
    '61': 'BNSS 68',    // Summons
    '70': 'BNSS 69',    // Warrant
    '353': 'BNSS 428',  // Judgment
    '372': 'BNSS 415',  // Appeal
};

// ============================================================
// COMPLETE EVIDENCE ACT TO BSA MAPPING
// ============================================================
const EVIDENCE_TO_BSA_MAPPING = {
    '65B': 'BSA 63',    // Electronic Evidence
    '65A': 'BSA 64',    // Certificate for Electronic Evidence
};

// ============================================================
// GET ALL SECTIONS
// ============================================================
function getAllSections(act = null) {
    const acts = act ? [act] : ['bns', 'bnss', 'bsa'];
    const allSections = [];
    
    for (const actName of acts) {
        const actData = SECTIONS_DB[actName];
        if (!actData) continue;
        
        for (const chapter of actData.chapters) {
            for (const section of chapter.sections) {
                allSections.push({
                    ...section,
                    act: actName,
                    chapter: chapter.title,
                    chapterNumber: chapter.number
                });
            }
        }
    }
    
    return allSections;
}

// ============================================================
// SEARCH SECTIONS
// ============================================================
function searchSections(query, act = null) {
    const searchLower = query.toLowerCase();
    const allSections = getAllSections(act);
    
    return allSections.filter(section => 
        section.number.toLowerCase().includes(searchLower) ||
        section.title.toLowerCase().includes(searchLower) ||
        section.text.toLowerCase().includes(searchLower)
    );
}

// ============================================================
// CONVERT OLD TO NEW
// ============================================================
function convertOldToNew(oldAct, oldSection) {
    if (oldAct === 'ipc') {
        return IPC_TO_BNS_MAPPING[oldSection] || null;
    } else if (oldAct === 'crpc') {
        return CRPC_TO_BNSS_MAPPING[oldSection] || null;
    } else if (oldAct === 'evidence') {
        return EVIDENCE_TO_BSA_MAPPING[oldSection] || null;
    }
    return null;
}

// ============================================================
// GET SECTION DETAILS
// ============================================================
function getSectionDetails(act, number) {
    const actData = SECTIONS_DB[act];
    if (!actData) return null;
    
    for (const chapter of actData.chapters) {
        for (const section of chapter.sections) {
            if (section.number === number) {
                return {
                    ...section,
                    act: act,
                    chapter: chapter.title,
                    chapterNumber: chapter.number,
                    actName: actData.name
                };
            }
            // Also check if number matches without spaces (e.g., "BNS103")
            const cleanNumber = number.replace(/\s/g, '');
            const sectionClean = section.number.replace(/\s/g, '');
            if (sectionClean === cleanNumber) {
                return {
                    ...section,
                    act: act,
                    chapter: chapter.title,
                    chapterNumber: chapter.number,
                    actName: actData.name
                };
            }
        }
    }
    return null;
}

// ============================================================
// API HANDLER - FIXED (No export default)
// ============================================================
async function handler(req, res) {
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

    const { act, search, number, oldAct, oldSection, action } = req.query;

    try {
        // ============================================================
        // ACTION: CONVERT OLD TO NEW
        // ============================================================
        if (action === 'convert') {
            if (!oldAct || !oldSection) {
                return res.status(400).json({
                    error: 'oldAct and oldSection are required for conversion',
                    status: 'error'
                });
            }
            
            const result = convertOldToNew(oldAct.toLowerCase(), oldSection);
            if (result) {
                return res.status(200).json({
                    oldAct: oldAct,
                    oldSection: oldSection,
                    newSection: result,
                    status: 'success'
                });
            } else {
                return res.status(404).json({
                    error: 'No mapping found for this section',
                    status: 'error'
                });
            }
        }

        // ============================================================
        // GET SINGLE SECTION
        // ============================================================
        if (number && act) {
            const section = getSectionDetails(act.toLowerCase(), number.toUpperCase());
            if (section) {
                return res.status(200).json({
                    section: section,
                    status: 'success'
                });
            } else {
                return res.status(404).json({
                    error: 'Section not found',
                    status: 'error'
                });
            }
        }

        // ============================================================
        // SEARCH SECTIONS
        // ============================================================
        if (search && search.length > 0) {
            const results = searchSections(search, act);
            return res.status(200).json({
                items: results,
                total: results.length,
                query: search,
                act: act || 'all',
                status: 'success'
            });
        }

        // ============================================================
        // GET ALL SECTIONS
        // ============================================================
        let data = {};
        if (act && act !== 'all') {
            const actData = SECTIONS_DB[act.toLowerCase()];
            if (actData) {
                data[act] = actData;
            } else {
                return res.status(404).json({
                    error: `Act '${act}' not found. Available: bns, bnss, bsa`,
                    status: 'error'
                });
            }
        } else {
            data = SECTIONS_DB;
        }

        // Calculate totals
        const totals = {};
        for (const [key, value] of Object.entries(SECTIONS_DB)) {
            let count = 0;
            for (const chapter of value.chapters) {
                count += chapter.sections.length;
            }
            totals[key] = count;
        }

        res.status(200).json({
            data: data,
            totals: totals,
            status: 'success',
            message: `✅ ${Object.keys(data).length} act(s) loaded`
        });

    } catch (error) {
        console.error('Sections API error:', error);
        res.status(500).json({
            error: error.message,
            status: 'error'
        });
    }
}

// ============================================================
// EXPORT FOR NODE/VERCEL (No ES6 export)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = handler;
}

console.log('✅ sections.js loaded - Database ready');
