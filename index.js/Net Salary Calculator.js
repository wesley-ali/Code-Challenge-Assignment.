function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and other deductions
    const incomeTaxRates = [
        { range: [0, 24000], rate: 0.10 },
        { range: [24000, 32333], rate: 0.25 },
        { range: [32333, 90000], rate: 0.30 },
        { range: [90000, 800000], rate: 0.325 },
        { range: [800000, Infinity], rate: 0.35 }
    ];
    const personalRelief = 2400;
    const nhifRate = 0.0275; // 2.75%
    const nssfRate = 0.12; // 12%

    // Calculate taxable income
    const taxableIncome = basicSalary + benefits - personalRelief;

    // Calculate income tax (PAYE)
    let incomeTax = 0;
    for (const { range, rate } of incomeTaxRates) {
        const [lower, upper] = range;
        if (taxableIncome > lower) {
            const taxableAmount = Math.min(taxableIncome, upper) - lower;
            incomeTax = taxableAmount * rate;
        }
    }

    // Calculate NHIF and NSSF deductions
    const nhifDeduction = nhifRate * basicSalary;
    const nssfDeduction = nssfRate * basicSalary;

    // Calculate gross and net salary
    const grossSalary = basicSalary + benefits;
    const netSalary = grossSalary - incomeTax - nhifDeduction - nssfDeduction;

    // Print results
    console.log(`Gross Salary: Ksh ${grossSalary.toFixed(2)}`);
    console.log(`Income Tax (PAYE): Ksh ${incomeTax.toFixed(2)}`);
    console.log(`NHIF Deduction: Ksh ${nhifDeduction.toFixed(2)}`);
    console.log(`NSSF Deduction: Ksh ${nssfDeduction.toFixed(2)}`);
    console.log(`Net Salary: Ksh ${netSalary.toFixed(2)}`);
}