// api/wards.js - Ward Management API
const LUCKNOW_WARDS = Array.from({ length: 110 }, (_, i) => ({
    id: i + 1,
    name: `Ward ${i + 1}`,
    area: getWardArea(i + 1),
    councillor: getWardCouncillor(i + 1),
    phone: getWardPhone(i + 1),
    email: getWardEmail(i + 1),
    zone: getWardZone(i + 1)
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

function getWardZone(ward) {
    const zones = ['Zone 1 - Central', 'Zone 2 - East', 'Zone 3 - West', 'Zone 4 - South', 'Zone 5 - North'];
    return zones[ward % zones.length] || 'Zone 1';
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { ward, search } = req.query;

    try {
        let wards = LUCKNOW_WARDS;

        // Search wards
        if (search) {
            const s = search.toLowerCase();
            wards = wards.filter(w => 
                w.name.toLowerCase().includes(s) || 
                w.area.toLowerCase().includes(s) ||
                w.zone.toLowerCase().includes(s)
            );
        }

        // Get specific ward
        if (ward) {
            const wardData = wards.find(w => w.name === ward || w.id === parseInt(ward));
            if (wardData) {
                return res.status(200).json({
                    ward: wardData,
                    status: 'success'
                });
            }
            return res.status(404).json({
                error: 'Ward not found',
                status: 'error'
            });
        }

        return res.status(200).json({
            items: wards,
            total: wards.length,
            status: 'success'
        });

    } catch (error) {
        console.error('Wards API error:', error);
        return res.status(500).json({
            error: 'Failed to fetch wards',
            status: 'error'
        });
    }
}
