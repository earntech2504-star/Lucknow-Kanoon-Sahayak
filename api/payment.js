// api/payments.js – UPI payment verification
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { paymentId, amount, method } = req.body;
    
    // Verify payment (simplified for demo)
    // In production, integrate with actual payment gateway
    const UPI_ID = process.env.UPI_ID || 'icfai.sandeep@oksbi';
    const UPI_PHONE = process.env.UPI_PHONE || '7235870777';
    
    res.status(200).json({ 
        success: true, 
        message: 'Payment verified',
        upiId: UPI_ID,
        upiPhone: UPI_PHONE
    });
}