// ============================================================
// api/generate-document.js - Legal Document Generator
// Complete with 10+ Document Types, BNS/BNSS/BSA Support
// ============================================================

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            allowed: ['POST', 'OPTIONS'],
            status: 'error'
        });
    }

    const { type, data, language, format } = req.body || {};

    if (!type) {
        return res.status(400).json({
            error: 'Document type is required',
            status: 'error',
            availableTypes: [
                'fir', 'bail', 'anticipatory', 'maintenance',
                'legal-notice', 'rti', 'affidavit', 'complaint',
                'contract', 'will', 'power-of-attorney', 'lease'
            ]
        });
    }

    try {
        let document = '';
        let documentTitle = '';
        let documentType = '';

        // Map document types to functions
        const generators = {
            'fir': { fn: generateFIR, title: 'FIR Application' },
            'bail': { fn: generateBail, title: 'Bail Application' },
            'anticipatory': { fn: generateAnticipatoryBail, title: 'Anticipatory Bail Application' },
            'maintenance': { fn: generateMaintenance, title: 'Maintenance Application' },
            'legal-notice': { fn: generateLegalNotice, title: 'Legal Notice' },
            'rti': { fn: generateRTI, title: 'RTI Application' },
            'affidavit': { fn: generateAffidavit, title: 'Affidavit' },
            'complaint': { fn: generateComplaint, title: 'Complaint Petition' },
            'contract': { fn: generateContract, title: 'Simple Contract' },
            'will': { fn: generateWill, title: 'Will / Testament' },
            'power-of-attorney': { fn: generatePowerOfAttorney, title: 'Power of Attorney' },
            'lease': { fn: generateLease, title: 'Lease Agreement' },
            'cheque-bounce': { fn: generateChequeBounce, title: 'Cheque Bounce Complaint' }
        };

        const generator = generators[type];
        if (!generator) {
            return res.status(400).json({
                error: 'Document type not supported',
                availableTypes: Object.keys(generators),
                status: 'error'
            });
        }

        document = generator.fn(data || {});
        documentTitle = generator.title;
        documentType = type;

        // Add language support
        if (language === 'hi') {
            document = translateToHindi(document);
        }

        // Add formatting
        if (format === 'pdf') {
            // For PDF, we'll return HTML that can be converted
            document = wrapForPDF(document, documentTitle);
        }

        // Generate download filename
        const filename = `${documentType}-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'txt'}`;

        res.status(200).json({
            document: document,
            title: documentTitle,
            type: documentType,
            filename: filename,
            generatedAt: new Date().toISOString(),
            status: 'success',
            disclaimer: '⚠️ This is a draft document. Please consult a qualified lawyer before filing.'
        });

    } catch (error) {
        console.error('Document generation error:', error);
        res.status(500).json({
            error: error.message,
            status: 'error'
        });
    }
}

