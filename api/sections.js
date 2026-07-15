// api/sections.js
export default async function handler(req, res) {
  // यहाँ आप अपनी पूरी sections डेटाबेस return कर सकते हैं
  // या फिर static data भेज सकते हैं
  const sections = [
    { section: 'BNS 103', title: 'Murder' },
    { section: 'BNS 318', title: 'Cheating' },
    { section: 'BNS 303', title: 'Theft' },
    { section: 'BNSS 173', title: 'FIR Registration' },
    { section: 'BNSS 480', title: 'Bail' },
    { section: 'BNSS 482', title: 'Anticipatory Bail' },
    { section: 'BSA 63', title: 'Electronic Evidence' },
    // ... और भी सारे sections
  ];
  res.status(200).json(sections);
}