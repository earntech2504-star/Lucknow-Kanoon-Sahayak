// ============================================================
// api/generate-document.js - Legal Document Generator API
// ============================================================

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { type, data, language = 'hi', format = 'text' } = req.body;

    if (!type) {
        return res.status(400).json({
            success: false,
            error: 'Document type required',
            availableTypes: ['fir', 'bail', 'anticipatory', 'maintenance', 'legal-notice', 'rti', 'affidavit', 'complaint', 'contract', 'will', 'power-of-attorney', 'lease', 'cheque-bounce']
        });
    }

    const generators = {
        'fir': generateFIR,
        'bail': generateBail,
        'anticipatory': generateAnticipatoryBail,
        'maintenance': generateMaintenance,
        'legal-notice': generateLegalNotice,
        'rti': generateRTI,
        'affidavit': generateAffidavit,
        'complaint': generateComplaint,
        'contract': generateContract,
        'will': generateWill,
        'power-of-attorney': generatePowerOfAttorney,
        'lease': generateLease,
        'cheque-bounce': generateChequeBounce
    };

    const generator = generators[type];
    if (!generator) {
        return res.status(400).json({
            success: false,
            error: 'Document type not supported',
            availableTypes: Object.keys(generators)
        });
    }

    const document = generator(data || {});
    const title = {
        'fir': 'FIR Application',
        'bail': 'Bail Application',
        'anticipatory': 'Anticipatory Bail Application',
        'maintenance': 'Maintenance Application',
        'legal-notice': 'Legal Notice',
        'rti': 'RTI Application',
        'affidavit': 'Affidavit',
        'complaint': 'Complaint Petition',
        'contract': 'Simple Contract',
        'will': 'Will / Testament',
        'power-of-attorney': 'Power of Attorney',
        'lease': 'Lease Agreement',
        'cheque-bounce': 'Cheque Bounce Complaint'
    } [type] || 'Legal Document';

    const filename = `${type}-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'txt'}`;

    return res.status(200).json({
        success: true,
        document,
        title,
        type,
        filename,
        generatedAt: new Date().toISOString(),
        disclaimer: '⚠️ This is a draft document. Please consult a qualified lawyer before filing.'
    });
}

// ============================================================
// DOCUMENT GENERATORS
// ============================================================

function generateFIR(data) {
    const { name = '_________________', father = '_________________', address = '_________________', city = 'Lucknow', state = 'Uttar Pradesh', phone = '_________________', accused = '_________________', offences = 'BNS 318/BNS 103/BNS 303', incidentDetails = 'Detailed description of the incident...', policeStation = '_________________', section = 'BNSS 173', court = 'Chief Judicial Magistrate' } = data;

    return `
=================== FIR APPLICATION ===================
                    ${court.toUpperCase()}, ${city.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}, ${city.toUpperCase()}

APPLICATION UNDER SECTION ${section} FOR REGISTRATION OF FIR

═══════════════════════════════════════════════════════════

COMPLAINANT DETAILS:
───────────────────────────────────────────────────────────
Name                 : ${name}
Father's Name        : ${father}
Address              : ${address}
City                 : ${city}
State                : ${state}
Phone                : ${phone}

═══════════════════════════════════════════════════════════

VERSUS

ACCUSED DETAILS:
───────────────────────────────────────────────────────────
Name                 : ${accused}

═══════════════════════════════════════════════════════════

SUBJECT: Application for registration of FIR against the accused for offences under ${offences}

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the complainant is a resident of the above address.

2. That the complainant states that the accused committed the following offences:
   ${incidentDetails}

3. That the complainant has approached the police station (${policeStation}) but they have refused to register the FIR.

4. That the complainant is willing to cooperate with the investigation.

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that this Hon'ble Court may kindly be pleased to:
  a) Direct the police to register the FIR under the relevant sections (${offences}).
  b) Order investigation into the matter.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : ${city}

                                  .................................
                                  (Signature)
                                  ${name}
                                  Complainant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

function generateBail(data) {
    const { name = '_________________', father = '_________________', address = '_________________', caseNo = '_________________', firNo = '_________________', policeStation = '_________________', offence = '_________________', arrestDate = '_____________', section = 'BNSS 480', court = 'Sessions Judge', suretyName = '_________________', suretyAmount = '_________________', grounds = '_________________' } = data;

    return `
=================== BAIL APPLICATION ===================
                  ${court.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}

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

STATE

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the applicant is innocent of the charges levelled against him under ${offence}.

2. That the applicant was arrested on ${arrestDate} and is in judicial custody.

3. That the applicant is a permanent resident and is not a flight risk.

4. That the applicant has no criminal antecedents.

5. That the applicant is ready to furnish surety to the satisfaction of this Hon'ble Court:
   Surety Name    : ${suretyName}
   Surety Amount  : ₹${suretyAmount}

6. That the applicant undertakes to cooperate with the investigation.

═══════════════════════════════════════════════════════════

GROUNDS FOR BAIL:
───────────────────────────────────────────────────────────
${grounds || '1. The offence is bailable in nature.\n2. The applicant is a first-time offender.\n3. There is no possibility of the applicant fleeing from justice.'}

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that the applicant may be released on bail on such terms and conditions as this Hon'ble Court may deem fit.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : _____________

                                  .................................
                                  (Signature)
                                  Advocate for Applicant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

function generateMaintenance(data) {
    const { name = '_________________', father = '_________________', address = '_________________', husband = '_________________', marriageDate = '_____________', amount = '_____________', section = 'BNSS 144', court = 'Family Court', children = '_________________', income = '_________________', expenses = '_________________' } = data;

    return `
================= MAINTENANCE APPLICATION ================
                  ${court.toUpperCase()}

IN THE COURT OF THE ${court.toUpperCase()}

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

═══════════════════════════════════════════════════════════

MOST RESPECTFULLY SHOWETH:

1. That the applicant is the legally wedded wife of the respondent, married on ${marriageDate}.

2. That the respondent has sufficient means to maintain the applicant: ${income}

3. That the respondent has neglected and refused to maintain the applicant despite repeated requests.

4. That the applicant has no independent source of income.

5. That the applicant has the following monthly expenses: ${expenses}

6. That the applicant has ${children || '_____'} children to support.

═══════════════════════════════════════════════════════════

PRAYER:
───────────────────────────────────────────────────────────
It is prayed that this Hon'ble Court may kindly:
  a) Order the respondent to pay maintenance of Rs. ${amount} per month.
  b) Order the respondent to pay arrears of maintenance.

═══════════════════════════════════════════════════════════

Date         : ${new Date().toLocaleDateString()}
Place        : _____________

                                  .................................
                                  (Signature)
                                  ${name}
                                  Applicant

═══════════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before filing.
`;
}

function generateLegalNotice(data) {
    const { senderName = '_________________', senderAddress = '_________________', receiverName = '_________________', receiverAddress = '_________________', subject = '_________________', description = '_________________', amount = '_________________', deadline = '15 days' } = data;

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
   b) ${amount ? `Pay the outstanding amount of Rs. ${amount}.` : ''}

5. If you fail to comply within ${deadline} from the date of receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings against you at your own risk.

═══════════════════════════════════════════════════════

Yours sincerely,

.................................
(Advocate)

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please consult a qualified lawyer before sending.
`;
}

function generateRTI(data) {
    const { name = '_________________', address = '_________________', phone = '_________________', publicAuthority = '_________________', subject = '_________________', information = '_________________', fee = '₹10' } = data;

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

═══════════════════════════════════════════════════════

SUBJECT: Application under the Right to Information Act, 2005

═══════════════════════════════════════════════════════

Dear Sir/Madam,

1. I am a citizen of India and I am filing this application under the Right to Information Act, 2005.

2. I seek the following information:
   ${information}

3. The information is sought for the following purpose:
   ${subject || 'General public interest'}

4. I have enclosed the application fee of ${fee}.

5. I request you to provide the information within 30 days as per Section 7(1) of the RTI Act, 2005.

═══════════════════════════════════════════════════════

Yours faithfully,

.................................
(Signature)
${name}

═══════════════════════════════════════════════════════
⚠️ DISCLAIMER: This is a draft document. Please verify the fee and format as per the specific public authority.
`;
}

