// api/complaints.js - Complete Complaint Management System
import fs from 'fs';
import path from 'path';

// Data storage path
const DATA_FILE = path.join(process.cwd(), 'data', 'complaints.json');

// Ensure data directory exists
function ensureDataDir() {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Load complaints from file
function loadComplaints() {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }
    return [];
}

// Save complaints to file
function saveComplaints(complaints) {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2));
}

// Generate unique complaint ID
function generateComplaintID() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CMP-${timestamp}-${random}`;
}

// 110 Wards of Lucknow
const LUCKNOW_WARDS = Array.from({ length: 110 }, (_, i) => ({
    id: i + 1,
    name: `Ward ${i + 1}`,
    area: getWardArea(i + 1),
    councillor: getWardCouncillor(i + 1),
    phone: getWardPhone(i + 1),
    email: getWardEmail(i + 1)
}));

function getWardArea(ward) {
    const areas = [
        'Hazratganj', 'Chowk', 'Aminabad', 'Aliganj', 'Gomti Nagar', 'Indiranagar',
        'Mahanagar', 'Rajajipuram', 'Daliganj', 'Nishatganj', 'Kaiserbagh', 'Qaiserbagh',
        'Sadar', 'Cantt', 'Jankipuram', 'Vibhuti Khand', 'Sector B', 'Sector C',
        'Sector D', 'Sector E', 'Sector F', 'Sector G', 'Sector H', 'Sector I',
        'Sector J', 'Sector K', 'Sector L', 'Sector M', 'Sector N', 'Sector O'
    ];
    return areas[ward % areas.length] || `Area ${ward}`;
}

function getWardCouncillor(ward) {
    const councillors = [
        'Shri Ram Singh', 'Smt. Rekha Gupta', 'Shri Mohan Lal', 'Smt. Sunita Devi',
        'Shri Rajesh Kumar', 'Smt. Kamla Sharma', 'Shri Ramesh Singh', 'Smt. Geeta Singh',
        'Shri Suresh Singh', 'Smt. Anita Gupta', 'Shri Mahesh Singh', 'Smt. Usha Devi'
    ];
    return councillors[ward % councillors.length] || `Councillor ${ward}`;
}

function getWardPhone(ward) {
    return `0522-${String(1000000 + ward).slice(-6)}`;
}

function getWardEmail(ward) {
    return `ward${ward}@lucknownagarnigam.in`;
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method } = req;

    // GET - Fetch complaints
    if (method === 'GET') {
        const { ward, status, phone, id } = req.query;
        let complaints = loadComplaints();

        // Filter by ward
        if (ward && ward !== 'all') {
            complaints = complaints.filter(c => c.ward === ward);
        }

        // Filter by status
        if (status && status !== 'all') {
            complaints = complaints.filter(c => c.status === status);
        }

        // Filter by phone
        if (phone) {
            complaints = complaints.filter(c => c.phone === phone);
        }

        // Get specific complaint by ID
        if (id) {
            const complaint = complaints.find(c => c.id === id);
            if (complaint) {
                return res.status(200).json({
                    complaint,
                    status: 'success'
                });
            }
            return res.status(404).json({
                error: 'Complaint not found',
                status: 'error'
            });
        }

        // Sort by newest first
        complaints.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        return res.status(200).json({
            items: complaints,
            total: complaints.length,
            stats: getComplaintStats(complaints),
            status: 'success'
        });
    }

    // POST - Submit new complaint
    if (method === 'POST') {
        try {
            const { name, phone, ward, category, description, photo, email } = req.body;

            // Validate required fields
            if (!name || !phone || !ward || !category || !description) {
                return res.status(400).json({
                    error: 'Name, Phone, Ward, Category and Description are required',
                    status: 'error'
                });
            }

            // Validate phone number
            if (!/^[0-9]{10}$/.test(phone)) {
                return res.status(400).json({
                    error: 'Invalid phone number. Please enter 10 digits.',
                    status: 'error'
                });
            }

            // Validate ward
            const wardExists = LUCKNOW_WARDS.some(w => w.name === ward);
            if (!wardExists) {
                return res.status(400).json({
                    error: 'Invalid ward selected',
                    status: 'error'
                });
            }

            // Create new complaint
            const complaintId = generateComplaintID();
            const newComplaint = {
                id: complaintId,
                name,
                phone,
                email: email || '',
                ward,
                category,
                description,
                photo: photo || null,
                status: 'pending',
                priority: 'medium',
                submittedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedTo: getWardCouncillor(parseInt(ward.split(' ')[1]) || 1),
                wardPhone: getWardPhone(parseInt(ward.split(' ')[1]) || 1),
                wardEmail: getWardEmail(parseInt(ward.split(' ')[1]) || 1),
                tracking: [
                    {
                        event: 'Complaint Submitted',
                        timestamp: new Date().toISOString(),
                        note: `Complaint ${complaintId} has been submitted successfully.`
                    }
                ],
                resolution: null,
                resolvedAt: null
            };

            // Save complaint
            const complaints = loadComplaints();
            complaints.unshift(newComplaint);
            saveComplaints(complaints);

            // Send WhatsApp/Email notification (simulated)
            sendNotification(newComplaint);

            return res.status(201).json({
                complaint: newComplaint,
                message: 'Complaint submitted successfully!',
                trackingLink: `/track/${complaintId}`,
                status: 'success'
            });

        } catch (error) {
            console.error('Submit complaint error:', error);
            return res.status(500).json({
                error: 'Failed to submit complaint',
                status: 'error'
            });
        }
    }

    // PUT - Update complaint status
    if (method === 'PUT') {
        try {
            const { id, status, resolutionNote } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: 'Complaint ID is required',
                    status: 'error'
                });
            }

            const complaints = loadComplaints();
            const index = complaints.findIndex(c => c.id === id);

            if (index === -1) {
                return res.status(404).json({
                    error: 'Complaint not found',
                    status: 'error'
                });
            }

            // Update status
            if (status) {
                complaints[index].status = status;
                complaints[index].updatedAt = new Date().toISOString();
                complaints[index].tracking.push({
                    event: `Status Updated to ${status}`,
                    timestamp: new Date().toISOString(),
                    note: resolutionNote || `Complaint marked as ${status}`
                });

                if (status === 'resolved') {
                    complaints[index].resolvedAt = new Date().toISOString();
                    complaints[index].resolution = resolutionNote || 'Resolved by concerned authority';
                }
            }

            saveComplaints(complaints);

            return res.status(200).json({
                complaint: complaints[index],
                message: `Complaint ${id} updated to ${status}`,
                status: 'success'
            });

        } catch (error) {
            console.error('Update complaint error:', error);
            return res.status(500).json({
                error: 'Failed to update complaint',
                status: 'error'
            });
        }
    }

    // DELETE - Remove complaint
    if (method === 'DELETE') {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({
                    error: 'Complaint ID is required',
                    status: 'error'
                });
            }

            let complaints = loadComplaints();
            const filtered = complaints.filter(c => c.id !== id);

            if (filtered.length === complaints.length) {
                return res.status(404).json({
                    error: 'Complaint not found',
                    status: 'error'
                });
            }

            saveComplaints(filtered);

            return res.status(200).json({
                message: `Complaint ${id} deleted successfully`,
                status: 'success'
            });

        } catch (error) {
            console.error('Delete complaint error:', error);
            return res.status(500).json({
                error: 'Failed to delete complaint',
                status: 'error'
            });
        }
    }

    // GET - Wards list
    if (method === 'GET' && req.query.action === 'wards') {
        return res.status(200).json({
            items: LUCKNOW_WARDS,
            total: LUCKNOW_WARDS.length,
            status: 'success'
        });
    }

    // GET - Complaint stats
    if (method === 'GET' && req.query.action === 'stats') {
        const complaints = loadComplaints();
        return res.status(200).json({
            stats: getComplaintStats(complaints),
            wardStats: getWardStats(complaints),
            status: 'success'
        });
    }

    return res.status(405).json({
        error: 'Method not allowed',
        status: 'error'
    });
}

// Helper functions
function getComplaintStats(complaints) {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const rejected = complaints.filter(c => c.status === 'rejected').length;
    const inProgress = complaints.filter(c => c.status === 'in-progress').length;

    return {
        total,
        pending,
        resolved,
        rejected,
        inProgress,
        resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
    };
}

function getWardStats(complaints) {
    const stats = {};
    complaints.forEach(c => {
        if (!stats[c.ward]) {
            stats[c.ward] = { total: 0, pending: 0, resolved: 0, rejected: 0 };
        }
        stats[c.ward].total++;
        if (c.status === 'pending') stats[c.ward].pending++;
        else if (c.status === 'resolved') stats[c.ward].resolved++;
        else if (c.status === 'rejected') stats[c.ward].rejected++;
    });
    return stats;
}

// Send notification (simulated - can be extended with actual API)
function sendNotification(complaint) {
    console.log(`📧 Notification sent for complaint ${complaint.id}`);
    console.log(`📱 WhatsApp: To ${complaint.phone} - Complaint ${complaint.id} submitted`);
    console.log(`📧 Email: To ${complaint.wardEmail} - New complaint in ${complaint.ward}`);
    
    // In production, integrate with:
    // - WhatsApp Business API
    // - Twilio SMS
    // - SendGrid Email
    // - Slack/Discord webhooks
}
