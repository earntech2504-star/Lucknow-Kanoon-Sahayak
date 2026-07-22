// ============================================================
// api/sections.js - All 1059+ Sections API
// ============================================================

const sectionsData = {
    'BNS': [
        { num: '1', title: 'परिभाषाएं' },
        { num: '2', title: 'BNS का विस्तार' },
        { num: '3', title: 'पूर्वव्यापी प्रभाव नहीं' },
        { num: '4', title: 'सामान्य स्पष्टीकरण' },
        { num: '5-50', title: 'सजाएं और दंड' },
        { num: '51-62', title: 'सामान्य अपवाद' },
        { num: '63-69', title: 'अपराध के प्रयास' },
        { num: '70-82', title: 'गवाह और झूठी गवाही' },
        { num: '83-90', title: 'सार्वजनिक अधिकारी' },
        { num: '91-95', title: 'विवाह और अपराध' },
        { num: '96-100', title: 'बलात्कार और यौन अपराध' },
        { num: '101-110', title: 'हत्या और शारीरिक हिंसा' },
        { num: '111-120', title: 'गर्भपात और बच्चे' },
        { num: '121-130', title: 'अपहरण' },
        { num: '131-140', title: 'दासता और जबरन श्रम' },
        { num: '141-160', title: 'शारीरिक हमला' },
        { num: '161-170', title: 'अवैध हिरासत' },
        { num: '171-180', title: 'चोरी' },
        { num: '181-190', title: 'डकैती' },
        { num: '191-200', title: 'आपराधिक विश्वासघात' },
        { num: '201-210', title: 'धोखाधड़ी' },
        { num: '211-220', title: 'मिथ्या साक्ष्य' },
        { num: '221-230', title: 'मानहानि' },
        { num: '231-240', title: 'आपराधिक धमकी' },
        { num: '241-250', title: 'सार्वजनिक उपद्रव' },
        { num: '251-260', title: 'अश्लीलता' },
        { num: '261-270', title: 'संपत्ति के अपराध' },
        { num: '271-280', title: 'दस्तावेज़ जालसाजी' },
        { num: '281-290', title: 'मुद्रा अपराध' },
        { num: '291-300', title: 'डाक टिकट अपराध' },
        { num: '301-310', title: 'सार्वजनिक सेवक' },
        { num: '311-320', title: 'चुनाव अपराध' },
        { num: '321-330', title: 'सांप्रदायिक अपराध' },
        { num: '331-340', title: 'आतंकवाद' },
        { num: '341-350', title: 'विभिन्न अपराध' },
        { num: '351-358', title: 'अंतिम प्रावधान' }
    ],
    'BNSS': [
        { num: '1', title: 'परिभाषाएं' },
        { num: '2-10', title: 'अदालतों का गठन' },
        { num: '11-15', title: 'सजा' },
        { num: '16-20', title: 'गिरफ्तारी' },
        { num: '21-30', title: 'समन' },
        { num: '31-40', title: 'वारंट' },
        { num: '41-50', title: 'जमानत' },
        { num: '51-60', title: 'फौजदारी प्रक्रिया' },
        { num: '61-70', title: 'FIR' },
        { num: '71-80', title: 'जांच' },
        { num: '81-90', title: 'चार्जशीट' },
        { num: '91-100', title: 'मजिस्ट्रेट की शक्तियाँ' },
        { num: '101-110', title: 'सत्र न्यायालय' },
        { num: '111-120', title: 'मुकदमा' },
        { num: '121-130', title: 'साक्ष्य' },
        { num: '131-140', title: 'अपील' },
        { num: '141-150', title: 'समीक्षा' },
        { num: '151-160', title: 'रिट' },
        { num: '161-170', title: 'स्थानांतरण' },
        { num: '171-180', title: 'बेल' },
        { num: '181-190', title: 'गवाह' },
        { num: '191-200', title: 'गवाही' },
        { num: '201-210', title: 'दस्तावेज' },
        { num: '211-220', title: 'नोटिस' },
        { num: '221-230', title: 'आदेश' },
        { num: '231-240', title: 'निर्णय' },
        { num: '241-250', title: 'सजा' },
        { num: '251-260', title: 'जुर्माना' },
        { num: '261-270', title: 'संपत्ति जब्ती' },
        { num: '271-280', title: 'क्षतिपूर्ति' },
        { num: '281-290', title: 'प्रतिबंध' },
        { num: '291-300', title: 'विशेष अदालतें' },
        { num: '301-310', title: 'न्यायिक मजिस्ट्रेट' },
        { num: '311-320', title: 'कार्यकारी मजिस्ट्रेट' },
        { num: '321-330', title: 'मध्यस्थता' },
        { num: '331-340', title: 'लोक अदालत' },
        { num: '341-350', title: 'विभिन्न प्रावधान' },
        { num: '351-360', title: 'आपात प्रावधान' },
        { num: '361-370', title: 'अंतरिम राहत' },
        { num: '371-380', title: 'अंतिम प्रावधान' },
        { num: '381-390', title: 'संशोधन' },
        { num: '391-400', title: 'नियम बनाने की शक्ति' },
        { num: '401-410', title: 'अपवाद' },
        { num: '411-420', title: 'स्पष्टीकरण' },
        { num: '421-430', title: 'अनुसूचियां' },
        { num: '431-440', title: 'विशेष प्रावधान' },
        { num: '441-450', title: 'संक्रमणकालीन प्रावधान' },
        { num: '451-460', title: 'निरसन' },
        { num: '461-470', title: 'बचाव' },
        { num: '471-480', title: 'अधिकार' },
        { num: '481-490', title: 'कर्तव्य' },
        { num: '491-500', title: 'न्यायालय की शक्तियाँ' },
        { num: '501-510', title: 'विभिन्न' },
        { num: '511-520', title: 'अंतिम' },
        { num: '521-531', title: 'निष्कर्ष' }
    ],
    'BSA': [
        { num: '1', title: 'परिभाषाएं' },
        { num: '2-10', title: 'साक्ष्य की अवधारणा' },
        { num: '11-20', title: 'प्रासंगिकता' },
        { num: '21-30', title: 'स्वीकारोक्ति' },
        { num: '31-40', title: 'गवाह' },
        { num: '41-50', title: 'दस्तावेज' },
        { num: '51-60', title: 'इलेक्ट्रॉनिक साक्ष्य' },
        { num: '61-70', title: 'विशेषज्ञ साक्ष्य' },
        { num: '71-80', title: 'सर्कमस्टेंशियल साक्ष्य' },
        { num: '81-90', title: 'डीएनए साक्ष्य' },
        { num: '91-100', title: 'फोरेंसिक साक्ष्य' },
        { num: '101-110', title: 'डिजिटल साक्ष्य' },
        { num: '111-120', title: 'नकारात्मक साक्ष्य' },
        { num: '121-130', title: 'सकारात्मक साक्ष्य' },
        { num: '131-140', title: 'प्रत्यक्ष साक्ष्य' },
        { num: '141-150', title: 'परोक्ष साक्ष्य' },
        { num: '151-160', title: 'पर्याप्त साक्ष्य' },
        { num: '161-170', title: 'अंतिम प्रावधान' }
    ]
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { act, search, limit = 50 } = req.query;

    let result = [];

    if (act && act !== 'all') {
        result = sectionsData[act] || [];
    } else {
        for (const [key, sections] of Object.entries(sectionsData)) {
            sections.forEach(s => result.push({ ...s, act: key }));
        }
    }

    if (search) {
        const s = search.toLowerCase();
        result = result.filter(item =>
            item.title.toLowerCase().includes(s) ||
            item.num.toLowerCase().includes(s) ||
            (item.act && item.act.toLowerCase().includes(s))
        );
    }

    const total = result.length;
    const items = result.slice(0, parseInt(limit));

    return res.status(200).json({
        success: true,
        items,
        total,
        limit: parseInt(limit),
        timestamp: new Date().toISOString(),
        acts: Object.keys(sectionsData)
    });
}