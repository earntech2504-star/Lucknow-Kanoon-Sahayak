// ============================================================
// CALCULATOR.JS - All 14 Legal/Financial Calculators
// ============================================================

// ============================================================
// 1. Court Fee Calculator
// ============================================================
function calculateCourtFee() {
    const amount = parseFloat(document.getElementById('court-fee-amount')?.value) || 0;
    const type = document.getElementById('court-fee-type')?.value || 'civil';
    const resultDiv = document.getElementById('court-fee-result');
    
    let fee = 0;
    if (type === 'civil') fee = amount * 0.01;
    else if (type === 'family') fee = Math.max(500, amount * 0.005);
    else if (type === 'property') fee = amount * 0.02;
    
    fee = Math.round(fee);
    if (resultDiv) {
        resultDiv.className = `calc-result text-sm ${fee > 0 ? '' : 'info'}`;
        resultDiv.innerHTML = `💰 ₹${fee.toLocaleString()}`;
    }
}

// ============================================================
// 2. EMI Calculator
// ============================================================
function calculateEMI() {
    const P = parseFloat(document.getElementById('emi-amount')?.value) || 0;
    const annualRate = parseFloat(document.getElementById('emi-rate')?.value) || 0;
    const months = parseFloat(document.getElementById('emi-tenure')?.value) || 1;
    const r = annualRate / 12 / 100;
    const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    const resultDiv = document.getElementById('emi-result');
    
    if (!isFinite(emi) || emi < 0) {
        if (resultDiv) {
            resultDiv.className = 'calc-result error text-sm';
            resultDiv.innerHTML = '⚠️ Invalid inputs.';
        }
        return;
    }
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `₹${Math.round(emi).toLocaleString()} / month<br><span class="text-[10px] text-slate-400">Total: ₹${Math.round(emi * months).toLocaleString()}</span>`;
    }
}

// ============================================================
// 3. Stamp Duty Calculator
// ============================================================
function calculateStampDuty() {
    const propertyType = document.getElementById('stamp-property-type')?.value || 'residential';
    const value = parseFloat(document.getElementById('stamp-value')?.value) || 0;
    const gender = document.getElementById('stamp-gender')?.value || 'male';
    const resultDiv = document.getElementById('stamp-result');
    
    let stampRate = propertyType === 'residential' ? 7 : 8;
    if (gender === 'female') stampRate -= 1;
    
    const stampDuty = value * (stampRate / 100);
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `📊 ₹${Math.round(stampDuty).toLocaleString()}`;
    }
}

// ============================================================
// 4. Income Tax Calculator
// ============================================================
function calculateTax() {
    const income = parseFloat(document.getElementById('tax-income')?.value) || 0;
    const deduction = parseFloat(document.getElementById('tax-deduction')?.value) || 0;
    const regime = document.getElementById('tax-regime')?.value || 'old';
    const resultDiv = document.getElementById('tax-result');
    
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
    
    tax = Math.round(tax);
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `🧾 ₹${tax.toLocaleString()}`;
    }
}

// ============================================================
// 5. GST Calculator
// ============================================================
function calculateGST() {
    const amount = parseFloat(document.getElementById('gst-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('gst-rate')?.value) || 0;
    const type = document.getElementById('gst-type')?.value || 'exclusive';
    const resultDiv = document.getElementById('gst-result');
    
    let gstAmount, total;
    if (type === 'exclusive') {
        gstAmount = amount * (rate / 100);
        total = amount + gstAmount;
        if (resultDiv) {
            resultDiv.innerHTML = `💵 ₹${total.toFixed(2)} (GST: ₹${gstAmount.toFixed(2)})`;
        }
    } else {
        const base = amount / (1 + rate / 100);
        gstAmount = amount - base;
        if (resultDiv) {
            resultDiv.innerHTML = `💵 ₹${base.toFixed(2)} (GST: ₹${gstAmount.toFixed(2)})`;
        }
    }
    if (resultDiv) resultDiv.className = 'calc-result text-sm';
}

// ============================================================
// 6. SIP Calculator
// ============================================================
function calculateSIP() {
    const monthly = parseFloat(document.getElementById('sip-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('sip-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('sip-years')?.value) || 0;
    const months = years * 12;
    const r = rate / 12 / 100;
    const fv = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const invested = monthly * months;
    const returns = fv - invested;
    const resultDiv = document.getElementById('sip-result');
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `📈 ₹${Math.round(fv).toLocaleString()}<br><span class="text-[10px] text-slate-400">Invested: ₹${Math.round(invested).toLocaleString()} | Returns: ₹${Math.round(returns).toLocaleString()}</span>`;
    }
}

// ============================================================
// 7. PPF Calculator
// ============================================================
function calculatePPF() {
    const annual = parseFloat(document.getElementById('ppf-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('ppf-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('ppf-years')?.value) || 0;
    const r = rate / 100;
    let total = 0;
    
    for (let i = 0; i < years; i++) {
        total = (total + annual) * (1 + r);
    }
    
    const invested = annual * years;
    const returns = total - invested;
    const resultDiv = document.getElementById('ppf-result');
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `🏦 ₹${Math.round(total).toLocaleString()}<br><span class="text-[10px] text-slate-400">Invested: ₹${Math.round(invested).toLocaleString()} | Returns: ₹${Math.round(returns).toLocaleString()}</span>`;
    }
}

// ============================================================
// 8. FD Calculator
// ============================================================
function calculateFD() {
    const deposit = parseFloat(document.getElementById('fd-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('fd-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('fd-years')?.value) || 0;
    const total = deposit * Math.pow(1 + rate / 100, years);
    const interest = total - deposit;
    const resultDiv = document.getElementById('fd-result');
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `🏦 ₹${Math.round(total).toLocaleString()}<br><span class="text-[10px] text-slate-400">Interest: ₹${Math.round(interest).toLocaleString()}</span>`;
    }
}

// ============================================================
// 9. Loan EMI Calculator
// ============================================================
function calculateLoanEMI() {
    const P = parseFloat(document.getElementById('loan-amount')?.value) || 0;
    const annualRate = parseFloat(document.getElementById('loan-rate')?.value) || 0;
    const months = parseFloat(document.getElementById('loan-tenure')?.value) || 1;
    const r = annualRate / 12 / 100;
    const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    const resultDiv = document.getElementById('loan-result');
    
    if (!isFinite(emi) || emi < 0) {
        if (resultDiv) {
            resultDiv.className = 'calc-result error text-sm';
            resultDiv.innerHTML = '⚠️ Invalid inputs.';
        }
        return;
    }
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `💰 ₹${Math.round(emi).toLocaleString()} / month<br><span class="text-[10px] text-slate-400">Total: ₹${Math.round(emi * months).toLocaleString()}</span>`;
    }
}

// ============================================================
// 10. ROI Calculator
// ============================================================
function calculateROI() {
    const initial = parseFloat(document.getElementById('roi-initial')?.value) || 0;
    const final = parseFloat(document.getElementById('roi-final')?.value) || 0;
    const years = parseFloat(document.getElementById('roi-period')?.value) || 1;
    const resultDiv = document.getElementById('roi-result');
    
    if (initial <= 0 || final <= 0 || years <= 0) {
        if (resultDiv) {
            resultDiv.className = 'calc-result error text-sm';
            resultDiv.innerHTML = '⚠️ Invalid inputs.';
        }
        return;
    }
    
    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const totalReturn = ((final - initial) / initial) * 100;
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `📈 CAGR: ${cagr.toFixed(2)}%<br><span class="text-[10px] text-slate-400">Total Return: ${totalReturn.toFixed(2)}%</span>`;
    }
}

