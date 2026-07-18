// api/generate-document.js - Legal Document Generator

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;

  try {
    let document = '';

    switch(type) {
      case 'fir':
        document = generateFIR(data);
        break;
      case 'bail':
        document = generateBail(data);
        break;
      case 'anticipatory':
        document = generateAnticipatoryBail(data);
        break;
      case 'maintenance':
        document = generateMaintenance(data);
        break;
      default:
        return res.status(400).json({ error: 'Document type not supported' });
    }

    res.status(200).json({
      document,
      status: 'success'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
}

function generateFIR(data) {
  return `
IN THE COURT OF THE CHIEF JUDICIAL MAGISTRATE, LUCKNOW

APPLICATION UNDER SECTION ${data.section || 'BNSS 173'} FOR REGISTRATION OF FIR

Complainant:
Name: ${data.name || '_________________'}
Father's/Husband's Name: ${data.father || '_________________'}
Address: ${data.address || '_________________'}

Versus

Accused:
Name: ${data.accused || '_________________'}
Address: ${data.accusedAddress || '_________________'}

SUBJECT: Application for registration of FIR against the accused for offences under ${data.offences || '_____________'}

MOST RESPECTFULLY SHOWETH:

1. That the complainant is a resident of the above address and is a citizen of India.

2. That the complainant states that on ${data.incidentDate || '_____________'} at ${data.incidentTime || '_____________'}, the accused committed the following offences:

${data.incidentDetails || 'Detailed description of the incident...'}

3. That the complainant has approached the police station but they have refused to register the FIR.

4. That the complainant has all the necessary evidence and witnesses to support this complaint.

PRAYER:
In view of the above, it is prayed that this Hon'ble Court may kindly be pleased to:

a) Direct the police to register the FIR under the relevant sections.
b) Order investigation into the matter.
c) Pass any other order as deemed fit.

Date: ${new Date().toLocaleDateString()}
Place: Lucknow

(Signature)
${data.name || 'Complainant'}

(Note: This is a draft document. Please consult a qualified lawyer before filing.)
`;
}

function generateBail(data) {
  return `
IN THE COURT OF THE SESSIONS JUDGE, LUCKNOW

BAIL APPLICATION UNDER SECTION ${data.section || 'BNSS 480'}

Case No.: ${data.caseNo || '_____________'}
FIR No.: ${data.firNo || '_____________'}
Police Station: ${data.policeStation || '_____________'}

Applicant/Accused:
Name: ${data.name || '_________________'}
Father's Name: ${data.father || '_________________'}
Address: ${data.address || '_________________'}

Versus

State of Uttar Pradesh

MOST RESPECTFULLY SHOWETH:

1. That the applicant is innocent of the charges levelled against him.

2. That the applicant was arrested on ${data.arrestDate || '_____________'} and is in judicial custody.

3. That the applicant is a permanent resident of the above address and is not a flight risk.

4. That the applicant has roots in the community and will not tamper with evidence.

5. That the offence alleged is ${data.offence || 'bailable/non-bailable'} in nature.

6. That the applicant is ready to furnish surety to the satisfaction of the court.

PRAYER:
It is prayed that the applicant may be released on bail on such terms and conditions as this Hon'ble Court may deem fit.

Date: ${new Date().toLocaleDateString()}
Place: Lucknow

(Signature)
Advocate

(Note: This is a draft document. Please consult a qualified lawyer before filing.)
`;
}

function generateAnticipatoryBail(data) {
  return `
IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD, LUCKNOW BENCH

ANTICIPATORY BAIL APPLICATION UNDER SECTION ${data.section || 'BNSS 482'}

Applicant:
Name: ${data.name || '_________________'}
Father's Name: ${data.father || '_________________'}
Address: ${data.address || '_________________'}

Versus

State of Uttar Pradesh

MOST RESPECTFULLY SHOWETH:

1. That the applicant has reason to believe that he may be arrested on accusation of having committed the offence of ${data.offence || '_____________'}.

2. That the applicant is innocent and the allegations are false and baseless.

3. That the applicant is a respectable citizen and is ready to cooperate with the investigation.

4. That there is no likelihood of the applicant absconding or tampering with evidence.

PRAYER:
It is prayed that the applicant may be granted anticipatory bail, and in the event of arrest, he may be released on bail.

Date: ${new Date().toLocaleDateString()}
Place: Lucknow

(Signature)
Advocate

(Note: This is a draft document. Please consult a qualified lawyer before filing.)
`;
}

function generateMaintenance(data) {
  return `
IN THE COURT OF THE JUDGE, FAMILY COURT, LUCKNOW

MAINTENANCE APPLICATION UNDER SECTION ${data.section || 'BNSS 144'}

Applicant/Wife:
Name: ${data.name || '_________________'}
Father's Name: ${data.father || '_________________'}
Address: ${data.address || '_________________'}

Versus

Respondent/Husband:
Name: ${data.husband || '_________________'}
Father's Name: ${data.husbandFather || '_________________'}
Address: ${data.husbandAddress || '_________________'}

MOST RESPECTFULLY SHOWETH:

1. That the applicant is the legally wedded wife of the respondent, married on ${data.marriageDate || '_____________'}.

2. That the respondent has sufficient means to maintain the applicant.

3. That the respondent has neglected and refused to maintain the applicant despite repeated requests.

4. That the applicant has no independent source of income and is unable to maintain herself.

5. That the applicant is entitled to maintenance under the law.

PRAYER:
It is prayed that this Hon'ble Court may kindly order the respondent to pay maintenance of Rs. ${data.amount || '_____________'} per month to the applicant.

Date: ${new Date().toLocaleDateString()}
Place: Lucknow

(Signature)
${data.name || 'Applicant'}

(Note: This is a draft document. Please consult a qualified lawyer before filing.)
`;
}
