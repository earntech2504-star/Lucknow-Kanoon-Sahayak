// ============================================================
// RTO-RTI.JS - RTO/RTI
// ============================================================

// Ask RTO/RTI AI
async function askRTOAI() {
    const input = document.getElementById('rto-rti-input');
    const container = document.getElementById('rto-rti-ans');
    if (!input || !container) return;
    
    const query = input.value.trim();
    if (!query) {
        container.innerHTML = '⚠️ कृपया details दें।';
        container.classList.remove('hidden');
        return;
    }
    
    container.innerHTML = '<div class="loading-spinner"></div><span>Analyzing...</span>';
    container.classList.remove('hidden');
    
    setTimeout(() => {
        const response = generateRTOResponse(query);
        container.innerHTML = response;
    }, 1000);
}

// Generate RTO response
function generateRTOResponse(query) {
    const lower = query.toLowerCase();
    let response = '';
    
    if (lower.includes('rto') || lower.includes('vehicle') || lower.includes('car') || lower.includes('bike')) {
        response = `
            <div class="glass-card p-3 rounded-xl">
                <h4 class="font-bold text-base text-orange-400">🚗 RTO Services</h4>
                <div class="text-sm text-slate-300 mt-2">
                    <p>
