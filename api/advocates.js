// ============================================================
// api/advocates.js - Advocate Directory & Pro Bono API
// ============================================================

// ============================================================
// ADVOCATE DATABASE
// ============================================================
const advocates = [
    { name: 'Adv. Rakesh Sharma', ward: 12, spec: 'Criminal', phone: '98765XXXXX', exp: '15 yrs', chambers: 'Alambagh', rating: 4.8 },
    { name: 'Adv. Priya Singh', ward: 45, spec: 'Women', phone: '98765XXXXX', exp: '10 yrs', chambers: 'Gomti Nagar', rating: 4.9 },
    { name: 'Adv. Mohd. Irfan', ward: 78, spec: 'Property', phone: '98765XXXXX', exp: '12 yrs', chambers: 'Indira Nagar', rating: 4.7 },
    { name: 'Adv. Anjali Verma', ward: 22, spec: 'Family', phone: '98765XXXXX', exp: '8 yrs', chambers: 'Hazratganj', rating: 4.6 },
    { name: 'Adv. Suresh Kumar', ward: 91, spec: 'Cyber', phone: '98765XXXXX', exp: '6 yrs', chambers: 'Chowk', rating: 4.5 },
    { name: 'Adv. Neha Gupta', ward: 34, spec: 'Civil', phone: '98765XXXXX', exp: '9 yrs', chambers: 'Gomti Nagar', rating: 4.7 },
    { name: 'Adv. Amit Singh', ward: 56, spec: 'Criminal', phone: '98765XXXXX', exp: '14 yrs', chambers: 'Alambagh', rating: 4.9 },
    { name: 'Adv. Deepa Mishra', ward: 67, spec: 'Family', phone: '98765XXXXX', exp: '11 yrs', chambers: 'Indira Nagar', rating: 4.6 },
    { name: 'Adv. Sanjay Verma', ward: 89, spec: 'Property', phone: '98765XXXXX', exp: '7 yrs', chambers: 'Hazratganj', rating: 4.4 },
    { name: 'Adv. Kavita Srivastava', ward: 23, spec: 'Women', phone: '98765XXXXX', exp: '13 yrs', chambers: 'Gomti Nagar', rating: 4.9 },
    { name: 'Adv. Rajesh Kumar', ward: 15, spec: 'Criminal', phone: '98765XXXXX', exp: '20 yrs', chambers: 'Alambagh', rating: 4.9 },
    { name: 'Adv. Sunita Sharma', ward: 40, spec: 'Family', phone: '98765XXXXX', exp: '16 yrs', chambers: 'Hazratganj', rating: 4.8 },
    { name: 'Adv. Imran Khan', ward: 55, spec: 'Property', phone: '98765XXXXX', exp: '10 yrs', chambers: 'Chowk', rating: 4.5 },
    { name: 'Adv. Pooja Singh', ward: 70, spec: 'Women', phone: '98765XXXXX', exp: '8 yrs', chambers: 'Gomti Nagar', rating: 4.7 },
    { name: 'Adv. Vikram Singh', ward: 85, spec: 'Cyber', phone: '98765XXXXX', exp: '5 yrs', chambers: 'Indira Nagar', rating: 4.3 },
    { name: 'Adv. Meera Sharma', ward: 30, spec: 'Consumer', phone: '98765XXXXX', exp: '7 yrs', chambers: 'Hazratganj', rating: 4.6 },
    { name: 'Adv. Arjun Patel', ward: 50, spec: 'Civil', phone: '98765XXXXX', exp: '12 yrs', chambers: 'Gomti Nagar', rating: 4.7 },
    { name: 'Adv. Sneha Reddy', ward: 60, spec: 'Cyber', phone: '98765XXXXX', exp: '4 yrs', chambers: 'Indira Nagar', rating: 4.4 },
    { name: 'Adv. Manoj Singh', ward: 75, spec: 'Criminal', phone: '98765XXXXX', exp: '18 yrs', chambers: 'Alambagh', rating: 4.8 },
    { name: 'Adv. Kiran Gupta', ward: 35, spec: 'Women', phone: '98765XXXXX', exp: '9 yrs', chambers: 'Hazratganj', rating: 4.6 }
];

// ============================================================
// PRO BONO STORAGE
// ============================================================
let proBonoReqs = [];

