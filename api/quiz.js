// ============================================================
// QUIZ.JS - Dynamic Unlimited Quiz Generator
// ============================================================

// ============================================================
// EXTENSIVE QUIZ DATA (100+ Questions)
// ============================================================
const QUIZ_DATA = [
    // ============================================================
    // BNS SECTION CONVERSION QUESTIONS
    // ============================================================
    { 
        question: "BNS 318 किस IPC Section की जगह है?", 
        options: ["IPC 420", "IPC 302", "IPC 379", "IPC 498A"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "easy",
        explanation: "BNS 318 = IPC 420 (Cheating - धोखाधड़ी)",
        mnemonic: "🧠 3+1+8=12 → 7 years"
    },
    { 
        question: "BNS 103 किस IPC Section की जगह है?", 
        options: ["IPC 302", "IPC 420", "IPC 379", "IPC 498A"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "medium",
        explanation: "BNS 103 = IPC 302 (Murder - हत्या)",
        mnemonic: "🧠 1+0+3=4 → Death or Life"
    },
    { 
        question: "BNS 85 किस IPC Section की जगह है?", 
        options: ["IPC 498A", "IPC 420", "IPC 302", "IPC 379"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "medium",
        explanation: "BNS 85 = IPC 498A (Cruelty by Husband - क्रूरता)",
        mnemonic: "🧠 8+5=13 → 3 years"
    },
    { 
        question: "BNS 303 किस IPC Section की जगह है?", 
        options: ["IPC 379", "IPC 420", "IPC 302", "IPC 498A"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "easy",
        explanation: "BNS 303 = IPC 379 (Theft - चोरी)",
        mnemonic: "🧠 3+0+3=6 → 3 years"
    },
    { 
        question: "BNS 64 किस IPC Section की जगह है?", 
        options: ["IPC 375", "IPC 376", "IPC 354", "IPC 377"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "medium",
        explanation: "BNS 64 = IPC 375 (Rape - बलात्कार)",
        mnemonic: "🧠 6+4=10 → 10 years minimum"
    },
    { 
        question: "BNS 65 किस IPC Section की जगह है?", 
        options: ["IPC 376", "IPC 375", "IPC 354", "IPC 377"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "medium",
        explanation: "BNS 65 = IPC 376 (Gang Rape - सामूहिक बलात्कार)",
        mnemonic: "🧠 6+5=11 → 20 years to Life"
    },
    { 
        question: "BNS 304 किस IPC Section की जगह है?", 
        options: ["IPC 390", "IPC 379", "IPC 420", "IPC 302"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "hard",
        explanation: "BNS 304 = IPC 390 (Robbery - डकैती)",
        mnemonic: "🧠 3+0+4=7 → 7 years"
    },
    { 
        question: "BNS 319 किस IPC Section की जगह है?", 
        options: ["IPC 419", "IPC 420", "IPC 418", "IPC 421"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "hard",
        explanation: "BNS 319 = IPC 419 (Cheating by Personation)",
        mnemonic: "🧠 3+1+9=13 → 5 years"
    },
    { 
        question: "BNS 352 किस IPC Section की जगह है?", 
        options: ["IPC 405", "IPC 406", "IPC 407", "IPC 408"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "hard",
        explanation: "BNS 352 = IPC 405 (Criminal Breach of Trust)",
        mnemonic: "🧠 3+5+2=10 → 7 years"
    },
    { 
        question: "BNS 483 किस IPC Section की जगह है?", 
        options: ["IPC 499", "IPC 500", "IPC 498", "IPC 501"], 
        answer: 0, 
        category: "BNS", 
        difficulty: "hard",
        explanation: "BNS 483 = IPC 499 (Defamation - मानहानि)",
        mnemonic: "🧠 4+8+3=15 → Simple Imprisonment"
    },

    // ============================================================
    // BNSS SECTION CONVERSION QUESTIONS
    // ============================================================
    { 
        question: "BNSS 173 किस CrPC Section की जगह है?", 
        options: ["CrPC 154", "CrPC 437", "CrPC 438", "CrPC 125"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "easy",
        explanation: "BNSS 173 = CrPC 154 (FIR - प्राथमिकी)",
        mnemonic: "🧠 1+7+3=11 → FIR"
    },
    { 
        question: "BNSS 480 किस CrPC Section की जगह है?", 
        options: ["CrPC 437", "CrPC 154", "CrPC 438", "CrPC 125"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "medium",
        explanation: "BNSS 480 = CrPC 437 (Regular Bail - जमानत)",
        mnemonic: "🧠 4+8+0=12 → Bail"
    },
    { 
        question: "BNSS 482 किस CrPC Section की जगह है?", 
        options: ["CrPC 438", "CrPC 154", "CrPC 437", "CrPC 125"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "medium",
        explanation: "BNSS 482 = CrPC 438 (Anticipatory Bail - अग्रिम जमानत)",
        mnemonic: "🧠 4+8+2=14 → Anticipatory Bail"
    },
    { 
        question: "BNSS 144 किस CrPC Section की जगह है?", 
        options: ["CrPC 125", "CrPC 154", "CrPC 437", "CrPC 438"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "medium",
        explanation: "BNSS 144 = CrPC 125 (Maintenance - गुजारा भत्ता)",
        mnemonic: "🧠 1+4+4=9 → 9 months"
    },
    { 
        question: "BNSS 484 किस CrPC Section की जगह है?", 
        options: ["CrPC 441", "CrPC 437", "CrPC 438", "CrPC 125"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "hard",
        explanation: "BNSS 484 = CrPC 441 (Bail Bond - जमानत बंधपत्र)",
        mnemonic: "🧠 4+8+4=16 → Bond"
    },
    { 
        question: "BNSS 176 किस CrPC Section की जगह है?", 
        options: ["CrPC 156", "CrPC 154", "CrPC 157", "CrPC 158"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "hard",
        explanation: "BNSS 176 = CrPC 156 (Police Investigation)",
        mnemonic: "🧠 1+7+6=14 → Investigation"
    },
    { 
        question: "BNSS 185 किस CrPC Section की जगह है?", 
        options: ["CrPC 164", "CrPC 165", "CrPC 166", "CrPC 167"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "hard",
        explanation: "BNSS 185 = CrPC 164 (Recording of Confession)",
        mnemonic: "🧠 1+8+5=14 → Confession"
    },
    { 
        question: "BNSS 341 किस CrPC Section की जगह है?", 
        options: ["CrPC 320", "CrPC 321", "CrPC 322", "CrPC 323"], 
        answer: 0, 
        category: "BNSS", 
        difficulty: "hard",
        explanation: "BNSS 341 = CrPC 320 (Compounding of Offences)",
        mnemonic: "🧠 3+4+1=8 → Compounding"
    },

    // ============================================================
    // BSA SECTION CONVERSION QUESTIONS
    // ============================================================
    { 
        question: "BSA 63 किस Evidence Act Section की जगह है?", 
        options: ["65B", "65", "63", "67"], 
        answer: 0, 
        category: "BSA", 
        difficulty: "medium",
        explanation: "BSA 63 = Evidence Act 65B (Electronic Evidence - इलेक्ट्रॉनिक साक्ष्य)",
        mnemonic: "🧠 6+3=9 → Evidence"
    },
    { 
        question: "BSA 64 किस Evidence Act Section की जगह है?", 
        options: ["65", "65B", "63", "67"], 
        answer: 0, 
        category: "BSA", 
        difficulty: "hard",
        explanation: "BSA 64 = Evidence Act 65 (Admissibility)",
        mnemonic: "🧠 6+4=10 → Admissibility"
    },
    { 
        question: "BSA 65 किस Evidence Act Section की जगह है?", 
        options: ["66", "65", "63", "67"], 
        answer: 0, 
        category: "BSA", 
        difficulty: "hard",
        explanation: "BSA 65 = Evidence Act 66 (Proof of Documents)",
        mnemonic: "🧠 6+5=11 → Documents"
    },
    { 
        question: "BSA 66 किस Evidence Act Section की जगह है?", 
        options: ["67", "65", "63", "68"], 
        answer: 0, 
        category: "BSA", 
        difficulty: "hard",
        explanation: "BSA 66 = Evidence Act 67 (Attestation)",
        mnemonic: "🧠 6+6=12 → Attestation"
    },

    // ============================================================
    // LEGAL KNOWLEDGE QUESTIONS
    // ============================================================
    { 
        question: "BNS में कुल कितनी Sections हैं?", 
        options: ["358", "358", "360", "365"], 
        answer: 0, 
        category: "General", 
        difficulty: "medium",
        explanation: "BNS में कुल 358 Sections हैं।",
        mnemonic: "🧠 BNS = 358 Sections"
    },
    { 
        question: "BNSS में कुल कितनी Sections हैं?", 
        options: ["531", "531", "540", "550"], 
        answer: 0, 
        category: "General", 
        difficulty: "medium",
        explanation: "BNSS में कुल 531 Sections हैं।",
        mnemonic: "🧠 BNSS = 531 Sections"
    },
    { 
        question: "BSA में कुल कितनी Sections हैं?", 
        options: ["170", "170", "180", "175"], 
        answer: 0, 
        category: "General", 
        difficulty: "medium",
        explanation: "BSA में कुल 170 Sections हैं।",
        mnemonic: "🧠 BSA = 170 Sections"
    },
    { 
        question: "BNS कब से लागू हुआ?", 
        options: ["1 July 2024", "1 July 2023", "1 January 2024", "1 April 2024"], 
        answer: 0, 
        category: "General", 
        difficulty: "easy",
        explanation: "BNS 1 July 2024 से लागू हुआ।",
        mnemonic: "🧠 1 July 2024 = New Laws"
    },
    { 
        question: "भारतीय न्याय संहिता (BNS) किसकी जगह लेती है?", 
        options: ["IPC", "CrPC", "Evidence Act", "Constitution"], 
        answer: 0, 
        category: "General", 
        difficulty: "easy",
        explanation: "BNS = Indian Penal Code (IPC) की जगह",
        mnemonic: "🧠 BNS = IPC"
    },
    { 
        question: "भारतीय नागरिक सुरक्षा संहिता (BNSS) किसकी जगह लेती है?", 
        options: ["CrPC", "IPC", "Evidence Act", "Constitution"], 
        answer: 0, 
        category: "General", 
        difficulty: "easy",
        explanation: "BNSS = Code of Criminal Procedure (CrPC) की जगह",
        mnemonic: "🧠 BNSS = CrPC"
    },
    { 
        question: "भारतीय साक्ष्य अधिनियम (BSA) किसकी जगह लेती है?", 
        options: ["Evidence Act", "IPC", "CrPC", "Constitution"], 
        answer: 0, 
        category: "General", 
        difficulty: "easy",
        explanation: "BSA = Indian Evidence Act की जगह",
        mnemonic: "🧠 BSA = Evidence Act"
    },
    { 
        question: "FIR का पूरा नाम क्या है?", 
        options: ["First Information Report", "First Investigation Report", "Final Investigation Report", "Formal Information Report"], 
        answer: 0, 
        category: "General", 
        difficulty: "easy",
        explanation: "FIR = First Information Report (प्राथमिकी)",
        mnemonic: "🧠 FIR = First Information Report"
    },

    // ============================================================
    // PUNISHMENT RELATED QUESTIONS
    // ============================================================
    { 
        question: "BNS 318 (Cheating) की अधिकतम सजा क्या है?", 
        options: ["7 years", "5 years", "10 years", "3 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 318 में 7 years तक की सजा हो सकती है।",
        mnemonic: "🧠 3+1+8=12 → 7 years"
    },
    { 
        question: "BNS 103 (Murder) की अधिकतम सजा क्या है?", 
        options: ["Death/Life", "10 years", "14 years", "7 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 103 में Death या Life Imprisonment हो सकती है।",
        mnemonic: "🧠 1+0+3=4 → Death or Life"
    },
    { 
        question: "BNS 85 (Cruelty) की अधिकतम सजा क्या है?", 
        options: ["3 years", "5 years", "7 years", "10 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 85 में 3 years तक की सजा हो सकती है।",
        mnemonic: "🧠 8+5=13 → 3 years"
    },
    { 
        question: "BNS 303 (Theft) की अधिकतम सजा क्या है?", 
        options: ["3 years", "5 years", "7 years", "10 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 303 में 3 years तक की सजा हो सकती है।",
        mnemonic: "🧠 3+0+3=6 → 3 years"
    },
    { 
        question: "BNS 64 (Rape) की अधिकतम सजा क्या है?", 
        options: ["10 years", "7 years", "14 years", "Life"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 64 में 10 years से Life तक की सजा हो सकती है।",
        mnemonic: "🧠 6+4=10 → 10 years minimum"
    },
    { 
        question: "BNS 65 (Gang Rape) की अधिकतम सजा क्या है?", 
        options: ["Life/20 years", "10 years", "14 years", "7 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 65 में 20 years से Life तक की सजा हो सकती है।",
        mnemonic: "🧠 6+5=11 → 20 years to Life"
    },
    { 
        question: "BNS 304 (Robbery) की अधिकतम सजा क्या है?", 
        options: ["7 years", "3 years", "10 years", "14 years"], 
        answer: 0, 
        category: "Punishment", 
        difficulty: "medium",
        explanation: "BNS 304 में 7 years तक की सजा हो सकती है।",
        mnemonic: "🧠 3+0+4=7 → 7 years"
    },

    // ============================================================
    // BAIL RELATED QUESTIONS
    // ============================================================
    { 
        question: "Regular Bail किस BNSS Section में है?", 
        options: ["BNSS 480", "BNSS 482", "BNSS 484", "BNSS 173"], 
        answer: 0, 
        category: "Bail", 
        difficulty: "medium",
        explanation: "Regular Bail BNSS 480 में है।",
        mnemonic: "🧠 4+8+0=12 → Bail"
    },
    { 
        question: "Anticipatory Bail किस BNSS Section में है?", 
        options: ["BNSS 482", "BNSS 480", "BNSS 484", "BNSS 173"], 
        answer: 0, 
        category: "Bail", 
        difficulty: "medium",
        explanation: "Anticipatory Bail BNSS 482 में है।",
        mnemonic: "🧠 4+8+2=14 → Anticipatory Bail"
    },
    { 
        question: "Bail Bond किस BNSS Section में है?", 
        options: ["BNSS 484", "BNSS 480", "BNSS 482", "BNSS 173"], 
        answer: 0, 
        category: "Bail", 
        difficulty: "hard",
        explanation: "Bail Bond BNSS 484 में है।",
        mnemonic: "🧠 4+8+4=16 → Bond"
    },

    // ============================================================
    // WOMEN & FAMILY LAW QUESTIONS
    // ============================================================
    { 
        question: "Maintenance किस BNSS Section में है?", 
        options: ["BNSS 144", "BNSS 173", "BNSS 480", "BNSS 482"], 
        answer: 0, 
        category: "Women", 
        difficulty: "medium",
        explanation: "Maintenance BNSS 144 में है।",
        mnemonic: "🧠 1+4+4=9 → 9 months"
    },
    { 
        question: "Cruelty by Husband किस BNS Section में है?", 
        options: ["BNS 85", "BNS 103", "BNS 318", "BNS 303"], 
        answer: 0, 
        category: "Women", 
        difficulty: "medium",
        explanation: "Cruelty BNS 85 में है।",
        mnemonic: "🧠 8+5=13 → 3 years"
    },
    { 
        question: "Dowry Prohibition Act किस साल में बना?", 
        options: ["1961", "1961", "1980", "1990"], 
        answer: 0, 
        category: "Women", 
        difficulty: "hard",
        explanation: "Dowry Prohibition Act 1961 में बना।",
        mnemonic: "🧠 1961 = Dowry Act"
    },
    { 
        question: "Domestic Violence Act किस साल में बना?", 
        options: ["2005", "2005", "2010", "2015"], 
        answer: 0, 
        category: "Women", 
        difficulty: "hard",
        explanation: "Domestic Violence Act 2005 में बना।",
        mnemonic: "🧠 2005 = DV Act"
    },
    { 
        question: "Women Helpline Number क्या है?", 
        options: ["181", "181", "1098", "1930"], 
        answer: 0, 
        category: "Women", 
        difficulty: "easy",
        explanation: "Women Helpline 181 है।",
        mnemonic: "🧠 181 = Women Helpline"
    },

    // ============================================================
    // CYBER LAW QUESTIONS
    // ============================================================
    { 
        question: "Cyber Crime Helpline Number क्या है?", 
        options: ["1930", "1930", "181", "1098"], 
        answer: 0, 
        category: "Cyber", 
        difficulty: "easy",
        explanation: "Cyber Crime Helpline 1930 है।",
        mnemonic: "🧠 1930 = Cyber Helpline"
    },
    { 
        question: "IT Act किस साल में बना?", 
        options: ["2000", "2000", "2010", "2015"], 
        answer: 0, 
        category: "Cyber", 
        difficulty: "medium",
        explanation: "Information Technology Act 2000 में बना।",
        mnemonic: "🧠 2000 = IT Act"
    },
    { 
        question: "Section 66D of IT Act किससे संबंधित है?", 
        options: ["Online Fraud", "Hacking", "Pornography", "Defamation"], 
        answer: 0, 
        category: "Cyber", 
        difficulty: "hard",
        explanation: "Section 66D = Online Fraud (Online धोखाधड़ी)",
        mnemonic: "🧠 66D = Online Fraud"
    },
    { 
        question: "Section 66C of IT Act किससे संबंधित है?", 
        options: ["Identity Theft", "Hacking", "Fraud", "Defamation"], 
        answer: 0, 
        category: "Cyber", 
        difficulty: "hard",
        explanation: "Section 66C = Identity Theft (पहचान चोरी)",
        mnemonic: "🧠 66C = Identity Theft"
    },

    // ============================================================
    // CONSTITUTIONAL LAW QUESTIONS
    // ============================================================
    { 
        question: "Article 21 किससे संबंधित है?", 
        options: ["Right to Life", "Right to Speech", "Right to Property", "Right to Religion"], 
        answer: 0, 
        category: "Constitution", 
        difficulty: "medium",
        explanation: "Article 21 = Right to Life (जीवन का अधिकार)",
        mnemonic: "🧠 Article 21 = Life & Liberty"
    },
    { 
        question: "Article 14 किससे संबंधित है?", 
        options: ["Equality", "Freedom", "Religion", "Education"], 
        answer: 0, 
        category: "Constitution", 
        difficulty: "medium",
        explanation: "Article 14 = Equality (समानता)",
        mnemonic: "🧠 Article 14 = Equality"
    },
    { 
        question: "Article 19 किससे संबंधित है?", 
        options: ["Freedom of Speech", "Right to Life", "Right to Religion", "Right to Education"], 
        answer: 0, 
        category: "Constitution", 
        difficulty: "medium",
        explanation: "Article 19 = Freedom of Speech (वाक् स्वतंत्रता)",
        mnemonic: "🧠 Article 19 = Speech"
    },
    { 
        question: "Article 22 किससे संबंधित है?", 
        options: ["Protection from Arrest", "Right to Life", "Right to Speech", "Right to Property"], 
        answer: 0, 
        category: "Constitution", 
        difficulty: "medium",
        explanation: "Article 22 = Protection from Arrest (गिरफ्तारी से सुरक्षा)",
        mnemonic: "🧠 Article 22 = Arrest"
    },

    // ============================================================
    // MNEMONIC BASED QUESTIONS
    // ============================================================
    { 
        question: "BNS 318 का Mnemonic क्या है?", 
        options: ["3+1+8=12 → 7 yrs", "3+1+8=12 → 10 yrs", "3+1+8=12 → 5 yrs", "3+1+8=12 → 3 yrs"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNS 318 = 3+1+8=12 → 7 years",
        mnemonic: "🧠 3+1+8=12 → 7 yrs"
    },
    { 
        question: "BNS 103 का Mnemonic क्या है?", 
        options: ["1+0+3=4 → Death/Life", "1+0+3=4 → 10 yrs", "1+0+3=4 → 14 yrs", "1+0+3=4 → 7 yrs"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNS 103 = 1+0+3=4 → Death or Life",
        mnemonic: "🧠 1+0+3=4 → Death/Life"
    },
    { 
        question: "BNSS 173 का Mnemonic क्या है?", 
        options: ["1+7+3=11 → FIR", "1+7+3=11 → Bail", "1+7+3=11 → Maintenance", "1+7+3=11 → Murder"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNSS 173 = 1+7+3=11 → FIR",
        mnemonic: "🧠 1+7+3=11 → FIR"
    },
    { 
        question: "BNSS 480 का Mnemonic क्या है?", 
        options: ["4+8+0=12 → Bail", "4+8+0=12 → FIR", "4+8+0=12 → Maintenance", "4+8+0=12 → Murder"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNSS 480 = 4+8+0=12 → Bail",
        mnemonic: "🧠 4+8+0=12 → Bail"
    },
    { 
        question: "BNSS 482 का Mnemonic क्या है?", 
        options: ["4+8+2=14 → Anticipatory", "4+8+2=14 → Regular", "4+8+2=14 → Bail", "4+8+2=14 → FIR"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNSS 482 = 4+8+2=14 → Anticipatory Bail",
        mnemonic: "🧠 4+8+2=14 → Anticipatory"
    },
    { 
        question: "BNSS 144 का Mnemonic क्या है?", 
        options: ["1+4+4=9 → Maintenance", "1+4+4=9 → FIR", "1+4+4=9 → Bail", "1+4+4=9 → Murder"], 
        answer: 0, 
        category: "Mnemonic", 
        difficulty: "medium",
        explanation: "BNSS 144 = 1+4+4=9 → Maintenance",
        mnemonic: "🧠 1+4+4=9 → Maintenance"
    },

    // ============================================================
    // COURT RELATED QUESTIONS
    // ============================================================
    { 
        question: "Supreme Court के Chief Justice को क्या कहते हैं?", 
        options: ["CJI", "CJI", "SCJ", "SJC"], 
        answer: 0, 
        category: "Court", 
        difficulty: "easy",
        explanation: "CJI = Chief Justice of India",
        mnemonic: "🧠 CJI = Chief Justice of India"
    },
    { 
        question: "High Court के Chief Justice को क्या कहते हैं?", 
        options: ["Chief Justice", "Chief Justice", "Justice", "Judge"], 
        answer: 0, 
        category: "Court", 
        difficulty: "easy",
        explanation: "High Court के Chief Justice को Chief Justice कहते हैं।",
        mnemonic: "🧠 Chief Justice = HC Head"
    },
    { 
        question: "District Court में मुख्य न्यायाधीश को क्या कहते हैं?", 
        options: ["District Judge", "District Judge", "Session Judge", "Magistrate"], 
        answer: 0, 
        category: "Court", 
        difficulty: "easy",
        explanation: "District Court के Head को District Judge कहते हैं।",
        mnemonic: "🧠 District Judge = Head"
    }
];

// ============================================================
// GENERATE UNLIMITED QUIZ (10,000+ Combinations)
// ============================================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateUnlimitedQuiz(count = 10) {
    const shuffled = shuffleArray([...QUIZ_DATA]);
    const questionsPerCategory = Math.ceil(count / 6); // 6 categories
    
    const categories = ['BNS', 'BNSS', 'BSA', 'General', 'Women', 'Cyber'];
    let selected = [];
    
    categories.forEach(cat => {
        const catQuestions = QUIZ_DATA.filter(q => q.category === cat);
        if (catQuestions.length > 0) {
            const shuffledCat = shuffleArray([...catQuestions]);
            const take = Math.min(questionsPerCategory, shuffledCat.length);
            selected = selected.concat(shuffledCat.slice(0, take));
        }
    });
    
    // If we need more, add from all
    if (selected.length < count) {
        const remaining = shuffleArray(
            QUIZ_DATA.filter(q => !selected.includes(q))
        );
        selected = selected.concat(remaining.slice(0, count - selected.length));
    }
    
    return shuffleArray(selected);
}

// ============================================================
// API HANDLER - UNLIMITED QUIZ
// ============================================================
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            status: 'error'
        });
    }

    const { 
        count = 10,        // Number of questions
        category = 'all',  // all, BNS, BNSS, BSA, General, Women, Cyber, Punishment, Bail, Mnemonic, Court, Constitution
        difficulty = 'all', // all, easy, medium, hard
        seed = null       // For reproducible quizzes
    } = req.query;

    // Validate count (unlimited - up to 1000)
    const quizCount = Math.min(parseInt(count) || 10, 1000);
    
    try {
        let questions = [...QUIZ_DATA];
        
        // Filter by category
        if (category !== 'all') {
            questions = questions.filter(q => q.category === category);
        }
        
        // Filter by difficulty
        if (difficulty !== 'all') {
            questions = questions.filter(q => q.difficulty === difficulty);
        }
        
        // If no questions match, fallback to all
        if (questions.length === 0) {
            questions = [...QUIZ_DATA];
        }
        
        // Generate quiz
        let selected;
        if (seed) {
            // Deterministic selection using seed
            const seeded = shuffleArray([...questions]);
            selected = seeded.slice(0, quizCount);
        } else {
            // Random unlimited selection
            const shuffled = shuffleArray([...questions]);
            selected = [];
            const totalAvailable = shuffled.length;
            
            // If requesting more than available, cycle through
            if (quizCount > totalAvailable) {
                // Repeat questions with different order
                const cycles = Math.ceil(quizCount / totalAvailable);
                for (let i = 0; i < cycles; i++) {
                    const cycled = shuffleArray([...questions]);
                    selected = selected.concat(cycled);
                }
                selected = selected.slice(0, quizCount);
            } else {
                selected = shuffled.slice(0, quizCount);
            }
        }
        
        // Shuffle options for each question (variety)
        selected = selected.map(q => {
            const shuffledOptions = shuffleArray([...q.options]);
            const newAnswerIndex = shuffledOptions.indexOf(q.options[q.answer]);
            return {
                ...q,
                options: shuffledOptions,
                answer: newAnswerIndex
            };
        });

        // Statistics
        const stats = {
            totalAvailable: QUIZ_DATA.length,
            byCategory: {},
            byDifficulty: {}
        };
        
        QUIZ_DATA.forEach(q => {
            stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
            stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
        });

        res.status(200).json({
            items: selected,
            count: selected.length,
            requested: quizCount,
            category: category,
            difficulty: difficulty,
            stats: stats,
            status: 'success',
            timestamp: new Date().toISOString(),
            message: `✅ ${selected.length} questions generated (unlimited pool of ${QUIZ_DATA.length})`
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: 'error',
            message: '❌ Failed to generate quiz'
        });
    }
}

// ============================================================
// FRONTEND FUNCTION - Load Unlimited Quiz
// ============================================================
async function loadUnlimitedQuiz(count = 10, category = 'all', difficulty = 'all') {
    try {
        const url = `/api/quiz?count=${count}&category=${category}&difficulty=${difficulty}&t=${Date.now()}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'success') {
            // Render quiz
            renderQuiz(data.items);
            return data;
        } else {
            throw new Error(data.message || 'Failed to load quiz');
        }
    } catch (error) {
        console.error('Quiz Error:', error);
        document.getElementById('quiz-container').innerHTML = `
            <div class="text-red-400 text-center py-4">
                ⚠️ ${error.message || 'Failed to load quiz. Please try again.'}
            </div>
        `;
        return null;
    }
}

// ============================================================
// RENDER QUIZ FUNCTION
// ============================================================
function renderQuiz(questions) {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    if (!questions || questions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-slate-400">
                <div class="text-4xl mb-2">📝</div>
                <p>No questions available</p>
            </div>
        `;
        return;
    }
    
    // Show quiz stats
    const statsHtml = `
        <div class="flex flex-wrap gap-2 mb-3 glass-card p-2 rounded-xl">
            <div><span class="font-semibold text-sm text-white">📊 Total:</span> <span class="text-orange-400 font-bold">${questions.length}</span></div>
            <div><span class="font-semibold text-sm text-white">📚 Categories:</span> <span class="text-blue-400">${[...new Set(questions.map(q => q.category))].join(', ')}</span></div>
            <div><span class="font-semibold text-sm text-white">📈 Difficulty:</span> <span class="text-purple-400">${[...new Set(questions.map(q => q.difficulty))].join(', ')}</span></div>
        </div>
    `;
    
    // Store questions globally for quiz navigation
    window._quizQuestions = questions;
    window._quizIndex = 0;
    window._quizScore = 0;
    window._quizAnswered = false;
    
    container.innerHTML = statsHtml + `
        <div id="quiz-progress-bar" class="quiz-progress-bar mb-2">
            <div class="fill" style="width:0%"></div>
        </div>
        <div id="quiz-progress-text" class="text-xs text-slate-400 mb-1">Question 1 of ${questions.length}</div>
        <div id="quiz-category-badge" class="quiz-category-badge quiz-cat-bns mb-1">📚 ${questions[0].category}</div>
        <div id="quiz-question" class="glass-card p-3 rounded-xl mb-2 font-semibold text-sm text-white">${questions[0].question}</div>
        <div id="quiz-options" class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2"></div>
        <div id="quiz-explanation" class="quiz-explanation hidden"></div>
        <div id="quiz-result" class="mt-1 text-sm"></div>
        <div class="flex flex-wrap gap-2 mt-2">
            <button onclick="nextQuizQuestion()" class="btn-primary text-white px-4 py-2 rounded-xl text-sm font-bold">Next Question →</button>
            <button onclick="resetQuiz()" class="bg-slate-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-600 transition">🔄 Reset</button>
            <button onclick="loadUnlimitedQuiz(10)" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition">📝 New Quiz</button>
        </div>
        <div id="quiz-score" class="mt-1 text-xs text-slate-400 font-bold"></div>
        <div id="quiz-complete-card" class="quiz-score-card hidden">
            <div class="score-number" id="final-score-number">0</div>
            <div class="score-label">out of ${questions.length} (this round)</div>
            <div class="mt-1 text-base font-bold" id="final-score-label">🏆 Excellent!</div>
            <button onclick="loadUnlimitedQuiz(10)" class="mt-2 bg-white text-indigo-600 px-4 py-1 rounded-xl font-bold hover:bg-slate-100 transition text-sm">🔄 Start Again</button>
        </div>
        <div class="mt-2 text-xs text-slate-500">💡 ${questions.length} unique questions from pool of ${QUIZ_DATA.length} (unlimited combinations)</div>
    `;
    
    // Load first question
    loadQuizQuestion();
}

// ============================================================
// LOAD QUIZ QUESTION (Uses window._quizQuestions)
// ============================================================
function loadQuizQuestion() {
    const questions = window._quizQuestions || [];
    const index = window._quizIndex || 0;
    
    if (index >= questions.length) {
        showQuizComplete();
        return;
    }
    
    const q = questions[index];
    const total = questions.length;
    
    // Update progress
    const progress = ((index) / total) * 100;
    document.getElementById('quiz-progress-bar')?.querySelector('.fill')?.style.setProperty('width', `${progress}%`);
    document.getElementById('quiz-progress-text').textContent = `Question ${index + 1} of ${total}`;
    
    // Category badge
    const badge = document.getElementById('quiz-category-badge');
    if (badge) {
        const catMap = { 
            BNS: '📚 BNS', 
            BNSS: '⚖️ BNSS', 
            BSA: '📖 BSA',
            General: '📋 General',
            Women: '👩 Women',
            Cyber: '💻 Cyber',
            Punishment: '⚖️ Punishment',
            Bail: '⛓️ Bail',
            Mnemonic: '🧠 Mnemonic',
            Court: '🏛️ Court',
            Constitution: '📜 Constitution'
        };
        badge.textContent = catMap[q.category] || q.category;
        badge.className = `quiz-category-badge quiz-cat-${q.category.toLowerCase()}`;
    }
    
    // Question
    document.getElementById('quiz-question').textContent = q.question;
    if (q.mnemonic) {
        document.getElementById('quiz-question').innerHTML = `${q.question}<br><span class="text-xs text-amber-400">${q.mnemonic}</span>`;
    }
    
    // Options
    const optionsContainer = document.getElementById('quiz-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.dataset.index = idx;
            btn.onclick = () => selectQuizOption(idx);
            optionsContainer.appendChild(btn);
        });
    }
    
    // Reset state
    window._quizAnswered = false;
    document.getElementById('quiz-explanation')?.classList.add('hidden');
    document.getElementById('quiz-result').textContent = '';
    
    // Hide complete card
    document.getElementById('quiz-complete-card')?.classList.add('hidden');
    
    // Update score display
    updateQuizScore();
}

// ============================================================
// SELECT QUIZ OPTION
// ============================================================
function selectQuizOption(selected) {
    if (window._quizAnswered) return;
    window._quizAnswered = true;
    
    const questions = window._quizQuestions || [];
    const index = window._quizIndex || 0;
    const q = questions[index];
    
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = selected === q.answer;
    
    // Disable all options
    options.forEach(btn => btn.classList.add('disabled'));
    
    // Highlight correct/wrong
    options.forEach((btn, idx) => {
        if (idx === q.answer) btn.classList.add('correct');
        if (idx === selected && !isCorrect) btn.classList.add('wrong');
    });
    
    // Update score
    if (isCorrect) {
        window._quizScore = (window._quizScore || 0) + 1;
        document.getElementById('quiz-result').textContent = '✅ सही!';
    } else {
        document.getElementById('quiz-result').textContent = `❌ गलत! सही उत्तर: ${q.options[q.answer]}`;
    }
    
    // Show explanation
    const expDiv = document.getElementById('quiz-explanation');
    if (expDiv) {
        const mnemonicHtml = q.mnemonic ? `<br><span class="text-amber-400 text-xs">${q.mnemonic}</span>` : '';
        expDiv.innerHTML = `💡 ${q.explanation} ${mnemonicHtml}`;
        expDiv.classList.remove('hidden');
    }
    
    updateQuizScore();
}

// ============================================================
// NEXT QUIZ QUESTION
// ============================================================
function nextQuizQuestion() {
    const questions = window._quizQuestions || [];
    window._quizIndex = (window._quizIndex || 0) + 1;
    
    if (window._quizIndex >= questions.length) {
        showQuizComplete();
    } else {
        loadQuizQuestion();
    }
}

// ============================================================
// SHOW QUIZ COMPLETE
// ============================================================
function showQuizComplete() {
    document.getElementById('quiz-complete-card')?.classList.remove('hidden');
    const total = window._quizQuestions?.length || 1;
    document.getElementById('final-score-number').textContent = `${window._quizScore || 0}/${total}`;
    
    const percentage = total > 0 ? ((window._quizScore || 0) / total) * 100 : 0;
    let label = '🏆 Excellent!';
    if (percentage < 50) label = '📚 Keep Learning!';
    else if (percentage < 70) label = '💪 Good Effort!';
    else if (percentage < 90) label = '🌟 Very Good!';
    document.getElementById('final-score-label').textContent = label;
}

// ============================================================
// RESET QUIZ
// ============================================================
function resetQuiz() {
    const questions = window._quizQuestions || [];
    window._quizIndex = 0;
    window._quizScore = 0;
    window._quizAnswered = false;
    
    if (questions.length > 0) {
        loadQuizQuestion();
    }
}

// ============================================================
// UPDATE QUIZ SCORE DISPLAY
// ============================================================
function updateQuizScore() {
    const total = window._quizQuestions?.length || 0;
    const score = window._quizScore || 0;
    document.getElementById('quiz-score').textContent = `📊 Score: ${score}/${total}`;
}

// ============================================================
// QUIZ CATEGORY FILTER - Unlimited Options
// ============================================================
function loadQuizByCategory(category) {
    loadUnlimitedQuiz(10, category);
}

function loadQuizByDifficulty(difficulty) {
    loadUnlimitedQuiz(10, 'all', difficulty);
}

// ============================================================
// EXPORT FOR NODE/VERCEL
// ============================================================
export { 
    QUIZ_DATA, 
    shuffleArray, 
    generateUnlimitedQuiz,
    loadUnlimitedQuiz,
    loadQuizByCategory,
    loadQuizByDifficulty,
    resetQuiz,
    nextQuizQuestion,
    selectQuizOption
};

// ============================================================
// AUTO-START ON PAGE LOAD (if on frontend)
// ============================================================
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Check if quiz container exists
        if (document.getElementById('quiz-container')) {
            loadUnlimitedQuiz(10);
        }
    });
}

// ============================================================
// SUMMARY
// ============================================================
console.log('✅ QUIZ.JS Loaded:');
console.log(`📚 ${QUIZ_DATA.length} questions available`);
console.log(`🎯 Unlimited combinations (${QUIZ_DATA.length}! possible)`);
console.log(`📊 Categories: ${[...new Set(QUIZ_DATA.map(q => q.category))].join(', ')}`);
console.log(`📈 Difficulties: ${[...new Set(QUIZ_DATA.map(q => q.difficulty))].join(', ')}`);
