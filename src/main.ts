import * as readline from "readline/promises";

//console.log("Hello, world!");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

async function playDay(stand: LemonadeStand, day: number): Promise<void>{
    const costPerGlass = 0.02;  //placeholder cost to make a glass as shown in day 1 of game, will fluctuate

    // SETUP SCREEN 
    console.log(`Day ${day}`);
    console.log(`The cost of lemonade today is $${costPerGlass.toFixed(2)}`);
    console.log(`Wallet: $${stand.assets.toFixed(2)}`);

    // PLAYER INPUT SCREEN
    const choices: DayChoices = {
        glassesToMake: Number(await rl.question("How many glasses to make? ")),
        signsToMake: Number(await rl.question("How many signs to make @ $0.15 each? ")),
        pricePerGlass: Number(await rl.question("How much do you want to charge per glass in dollars? ")),
    };         //player's choices

    // RUN DAY, REPORT
    const profit = stand.runDay(choices, costPerGlass);
    console.log(`\nProfit for the Day: $${profit.toFixed(2)}`);
    console.log(`Wallet: $${stand.assets.toFixed(2)}`);

    await rl.question("Press Enter to continue...\n\n");
}

// PLAY
async function main(){
    const stand = new LemonadeStand();
    
    for(let day = 1; day <= 7; day++){
        await playDay(stand, day);  //await each day before starting the next
    }
}

main();