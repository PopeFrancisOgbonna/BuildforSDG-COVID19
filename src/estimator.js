const requestTime = (time,infected) => {
  const factor = time / 3;
  return infected * 2 ** factor;
}
const normalized = (period,time) => {
  let nResult;
  if (period === 'weeks') {
    nResult = time * 7;
  } else if (period === 'months') {
    nResult = time * 30;
  } else if (period === 'days'){
    nResult = time;
  }
  return nResult;
}
const covid19ImpactEstimator = (data) => {
  const imInfected = data.reportedCases * 10;
  const seInfected = data.reportedCases * 50;
  const normalizedTime = Math.trunc(normalized(data.periodType, data.timeToElapse));
  const imRequestedTime = (requestTime(normalizedTime, imInfected));
  const seRequestedTime = (requestTime(normalizedTime, seInfected));
  const imCases = Math.trunc(0.15 * imRequestedTime);
  const seCases = Math.trunc(0.15 * seRequestedTime);
  const bedSpace = 0.35 * data.totalHospitalBeds;
  const imBedSpace = Math.trunc(bedSpace - (0.15 * imRequestedTime));
  const seBedSpace = Math.trunc(bedSpace - (0.15 * seRequestedTime));
  const imICU = Math.trunc(0.05 * imRequestedTime);
  const seICU = Math.trunc(0.05 * seRequestedTime);
  const imVentilator = Math.trunc((0.02 * imRequestedTime));
  const seVentilator = Math.trunc((0.02 * seRequestedTime));
  const imDollarCal = imRequestedTime * data.region.avgDailyIncomePopulation;
  const imDollar = Math.trunc((imDollarCal * data.region.avgDailyIncomeInUSD) / normalizedTime);
  const  seDollarCal = seRequestedTime * data.region.avgDailyIncomePopulation;
  const seDollar = Math.trunc((seDollarCal * data.region.avgDailyIncomeInUSD) / normalizedTime);
  return {
    data,
    impact: {
      currentlyInfected: imInfected,
      infectionsByRequestedTime: imRequestedTime,
      severeCasesByRequestedTime: imCases,
      hospitalBedsByRequestedTime: imBedSpace,
      casesForICUByRequestedTime: imICU,
      casesForVentilatorsByRequestedTime: imVentilator,
      dollarsInFlight: imDollar
    },
    severeImpact: {
      currentlyInfected: seInfected,
      infectionsByRequestedTime: seRequestedTime,
      severeCasesByRequestedTime: seCases,
      hospitalBedsByRequestedTime: seBedSpace,
      casesForICUByRequestedTime: seICU,
      casesForVentilatorsByRequestedTime: seVentilator,
      dollarsInFlight: seDollar
    }
  };
};

export default covid19ImpactEstimator;
