// api/sections.js - BNS/BNSS/BSA Sections Database
const SECTIONS_DB = {
  bns: {
    name: "Bharatiya Nyaya Sanhita (BNS)",
    chapters: [
      {
        number: 1,
        title: "Preliminary",
        sections: [
          { number: "BNS 1", title: "Short title and commencement", text: "This Act may be called the Bharatiya Nyaya Sanhita, 2023." },
          { number: "BNS 2", title: "Definitions", text: "In this Sanhita, unless the context otherwise requires..." },
          { number: "BNS 3", title: "Punishment of offences committed beyond India", text: "Any person liable by any Indian law to be tried for an offence committed beyond India shall be dealt with according to the provisions of this Sanhita..." }
        ]
      },
      {
        number: 3,
        title: "Offences Against the State",
        sections: [
          { number: "BNS 103", title: "Murder", text: "Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death..." },
          { number: "BNS 104", title: "Culpable homicide not amounting to murder", text: "Culpable homicide is not murder if it falls under any of the following exceptions..." }
        ]
      },
      {
        number: 4,
        title: "Offences Against Women and Children",
        sections: [
          { number: "BNS 64", title: "Rape", text: "A man is said to commit 'rape' if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him..." },
          { number: "BNS 65", title: "Punishment for rape", text: "Whoever commits rape shall be punished with rigorous imprisonment of not less than ten years, but which may extend to imprisonment for life..." },
          { number: "BNS 85", title: "Cruelty by husband or relatives", text: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years..." }
        ]
      },
      {
        number: 5,
        title: "Offences Against Property",
        sections: [
          { number: "BNS 303", title: "Theft", text: "Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft." },
          { number: "BNS 318", title: "Cheating", text: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to 'cheat'." }
        ]
      }
    ]
  },
  bnss: {
    name: "Bharatiya Nagarik Suraksha Sanhita (BNSS)",
    chapters: [
      {
        number: 5,
        title: "Maintenance and Other Proceedings",
        sections: [
          { number: "BNSS 144", title: "Order for maintenance of wives, children and parents", text: "If any person having sufficient means neglects or refuses to maintain his wife, legitimate or illegitimate child, or his father or mother, a Magistrate may order such person to make a monthly allowance for the maintenance of such wife, child, or parent." }
        ]
      },
      {
        number: 6,
        title: "Arrest, Bail and Investigation",
        sections: [
          { number: "BNSS 173", title: "Information in cognizable cases (FIR)", text: "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him..." },
          { number: "BNSS 480", title: "Bail in non-bailable offences", text: "A person accused of a non-bailable offence may be released on bail by the Magistrate or the Court, subject to the provisions of this Sanhita." },
          { number: "BNSS 482", title: "Anticipatory bail", text: "If any person has reason to believe that he may be arrested on accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section." }
        ]
      }
    ]
  },
  bsa: {
    name: "Bharatiya Sakshya Adhiniyam (BSA)",
    chapters: [
      {
        number: 4,
        title: "Electronic Evidence",
        sections: [
          { number: "BSA 63", title: "Admissibility of electronic evidence", text: "Notwithstanding anything contained in this Adhiniyam, any information contained in an electronic record, which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer, shall be deemed to be a document..." }
        ]
      }
    ]
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { act, search } = req.query;

  try {
    let data = {};

    if (act && act !== 'all') {
      data[act] = SECTIONS_DB[act];
    } else {
      data = SECTIONS_DB;
    }

    // If search parameter is provided
    if (search && search.length > 0) {
      const searchLower = search.toLowerCase();
      const results = [];
      for (const [actName, actData] of Object.entries(data)) {
        for (const chapter of actData.chapters) {
          for (const section of chapter.sections) {
            if (section.title.toLowerCase().includes(searchLower) ||
                section.text.toLowerCase().includes(searchLower) ||
                section.number.toLowerCase().includes(searchLower)) {
              results.push({ ...section, act: actName });
            }
          }
        }
      }
      return res.status(200).json({
        items: results,
        total: results.length,
        status: 'success'
      });
    }

    res.status(200).json({
      data,
      status: 'success'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
}
