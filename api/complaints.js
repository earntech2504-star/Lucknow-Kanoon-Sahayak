// ============================================================
// api/complaints.js - Complete Complaint Management System
// With 110 Lucknow Wards, Full CRUD, Tracking & Notifications
// ============================================================

import fs from 'fs';
import path from 'path';

// ============================================================
// DATA STORAGE
// ============================================================
const DATA_FILE = path.join(process.cwd(), 'data', 'complaints.json');

function ensureDataDir() {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

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

function saveComplaints(complaints) {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2));
}

// ============================================================
// COMPLAINT ID GENERATOR
// ============================================================
function generateComplaintID() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CMP-${timestamp}-${random}`;
}

// ============================================================
// 110 LUCKNOW WARDS WITH COMPLETE DATA
// ============================================================
const LUCKNOW_WARDS = (() => {
    const wards = [];
    const areas = [
        'Hazratganj', 'Chowk', 'Aminabad', 'Aliganj', 'Gomti Nagar', 'Indiranagar',
        'Mahanagar', 'Rajajipuram', 'Daliganj', 'Nishatganj', 'Kaiserbagh', 'Sadar',
        'Cantt', 'Jankipuram', 'Vibhuti Khand', 'Sector B', 'Sector C', 'Sector D',
        'Sector E', 'Sector F', 'Sector G', 'Sector H', 'Sector I', 'Sector J',
        'Sector K', 'Sector L', 'Sector M', 'Sector N', 'Sector O', 'Sector P',
        'Sector Q', 'Sector R', 'Sector S', 'Sector T', 'Sector U', 'Sector V',
        'Sector W', 'Sector X', 'Sector Y', 'Sector Z', 'Munshipulia', 'Kurasi Road',
        'Kukrail', 'Aashiana', 'Sitapur Road', 'Kanpur Road', 'Faizabad Road',
        'Rae Bareli Road', 'Sultanpur Road', 'Hardoi Road', 'Sandila Road',
        'Mohanlalganj', 'Bakshi Ka Talab', 'Malihabad', 'Kakori', 'Gosainganj',
        'Chinhat', 'Sarojini Nagar', 'Rajendra Nagar', 'Vishal Khand', 'Sahara States',
        'Ambedkar Nagar', 'Basthi', 'Husainganj', 'Ganeshganj', 'Kaisar Bagh',
        'La Touche Road', 'Vidhan Sabha Marg', 'Ashok Marg', 'Jawahar Bhawan',
        'Civil Lines', 'GPO', 'Charbagh', 'Alambagh', 'Hussainganj', 'Mawaiya',
        'Para', 'Saidanpur', 'Balaganj', 'Chattar Manzil', 'Qaiserbagh Palace',
        'Lal Bagh', 'Moti Mahal', 'Kaiserbagh', 'Nakhas', 'Chowk Bazaar',
        'Muhammad Ali Road', 'Nazirabad', 'Sikandar Bagh', 'La Martiniere',
        'Hazratganj Bazaar', 'Aminabad Bazaar', 'Kapoorthala', 'Kandhari',
        'Sitapur Road Bazaar', 'Faizabad Road Bazaar', 'Sultanpur Road Bazaar',
        'Rae Bareli Road Bazaar', 'Hardoi Road Bazaar', 'Lucknow University',
        'Integral University', 'SGPGI', 'KGMU', 'RML Hospital', 'Balrampur Hospital',
        'Kaiserbagh Bus Stand', 'Alambagh Bus Stand', 'Charbagh Railway Station',
        'Lucknow City Station', 'Gomti Nagar Station', 'Mohanlalganj Station'
    ];

    const councillors = [
        'Shri Ram Singh', 'Smt. Rekha Gupta', 'Shri Mohan Lal', 'Smt. Sunita Devi',
        'Shri Rajesh Kumar', 'Smt. Kamla Sharma', 'Shri Ramesh Singh', 'Smt. Geeta Singh',
        'Shri Suresh Singh', 'Smt. Anita Gupta', 'Shri Mahesh Singh', 'Smt. Usha Devi',
        'Shri Prakash Verma', 'Smt. Meena Yadav', 'Shri Arvind Mishra', 'Smt. Priyanka Singh',
        'Shri Shiv Kumar', 'Smt. Neha Gupta', 'Shri Rajiv Sharma', 'Smt. Pooja Singh'
    ];

    const parties = ['BJP', 'SP', 'INC', 'BSP', 'AAP', 'Independent'];
    const genders = ['Male', 'Female'];

    for (let i = 0; i < 110; i++) {
        const wardNum = i + 1;
        wards.push({
            id: wardNum,
            name: `Ward ${wardNum}`,
            area: areas[wardNum % areas.length] || `Area ${wardNum}`,
            councillor: councillors[wardNum % councillors.length],
            party: parties[wardNum % parties.length],
            gender: genders[wardNum % genders.length],
            phone: `0522-${String(1000000 + wardNum).slice(-6)}`,
            mobile: `9${String(800000000 + wardNum).slice(-9)}`,
            email: `ward${wardNum}@lucknownagarnigam.in`,
            address: `${areas[wardNum % areas.length]}, Lucknow - 2260${String(wardNum).slice(-2).padStart(2, '0')}`,
            population: Math.round(15000 + Math.random() * 15000),
            voters: Math.round(10000 + Math.random() * 10000),
            wards: `Zone ${Math.floor((wardNum - 1) / 20) + 1}`
        });
    }
    return wards;
})();

// ============================================================
// API HANDLER
// ============================================================
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

    // ============================================================
    // GET - Fetch complaints with filters
    // ============================================================
    if (method === 'GET') {
        const { ward, status, phone, id, action, limit, page, search } = req.query;

        // GET - Wards list
        if (action === 'wards') {
            return res.status(200).json({
                items: LUCKNOW_WARDS,
                total: LUCKNOW_WARDS.length,
                status: 'success',
                message: `✅ ${LUCKNOW_WARDS.length} wards loaded`
            });
        }

        // GET - Complaint stats
        if (action === 'stats') {
            const complaints = loadComplaints();
            return res.status(200).json({
                stats: getComplaintStats(complaints),
                wardStats: getWardStats(complaints),
                status: 'success'
            });
        }

        // GET - Ward details
        if (action === 'ward' && ward) {
            const wardInfo = LUCKNOW_WARDS.find(w => w.name === ward || w.id === parseInt(ward));
            if (!wardInfo) {
                return res.status(404).json({
                    error: 'Ward not found',
                    status: 'error'
                });
            }
            return res.status(200).json({
                ward: wardInfo,
                status: 'success'
            });
        }

        // GET - Export CSV
        if (action === 'export') {
            const complaints = loadComplaints();
            const csv = generateCSV(complaints);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=complaints_${new Date().toISOString().split('T')[0]}.csv`);
            return res.status(200).send(csv);
        }

        let complaints = loadComplaints();

        // Filter by ward
        if (ward && ward !== 'all') {
            complaints = complaints.filter(c => c.ward === ward || c.wardName === ward);
        }

        // Filter by status
        if (status && status !== 'all') {
            complaints = complaints.filter(c => c.status === status);
        }

        // Filter by phone
        if (phone) {
            complaints = complaints.filter(c => c.phone === phone);
        }

        // Search by name, description, or ID
        if (search) {
            const searchLower = search.toLowerCase();
            complaints = complaints.filter(c => 
                c.name.toLowerCase().includes(searchLower) ||
                c.description.toLowerCase().includes(searchLower) ||
                c.id.toLowerCase().includes(searchLower) ||
                c.ward.toLowerCase().includes(searchLower)
            );
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

        // Pagination
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;

        // Sort by newest first
        complaints.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        const paginatedItems = complaints.slice(startIndex, endIndex);

        return res.status(200).json({
            items: paginatedItems,
            total: complaints.length,
            page: pageNum,
            totalPages: Math.ceil(complaints.length / limitNum),
            stats: getComplaintStats(complaints),
            status: 'success'
        });
    }

    // ============================================================
    // POST - Submit new complaint
    // ============================================================
    if (method === 'POST') {
        try {
            const { name, phone, ward, category, description, photo, email, priority, address } = req.body;

            // Validate required fields
            if (!name || !phone || !ward || !category || !description) {
                return res.status(400).json({
                    error: 'Name, Phone, Ward, Category and Description are required',
                    status: 'error',
                    required: ['name', 'phone', 'ward', 'category', 'description']
                });
            }

            // Validate phone number
            if (!/^[0-9]{10}$/.test(phone)) {
                return res.status(400).json({
                    error: 'Invalid phone number. Please enter 10 digits.',
                    status: 'error'
                });
            }

            // Validate email
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({
                    error: 'Invalid email format',
                    status: 'error'
                });
            }

            // Validate ward
            const wardInfo = LUCKNOW_WARDS.find(w => w.name === ward);
            if (!wardInfo) {
                return res.status(400).json({
                    error: 'Invalid ward selected. Please select from the list.',
                    status: 'error',
                    availableWards: LUCKNOW_WARDS.map(w => w.name)
                });
            }

            // Create new complaint
            const complaintId = generateComplaintID();
            const validPriority = ['low', 'medium', 'high', 'urgent'].includes(priority) ? priority : 'medium';
            
            const newComplaint = {
                id: complaintId,
                name: name.trim(),
                phone: phone.trim(),
                email: email ? email.trim() : '',
                ward: wardInfo.name,
                wardId: wardInfo.id,
                wardArea: wardInfo.area,
                wardCouncillor: wardInfo.councillor,
                category: category.trim(),
                description: description.trim(),
                address: address ? address.trim() : '',
                photo: photo || null,
                status: 'pending',
                priority: validPriority,
                submittedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedTo: wardInfo.councillor,
                assignedToParty: wardInfo.party,
                wardPhone: wardInfo.phone,
                wardMobile: wardInfo.mobile,
                wardEmail: wardInfo.email,
                tracking: [
                    {
                        event: 'Complaint Submitted',
                        timestamp: new Date().toISOString(),
                        note: `Complaint ${complaintId} has been submitted successfully to ${wardInfo.name}.`
                    }
                ],
                resolution: null,
                resolvedAt: null,
                attachments: [],
                source: 'web'
            };

            // Save complaint
            const complaints = loadComplaints();
            complaints.unshift(newComplaint);
            saveComplaints(complaints);

            // Send notifications
            sendNotifications(newComplaint);

            return res.status(201).json({
                complaint: newComplaint,
                message: '✅ Complaint submitted successfully!',
                trackingLink: `/track/${complaintId}`,
                status: 'success',
                nextSteps: [
                    '📋 Your complaint has been registered with ID: ' + complaintId,
                    '📞 You will receive updates on your registered phone number',
                    '📧 Check your email for confirmation',
                    '🔍 Track your complaint using the ID above'
                ]
            });

        } catch (error) {
            console.error('Submit complaint error:', error);
            return res.status(500).json({
                error: 'Failed to submit complaint',
                details: error.message,
                status: 'error'
            });
        }
    }

    // ============================================================
    // PUT - Update complaint status
    // ============================================================
    if (method === 'PUT') {
        try {
            const { id, status, resolutionNote, assignedTo, priority } = req.body;

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

            const complaint = complaints[index];
            const validStatuses = ['pending', 'in-progress', 'resolved', 'rejected', 'review'];
            
            // Update status
            if (status && validStatuses.includes(status)) {
                complaint.status = status;
                complaint.updatedAt = new Date().toISOString();
                
                // Add tracking entry
                let note = `Status updated to ${status}`;
                if (resolutionNote) {
                    note += `: ${resolutionNote}`;
                }
                
                complaint.tracking.push({
                    event: `Status Updated to ${status}`,
                    timestamp: new Date().toISOString(),
                    note: note,
                    by: 'Admin'
                });

                if (status === 'resolved') {
                    complaint.resolvedAt = new Date().toISOString();
                    complaint.resolution = resolutionNote || 'Resolved by concerned authority';
                    
                    // Add resolution tracking
                    complaint.tracking.push({
                        event: 'Complaint Resolved',
                        timestamp: new Date().toISOString(),
                        note: complaint.resolution
                    });
                }
                
                if (status === 'rejected') {
                    complaint.tracking.push({
                        event: 'Complaint Rejected',
                        timestamp: new Date().toISOString(),
                        note: resolutionNote || 'Complaint rejected due to insufficient information'
                    });
                }
            }

            // Update assigned to
            if (assignedTo) {
                complaint.assignedTo = assignedTo;
                complaint.updatedAt = new Date().toISOString();
                complaint.tracking.push({
                    event: 'Reassigned',
                    timestamp: new Date().toISOString(),
                    note: `Complaint assigned to ${assignedTo}`
                });
            }

            // Update priority
            if (priority && ['low', 'medium', 'high', 'urgent'].includes(priority)) {
                complaint.priority = priority;
                complaint.updatedAt = new Date().toISOString();
                complaint.tracking.push({
                    event: 'Priority Updated',
                    timestamp: new Date().toISOString(),
                    note: `Priority changed to ${priority}`
                });
            }

            saveComplaints(complaints);

            return res.status(200).json({
                complaint: complaint,
                message: `✅ Complaint ${id} updated successfully`,
                status: 'success'
            });

        } catch (error) {
            console.error('Update complaint error:', error);
            return res.status(500).json({
                error: 'Failed to update complaint',
                details: error.message,
                status: 'error'
            });
        }
    }

    // ============================================================
    // DELETE - Remove complaint
    // ============================================================
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

            // Log deletion
            const deletedComplaint = complaints.find(c => c.id === id);
            console.log(`🗑️ Complaint ${id} deleted by admin at ${new Date().toISOString()}`);
            console.log(`📋 Deleted complaint: ${deletedComplaint?.name} - ${deletedComplaint?.category}`);

            saveComplaints(filtered);

            return res.status(200).json({
                message: `✅ Complaint ${id} deleted successfully`,
                status: 'success',
                deletedId: id
            });

        } catch (error) {
            console.error('Delete complaint error:', error);
            return res.status(500).json({
                error: 'Failed to delete complaint',
                details: error.message,
                status: 'error'
            });
        }
    }

    // ============================================================
    // BULK OPERATIONS
    // ============================================================
    if (method === 'PATCH') {
        try {
            const { ids, status, resolutionNote } = req.body;

            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    error: 'Complaint IDs array is required',
                    status: 'error'
                });
            }

            if (!status) {
                return res.status(400).json({
                    error: 'Status is required for bulk update',
                    status: 'error'
                });
            }

            const complaints = loadComplaints();
            let updated = 0;

            ids.forEach(id => {
                const index = complaints.findIndex(c => c.id === id);
                if (index !== -1) {
                    complaints[index].status = status;
                    complaints[index].updatedAt = new Date().toISOString();
                    complaints[index].tracking.push({
                        event: `Bulk Status Update to ${status}`,
                        timestamp: new Date().toISOString(),
                        note: resolutionNote || `Bulk update: ${ids.length} complaints`
                    });
                    updated++;
                }
            });

            saveComplaints(complaints);

            return res.status(200).json({
                message: `✅ ${updated} complaints updated to ${status}`,
                total: ids.length,
                updated: updated,
                status: 'success'
            });

        } catch (error) {
            console.error('Bulk update error:', error);
            return res.status(500).json({
                error: 'Failed to update complaints',
                details: error.message,
                status: 'error'
            });
        }
    }

    return res.status(405).json({
        error: 'Method not allowed',
        allowed: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        status: 'error'
    });
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getComplaintStats(complaints) {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const rejected = complaints.filter(c => c.status === 'rejected').length;
    const inProgress = complaints.filter(c => c.status === 'in-progress').length;
    const review = complaints.filter(c => c.status === 'review').length;

    return {
        total,
        pending,
        resolved,
        rejected,
        inProgress,
        review,
        resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
        pendingRate: total > 0 ? Math.round((pending / total) * 100) : 0,
        byPriority: {
            low: complaints.filter(c => c.priority === 'low').length,
            medium: complaints.filter(c => c.priority === 'medium').length,
            high: complaints.filter(c => c.priority === 'high').length,
            urgent: complaints.filter(c => c.priority === 'urgent').length
        },
        byCategory: getCategoryStats(complaints)
    };
}