// ============================================================
// 1. FIR APPLICATION
// ============================================================
function generateFIR(data) {
    const {
        name = '_________________',
        father = '_________________',
        mother = '_________________',
        address = '_________________',
        city = 'Lucknow',
        state = 'Uttar Pradesh',
        pincode = '226001',
        phone = '_________________',
        email = '_________________',
        accused = '_________________',
        accusedAddress = '_________________',
        accusedFather = '_________________',
        offences = 'BNS 318/BNS 103/BNS 303',
        incidentDate = '_____________',
        incidentTime = '_____________',
        incidentDetails = 'Detailed description of the incident...',
        policeStation = '_________________',
        district = 'Lucknow',
        witnesses = '_________________',
        evidence = '_________________',
        section = 'BNSS 173',
        court = 'Chief Judicial Magistrate'
    } = data;

    return `
=================== FIR APPLICATION ===================
                    ${court.toUpperCase()}, ${district.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}, ${district.toUpperCase()}

APPLICATION UNDER SECTION ${section} FOR REGISTRATION OF FIR

═══════════════════════════════════════════════════════════

COMPLAINANT DETAILS:
───────────────────────────────────────────────────────────
Name                 : ${name}
Father's Name        : ${father}
Mother's Name        : ${mother}
Address              : ${address}
City                 : ${city}
State                : ${state}
Pincode              : ${pincode}
Phone                : ${phone}
Email                : ${email}

═══════════════════════════════════════════════════════════

VERSUS

ACCUSED DETAILS:
───────────────────────────────────────────────────────────
Name                 : ${accused}
Father's Name        : ${accusedFather}
Address              : ${accusedAddress}

═══════════════════════════════════════════════════════════

SUBJECT: Application for registration of FIR against the accused for offences under ${offences}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the complainant is a resident of the above address and is a citizen of India.

2. That the complainant states that on ${incidentDate} at ${incidentTime}, the accused committed the following offences:

   ${incidentDetails}

3. That the complainant has approached the police station (${policeStation}) but they have refused to register the FIR.

4. That the complainant has the following evidence and witnesses:
   
   Evidence: ${evidence}
   Witnesses: ${witnesses}

5. That the complainant is willing to cooperate with the investigation and provide all necessary support.

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
In view of the above, it is prayed that this Hon'ble Court may kindly be pleased to:

  a) Direct the police to register the FIR under the relevant sections (${offences}).
  b) Order investigation into the matter.
  c) Pass any other order as deemed fit in the interest of justice.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : Lucknow

                                  .................................
                                  (Signature)
                                  ${name}
                                  Complainant

═══════════════════════════════════════════════════════════

Verification:
─────────────
I, ${name}, do hereby verify that the contents of this application are true and correct to the best of my knowledge and belief.

Date         : ${new Date().toLocaleDateString()}

                                  .................................
                                  (Signature)

═══════════════════════════════════════════════════════════

⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// 2. BAIL APPLICATION
// ============================================================
function generateBail(data) {
    const {
        name = '_________________',
        father = '_________________',
        address = '_________________',
        caseNo = '_________________',
        firNo = '_________________',
        policeStation = '_________________',
        offence = '_________________',
        arrestDate = '_____________',
        section = 'BNSS 480',
        court = 'Sessions Judge',
        district = 'Lucknow',
        suretyName = '_________________',
        suretyAddress = '_________________',
        suretyAmount = '_________________',
        grounds = '_________________',
        criminalRecord = 'No previous criminal record'
    } = data;

    return `
=================== BAIL APPLICATION ===================
                  ${court.toUpperCase()}, ${district.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}, ${district.toUpperCase()}

BAIL APPLICATION UNDER SECTION ${section}

═══════════════════════════════════════════════════════════

Case No.           : ${caseNo}
FIR No.            : ${firNo}
Police Station     : ${policeStation}

APPLICANT/ACCUSED DETAILS:
───────────────────────────────────────────────────────────
Name                 : ${name}
Father's Name        : ${father}
Address              : ${address}

═══════════════════════════════════════════════════════════

VERSUS

STATE OF UTTAR PRADESH
Through S.H.O., Police Station ${policeStation}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the applicant is innocent of the charges levelled against him under ${offence}.

2. That the applicant was arrested on ${arrestDate} and is in judicial custody.

3. That the applicant is a permanent resident of the above address and is not a flight risk.

4. That the applicant has roots in the community and will not tamper with evidence.

5. That the offence alleged is ${offence} in nature.

6. That the applicant has no criminal antecedents:
   ${criminalRecord}

7. That the applicant is ready to furnish surety to the satisfaction of this Hon'ble Court:
   
   Surety Name    : ${suretyName}
   Surety Address : ${suretyAddress}
   Surety Amount  : ₹${suretyAmount}

8. That the applicant undertakes to:
   a) Cooperate with the investigation.
   b) Not tamper with evidence.
   c) Not influence witnesses.
   d) Appear before the court whenever required.

═══════════════════════════════════════════════════════════

GROUNDS FOR BAIL:
───────────────────────────────────────────────────────────
${grounds || '1. The offence is bailable in nature.\n2. The applicant is a first-time offender.\n3. There is no possibility of the applicant fleeing from justice.\n4. The applicant is ready to abide by any conditions imposed by the court.'}

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that the applicant may be released on bail on such terms and conditions as this Hon'ble Court may deem fit.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : Lucknow

                                  .................................
                                  (Signature)
                                  Advocate for Applicant