function generateAffidavit(data) {
    const { name = '_________________', father = '_________________', address = '_________________', occupation = '_________________', statements = '_________________' } = data;

    return `
================== AFFIDAVIT ===================

I, ${name}, son/daughter/wife of ${father}, aged about ____ years, residing at ${address}, do hereby solemnly affirm and state as follows:

1. That I am the deponent herein and am well acquainted with the facts and circumstances of this case.

2. That I am ${occupation} by profession.

3. That I state the following facts on the basis of my personal knowledge:
   ${statements}

4. That I believe the above statements to be true and correct.

═══════════════════════════════════════════════════════

VERIFICATION:
─────────────
I, ${name}, the above-named deponent, do hereby verify that the contents of this affidavit are true and correct to the best of my knowledge and belief.

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

function generateComplaint(data) {
    const { complainant = '_________________', complainantAddress = '_________________', respondent = '_________________', respondentAddress = '_________________', complaint = '_________________', offences = '_________________', relief = '_________________' } = data;

    return `
================= COMPLAINT PETITION =================

BEFORE THE COURT OF __________________________________

COMPLAINT PETITION

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

function generateContract(data) {
    const { partyA = '_________________', partyB = '_________________', subject = '_________________', terms = '_________________', amount = '_________________', duration = '_________________', startDate = '_________________' } = data;

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

function generateWill(data) {
    const { testator = '_________________', testatorAddress = '_________________', beneficiaries = '_________________', property = '_________________', executor = '_________________' } = data;

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

function generatePowerOfAttorney(data) {
    const { principal = '_________________', principalAddress = '_________________', agent = '_________________', agentAddress = '_________________', powers = '_________________', duration = '_________________' } = data;

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

function generateLease(data) {
    const { landlord = '_________________', tenant = '_________________', property = '_________________', rent = '_________________', deposit = '_________________', duration = '_________________', terms = '_________________' } = data;

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
${terms || '1. The Tenant shall pay rent on or before the 5th of each month.\n2. The Tenant shall maintain the property in good condition.\n3. The Tenant shall not sublet the property without consent.'}

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

function generateChequeBounce(data) {
    const { complainant = '_________________', complainantAddress = '_________________', drawer = '_________________', drawerAddress = '_________________', chequeNo = '_________________', chequeAmount = '_________________', chequeDate = '_________________', bankName = '_________________', reason = 'Insufficient funds' } = data;

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

3. That the complainant presented the cheque for encashment.

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