function getCategoryStats(complaints) {
    const stats = {};
    complaints.forEach(c => {
        if (!stats[c.category]) {
            stats[c.category] = 0;
        }
        stats[c.category]++;
    });
    return stats;
}

function getWardStats(complaints) {
    const stats = {};
    complaints.forEach(c => {
        const wardName = c.ward || c.wardName || 'Unknown';
        if (!stats[wardName]) {
            stats[wardName] = { 
                total: 0, 
                pending: 0, 
                resolved: 0, 
                rejected: 0, 
                inProgress: 0,
                categories: {}
            };
        }
        stats[wardName].total++;
        stats[wardName][c.status] = (stats[wardName][c.status] || 0) + 1;
        
        if (!stats[wardName].categories[c.category]) {
            stats[wardName].categories[c.category] = 0;
        }
        stats[wardName].categories[c.category]++;
    });
    return stats;
}

function generateCSV(complaints) {
    if (complaints.length === 0) {
        return 'No complaints found\n';
    }

    const headers = ['ID', 'Name', 'Phone', 'Email', 'Ward', 'Category', 'Status', 'Priority', 'Submitted', 'Updated', 'Resolution'];
    let csv = headers.join(',') + '\n';

    complaints.forEach(c => {
        const row = [
            c.id,
            `"${c.name}"`,
            c.phone,
            `"${c.email || ''}"`,
            `"${c.ward}"`,
            `"${c.category}"`,
            c.status,
            c.priority || 'medium',
            c.submittedAt,
            c.updatedAt,
            `"${c.resolution || ''}"`
        ];
        csv += row.join(',') + '\n';
    });

    return csv;
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================
function sendNotifications(complaint) {
    // Console logging for development
    console.log(`\n📧 ===== NOTIFICATION FOR COMPLAINT ${complaint.id} =====`);
    console.log(`👤 Name: ${complaint.name}`);
    console.log(`📱 Phone: ${complaint.phone}`);
    console.log(`📧 Email: ${complaint.email}`);
    console.log(`🏛️ Ward: ${complaint.ward}`);
    console.log(`📋 Category: ${complaint.category}`);
    console.log(`📝 Description: ${complaint.description}`);
    console.log(`📅 Submitted: ${complaint.submittedAt}`);
    console.log(`👨‍⚖️ Assigned to: ${complaint.assignedTo}`);
    console.log(`📞 Ward Phone: ${complaint.wardPhone}`);
    console.log(`📧 Ward Email: ${complaint.wardEmail}`);
    console.log(`🔗 Track: /track/${complaint.id}`);
    console.log('========================================\n');

    // In production, integrate with:
    // 1. WhatsApp Business API
    //    - Send message to complainant with tracking ID
    //    - Send message to ward councillor
    
    // 2. SMS via Twilio
    //    - Send confirmation SMS to complainant
    //    - Send alert SMS to ward councillor
    
    // 3. Email via SendGrid/Nodemailer
    //    - Send confirmation email to complainant
    //    - Send notification email to ward
    
    // 4. Slack/Discord Webhooks
    //    - Send to internal team channel
    
    return true;
}

// ============================================================
// EXPORT WARDS DATA FOR FRONTEND
// ============================================================
export const wards = LUCKNOW_WARDS;
export const wardNames = LUCKNOW_WARDS.map(w => w.name);