═══════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// 3. ANTICIPATORY BAIL APPLICATION
// ============================================================
function generateAnticipatoryBail(data) {
    const {
        name = '_________________',
        father = '_________________',
        address = '_________________',
        offence = '_________________',
        section = 'BNSS 482',
        court = 'High Court',
        district = 'Lucknow',
        grounds = '_________________',
        firNo = '_________________',
        policeStation = '_________________'
    } = data;

    return `
================= ANTICIPATORY BAIL ===================
              ${court.toUpperCase()}, ${district.toUpperCase()}

IN THE ${court.toUpperCase()} OF JUDICATURE AT ALLAHABAD, LUCKNOW BENCH

ANTICIPATORY BAIL APPLICATION UNDER SECTION ${section}

═══════════════════════════════════════════════════════════

APPLICANT:
───────────────────────────────────────────────────────────
Name                 : ${name}
Father's Name        : ${father}
Address              : ${address}

═══════════════════════════════════════════════════════════

VERSUS

STATE OF UTTAR PRADESH
Through S.H.O., Police Station ${policeStation}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the applicant has reason to believe that he may be arrested on accusation of having committed the offence of ${offence} (FIR No. ${firNo || 'N/A'}).

2. That the applicant is innocent and the allegations are false and baseless.

3. That the applicant is a respectable citizen and is ready to cooperate with the investigation.

4. That there is no likelihood of the applicant absconding or tampering with evidence.

5. That the applicant has no criminal antecedents.

6. That the applicant is ready to abide by any conditions imposed by this Hon'ble Court.

═══════════════════════════════════════════════════════════

GROUNDS FOR ANTICIPATORY BAIL:
───────────────────────────────────────────────────────────
${grounds || '1. The allegations are false and motivated.\n2. The applicant is a law-abiding citizen.\n3. There is no direct evidence against the applicant.\n4. The applicant has deep roots in the community.'}

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that the applicant may be granted anticipatory bail, and in the event of arrest, he may be released on bail on such terms and conditions as this Hon'ble Court may deem fit.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : Lucknow

                                  .................................
                                  (Signature)
                                  Advocate for Applicant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// 4. MAINTENANCE APPLICATION
// ============================================================
function generateMaintenance(data) {
    const {
        name = '_________________',
        father = '_________________',
        address = '_________________',
        husband = '_________________',
        husbandFather = '_________________',
        husbandAddress = '_________________',
        marriageDate = '_____________',
        amount = '_____________',
        section = 'BNSS 144',
        court = 'Family Court',
        district = 'Lucknow',
        children = '_________________',
        income = '_________________',
        expenses = '_________________',
        grounds = '_________________'
    } = data;

    return `
================= MAINTENANCE APPLICATION ================
                  ${court.toUpperCase()}, ${district.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}, ${district.toUpperCase()}

MAINTENANCE APPLICATION UNDER SECTION ${section}

═══════════════════════════════════════════════════════════

APPLICANT/WIFE:
───────────────────────────────────────────────────────────
Name                 : ${name}
Father's Name        : ${father}
Address              : ${address}

═══════════════════════════════════════════════════════════

VERSUS

RESPONDENT/HUSBAND:
───────────────────────────────────────────────────────────
Name                 : ${husband}
Father's Name        : ${husbandFather}
Address              : ${husbandAddress}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the applicant is the legally wedded wife of the respondent, married on ${marriageDate}.

2. That the respondent has sufficient means to maintain the applicant:
   ${income}

3. That the respondent has neglected and refused to maintain the applicant despite repeated requests.

4. That the applicant has no independent source of income and is unable to maintain herself.

5. That the applicant has the following monthly expenses:
   ${expenses}

6. That the applicant has ${children || '_____'} children to support.

7. That the applicant is entitled to maintenance under Section ${section} of BNSS.

═══════════════════════════════════════════════════════════

GROUNDS FOR MAINTENANCE:
───────────────────────────────────────────────────────────
${grounds || '1. The respondent has abandoned the applicant.\n2. The respondent is earning well but refusing to pay.\n3. The applicant is unable to maintain herself.\n4. The respondent is legally obligated to maintain the applicant.'}

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that this Hon'ble Court may kindly:

  a) Order the respondent to pay maintenance of Rs. ${amount} per month to the applicant.
  b) Order the respondent to pay arrears of maintenance from the date of application.
  c) Pass any other order as deemed fit.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : Lucknow

                                  .................................
                                  (Signature)
                                  ${name}
                                  Applicant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// 5. LEGAL NOTICE
