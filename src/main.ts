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

function playDay(stand: LemonadeStand, day: number): void{
    const costPerGlass = 0.02;  //placeholder cost to make a glass as shown in day 1 of game, will fluctuate

    // SETUP SCREEN 
    console.log(`Day ${day}`);
    console.log(`The cost of lemonade today is $${costPerGlass.toFixed(2)}`);
    console.log(`Wallet: $${stand.assets.toFixed(2)}`);

    // PLAYER INPUT SCREEN
    const choices: DayChoices = {
        glassesToMake: 10,
        signsToMake: 5,
        pricePerGlass: 1.00,
    };         //player's choices, hardcoded for now, will change to be input based

    // RUN DAY, REPORT
    const profit = stand.runDay(choices, costPerGlass);
    console.log(`Profit for the Day: $${profit.toFixed(2)}`);
    console.log(`Wallet: $${stand.assets.toFixed(2)}`);
}

// PLAY
const stand = new LemonadeStand();
// playDay(stand, 1);
//let's loop it like the real game
for (let day = 1; day <= 5; day++){
    playDay(stand, day);
}