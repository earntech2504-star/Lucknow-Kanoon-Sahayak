// api/calculator.js - Serverless API Version
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            message: 'Calculator API is ready',
            functions: [
                'court-fee', 'emi', 'stamp-duty', 'tax',
                'gst', 'sip', 'ppf', 'fd', 'loan-emi',
                'roi', 'currency', 'bmi', 'interest', 'limitation'
            ],
            usage: 'POST with { type: "court-fee", amount: 100000, caseType: "civil" }'
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    }

    const { type, ...params } = req.body;

    if (!type) {
        return res.status(400).json({ error: 'Calculator type is required' });
    }

    try {
        let result = { success: true, type };

        switch(type) {
            case 'court-fee': {
                const amount = parseFloat(params.amount) || 0;
                const caseType = params.caseType || 'civil';
                let fee = 0;
                
                if (caseType === 'civil') {
                    if (amount <= 100000) fee = amount * 0.01;
                    else if (amount <= 500000) fee = 1000 + (amount - 100000) * 0.008;
                    else if (amount <= 1000000) fee = 4200 + (amount - 500000) * 0.006;
                    else if (amount <= 5000000) fee = 7200 + (amount - 1000000) * 0.004;
                    else fee = 23200 + (amount - 5000000) * 0.002;
                } else if (caseType === 'family') {
                    fee = Math.max(500, amount * 0.005);
                } else if (caseType === 'property') {
                    fee = amount * 0.02;
                }
                
                result.fee = Math.round(fee);
                result.formatted = `₹${Math.round(fee).toLocaleString()}`;
                break;
            }
            
            case 'emi': {
                const P = parseFloat(params.amount) || 0;
                const annualRate = parseFloat(params.rate) || 0;
                const months = parseFloat(params.tenure) || 1;
                const r = annualRate / 12 / 100;
                const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
                
                if (!isFinite(emi) || emi < 0 || P <= 0) {
                    return res.status(400).json({ error: 'Invalid inputs' });
                }
                
                result.emi = Math.round(emi);
                result.totalPayment = Math.round(emi * months);
                result.totalInterest = Math.round(emi * months - P);
                break;
            }
            
            case 'stamp-duty': {
                const propertyType = params.propertyType || 'residential';
                const value = parseFloat(params.value) || 0;
                const gender = params.gender || 'male';
                
                let stampRate = propertyType === 'residential' ? 7 : 8;
                if (gender === 'female') stampRate -= 1;
                
                result.stampDuty = Math.round(value * (stampRate / 100));
                result.stampRate = stampRate;
                break;
            }
            
            case 'tax': {
                const income = parseFloat(params.income) || 0;
                const deduction = parseFloat(params.deduction) || 0;
                const regime = params.regime || 'old';
                
                let taxable = Math.max(0, income - deduction);
                let tax = 0;
                
                if (regime === 'old') {
                    if (taxable <= 250000) tax = 0;
                    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
                    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
                    else tax = 112500 + (taxable - 1000000) * 0.3;
                } else {
                    if (taxable <= 300000) tax = 0;
                    else if (taxable <= 600000) tax = (taxable - 300000) * 0.05;
                    else if (taxable <= 900000) tax = 15000 + (taxable - 600000) * 0.1;
                    else if (taxable <= 1200000) tax = 45000 + (taxable - 900000) * 0.15;
                    else if (taxable <= 1500000) tax = 90000 + (taxable - 1200000) * 0.2;
                    else tax = 150000 + (taxable - 1500000) * 0.3;
                }
                
                result.tax = Math.round(tax);
                result.taxableIncome = Math.round(taxable);
                break;
            }
            
            case 'gst': {
                const amount = parseFloat(params.amount) || 0;
                const rate = parseFloat(params.rate) || 0;
                const type = params.type || 'exclusive';
                
                let gstAmount, total, base;
                if (type === 'exclusive') {
                    gstAmount = amount * (rate / 100);
                    total = amount + gstAmount;
                    result.gstAmount = gstAmount;
                    result.total = total;
                    result.base = amount;
                } else {
                    base = amount / (1 + rate / 100);
                    gstAmount = amount - base;
                    result.gstAmount = gstAmount;
                    result.total = amount;
                    result.base = base;
                }
                break;
            }
            
            case 'sip': {
                const monthly = parseFloat(params.monthly) || 0;
                const rate = parseFloat(params.rate) || 0;
                const years = parseFloat(params.years) || 0;
                const months = years * 12;
                const r = rate / 12 / 100;
                const fv = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
                const invested = monthly * months;
                const returns = fv - invested;
                
                result.futureValue = Math.round(fv);
                result.invested = Math.round(invested);
                result.returns = Math.round(returns);
                break;
            }
            
            case 'limitation': {
                const incidentDate = params.incidentDate;
                const period = parseInt(params.period) || 3;
                
                if (!incidentDate) {
                    return res.status(400).json({ error: 'incidentDate is required' });
                }
                
                const incident = new Date(incidentDate);
                const deadline = new Date(incident);
                deadline.setFullYear(deadline.getFullYear() + period);
                const today = new Date();
                const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                
                result.deadline = deadline.toISOString().split('T')[0];
                result.daysLeft = daysLeft;
                result.status = daysLeft > 0 ? 'active' : 'expired';
                break;
            }
            
            default:
                return res.status(400).json({ error: `Unknown calculator type: ${type}` });
        }

        return res.status(200).json(result);
        
    } catch (error) {
        console.error('Calculator error:', error);
        return res.status(500).json({ error: 'Calculation failed', details: error.message });
    }
}