// ============================================================
function generateLegalNotice(data) {
    const {
        senderName = '_________________',
        senderAddress = '_________________',
        receiverName = '_________________',
        receiverAddress = '_________________',
        subject = '_________________',
        description = '_________________',
        amount = '_________________',
        deadline = '15 days'
    } = data;

    return `
==================== LEGAL NOTICE ====================

DATE: ${new Date().toLocaleDateString()}

FROM:
${senderName}
${senderAddress}

TO:
${receiverName}
${receiverAddress}

═══════════════════════════════════════════════════════

SUBJECT: ${subject}

═══════════════════════════════════════════════════════

Dear Sir/Madam,

1. This legal notice is being sent to you on behalf of my client, ${senderName}.

2. The following facts are brought to your notice:
   
   ${description}

3. ${amount ? `The amount due to my client is Rs. ${amount}.` : ''}

4. You are hereby called upon to:
   a) Rectify the above-mentioned issues.
   b) Pay the outstanding amount of Rs. ${amount || '______'}.
   c) Comply with the legal requirements.

5. If you fail to comply within ${deadline} from the date of receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings against you at your own risk, costs, and consequences.

═══════════════════════════════════════════════════════

Please treat this as URGENT and respond within the specified time.

═══════════════════════════════════════════════════════

Yours sincerely,

.................................
(Advocate)
Enrolment No. : _____________
Bar Council of Uttar Pradesh

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before sending.
`;
}

// ============================================================
// 6. RTI APPLICATION
// ============================================================
function generateRTI(data) {
    const {
        name = '_________________',
        address = '_________________',
        phone = '_________________',
        publicAuthority = '_________________',
        subject = '_________________',
        information = '_________________',
        fee = '₹10',
        mode = 'Cash/DD/Court Fee Stamp'
    } = data;

    return `
================== RTI APPLICATION ===================

DATE: ${new Date().toLocaleDateString()}

FROM:
${name}
${address}
Phone: ${phone}

TO:
The Public Information Officer
${publicAuthority}
_________________

═══════════════════════════════════════════════════════

SUBJECT: Application under the Right to Information Act, 2005

═══════════════════════════════════════════════════════

Dear Sir/Madam,

1. I am a citizen of India and I am filing this application under the Right to Information Act, 2005.

2. I seek the following information:
   
   ${information}

3. The information is sought for the following purpose:
   ${subject || 'General public interest'}

4. I have enclosed the application fee of ${fee} in the form of ${mode}.

5. I request you to provide the information in the following format:
   [ ] Hard Copy
   [ ] Soft Copy (Email)
   [ ] Inspection

6. I am willing to pay the additional charges, if any, for providing the information.

═══════════════════════════════════════════════════════

Please provide the information within 30 days as per Section 7(1) of the RTI Act, 2005.

═══════════════════════════════════════════════════════

Yours faithfully,

.................................
(Signature)
${name}

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please verify the fee and format as per the specific public authority.
`;
}

// ============================================================
// 7. AFFIDAVIT
// ============================================================
function generateAffidavit(data) {
    const {
        name = '_________________',
        father = '_________________',
        address = '_________________',
        occupation = '_________________',
        statements = '_________________'
    } = data;

    return `
================== AFFIDAVIT ===================

IN THE MATTER OF:
_________________

═══════════════════════════════════════════════════════

I, ${name}, son/daughter/wife of ${father}, aged about ____ years, residing at ${address}, do hereby solemnly affirm and state as follows:

1. That I am the deponent herein and am well acquainted with the facts and circumstances of this case.

2. That I am ${occupation} by profession.

3. That I state the following facts on the basis of my personal knowledge:
   
   ${statements}

4. That I believe the above statements to be true and correct.

5. That I have no personal interest in this matter.

═══════════════════════════════════════════════════════

VERIFICATION:
─────────────
I, ${name}, the above-named deponent, do hereby verify that the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.

Signed and verified at _____________ on this ____ day of ________, 2026.

═══════════════════════════════════════════════════════

DEPONENT:
.................................
(${name})

IDENTIFIED BY:
.................................
(Advocate)

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before notarizing.
`;
}

