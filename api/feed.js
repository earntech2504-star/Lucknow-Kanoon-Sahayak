// api/feed.js - Live Hindi Legal Feed (Engaging + Interesting)
export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 🆕 Try News API first (agar key hai)
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (NEWS_API_KEY) {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=10&apiKey=${NEWS_API_KEY}`;
        const response = await fetch(url, {
          headers: { 'User-Agent': 'LucknowKanoonSahayak/9.0' }
        });
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
          const randomArticle = data.articles[Math.floor(Math.random() * data.articles.length)];
          return res.status(200).json({
            text: `📰 ${randomArticle.title}`,
            source: randomArticle.source?.name || 'News',
            timestamp: new Date().toISOString(),
            type: 'live-news'
          });
        }
      } catch (err) {
        console.warn('News API failed, using local feeds:', err.message);
      }
    }

    // 🆕 LOCAL FEEDS - Hindi + Engaging + Variety
    const feeds = [
      // 🔴 BREAKING - HIGH PROFILE CASES
      {
        text: '🔴 BREAKING: Sonam Raja Raghuvanshi case mein Lucknow HC ne sunwai 15 July ko rakhi — political circles mein halchal!',
        source: 'LiveLaw',
        category: 'breaking'
      },
      {
        text: '⚖️ Sonam Raja Raghuvanshi ke khilaf FIR barkaraar — SC ne kaha "investigation mein dakhal nahi denge"',
        source: 'SCC Online',
        category: 'breaking'
      },
      {
        text: '🚨 UP Politics: Sonam Raja case ko lekar BJP-Congress mein war of words — Lucknow HC mein aaj sunwai',
        source: 'Bar & Bench',
        category: 'political'
      },
      
      // 👩 PATNI-PREMIKA CASES (Women Related)
      {
        text: '💔 Patni ne pati ke khilaf BNSS 144 mein maintenance ki application — SC ne kaha "interim maintenance pehle milega"',
        source: 'LiveLaw',
        category: 'women'
      },
      {
        text: '👩 Premika ne dhokha dene wale premi ke khilaf BNS 318 (Cheating) mein FIR darj karwai — police ne arrest kiya',
        source: 'Indian Kanoon',
        category: 'women'
      },
      {
        text: '🏠 Patni ko 20 saal baad mila nyaay — SC ne kaha "dowry harassment mein saboot ko gambhirta se lena chahiye"',
        source: 'SCC Online',
        category: 'women'
      },
      {
        text: '💍 Shaadi ke 2 ghante baad talaq! Gaaziabad mein pati ne kaha "patni ne chai nahi banai" — court ne kaha "yeh talaq ka aadhar nahi"',
        source: 'Bar & Bench',
        category: 'weird'
      },
      {
        text: '👨‍⚖️ Pati ne court se maanga — "patni ko roz roti banani padegi" — judge ne samjhaya "yeh 21st century hai, kitchen mein equality chahiye"',
        source: 'LiveLaw',
        category: 'funny'
      },
      {
        text: '💔 Premika ne breakup ke baad ex-boyfriend ke khilaf stalking ka case kiya — BNS 351 ke tehat arrest',
        source: 'Indian Kanoon',
        category: 'women'
      },
      
      // ⚖️ SUPREME COURT / HIGH COURT UPDATES
      {
        text: '⚖️ SC: BNS 318 (Cheating) ke liye "intent to deceive" zaroori — sirf loan chukana cheating nahi hota',
        source: 'SCC Online',
        category: 'sc'
      },
      {
        text: '🏛️ Lucknow HC: BNSS 482 (Anticipatory Bail) ke liye naye guidelines jaari — lawyers ko dhyan dena hoga',
        source: 'LiveLaw',
        category: 'hc'
      },
      {
        text: '📜 BSA 63: SC ne kaha "WhatsApp chats, emails, CCTV ke liye certificate mandatory" — bina certificate saboot reject',
        source: 'Bar & Bench',
        category: 'sc'
      },
      {
        text: '⚖️ BNSS 480: Magistrate ab 7 saal tak ki saza ke cases mein bail de sakta hai — purane CrPC 437 se badlaav',
        source: 'SCC Online',
        category: 'sc'
      },
      
      // 💻 CYBER CRIME
      {
        text: '💻 ALERT: Naya UPI fraud! Fake payment request se logon ke account khali — CERT-In ne advisory jaari ki',
        source: 'CERT-In',
        category: 'cyber'
      },
      {
        text: '🚨 Delhi Police ne ₹500 crore ka cyber fraud bust kiya — fake investment apps ke through logon ko loot rahe the',
        source: 'LiveLaw',
        category: 'cyber'
      },
      {
        text: '📱 OTP scam mein Lucknow ki mahila ke account se ₹8 lakh gayab — cyber cell ne FIR darj ki, investigation shuru',
        source: 'Indian Kanoon',
        category: 'cyber'
      },
      
      // 🤯 WEIRD / FUNNY CASES
      {
        text: '🐔 Murgi ne udaaya ₹50 lakh ka nuksaan! Bijli ke taar ko kaat diya — factory owner ne murgi ke maalik se muawza maanga',
        source: 'Bar & Bench',
        category: 'funny'
      },
      {
        text: '🚗 Parking ki jagah nahi mili to court mein case daal diya — judge ne ₹500 ka jurmana lagaya "time waste" ke liye',
        source: 'LiveLaw',
        category: 'funny'
      },
      {
        text: '👗 Saari ki lambai par vivad! Mahila ne tailor ke khilaf case kiya — 2 inch kam kaat di — court ne compromise ki salah di',
        source: 'Bar & Bench',
        category: 'funny'
      },
      {
        text: '🐶 Vakil ne kutton ko gawah banane ki koshish ki — judge ne kaha "kutta bol nahi sakta, isliye gawah nahi ho sakta"',
        source: 'Indian Kanoon',
        category: 'funny'
      },
      {
        text: '📱 Judge ne vakil ka mobile jabt kar liya — court mein game khel raha tha! Judge bola "ab court ke online game khelo — yaani case!"',
        source: 'LiveLaw',
        category: 'funny'
      },
      
      // 📢 LEGAL UPDATES
      {
        text: '📢 1 July 2024 se BNS/BNSS/BSA lagu — purana IPC/CrPC/Evidence Act ab nahi chalega — lawyers ko dhyan dena hoga',
        source: 'Govt of India',
        category: 'update'
      },
      {
        text: '🔥 TRENDING: BNS 318 (Cheating) par SC ka naya interpretation — "intent to deceive" prove karna zaroori',
        source: 'LiveLaw',
        category: 'trending'
      },
      {
        text: '📚 Judiciary Exam 2026: BNS/BNSS/BSA se 60% sawal aayenge — taiyari shuru karo!',
        source: 'Legal Service India',
        category: 'exam'
      }
    ];

    // 🎲 Random feed pick karo
    const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
    
    res.status(200).json({
      text: randomFeed.text,
      source: randomFeed.source,
      category: randomFeed.category,
      timestamp: new Date().toISOString(),
      type: 'local-feed',
      total_feeds: feeds.length
    });

  } catch (error) {
    console.error('Feed API error:', error);
    res.status(200).json({
      text: '⚖️ Legal updates jald hi aayenge... 🌹',
      source: 'System',
      timestamp: new Date().toISOString(),
      type: 'error-fallback'
    });
  }
}
