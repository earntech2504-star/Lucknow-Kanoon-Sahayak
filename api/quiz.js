// api/quiz.js - Dynamic Quiz Generator

const QUIZ_DATA = [
  { question: "BNS 318 किस IPC Section की जगह है?", options: ["IPC 420", "IPC 302", "IPC 379", "IPC 498A"], answer: 0, category: "BNS", explanation: "BNS 318 = IPC 420 (Cheating)" },
  { question: "BNSS 173 किस CrPC Section की जगह है?", options: ["CrPC 154", "CrPC 437", "CrPC 438", "CrPC 125"], answer: 0, category: "BNSS", explanation: "BNSS 173 = CrPC 154 (FIR)" },
  { question: "BNSS 480 किस CrPC Section की जगह है?", options: ["CrPC 437", "CrPC 154", "CrPC 438", "CrPC 125"], answer: 0, category: "BNSS", explanation: "BNSS 480 = CrPC 437 (Bail)" },
  { question: "BSA 63 किस Evidence Act Section की जगह है?", options: ["65B", "65", "63", "67"], answer: 0, category: "BSA", explanation: "BSA 63 = Evidence Act 65B (Electronic Evidence)" },
  { question: "BNS 85 किस IPC Section की जगह है?", options: ["IPC 498A", "IPC 420", "IPC 302", "IPC 379"], answer: 0, category: "BNS", explanation: "BNS 85 = IPC 498A (Cruelty)" },
  { question: "BNS 103 किस IPC Section की जगह है?", options: ["IPC 302", "IPC 420", "IPC 379", "IPC 498A"], answer: 0, category: "BNS", explanation: "BNS 103 = IPC 302 (Murder)" },
  { question: "BNS 303 किस IPC Section की जगह है?", options: ["IPC 379", "IPC 420", "IPC 302", "IPC 498A"], answer: 0, category: "BNS", explanation: "BNS 303 = IPC 379 (Theft)" },
  { question: "BNSS 144 किस CrPC Section की जगह है?", options: ["CrPC 125", "CrPC 154", "CrPC 437", "CrPC 438"], answer: 0, category: "BNSS", explanation: "BNSS 144 = CrPC 125 (Maintenance)" },
  { question: "BNSS 482 किस CrPC Section की जगह है?", options: ["CrPC 438", "CrPC 154", "CrPC 437", "CrPC 125"], answer: 0, category: "BNSS", explanation: "BNSS 482 = CrPC 438 (Anticipatory Bail)" },
  { question: "BNS 64 किस IPC Section की जगह है?", options: ["IPC 375", "IPC 376", "IPC 354", "IPC 377"], answer: 0, category: "BNS", explanation: "BNS 64 = IPC 375 (Rape)" },
  { question: "BNS 65 किस IPC Section की जगह है?", options: ["IPC 376", "IPC 375", "IPC 354", "IPC 377"], answer: 0, category: "BNS", explanation: "BNS 65 = IPC 376 (Rape Punishment)" },
  { question: "BNS 66 किस IPC Section की जगह है?", options: ["IPC 354", "IPC 375", "IPC 376", "IPC 377"], answer: 0, category: "BNS", explanation: "BNS 66 = IPC 354 (Sexual Assault)" }
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { count = 5 } = req.query;
  const quizCount = Math.min(parseInt(count) || 5, 20);

  try {
    // Shuffle and pick random questions
    const shuffled = shuffleArray([...QUIZ_DATA]);
    const selected = shuffled.slice(0, quizCount);

    res.status(200).json({
      items: selected,
      total: QUIZ_DATA.length,
      status: 'success'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
}