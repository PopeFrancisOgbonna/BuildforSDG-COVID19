const requestTime = (time, infected) => {
  const factor = removeDecimal(time / 3);
  return infected * 2 ** factor;
};
const normalized = (period, time) => {
  let nResult;
  if (period === 'weeks') {
    nResult = time * 7;
  } else if (period === 'months') {
    nResult = time * 30;
  } else if (period === 'days') {
    nResult = time;
  }
  return nResult;
};
const removeDecimal = (a) => {
  const figureRec = String(a);
  if (figureRec.indexOf('.') < 0) {
    return Number(figureRec);
  }
  return Number(figureRec.slice(0, figureRec.indexOf('.')));
};
const covid19ImpactEstimator = (data) => {
  const imInfected = data.reportedCases * 10;
  const seInfected = data.reportedCases * 50;
  const normalizedTime = removeDecimal(normalized(data.periodType, data.timeToElapse));
  const imRequestedTime = (requestTime(normalizedTime, imInfected));
  const seRequestedTime = (requestTime(normalizedTime, seInfected));
  const imCases = removeDecimal(0.15 * imRequestedTime);
  const seCases = removeDecimal(0.15 * seRequestedTime);
  const bedSpace = 0.35 * data.totalHospitalBeds;
  const imBedSpace = removeDecimal(bedSpace - (0.15 * imRequestedTime));
  const seBedSpace = removeDecimal(bedSpace - (0.15 * seRequestedTime));
  const imICU = removeDecimal(0.05 * imRequestedTime);
  const seICU = removeDecimal(0.05 * seRequestedTime);
  const imVentilator = removeDecimal((0.02 * imRequestedTime));
  const seVentilator = removeDecimal((0.02 * seRequestedTime));
  const imDollarCal = imRequestedTime * data.region.avgDailyIncomePopulation;
  const imDollar = removeDecimal((imDollarCal * data.region.avgDailyIncomeInUSD) / normalizedTime);
  const seDollarCal = seRequestedTime * data.region.avgDailyIncomePopulation;
  const seDollar = removeDecimal((seDollarCal * data.region.avgDailyIncomeInUSD) / normalizedTime);
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
