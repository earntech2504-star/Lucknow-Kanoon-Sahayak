// api/calculator.js - Legal & Financial Calculators

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, ...params } = req.body;

  try {
    let result = {};

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
          fee = amount * 0.005;
        } else if (caseType === 'property') {
          fee = amount * 0.008;
        }
        result = { fee: Math.round(fee) };
        break;
      }

      case 'stamp-duty': {
        const value = parseFloat(params.value) || 0;
        const type = params.type || 'residential';
        const gender = params.gender || 'male';
        let rate = type === 'residential' ? 0.07 : 0.09;
        if (gender === 'female' && type === 'residential') rate = 0.06;
        result = { duty: Math.round(value * rate) };
        break;
      }

      case 'emi': {
        const principal = parseFloat(params.principal) || 0;
        const rate = parseFloat(params.rate) || 0;
        const tenure = parseInt(params.tenure) || 0;
        const monthlyRate = rate / 12 / 100;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
        result = { emi: Math.round(emi), totalInterest: Math.round(emi * tenure - principal) };
        break;
      }

      case 'interest': {
        const principal = parseFloat(params.principal) || 0;
        const rate = parseFloat(params.rate) || 0;
        const years = parseInt(params.years) || 0;
        const compound = params.compound === 'true';
        if (compound) {
          const amount = principal * Math.pow(1 + rate / 100, years);
          result = { interest: Math.round(amount - principal), total: Math.round(amount) };
        } else {
          result = { interest: Math.round(principal * rate * years / 100) };
        }
        break;
      }

      case 'roi': {
        const initial = parseFloat(params.initial) || 0;
        const final = parseFloat(params.final) || 0;
        const years = parseInt(params.years) || 1;
        const cagr = Math.pow(final / initial, 1 / years) - 1;
        result = { cagr: cagr * 100, totalReturn: final - initial };
        break;
      }

      case 'tax': {
        const income = parseFloat(params.income) || 0;
        const deduction = parseFloat(params.deduction) || 0;
        const regime = params.regime || 'old';
        let taxable = Math.max(0, income - deduction);
        let tax = 0;
        if (regime === 'old') {
          if (taxable > 1000000) tax = (taxable - 1000000) * 0.30 + 112500;
          else if (taxable > 500000) tax = (taxable - 500000) * 0.20 + 12500;
          else if (taxable > 250000) tax = (taxable - 250000) * 0.05;
        } else {
          if (taxable > 1500000) tax = (taxable - 1500000) * 0.30 + 125000;
          else if (taxable > 1000000) tax = (taxable - 1000000) * 0.20 + 75000;
          else if (taxable > 750000) tax = (taxable - 750000) * 0.15 + 37500;
          else if (taxable > 500000) tax = (taxable - 500000) * 0.10 + 12500;
          else if (taxable > 300000) tax = (taxable - 300000) * 0.05;
        }
        result = { tax: Math.round(tax), taxableIncome: Math.round(taxable) };
        break;
      }

      case 'gst': {
        const amount = parseFloat(params.amount) || 0;
        const rate = parseFloat(params.rate) || 18;
        const type = params.type || 'exclusive';
        if (type === 'inclusive') {
          const base = amount / (1 + rate / 100);
          const gst = amount - base;
          result = { base: Math.round(base), gst: Math.round(gst), total: Math.round(amount) };
        } else {
          const gst = amount * rate / 100;
          result = { base: Math.round(amount), gst: Math.round(gst), total: Math.round(amount + gst) };
        }
        break;
      }

      default: {
        result = { error: 'Calculator type not supported' };
      }
    }

    res.status(200).json({ result, status: 'success' });

  } catch (error) {
    res.status(500).json({ error: error.message, status: 'error' });
  }
}
