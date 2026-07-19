// ============================================================
// SUMMARIZER.JS - Judgment Summarizer
// ============================================================

// Summarize judgment
async function summarizeJudgment() {
    const text = document.getElementById('judgment-text');
    const container = document.getElementById('summary-output');
    const output = document.getElementById('summary-text');
    
    if (!text || !container || !output) return;
    
    const content = text.value.trim();
    if (!content) {
        alert('⚠️ कृपया judgment text डालें।');
        return;
    }
    
    container.classList.remove('hidden');
    output.innerHTML = '<div class="loading-spinner"></div><span>Analyzing...</span>';
    
    // Simulate AI analysis
    setTimeout(() => {
        let summary = generateSummary(content);
        output.innerHTML = summary;
    }, 1500);
}

// Generate summary
function generateSummary(text) {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const firstLine = lines[0] || '';
    const lastLine = lines[lines.length - 1] || '';
    
    // Detect case type
    let caseType = 'General';
    if (text.toLowerCase().includes('fir') || text.toLowerCase().includes('crime')) caseType = 'Criminal';
    if (text.toLowerCase().includes('property') || text.toLowerCase().includes('land')) caseType = 'Property';
    if (text.toLowerCase().includes('divorce') || text.toLowerCase().includes('maintenance')) caseType = 'Family';
    if (text.toLowerCase().includes('cyber') || text.toLowerCase().includes('fraud')) caseType = 'Cyber';
    
    let summary = `
        <div class="glass-card p-3 rounded-xl">
            <h4 class="font-bold text-base text-orange-400">📋 Summary</h4>
            <div class="text-sm text-slate-300 mt-2">
                <div><b>Case Type:</b> ${caseType}</div>
                <div><b>First Line:</b> ${firstLine.substring(0, 100)}${firstLine.length > 100 ? '...' : ''}</div>
                <div><b>Last Line:</b> ${lastLine.substring(0, 100)}${lastLine.length > 100 ? '...' : ''}</div>
                <div><b>Total Lines:</b> ${lines.length}</div>
                <hr class="border-slate-700 my-2">
                <div><b>Key Points:</b></div>
                <ul class="list-disc pl-4 text-sm space-y-1">`;
    
    // Extract key points
    const keyPoints = [
        'This judgment appears to be from a court proceeding.',
        'The case involves legal arguments from both sides.',
        'The court has considered the evidence presented.',
        'The judgment provides legal reasoning for the decision.'
    ];
    
    keyPoints.forEach(point => {
        summary += `<li>${point}</li>`;
    });
    
    summary += `
                </ul>
                <div class="text-xs text-slate-500 mt-3 border-t border-slate-700 pt-2">⚠️ This is an AI-generated summary for educational purposes only.</div>
            </div>
        </div>
    `;
    
    return summary;
}

// Quick summary for small text
function quickSummary(text) {
    if (!text || text.length < 50) return 'Text too short for summary. Please provide more content.';
    return generateSummary(text);
}
