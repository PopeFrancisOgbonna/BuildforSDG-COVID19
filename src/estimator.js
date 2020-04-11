const covid19ImpactEstimator = (data) => {
  // Computes the currently infected population
  const covidImpact = data.reportedCases * 10;
  const covidSevereImpact = data.reportedCases * 50;
  // Functions for the computation of currently infected population by request time
  // For Impact
  const impactCurrentlyInfectedByDays = () => {
    const a = data.timeToElapse / 3;
    const b = data.timeToElapse % 3;
    const impactA = covidImpact * 2 ** a;
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
  };
  const impactCurrentlyInfectedByWeeks = () => {
    const weekFactor = data.timeToElapse * 7;
    const a = weekFactor / 3;
    const b = weekFactor % 3;
    const impactA = (covidImpact * 2 ** a);
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
  };
  const impactCurrentlyInfectedByMonths = () => {
    const a = data.timeToElapse / 30;
    const b = data.timeToElapse % 30;
    const impactA = (covidImpact * 2 ** 10) * a;
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
  };
  // For severeImpact
  const severeImpactCurrentlyInfectedByDays = () => {
    const a = data.timeToElapse / 3;
    const b = data.timeToElapse % 3;
    const impactA = covidSevereImpact * 2 ** a;
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
  };
  const severeImpactCurrentlyInfectedByWeeks = () => {
    const weekFactor = data.timeToElapse * 7;
    const a = weekFactor / 3;
    const b = weekFactor % 3;
    const impactA = (covidSevereImpact * 2 ** a);
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
  };
  const severeImpactCurrentlyInfectedByMonths = () => {
    const a = data.timeToElapse / 3;
    const b = data.timeToElapse % 3;
    const impactA = (covidSevereImpact * 2 ** 10) * a;
    const impactB = ((impactA * 2) / 3) * b;
    return Math.floor(impactA + impactB);
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

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
