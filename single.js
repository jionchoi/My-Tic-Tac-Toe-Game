//Declared each id of the grid-items
let grid = ["item1","item2","item3","item4","item5","item6","item7","item8", "item9"];
//Declared the same grid, but element will be removed as player and computer plays
let gridChange = Array.from(grid);

//middle index 
const middle = 4;

/*
function lists
    game(): hide the first page and show username input
    getUsername(): Get username from input
    addEvent(): Add click event to all 9 grids 
    removeEvent(): remove click event 
    displayTurn(): Display name based on the turn
    changeGrid(): change the grid array and gridChange array
    move(): when user clicks the button, call move()
    computerMove(): intelligent computer move
    checkEven(): check corner
    checkOdd(): check cross and up down, left right
    checkWin(): chceck win or not
    endGame(): if anyone won, end the game
*/

function game(){
    document.getElementById("start").style.display = "none";
    document.getElementById("single").style.display = "block";

}

function getUsername(){
    const username = document.getElementById("input").value;
       
    //if the username is inputed, change display of the first page  to none
    if(username != ""){
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("gamePage").style.display = "grid";

    }
    //if the user does not put anyhing in, and tries to start the game
    else if(username == "" && document.getElementById("start").style.display == "none"){
        window.alert("Please enter Username");
    }

    //get username from user input
    return username;
}

function addEvent(username){
    //Add EventListener to container div
    for(var i = 0; i < grid.length; i++){
        //shoule be move because we are calling play every single time when we click that cell  
        document.getElementById(grid[i]).onclick = function(event){move(username, event)};
    }
}

function removeEvent(item){
    document.getElementById(item).onclick = "none";
}

function displayTurn(username){
    //display the turn(name)
    document.getElementById("turn").innerHTML = username + "'s move!";
}

function checkEven(index, char) {
    // We will check only those 4 numbers (acc 3 but)
    var checkArr = [0, 2, 6, 8]
    console.log(index + ":index inputed");
    //if the number is 4
    if(index == middle){
        console.log("run!");
        //check 2, 6,
        if(grid[index - 2] == grid[index + 2] && grid[index - 2] == char) {
            console.log("first: " + grid[index - 2] == grid[index + 2] && grid[index - 2] == char)
            return true;
        }
        //check 0 and 8
        else if(grid[index - 4] == grid[index + 4] && grid[index - 4] == char) {
            console.log("second: " + grid[index - 4] == grid[index + 4] && grid[index - 4] == char);
            return true;
        }
        else return false;
    }

    //remove the clicked one
    checkArr.splice(index, 1);

    // Iterate through the remaining indices
    for (var i = 0; i < checkArr.length; ++i) {
        var checkIndex = checkArr[i];

        // Check if the values at the indices are equal
        if (grid[index] == grid[checkIndex]) {
            var diff = Math.abs(index - checkIndex);

            // If the difference is 2, it can be 0,2 or 6,8
            if (diff == 2) {
                // If it is a combination of 6 and 8, check 7; if it is a combination of 0 and 2, check 1
                //what does ? do?: if (index == 6 || index == 8) is true, target index is 7, else, 1.
                var targetIndex = (index == 6 || index == 8) ? 7 : 1;
                if (grid[index] == grid[targetIndex]) return true;
            }
            // If the difference is 4 or 8, check the middle
            else if (diff == 4 || diff == 8) {
                if (grid[middle] == char) return true;
            }
            // If the difference is 6, it can be 0,6 or 2,8
            else if (diff == 6) {
                // If it is a combination of 0 and 6, check 3; if it is a combination of 2 and 8, check 5
                var targetIndex = (index == 6 || index == 0) ? 3 : 5;
                if (grid[index] == grid[targetIndex]) return true;
            }
        }
    }
    return false;
}

function checkOdd(index, char){
    //You have to check not only right, but up and down
    //check up and down (above and below)
    //if index is either 1, 7, check index - 1 and index + 1
    if(index == 1 || index == 7){
        //make sure all three characters are the same 
        if(grid[index - 1] == grid[index + 1] && grid[index - 1] == char) return true;
        
    }
    //if index is either 3, 5, check index - 3 and index + 3
    else{
        if(grid[index - 3] == grid[index + 3] && grid[index - 3] == char) return true;
    }   

    //if the middle is not the same character, it cannot be a line 
    if(grid[middle] == char){
        if(grid[1] == grid[7] && grid[1] == char){
            return true;
        }
        //vertical
        else if(grid[3] == grid[5] && grid[3] == char){
            return true;
        }
    }

    //if none, keep going
    return false;
}

function checkWin(index, char){
    //Current length will be grid - gridChange (+1 because you need to check itself)
    var moves = grid.length - gridChange.length + 1;

    //if move is less than 5, game cannot be done 
    if(moves < middle) return false;

    //worst case sinario, when user clicks the middle, check all squares
    if(index == middle){
        console.log("This is odd: " + checkOdd(index, char));
        console.log("This is Even: " + checkEven(index, char));
        return checkOdd(index, char) || checkEven(index, char);
    }

    //if the selected index is even number (corners) (i +=2 and j+=2 is important because you have to check 0,0 0,2 2,0 2,2)
    if(index % 2 == 0){
        console.log("This is Even: " + checkEven(index, char));
        return checkEven(index, char);
    }
    //if the selected index is odd number (cross), you have to check both. 
    else{
        console.log("This is odd: " + checkOdd(index, char));
        return checkOdd(index, char);
    }
}

function endGame(char){
    //remove remaining onclick event
    for(var i = 0; i < gridChange.length; ++i){
        removeEvent(gridChange[i]);
    }
    if(char == "X"){
        //player won
        document.getElementById("turn").innerHTML = "asdf" + " has won!";
    }
    else
        document.getElementById("turn").innerHTML = "computer has won!";
}

//Change grid array 
function changeGrid(item, index, char){
    //remove click event
    removeEvent(item);

    //Replace id name with X or O
    grid[index] = char;
    //get the index of the item in gridChange array 
    var secondIndex = gridChange.indexOf(item);

    //It will be removed
    gridChange.splice(secondIndex, 1);

    //change the html(fill out)
    document.getElementById(item).innerHTML = char;

    console.log(gridChange.length);
    //if there is no remaining moves, it's a draw
    if(gridChange.length == 0)         
      return document.getElementById("turn").innerHTML = "It's a Draw!";

    if(checkWin(index, char)) return endGame(char);
    //if anyone wins, return true
    return checkWin(index, char);
}


function computerMove(){
    const char = "0";
    //I have to figure out the intelligent moves(not random moves obviously)
    //Random number between 0 and the number of element left 
    var rand = Math.floor(Math.random() * (gridChange.length - 1));

    //set new Item name and find index 
    let item = gridChange[rand];
    let index = grid.indexOf(item);
    changeGrid(item, index, char);
}

function move(username, event){
    let item = event.target.id; //get id name which user clicked
    let index = grid.indexOf(item); //get the index of that id so that we can changed it
    let win;
    const playerChar = "X";

    //after player clicks, check win, and if win is false, computer moves. After computer moves, if win is true, break it(return end)
    //display the turn
    displayTurn(username);

    //player will play
    changeGrid(item, index, playerChar);

    //change the username to "computer"
    username = "computer";

    //display the turn 
    displayTurn(username);

    //Wait a second before make a move
    setTimeout(computerMove, 1000);

}

function play(){
    //get the username from input
    let username = getUsername();

    //add event linsters in grid items
    addEvent(username);

    //display the first person's name
    displayTurn(username);
}
