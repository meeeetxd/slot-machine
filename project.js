// 1. deposit some money
// 2. Determine number of lines to bet.
// 3. Collect the bet amount
// 4. Spin the machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again


// ONE WAY TO CREATE A FUNCTION
// function deposit(){
//     return 1
// }

// SECOND WAY TO CREATE A FUNCTION (NEW WAY)
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

// selecting the Avaiability of each symbols in the slot machine:
const SYMBOLS_COUNT = {
        A: 2,
        B: 4,
        C: 6,
        D: 8
    }
    // multiplier :
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}





const deposit = () => {
    while (true) {
        const depositAmt = prompt("Enter a deposit amount: ")
        const numberDepositAmt = parseFloat(depositAmt);

        if (isNaN(numberDepositAmt) || numberDepositAmt <= 0) {
            console.log("Invalid Deposit amount, try again.")
        } else {
            return numberDepositAmt;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again. ")
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the Bet: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet or insufficiant funds, try again. ")
        } else {
            return numberBet;
        }
    }
};

// function to spin the slot machine:
const spin = () => {
    const symbols = []; //creating an empty array.
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    //creating 3 reels 
    //const reels = [[],[],[]]; ANOTHER METHOD to add 3 reels
    const reels = [];
    //generating value of columns for all 3 arrays
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        //copies symbols arrays into reelSymbols array
        const reelSymbols = [...symbols];
        //generating value of rows for all 3 arrays
        for (let j = 0; j < ROWS; j++) {
            //generating random index number using math.random and multiply it by length of the array
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            //selecting random index value
            const selectedSymbol = reelSymbols[randomIndex];
            //pushing it into the Array
            reels[i].push(selectedSymbol);
            //deleting the selected value from the array to avoid duplicate values
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}


const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | "; //adding the '|' to make it look like a slot machine.
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        //condition to check if all of the symbols are same as the first one.
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
};

const game = () => {
    // 'let' helps changing the value of the variable.
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
        // console.log("Your deposit is: " + depositAmt);
        const numberOfLines = getNumberOfLines();
        // console.log("Your selected number of lines is: " + numberOfLines);
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels)
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ?")

        if (playAgain != "y") {
            break;
        }
    }
};

game();