// ============================================================
// API HANDLER
// ============================================================
export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method } = req;

    // ============================================================
    // GET - Fetch advocates
    // ============================================================
    if (method === 'GET') {
        const { ward, spec, search, limit = 20, page = 1, action } = req.query;

        // GET - Pro Bono requests
        if (action === 'pro-bono') {
            return res.status(200).json({
                success: true,
                items: proBonoReqs,
                total: proBonoReqs.length,
                timestamp: new Date().toISOString()
            });
        }

        // GET - Advocate stats
        if (action === 'stats') {
            const stats = {
                total: advocates.length,
                bySpec: {},
                byWard: {},
                avgRating: (advocates.reduce((sum, a) => sum + a.rating, 0) / advocates.length).toFixed(1),
                topRated: [...advocates].sort((a, b) => b.rating - a.rating).slice(0, 5)
            };
            
            advocates.forEach(a => {
                stats.bySpec[a.spec] = (stats.bySpec[a.spec] || 0) + 1;
                stats.byWard[a.ward] = (stats.byWard[a.ward] || 0) + 1;
            });
            
            return res.status(200).json({
                success: true,
                stats,
                timestamp: new Date().toISOString()
            });
        }

        let result = [...advocates];

        // Filter by ward
        if (ward && ward !== 'all') {
            const wardNum = parseInt(ward);
            result = result.filter(a => a.ward === wardNum);
        }

        // Filter by specialization
        if (spec && spec !== 'all') {
            result = result.filter(a => a.spec === spec);
        }

        // Search by name, specialization, chambers
        if (search) {
            const s = search.toLowerCase();
            result = result.filter(a =>
                a.name.toLowerCase().includes(s) ||
                a.spec.toLowerCase().includes(s) ||
                a.chambers.toLowerCase().includes(s) ||
                a.ward.toString().includes(s)
            );
        }

        const total = result.length;
        const start = (parseInt(page) - 1) * parseInt(limit);
        const end = start + parseInt(limit);
        const items = result.slice(start, end);

        return res.status(200).json({
            success: true,
            items,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit)),
            timestamp: new Date().toISOString(),
            allWards: [...new Set(advocates.map(a => a.ward))].sort((a, b) => a - b),
            allSpecs: [...new Set(advocates.map(a => a.spec))]
        });
    }

    // ============================================================
    // POST - Submit Pro Bono request
    // ============================================================
    if (method === 'POST') {
        const { name, phone, ward, description, email, category = 'General' } = req.body;

        // Validate required fields
        if (!name || !phone || !ward || !description) {
            return res.status(400).json({
                success: false,
                error: 'Name, Phone, Ward, Description are required'
            });
        }

        // Validate phone number
        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone number. Please enter 10 digits.'
            });
        }

        // Validate ward
        const wardNum = parseInt(ward);
        if (isNaN(wardNum) || wardNum < 1 || wardNum > 110) {
            return res.status(400).json({
                success: false,
                error: 'Invalid ward. Please select a ward between 1-110.'
            });
        }

        // Create new pro bono request
        const request = {
            id: 'PB-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
            name: name.trim(),
            phone: phone.trim(),
            email: email ? email.trim() : '',
            ward: ward.toString(),
            wardNum: wardNum,
            description: description.trim(),
            category: category.trim(),
            status: 'pending',
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tracking: [
                {
                    event: 'Request Submitted',
                    timestamp: new Date().toISOString(),
                    note: 'Pro Bono request submitted successfully. DLSA will contact within 48 hours.'
                }
            ]
        };

        proBonoReqs.unshift(request);

        // Send notification (in production, integrate with email/SMS)
        console.log('📧 New Pro Bono Request:', request.id);
        console.log('👤 Name:', request.name);
        console.log('📱 Phone:', request.phone);
        console.log('🏛️ Ward:', request.ward);
        console.log('📝 Description:', request.description);

        return res.status(201).json({
            success: true,
            request,
            message: '✅ Pro Bono request submitted successfully! DLSA will contact you within 48 hours.',
            trackingLink: `/track/${request.id}`,
            nextSteps: [
                '📋 Request ID: ' + request.id,
                '📞 You will receive a call from DLSA within 48 hours',
                '📧 Check your email for confirmation',
                '🔍 Track your request using the ID above'
            ]
        });
    }

    // ============================================================
    // PUT - Update Pro Bono request status
    // ============================================================
    if (method === 'PUT') {
        const { id, status, note } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Request ID is required'
            });
        }

        const index = proBonoReqs.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: 'Request not found'
            });
        }

        const request = proBonoReqs[index];

        if (status) {
            request.status = status;
            request.updatedAt = new Date().toISOString();
            request.tracking.push({
                event: `Status updated to ${status}`,
                timestamp: new Date().toISOString(),
                note: note || ''
            });
        }

        return res.status(200).json({
            success: true,
            request,
            message: '✅ Request updated successfully'
        });
    }

    // ============================================================
    // DELETE - Remove Pro Bono request
    // ============================================================
    if (method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Request ID is required'
            });
        }

        const filtered = proBonoReqs.filter(r => r.id !== id);

        if (filtered.length === proBonoReqs.length) {
            return res.status(404).json({
                success: false,
                error: 'Request not found'
            });
        }

        proBonoReqs = filtered;

        return res.status(200).json({
            success: true,
            message: '✅ Request deleted successfully'
        });
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        allowed: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });
}

// ============================================================
// EXPORT FOR FRONTEND (if needed)
// ============================================================
export { advocates, proBonoReqs };