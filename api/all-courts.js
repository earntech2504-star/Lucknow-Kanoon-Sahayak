// ============================================================
// ALL-COURTS.JS - All Courts
// ============================================================

// Ask court AI
async function askCourtAI() {
    const select = document.getElementById('court-select');
    const container = document.getElementById('all-courts-ans');
    if (!select || !container) return;
    
    const court = select.value;
    container.innerHTML = '<div class="loading-spinner"></div><span>Loading...</span>';
    container.classList.remove('hidden');
    
    setTimeout(() => {
        const response = getCourtInfo(court);
        container.innerHTML = response;
    }, 500);
}

// Get court info
function getCourtInfo(court) {
    const courts = {
        'HC Lucknow': `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Allahabad High Court - Lucknow Bench</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Address:</b> Rana Pratap Marg, Lucknow - 226001</p>
                    <p>📌 <b>Jurisdiction:</b> Uttar Pradesh</p>
                    <p>📌 <b>Website:</b> <a href="https://www.allahabadhighcourt.in" target="_blank" class="text-blue-400">Visit →</a></p>
                    <p>📌 <b>Cause List:</b> <a href="https://www.allahabadhighcourt.in/causelist/" target="_blank" class="text-blue-400">View →</a></p>
                    <p>📌 <b>Cases:</b> Civil, Criminal, Constitutional</p>
                </div>
            </div>
        `,
        'Supreme Court': `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🏛️ Supreme Court of India</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Address:</b> Tilak Marg, New Delhi - 110001</p>
                    <p>📌 <b>Jurisdiction:</b> All of India (Final court of appeal)</p>
                    <p>📌 <b>Website:</b> <a href="https://www.sci.gov.in" target="_blank" class="text-blue-400">Visit →</a></p>
                    <p>📌 <b>Judge:</b> Chief Justice + 33 Judges</p>
                    <p>📌 <b>Powers:</b> Original, Appellate, Advisory, Writ</p>
                </div>
            </div>
        `,
        'Sessions Court': `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">⚖️ Sessions Court</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Location:</b> District Headquarters</p>
                    <p>📌 <b>Jurisdiction:</b> District Level</p>
                    <p>📌 <b>Cases:</b> Serious criminal trials (Murder, Rape, etc.)</p>
                    <p>📌 <b>Judge:</b> Sessions Judge</p>
                    <p>📌 <b>Appeal:</b> High Court</p>
                </div>
            </div>
        `,
        'Family Court': `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">👨‍👩‍👧 Family Court</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>📌 <b>Location:</b> District Headquarters</p>
                    <p>📌 <b>Jurisdiction:</b> Family matters</p>
                    <p>📌 <b>Cases:</b> Divorce, Maintenance, Child Custody, Domestic Violence</p>
                    <p>📌 <b>Judge:</b> Family Court Judge</p>
                    <p>📌 <b>Appeal:</b> High Court</p>
                </div>
            </div>
        `
    };
    return courts[court] || courts['HC Lucknow'];
}