// ============================================================
// 11. Currency Converter
// ============================================================
function convertCurrency() {
    const amount = parseFloat(document.getElementById('currency-amount')?.value) || 0;
    const to = document.getElementById('currency-to')?.value || 'usd';
    const rates = { usd: 0.012, eur: 0.011, gbp: 0.0095, aed: 0.044 };
    const converted = amount * (rates[to] || 0.012);
    const symbols = { usd: '$', eur: '€', gbp: '£', aed: 'د.إ' };
    const resultDiv = document.getElementById('currency-result');
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `${symbols[to] || '$'} ${converted.toFixed(2)}`;
    }
}

// ============================================================
// 12. BMI Calculator
// ============================================================
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmi-weight')?.value) || 0;
    const heightCm = parseFloat(document.getElementById('bmi-height')?.value) || 0;
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const resultDiv = document.getElementById('bmi-result');
    
    let status = '';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi < 25) status = 'Normal';
    else if (bmi < 30) status = 'Overweight';
    else status = 'Obese';
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `⚕️ BMI: ${bmi.toFixed(1)}<br><span class="text-[10px] text-slate-400">${status}</span>`;
    }
}

// ============================================================
// 13. Interest Calculator
// ============================================================
function calculateInterest() {
    const principal = parseFloat(document.getElementById('interest-principal')?.value) || 0;
    const rate = parseFloat(document.getElementById('interest-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('interest-years')?.value) || 0;
    const resultDiv = document.getElementById('interest-result');
    
    const interest = principal * (rate / 100) * years;
    const total = principal + interest;
    
    if (resultDiv) {
        resultDiv.className = 'calc-result text-sm';
        resultDiv.innerHTML = `📊 ₹${Math.round(interest).toLocaleString()}<br><span class="text-[10px] text-slate-400">Total: ₹${Math.round(total).toLocaleString()}</span>`;
    }
}

// ============================================================
// 14. Limitation Calculator
// ============================================================
function calculateLimitation() {
    const dateInput = document.getElementById('limitation-incident-date');
    const period = parseInt(document.getElementById('limitation-period')?.value) || 3;
    const resultDiv = document.getElementById('limitation-result');
    
    if (!dateInput?.value) {
        if (resultDiv) {
            resultDiv.className = 'calc-result warning text-sm';
            resultDiv.innerHTML = '⚠️ कृपया Incident Date चुनें।';
        }
        return;
    }
    
    const incidentDate = new Date(dateInput.value);
    const deadline = new Date(incidentDate);
    deadline.setFullYear(deadline.getFullYear() + period);
    const today = new Date();
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    
    if (resultDiv) {
        resultDiv.className = `calc-result ${daysLeft > 0 ? '' : 'error'} text-sm`;
        resultDiv.innerHTML = `📅 Deadline: ${deadline.toLocaleDateString()}<br><span class="${daysLeft > 0 ? 'text-green-400' : 'text-red-400'}">${daysLeft > 0 ? `⏳ ${daysLeft} days left` : '⚠️ Deadline passed!'}</span>`;
    }
}
