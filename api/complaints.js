// ============================================================
// api/complaints.js - Community Complaint System API
// ============================================================

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'complaints.json');

function loadComplaints() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
    } catch (e) {}
    return [];
}

function saveComplaints(complaints) {
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2));
}

function generateId() {
    return 'CMP-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

const WARDS = Array.from({ length: 110 }, (_, i) => ({
    id: i + 1,
    name: `Ward ${i + 1}`,
    area: `Area ${i + 1}`,
    councillor: `Councillor ${i + 1}`,
    phone: `0522-${String(1000000 + i + 1).slice(-6)}`
}));

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Fetch complaints
    if (req.method === 'GET') {
        const { ward, status, phone, id, search, limit = 20, page = 1, action } = req.query;

        if (action === 'wards') {
            return res.status(200).json({ success: true, items: WARDS, total: WARDS.length });
        }

        if (action === 'stats') {
            const complaints = loadComplaints();
            const stats = {
                total: complaints.length,
                pending: complaints.filter(c => c.status === 'pending').length,
                resolved: complaints.filter(c => c.status === 'resolved').length,
                rejected: complaints.filter(c => c.status === 'rejected').length,
                inProgress: complaints.filter(c => c.status === 'in-progress').length
            };
            return res.status(200).json({ success: true, stats });
        }

        let complaints = loadComplaints();

        if (id) {
            const complaint = complaints.find(c => c.id === id);
            return complaint ?
                res.status(200).json({ success: true, complaint }) :
                res.status(404).json({ success: false, error: 'Not found' });
        }

        if (ward && ward !== 'all') complaints = complaints.filter(c => c.ward === ward);
        if (status && status !== 'all') complaints = complaints.filter(c => c.status === status);
        if (phone) complaints = complaints.filter(c => c.phone === phone);
        if (search) {
            const s = search.toLowerCase();
            complaints = complaints.filter(c =>
                c.name.toLowerCase().includes(s) ||
                c.description.toLowerCase().includes(s) ||
                c.id.toLowerCase().includes(s)
            );
        }

        complaints.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        const total = complaints.length;
        const start = (parseInt(page) - 1) * parseInt(limit);
        const items = complaints.slice(start, start + parseInt(limit));

        return res.status(200).json({
            success: true,
            items,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit))
        });
    }

    // POST - Submit complaint
    if (req.method === 'POST') {
        const { name, phone, email, ward, category, description, priority = 'medium' } = req.body;

        if (!name || !phone || !ward || !category || !description) {
            return res.status(400).json({
                success: false,
                error: 'Name, Phone, Ward, Category, Description are required'
            });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ success: false, error: 'Invalid phone number' });
        }

        const wardInfo = WARDS.find(w => w.name === ward);
        if (!wardInfo) {
            return res.status(400).json({ success: false, error: 'Invalid ward' });
        }

        const complaint = {
            id: generateId(),
            name: name.trim(),
            phone: phone.trim(),
            email: email || '',
            ward: wardInfo.name,
            wardId: wardInfo.id,
            wardArea: wardInfo.area,
            wardCouncillor: wardInfo.councillor,
            category: category.trim(),
            description: description.trim(),
            priority: ['low', 'medium', 'high', 'urgent'].includes(priority) ? priority : 'medium',
            status: 'pending',
            submittedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tracking: [{ event: 'Complaint Submitted', timestamp: new Date().toISOString() }]
        };

        const complaints = loadComplaints();
        complaints.unshift(complaint);
        saveComplaints(complaints);

        return res.status(201).json({
            success: true,
            complaint,
            message: 'Complaint submitted successfully!'
        });
    }

    // PUT - Update complaint
    if (req.method === 'PUT') {
        const { id, status, resolution, assignedTo } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, error: 'Complaint ID required' });
        }

        const complaints = loadComplaints();
        const index = complaints.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        const complaint = complaints[index];

        if (status) {
            complaint.status = status;
            complaint.updatedAt = new Date().toISOString();
            complaint.tracking.push({
                event: `Status updated to ${status}`,
                timestamp: new Date().toISOString(),
                note: resolution || ''
            });
        }

        if (resolution && status === 'resolved') {
            complaint.resolution = resolution;
            complaint.resolvedAt = new Date().toISOString();
        }

        if (assignedTo) {
            complaint.assignedTo = assignedTo;
            complaint.tracking.push({
                event: `Assigned to ${assignedTo}`,
                timestamp: new Date().toISOString()
            });
        }

        saveComplaints(complaints);

        return res.status(200).json({
            success: true,
            complaint,
            message: 'Complaint updated successfully'
        });
    }

    // DELETE - Remove complaint
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, error: 'Complaint ID required' });
        }

        let complaints = loadComplaints();
        const filtered = complaints.filter(c => c.id !== id);

        if (filtered.length === complaints.length) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        saveComplaints(filtered);

        return res.status(200).json({
            success: true,
            message: 'Complaint deleted successfully'
        });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
}