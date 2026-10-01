//console.log("Hello, world!");

interface DayChoices {
    glassesToMake: number;
    signsToMake: number;
    pricePerGlass: number;
}

class LemonadeStand {
    assets: number;             //cash

    constructor() {
        this.assets = 2.00;     //starts at $2 default
    }
    
    //Runs one day - returns the day's profit so we can print a report
    runDay(choices: DayChoices, costPerGlass: number): number {
        const SIGN_COST = 0.15;  //cost to make a sign is 15c

        //How much did u spend today
        const expenses = choices.signsToMake * SIGN_COST + choices.glassesToMake * costPerGlass;

        //number of glasses that actually sell depends on advertising, weather, and price
        const glassesSold = choices.glassesToMake; //for now, all glasses made are sold

        const income = glassesSold * choices.pricePerGlass;
        const profit = income - expenses;
        this.assets += profit;  //accumulate profit day by day
        return profit;
    }
}