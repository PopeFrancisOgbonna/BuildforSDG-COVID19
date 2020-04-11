const covid19ImpactEstimator = (data) => {
    // Computes the currently infected population
    const covidImpact = data.reportedCases*10;
    const covidSevereImpact = data.reportedCases * 50;
    
    //Declaration of variables
    let impactInfectedByRequestTime = 0;
    let severeInfectedByRequestTime = 0;
    
    

    //Functions for the computation of currently infected population by request time
    //For Impact
    const impactCurrentlyInfectedByDay = () => {

        const a= data.timeToElapse / 3;
		const b = data.timeToElapse % 3;
			
		let impactA = covidImpact * 2 ** a;
		let impactB = ((impactA * 2)/ 3) * b;
			
		return Math.floor(impactA + impactB);
    }

    const impactCurrentlyInfectedByWeeks = () => {

        const weekFactor = data.timeToElapse * 7;
        
        const a = weekFactor / 3;
        const b = weekFactor % 3;
        
        let impactA = (covidImpact * 2 ** a);
        let impactB = ((impactA * 2)/ 3) * b;
        
        return Math.floor(impactA + impactB);
    }
    
    const impactCurrentlyInfectedByMonths = () => {
        
        const a = data.timeToElapse / 30;
        const b = data.timeToElapse % 30;
        
        let impactA = (covidImpact * 2 ** 10) * a;
        let impactB = ((impactA * 2)/ 3) * b;
        
        return Math.floor(impactA + impactB);
    }

    //For severeImpact
    const severeImpactCurrentlyInfectedByDays =()=>{
        const a= data.timeToElapse / 3;
        const b = data.timeToElapse  % 3;
        
        let impactA = covidSevereImpact * 2 ** a;
        let impactB = ((impactA * 2)/ 3) * b;

        return Math.floor(impactA + impactB);
    }
    
    const severeImpactCurrentlyInfectedByWeeks = () => {

        const weekFactor = data.timeToElapse * 7;
        
        const a = weekFactor / 3;
        const b = weekFactor % 3;
        
        let impactA = (covidSevereImpact * 2 ** a);
        let impactB = ((impactA * 2)/ 3) * b;
        
        return Math.floor(impactA + impactB);
    }
    
    const severeImpactCurrentlyInfectedByMonths = () => {
        
        const a = data.timeToElapse / 3;
        const b = data.timeToElapse % 3;
        
        let impactA = (covidSevereImpact * 2 ** 10) * a;
        let impactB = ((impactA * 2)/ 3) * b;
        
        return Math.floor(impactA + impactB);
    }

    //Computes Currently Infected population by request time
    if(data.periodType === 'days'){

        impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
        severeInfectedByRequestTime = severeImpactCurrentlyInfectedByDays();
            
    }else if(data.periodType === 'weeks'){

        impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
        severeInfectedByRequestTime = severeImpactCurrentlyInfectedByDays();
            
    }else{

        impactInfectedByRequestTime = impactCurrentlyInfectedByDays();
        severeInfectedByRequestTime = severeImpactCurrentlyInfectedByDays();
            
    }
    return {
        data: data,
        impact: {
            currentlyInfected: covidImpact
        },
        severeImpact: {
            currentlyInfected: covidSevereImpact
        }
    }
};

export default covid19ImpactEstimator;