// ============================================================
// 8. COMPLAINT PETITION
// ============================================================
function generateComplaint(data) {
    const {
        complainant = '_________________',
        complainantAddress = '_________________',
        respondent = '_________________',
        respondentAddress = '_________________',
        complaint = '_________________',
        offences = '_________________',
        relief = '_________________'
    } = data;

    return `
================= COMPLAINT PETITION =================

BEFORE THE COURT OF __________________________________

COMPLAINT PETITION UNDER SECTION _________________

═══════════════════════════════════════════════════════

COMPLAINANT:
───────────────────────────────────────────────────────────
Name                 : ${complainant}
Address              : ${complainantAddress}

VERSUS

RESPONDENT/ACCUSED:
───────────────────────────────────────────────────────────
Name                 : ${respondent}
Address              : ${respondentAddress}

═══════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

${complaint}

═══════════════════════════════════════════════════════

OFFENCES COMMITTED:
───────────────────────────────────────────────────────────
${offences}

═══════════════════════════════════════════════════════

RELIEF SOUGHT:
───────────────────────────────────────────────────────────
${relief}

═══════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : _____________

                                  .................................
                                  (Signature)
                                  ${complainant}
                                  Complainant

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// 9. SIMPLE CONTRACT
// ============================================================
function generateContract(data) {
    const {
        partyA = '_________________',
        partyB = '_________________',
        subject = '_________________',
        terms = '_________________',
        amount = '_________________',
        duration = '_________________',
        startDate = '_________________'
    } = data;

    return `
================= SIMPLE CONTRACT =================

THIS CONTRACT is made on this _____ day of ________, 2026

BETWEEN:
${partyA} (hereinafter referred to as "Party A")

AND:
${partyB} (hereinafter referred to as "Party B")

═══════════════════════════════════════════════════════

SUBJECT OF CONTRACT:
───────────────────────────────────────────────────────────
${subject}

═══════════════════════════════════════════════════════

TERMS AND CONDITIONS:
───────────────────────────────────────────────────────────
${terms}

═══════════════════════════════════════════════════════

FINANCIAL TERMS:
───────────────────────────────────────────────────────────
Amount : Rs. ${amount}
Duration : ${duration}
Start Date : ${startDate}

═══════════════════════════════════════════════════════

BOTH PARTIES AGREE TO THE ABOVE TERMS AND CONDITIONS.

═══════════════════════════════════════════════════════

SIGNED AND EXECUTED BY:

Party A                        Party B
................................ ................................

WITNESSES:
1. ................................
2. ................................

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before signing.
`;
}

// ============================================================
// 10. WILL / TESTAMENT
// ============================================================
function generateWill(data) {
    const {
        testator = '_________________',
        testatorAddress = '_________________',
        beneficiaries = '_________________',
        property = '_________________',
        executor = '_________________'
    } = data;

    return `
================== WILL / TESTAMENT ==================

I, ${testator}, son/daughter/wife of _________________, residing at ${testatorAddress}, being of sound mind, do hereby revoke all my previous wills and declare this to be my LAST WILL AND TESTAMENT.

═══════════════════════════════════════════════════════

1. I appoint my (relation) ${executor} as the Executor of this Will.

2. I bequeath my property as follows:
   
   ${property}

3. The beneficiaries of this Will are:
   
   ${beneficiaries}

4. If any of the above beneficiaries predecease me, their share shall pass to _____________.

5. I declare that I am the lawful owner of the above-mentioned property and have the right to dispose it.

═══════════════════════════════════════════════════════

IN WITNESS WHEREOF, I have signed this Will in the presence of the witnesses.

Date: ${new Date().toLocaleDateString()}
Place: _____________

═══════════════════════════════════════════════════════

TESTATOR:
.................................
(${testator})

WITNESSES:
1. ................................
2. ................................

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before executing.
`;
}

// ============================================================
// 11. POWER OF ATTORNEY
// ============================================================
function generatePowerOfAttorney(data) {
    const {
        principal = '_________________',
        principalAddress = '_________________',
        agent = '_________________',
        agentAddress = '_________________',
        powers = '_________________',
        duration = '_________________'
    } = data;

    return `
================= POWER OF ATTORNEY =================

THIS POWER OF ATTORNEY is made on this _____ day of ________, 2026

BY:
${principal} (hereinafter referred to as the "Principal")
Residing at: ${principalAddress}

IN FAVOUR OF:
${agent} (hereinafter referred to as the "Agent")
Residing at: ${agentAddress}

═══════════════════════════════════════════════════════

WHEREAS the Principal desires to appoint the Agent as his/her Attorney.

NOW, THEREFORE, the Principal hereby appoints the Agent as his/her Attorney with the following powers:

${powers}

═══════════════════════════════════════════════════════

DURATION:
───────────────────────────────────────────────────────────
${duration || 'This Power of Attorney shall remain valid until revoked.'}

═══════════════════════════════════════════════════════

IN WITNESS WHEREOF, the Principal has signed this Power of Attorney.

═══════════════════════════════════════════════════════

PRINCIPAL:
.................................
(${principal})

WITNESSES:
1. ................................
2. ................................

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before executing.
`;
}

// ============================================================
// 12. LEASE AGREEMENT
// ============================================================
function generateLease(data) {
    const {
        landlord = '_________________',
        tenant = '_________________',
        property = '_________________',
        rent = '_________________',
        deposit = '_________________',
        duration = '_________________',
        terms = '_________________'
    } = data;

    return `
================= LEASE AGREEMENT =================

THIS LEASE AGREEMENT is made on this _____ day of ________, 2026

BETWEEN:
${landlord} (hereinafter referred to as the "Landlord")

AND:
${tenant} (hereinafter referred to as the "Tenant")

═══════════════════════════════════════════════════════

PROPERTY DETAILS:
───────────────────────────────────────────────────────────
${property}

═══════════════════════════════════════════════════════

LEASE TERMS:
───────────────────────────────────────────────────────────
Monthly Rent      : Rs. ${rent}
Security Deposit  : Rs. ${deposit}
Lease Duration    : ${duration}

═══════════════════════════════════════════════════════

TERMS AND CONDITIONS:
───────────────────────────────────────────────────────────
${terms || '1. The Tenant shall pay rent on or before the 5th of each month.\n2. The Tenant shall maintain the property in good condition.\n3. The Tenant shall not sublet the property without consent.\n4. The Landlord shall be responsible for major repairs.'}

═══════════════════════════════════════════════════════

SIGNED AND EXECUTED BY:

Landlord                       Tenant
................................ ................................

WITNESSES:
1. ................................
2. ................................

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before executing.
`;
}

// ============================================================
// 13. CHEQUE BOUNCE COMPLAINT
// ============================================================
function generateChequeBounce(data) {
    const {
        complainant = '_________________',
        complainantAddress = '_________________',
        drawer = '_________________',
        drawerAddress = '_________________',
        chequeNo = '_________________',
        chequeAmount = '_________________',
        chequeDate = '_________________',
        bankName = '_________________',
        reason = 'Insufficient funds'
    } = data;

    return `
================= CHEQUE BOUNCE COMPLAINT =================

IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE, LUCKNOW

COMPLAINT UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

═══════════════════════════════════════════════════════════

COMPLAINANT:
───────────────────────────────────────────────────────────
Name                 : ${complainant}
Address              : ${complainantAddress}

VERSUS

ACCUSED/DRAWER:
───────────────────────────────────────────────────────────
Name                 : ${drawer}
Address              : ${drawerAddress}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the complainant and the accused had a business transaction.

2. That the accused issued a cheque bearing No. ${chequeNo} dated ${chequeDate} for Rs. ${chequeAmount} drawn on ${bankName}.

3. That the complainant presented the cheque for encashment on ${chequeDate}.

4. That the cheque was dishonoured due to ${reason}.

5. That the complainant sent a legal notice to the accused within 30 days of receiving the cheque return memo.

6. That the accused failed to make the payment within 15 days of receiving the notice.

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that this Hon'ble Court may kindly:

  a) Summon the accused for trial.
  b) Convict the accused under Section 138 of NI Act, 1881.
  c) Award compensation to the complainant.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : Lucknow

                                  .................................
                                  (Signature)
                                  ${complainant}
                                  Complainant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Wrap document for PDF formatting
function wrapForPDF(document, title) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; }
        pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 14px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .disclaimer { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
    <pre>${document}</pre>
    <div class="disclaimer">⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.</div>
</body>
</html>
    `;
}

// Translate to Hindi (simplified - can be extended)
function translateToHindi(document) {
    // This is a simplified translation. In production, use Google Translate API or similar.
    const translations = {
        'APPLICATION': 'आवेदन',
        'REGISTRATION': 'पंजीकरण',
        'COMPLAINANT': 'शिकायतकर्ता',
        'ACCUSED': 'अभियुक्त',
        'BAIL': 'जमानत',
        'MAINTENANCE': 'भरण-पोषण',
        'DRAFT': 'प्रारूप',
        'DISCLAIMER': 'अस्वीकरण',
        'PRAYER': 'प्रार्थना',
        'GROUNDS': 'आधार',
        'EVIDENCE': 'साक्ष्य',
        'WITNESS': 'गवाह'
    };

    let translated = document;
    for (const [en, hi] of Object.entries(translations)) {
        translated = translated.replace(new RegExp(en, 'g'), hi);
    }
    return translated;
}
