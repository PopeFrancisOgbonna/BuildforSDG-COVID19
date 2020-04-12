const covid19ImpactEstimator = (data) => {
  // Computes the currently infected population
  const covidImpact = data.reportedCases * 10;
  const covidSevereImpact = data.reportedCases * 50;
  // Functions for the computation of currently infected population by request time
  // For Impact
  const impactCurrentlyInfectedByDays = () => {
    const a = Math.trunc(data.timeToElapse / 3);
    const impactA = covidImpact * 2 ** a;
    return impactA;
  };
  const impactCurrentlyInfectedByWeeks = () => {
    const weekFactor = data.timeToElapse * 7;
    const a = Math.trunc(weekFactor / 3);
    const impactA = (covidImpact * 2 ** a);
    return impactA;
  };
  const impactCurrentlyInfectedByMonths = () => {
    const monthFactor = data.timeToElapse * 30;
    const a = Math.trunc(monthFactor / 3);
    const impactA = covidImpact * 2 ** a;
    return impactA;
  };
  // For severeImpact
  const severeImpactCurrentlyInfectedByDays = () => {
    const a = Math.trunc(data.timeToElapse / 3);
    const impactA = covidSevereImpact * 2 ** a;
    return impactA;
  };
  const severeImpactCurrentlyInfectedByWeeks = () => {
    const weekFactor = data.timeToElapse * 7;
    const a = Math.trunc(weekFactor / 3);
    const impactA = covidSevereImpact * 2 ** a;
    return impactA;
  };
  const severeImpactCurrentlyInfectedByMonths = () => {
    const monthFactor = data.timeToElapse * 30;
    const a = Math.trunc(monthFactor / 3);
    const impactA = covidSevereImpact * 2 ** a;
    return impactA;
  };
  // Declaration of variables
  let severeInfectedByRequestTime2 = severeImpactCurrentlyInfectedByDays();
  let impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
  // Calcultion for dollar in flight
  const dollar = (impactInfectedByRequestTime * data.region.avgDailyIncomeInUSD);
  const d = dollar * data.region.avgDailyIncomePopulation;
  const dollar2 =(severeInfectedByRequestTime2 * data.region.avgDailyIncomeInUSD);
  const d2 = dollar2 * data.region.avgDailyIncomePopulation;
  let impactDollar = parseInt(d / (data.timeToElapse), 10);
  let severeDollar = parseInt(d2 / (data.timeToElapse), 10);
  // Computes Currently Infected population by request time
  if (data.periodType === 'weeks') {
    impactInfectedByRequestTime = impactCurrentlyInfectedByWeeks();
    severeInfectedByRequestTime2 = severeImpactCurrentlyInfectedByWeeks();
    impactDollar = dollar / (data.timeToElapse * 7);
    severeDollar = dollar2 / (data.timeToElapse * 7);
  } else if (data.periodType === 'months') {
    impactInfectedByRequestTime = impactCurrentlyInfectedByMonths();
    severeInfectedByRequestTime2 = severeImpactCurrentlyInfectedByMonths();
    impactDollar = dollar / (data.timeToElapse * 30);
    severeDollar = dollar2 / (data.timeToElapse * 30);
  }
  const impactSevereCasesByRequestTime = Math.trunc(impactInfectedByRequestTime * 0.15);
  const severeCasesByRequestedTime1 = Math.trunc(severeInfectedByRequestTime2 * 0.15);
  const hospital = (data.totalHospitalBeds * 0.35);
  const impactHospitalBedByRequestTime = Math.trunc(hospital - impactSevereCasesByRequestTime);
  const severeHospitalBedByRequestTime = Math.trunc(hospital - severeCasesByRequestedTime1);
  const impactCasesForICUByRequestTime = Math.trunc(0.05 * impactInfectedByRequestTime);
  const severeCasesForICUByRequestTime = Math.trunc(0.05 * severeInfectedByRequestTime2);
  const impactCasesForVentilatorByRequestTime = Math.trunc(0.02 * impactInfectedByRequestTime);
  const severeCasesForVentilatorByRequestTime = Math.trunc(0.02 * severeInfectedByRequestTime2);
  const impact = {
    currentlyInfected: covidImpact,
    infectionsByRequestTime: impactInfectedByRequestTime,
    severeCasesByRequestedTime: impactSevereCasesByRequestTime,
    hospitalBedsByRequestTime: impactHospitalBedByRequestTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorByRequestTime,
    dollarInflight: impactDollar
  };
  const severeImpact = {
    currentlyInfected: covidSevereImpact,
    infectionsByRequestTime: severeInfectedByRequestTime2,
    severeCasesByRequestedTime: severeCasesByRequestedTime1,
    hospitalBedsByRequestTime: severeHospitalBedByRequestTime,
    casesForICUByRequestedTime: severeCasesForICUByRequestTime,
    casesForVentilatorsByRequestedTime: severeCasesForVentilatorByRequestTime,
    dollarInflight: severeDollar
  };
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
