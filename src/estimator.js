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
  let severeInfectedByRequestTime = severeImpactCurrentlyInfectedByDays();
  let impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
  let impactDollar = (impactInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse);
  let severeDollar = (severeInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse);
  // Computes Currently Infected population by request time
  if (data.periodType === 'weeks') {
    impactInfectedByRequestTime = impactCurrentlyInfectedByWeeks();
    severeInfectedByRequestTime = severeImpactCurrentlyInfectedByWeeks();
    impactDollar = (impactInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse * 7);
    severeDollar = (severeInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse * 7);
  } else if (data.periodType === 'months') {
    impactInfectedByRequestTime = impactCurrentlyInfectedByMonths();
    severeInfectedByRequestTime = severeImpactCurrentlyInfectedByMonths();
    impactDollar = (impactInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse * 30);
    severeDollar = (severeInfectedByRequestTime * data.region[2] * data.region[3]) / (data.timeToElapse * 30);
  }
  const impactSevereCasesByRequestTime = Math.trunc(impactInfectedByRequestTime * 0.15);
  const severeCasesByRequestedTime = Math.trunc(severeInfectedByRequestTime * 0.15);
  const impactHospitalBedByRequestTime = Math.trunc((data.totalHospitalBeds * 0.35) - impactSevereCasesByRequestTime);
  const severeHospitalBedByRequestTime = Math.trunc((data.totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
  const impactCasesForICUByRequestTime = Math.trunc(0.05 * impactInfectedByRequestTime);
  const severeCasesForICUByRequestTime = Math.trunc(0.05 * severeInfectedByRequestTime);
  const impactCasesForVentilatorByRequestTime = Math.trunc(0.02 * impactInfectedByRequestTime);
  const severeCasesForVentilatorByRequestTime = Math.trunc(0.02 * severeInfectedByRequestTime);
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
    infectionsByRequestTime: severeInfectedByRequestTime,
    severeCasesByRequestedTime: severeCasesByRequestedTime,
		hospitalBedsByRequestTime: severeHospitalBedByRequestTime,
		casesForICUByRequestedTime: severeCasesForICUByRequestTime,
    casesForVentilatorsByRequestedTime: severeCasesForVentilatorByRequestTime,
    dollarInflight: severeDollar
  };
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
