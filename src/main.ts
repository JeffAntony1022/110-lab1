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

interface DayResult {
    glassesSold: number;
    profit: number;
}

type Weather = "sunny" | "hot" | "cloudy" | "rainy";
const WEATHERS: Weather[] = ["sunny", "hot", "cloudy", "rainy"];

function randomWeather(): Weather {
    const i = Math.floor(Math.random() * WEATHERS.length);
    return WEATHERS[i];
}

class LemonadeStand {
    assets: number;             //cash

    constructor() {
        this.assets = 2.00;     //starts at $2 default
    }
    
    //Runs one day - returns the day's profit so we can print a report
    runDay(choices: DayChoices, costPerGlass: number, weather: Weather): DayResult {
        const SIGN_COST = 0.15;  //cost to make a sign is 15c
        //How much did u spend today
        const expenses = choices.signsToMake * SIGN_COST + choices.glassesToMake * costPerGlass;
        
        const demand = Math.round(glassDemand(weather, choices));
        const glassesSold = Math.min(choices.glassesToMake, demand);

        const income = glassesSold * choices.pricePerGlass;
        const profit = income - expenses;
        this.assets += profit;  //accumulate profit day by day
        return { glassesSold, profit };
    }
}

function glassDemand(weather: Weather, choices: DayChoices): number {   //used AI for help with formula
    //1. demand based on weather
    let base: number;
    switch(weather){
        case "hot":
            base = 60;
            break;
        case "sunny":
            base = 20;
            break;
        case "cloudy":
            base = 25;
            break;
        case "rainy":
            base = 10;
            break;
    }

    //2. demand based on price
    //assume nobody pays $5+, if cheaper than that, a bigger fraction buys
    const priceFraction = Math.max(0, 1 - choices.pricePerGlass / 2.00);

    //3. demand based on advertising
    //each sign pulls in 10% more customers
    const adBoost = 1 + Math.min(choices.signsToMake * 0.1, 0.5);

    //4. total demand
    return base * priceFraction * adBoost;
}

async function playDay(stand: LemonadeStand, day: number): Promise<void>{
    const costPerGlass = 0.02;  //placeholder cost to make a glass as shown in day 1 of game, will fluctuate
    const weather = randomWeather();  //get today's weather

    // SETUP SCREEN 
    console.log(`Day ${day} (weather: ${weather})`);
    console.log(`The cost of lemonade today is $${costPerGlass.toFixed(2)}`);
    console.log(`Wallet: $${stand.assets.toFixed(2)}`);

    // PLAYER INPUT SCREEN
    const choices: DayChoices = {
        glassesToMake: Number(await rl.question("How many glasses to make? ")),
        signsToMake: Number(await rl.question("How many signs to make @ $0.15 each? ")),
        pricePerGlass: Number(await rl.question("How much do you want to charge per glass in dollars? ")),
    };         //player's choices

    // RUN DAY, REPORT
    const profit = stand.runDay(choices, costPerGlass, weather);
    console.log(`\nProfit for the Day: $${profit.profit.toFixed(2)}`);
    console.log(`Glasses Sold: ${profit.glassesSold}`);
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