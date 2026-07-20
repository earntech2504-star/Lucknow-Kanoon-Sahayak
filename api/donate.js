// ============================================================
// api/donate.js - Donate
// ============================================================

function donateUPI(amount) {
    const custom = document.getElementById('custom-donation-amount');
    const finalAmt = amount || parseFloat(custom?.value) || 10;
    alert('☕ Thank you for ₹' + finalAmt + '! UPI: icfai.sandeep@oksbi');
}

function copyUPI() {
    const text = 'icfai.sandeep@oksbi';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('✅ UPI ID Copied!\n\n' + text);
        }).catch(() => {
            alert('📱 UPI: ' + text);
        });
    } else {
        alert('📱 UPI: ' + text);
    }
}

console.log('✅ donate.js loaded');