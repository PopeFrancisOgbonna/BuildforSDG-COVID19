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
    const weekFactor = Math.trunc(data.timeToElapse * 7);
    const a = weekFactor / 3;
    const impactA = (covidImpact * 2 ** a);
    return impactA;
  };
  const impactCurrentlyInfectedByMonths = () => {
    const a = Math.trunc(data.timeToElapse / 30);
    const impactA = (covidImpact * 2 ** 10) * a;
    return impactA;
  };
  // For severeImpact
  const severeImpactCurrentlyInfectedByDays = () => {
    const a = Math.trunc(data.timeToElapse / 3);
    const impactA = covidSevereImpact * 2 ** a;
    return impactA;
  };
  const severeImpactCurrentlyInfectedByWeeks = () => {
    const weekFactor = Math.trunc(data.timeToElapse * 7);
    const a = weekFactor / 3;
    const impactA = (covidSevereImpact * 2 ** a);
    return impactA;
  };
  const severeImpactCurrentlyInfectedByMonths = () => {
    const a = Math.trunc(data.timeToElapse / 3);
    const impactA = (covidSevereImpact * 2 ** 10) * a;
    return impactA;
  };
  // Declaration of variables
  let severeInfectedByRequestTime = severeImpactCurrentlyInfectedByDays();
  let impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
  // Computes Currently Infected population by request time
  if (data.periodType === 'weeks') {
    impactInfectedByRequestTime = impactCurrentlyInfectedByWeeks();
    severeInfectedByRequestTime = severeImpactCurrentlyInfectedByWeeks();
  } else {
    impactInfectedByRequestTime = impactCurrentlyInfectedByMonths();
    severeInfectedByRequestTime = severeImpactCurrentlyInfectedByMonths();
  }
  const impact = {
    currentlyInfected: covidImpact,
    infectionsByRequestTime: impactInfectedByRequestTime
  };
  const severeImpact = {
    currentlyInfected: covidSevereImpact,
    infectionsByRequestTime: severeInfectedByRequestTime
  };
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
