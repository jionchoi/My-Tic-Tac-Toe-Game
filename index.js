//Declared each id of the grid-items
let grid = ["item1","item2","item3","item4","item5","item6","item7","item8", "item9"];
//Declared the same grid, but element will be removed as player and computer plays
let gridChange = Array.from(grid);

//middle index 
const middle = 4;


function game(player){
    //if it is a single player game, 
    if(player == 1){
        document.getElementById("start").style.display = "none";
        document.getElementById("single").style.display = "block";
    }
    //if it is a multi player game, 
    else{
        document.getElementById("start").style.display = "none";
        document.getElementById("multi").style.display = "block";
    }
    
}

/*
    Get a username from input text
    return type: string (username)
*/
function getUsername(numPlayer){
    let username = [""];
    if(numPlayer == 1){
        username[0] = document.getElementById("input").value;
    }
    else{
        username[0] =  document.getElementById("input1").value;
        username[1] = document.getElementById("input2").value;
    }
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

function displayName(player, username){
    
    //first player move
    if(player.turn){
        if(username.length == 1){
            document.getElementById("turn").innerHTML = username[0] + "'s move!";
        }
        else
            document.getElementById("turn").innerHTML = "Computer's Move";
    }
    //First player Won
    else{
        if(username.length == 1){
            document.getElementById("turn").innerHTML = username[0] + "'s move!";
        }
        else
            document.getElementById("turn").innerHTML = username[1] + "'s move!";
    }

   
}

function checkEven(index, char) {
    // We will check only those 4 numbers (acc 3 but)
    var checkArr = [0, 2, 6, 8]
    
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

//check the cross
function checkOdd(index, char){
    //You have to check not only right, but up and down
    //loop 4 times check up and down (above and below)
    for(var i = 0; i < middle; i++){
        //if index is either 1, 7, check index - 1 and index + 1
        if(index == 1 || index == 7){
            //make sure all three characters are the same 
            if(grid[index - 1] == grid[index + 1] && grid[index - 1] == char) return true;
            
        }
        //if index is either 3, 5, check index - 3 and index + 3
        else{
            if(grid[index - 3] == grid[index + 3] && grid[index - 1] == char) return true;
        }   
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
/*
Basic explanation of this algorithm:
    In order to win this game, same characters (either X or O) should be filled in one line

    If the index of X or O is even number(including 0), that means it is filled in the corner.
    which is 0,2,6,8. Therefore, if the index is one of those numnber, we can check the rest numbers.
    If two of them has the same character, it means it might have a line with same characters, if not,
*/

//Get index from move function
function checkWin(index, char){
    //Current length will be grid - gridChange (+1 because you need to check itself)
    var moves = grid.length - gridChange.length + 1;

    //if move is less than 5, game cannot be done 
    if(moves < middle) return false;

    //worst case sinario, when user clicks the middle, check all squares
    if(index == middle){
        return checkOdd(index, char) || checkEven(index, char);
    }

    //if the selected index is even number (corners) (i +=2 and j+=2 is important because you have to check 0,0 0,2 2,0 2,2)
    if(index % 2 == 0){
        return checkEven(index, char);
    }
    //if the selected index is odd number (cross), you have to check both. 
    else{
        return checkOdd(index, char);
    }
}

function removeEvent(){

}

function endGame(player, username){
    //you have to remove the remaining element so that the player cannot make a move anymore
    removeEvent();
    //Second player Won
    if(player.turn){
        if(username.length == 1){
            document.getElementById("turn").innerHTML = "computer has won!";

        }
        else
            document.getElementById("turn").innerHTML = username[1] + " has won!";
        
    }
    //First player Won
    else{
        document.getElementById("turn").innerHTML = username[0] + " has won!";
    }
}

//Change grid array 
function changeGrid(item, index, char){
    //Replace id name with X or O
    grid[index] = char;
    //get the index of the item in gridChange array 
    var secondIndex = gridChange.indexOf(item);

    //It will be removed
    gridChange.splice(secondIndex, 1);

    //change the html(fill out)
    document.getElementById(item).innerHTML = char;
}

function computerMove(){
    const char = "0";
    //I have to figure out the intelligent moves(not random moves obviously )
    //Random number between 0 and the number of element left 
    var rand = Math.floor(Math.random() * (gridChange.length - 1));

    //set new Item name and find index 
    let item = gridChange[rand];
    let index = grid.indexOf(item);
    
    changeGrid(item, index, char);

    //return index so that we can check win;
    return index;

}

function xAndO(item, index, char){
 
    //we don't need to check it because we are gonna delete the event listener
    changeGrid(item, index, char);

    //if it was the first player's turn, now it is a second player's turn 
    if(char == "X"){
        return false;
    }
    //if it was the second player's turn, now it is a first player's turn 
    else{
        return true;
    }
}


function moveTo(player, username, event){
    let item = event.target.id; //get id name which user clicked
    let index = grid.indexOf(item); //get the index of that id so that we can changed it
    var char = "X";
    let win;
    
    //if there is no remaining moves, it's a draw
    if(gridChange.length == 0)         
        return document.getElementById("turn").innerHTML = "It's a Draw!";

    //display the turn
    displayName(player, username);

    //if there is only one username, single play
    if(username.length == 1){
        //player's turn
        if(player.turn == true){
            char = "X"
            //change player turn 
            player.turn = xAndO(item, index, char);
            win = checkWin(index, char);
            if(win) return endGame(player, username);
            //Recursive(call a function again) so that the computer can move(Since player.turn == false, it will be computer move).
            moveTo(player, username, event);   
        }
        else{
            char = "0";
            //Set timeout in computer moves for 1 seconds
            index = setTimeout(computerMove, 1000);
            win = checkWin(index, char);
            if(win) return endGame(player, username);
            //now it's player's move
            player.turn = true;
        }
        
    }
    //multi player
    else{
        
    }
}


//Main play of Tic Tac Toe
function play(numPlayer){
    //get the username from input
    let username = getUsername(numPlayer);
    
    //For single play, if the turn is true, it's player's move. For multi play, if the turn is true, it's first player's move
    let player = { turn: true }; //make an object to pass it by reference

    //Add EventListener to container div
    for(var i = 0; i < grid.length; i++){
        //shoule be move because we are calling play every single time when we click that cell  
        document.getElementById(grid[i]).addEventListener("click", function(event) {moveTo(player, username, event)}, false);
        //document.getElementById(grid[i]).addEventListener("click", (event) => moveTo(player, username, event));
    }

    //display the first person's name
    document.getElementById("turn").innerHTML = username[0] + "'s move";

}


