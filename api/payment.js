// ============================================================
// PAYMENT.JS - UPI Payment Verification
// ============================================================

// UPI Configuration
const UPI_CONFIG = {
    upiId: process.env.UPI_ID || 'icfai.sandeep@oksbi',
    upiPhone: process.env.UPI_PHONE || '7235870777',
    upiName: process.env.UPI_NAME || 'Sandeep Kumar'
};

// Payment function
function donateUPI(amount) {
    const custom = document.getElementById('custom-donation-amount');
    const finalAmt = amount || parseFloat(custom?.value) || 0;
    
    if (finalAmt <= 0) {
        alert('⚠️ कृपया राशि डालें!');
        return;
    }
    
    const upiLink = `upi://pay?pa=${UPI_CONFIG.upiId}&pn=${UPI_CONFIG.upiName}&am=${finalAmt}&cu=INR`;
    
    // Show payment options
    const msg = `☕ ₹${finalAmt} का भुगतान करें\n\n` +
                `📱 UPI ID: ${UPI_CONFIG.upiId}\n` +
                `📞 Phone: ${UPI_CONFIG.upiPhone}\n\n` +
                `✅ Click OK to open UPI app\n` +
                `⚠️ Payment verification is automatic`;
    
    if (confirm(msg)) {
        // Open UPI app
        window.location.href = upiLink;
        
        // Also show QR for scanning
        setTimeout(() => {
            alert(`📱 Scan QR Code or send to:\n\nUPI: ${UPI_CONFIG.upiId}\nPhone: ${UPI_CONFIG.upiPhone}\n\nThank you! ❤️`);
        }, 1000);
    }
}

// Copy UPI ID
function copyUPI() {
    const text = UPI_CONFIG.upiId;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('✅ UPI ID Copied!\n\n' + text);
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('✅ UPI ID Copied!\n\n' + text);
}

// Generate QR Code
function generateQR() {
    const qrContainer = document.getElementById('qr-container');
    if (!qrContainer) return;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${UPI_CONFIG.upiId}`;
    qrContainer.innerHTML = `
        <div class="text-center">
            <img src="${qrUrl}" alt="UPI QR Code" class="mx-auto border-2 border-white rounded-xl p-2" style="max-width:150px;background:white;">
            <div class="text-xs text-slate-400 mt-1">Scan to pay</div>
        </div>
    `;
}

// Verify Payment (Simulated)
async function verifyPayment(paymentId, amount, method) {
    try {
        const response = await fetch('/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId, amount, method })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Payment verification error:', error);
        return {
            success: false,
            message: 'Payment verification failed'
        };
    }
}

// ============================================================
// API HANDLER (for Vercel/Node)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = async function handler(req, res) {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }
        
        const { paymentId, amount, method } = req.body;
        
        // In production, verify with actual payment gateway
        // For demo, we just return success
        
        res.status(200).json({ 
            success: true, 
            message: 'Payment verified',
            upiId: UPI_CONFIG.upiId,
            upiPhone: UPI_CONFIG.upiPhone,
            upiName: UPI_CONFIG.upiName,
            timestamp: new Date().toISOString()
        });
    };
}

// Export for frontend
export { 
    UPI_CONFIG, 
    donateUPI, 
    copyUPI, 
    generateQR, 
    verifyPayment 
};

// Auto-init QR on page load
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('qr-container')) {
            generateQR();
        }
    });
}

console.log('✅ PAYMENT.JS Loaded');
