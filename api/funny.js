// ============================================================
// FUNNY.JS - Legal Humor
// ============================================================

// Legal Humor Data
const legalHumor = [
    { id: 1, title: 'जज साहब की मुस्कान', story: 'एक वकील ने जज से कहा - "सर, मेरे मुवक्किल ने कभी चोरी नहीं की!" जज ने पूछा - "तो ये चोरी का माल कहाँ से आया?" वकील ने कहा - "सर, ये तो उसे गिफ्ट मिला था!" जज ने मुस्कुराते हुए कहा - "तो फिर गिफ्ट देने वाले को बुलाओ!"', category: 'court' },
    { id: 2, title: 'तेलंगाना कोर्ट का किस्सा', story: 'जज: "आप पर आरोप है कि आपने चोरी की।" मुवक्किल: "सर, मैंने चोरी नहीं की, मैंने उधार लिया था!" जज: "कब लौटाना था?" मुवक्किल: "सर, वो तो मुझे याद नहीं!"', category: 'court' },
    { id: 3, title: 'बैलेंसिंग एक्ट', story: 'जज ने वकील से कहा - "आपके तर्क बहुत अच्छे हैं, लेकिन मेरे पास भी एक तर्क है - कानून!" वकील ने कहा - "सर, कानून तो आपके हाथ में है!"', category: 'joke' },
    { id: 4, title: 'वकील की बुद्धि', story: 'जज: "आपको क्या लगता है, आपका मुवक्किल निर्दोष है?" वकील: "सर, अगर वो निर्दोष नहीं होता, तो मैं उसका केस क्यों लेता?"', category: 'lawyer' },
    { id: 5, title: 'कोर्ट रूम का मजाक', story: 'जज: "आपने केस क्यों फाइल किया?" वकील: "सर, क्योंकि मेरे क्लाइंट को लगा कि उसके साथ अन्याय हुआ है।" जज: "तो आपको क्या लगता है?" वकील: "सर, मुझे तो लगता है कि उसके साथ सच में अन्याय हुआ है!"', category: 'court' },
    { id: 6, title: 'कानून की पेचीदगी', story: 'एक आदमी ने वकील से पूछा - "वकील साहब, क्या मैं अपनी जमीन बेच सकता हूँ?" वकील ने कहा - "बेच सकते हैं, लेकिन पहले कानून पढ़ लें।" आदमी - "कानून कहाँ मिलेगा?" वकील - "वही जो आपकी जमीन पर लागू होता है!"', category: 'property' }
];

// Load funny content
function loadFunny() {
    const container = document.getElementById('funny-container');
    if (!container) return;
    container.innerHTML = '';
    legalHumor.forEach(h => {
        const div = document.createElement('div');
        div.className = 'glass-card p-3 rounded-xl mb-3';
        div.innerHTML = `
            <div class="font-bold text-base text-yellow-400">😄 ${h.title}</div>
            <div class="text-sm text-slate-300 mt-1">${h.story}</div>
            <div class="text-xs text-slate-500 mt-1">#${h.category}</div>
        `;
        container.appendChild(div);
    });
}

// Get random joke
function getRandomJoke() {
    const random = legalHumor[Math.floor(Math.random() * legalHumor.length)];
    alert('😄 ' + random.title + '\n\n' + random.story);
}
