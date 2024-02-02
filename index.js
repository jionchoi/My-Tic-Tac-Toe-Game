//Declared each id of the grid-items
let grid = ["item1","item2","item3","item4","item5","item6","item7","item8", "item9"];
//Declared the same grid, but element will be removed as player and computer plays
let gridChange = Array.from(grid);


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
    
    //start the name
    play(player);
}

/*
    Get a username from input text
    return type: string (username)
*/
function getUsername(playerNum){
    let username = document.getElementById("input").value;
    console.log(document.getElementById("start").style.display);
    //if the username is inputed, change display to none
    if(username != ""){
        if(playerNum == 1){
            //change display of input to none
            document.getElementById("single").style.display = "none";
        }
        else{
            document.getElementById("multi").style.display = "none";
        }
    }
    //if the user does not put anyhing in, and tries to start the game
    else if(username == "" && document.getElementById("start").style.display == "none"){
        window.alert("Please enter Username");
    }

    //get username from user input
    return username;
     
}

//If the item is still in the array (not removed yet), it is a valid move
function checkAvailiable(item){
    if(grid.includes(item)) return true;
    else return false;
}

//function when user click the item
function move(event, player){
    let item = event.target.id; //get id name which user clicked
    let index = grid.indexOf(item); //get the index of that id so that we can changed it
    let secondIndex = 0;

    //if it's player's turn
    if(player.turn == true){
        //If it is a valid move,
        if(checkAvailiable(item) == true){
            secondIndex = gridChange.indexOf(item);
            //remove that element from copied array
            gridChange.splice(secondIndex, 1);

            //Replace id name with X 
            grid[index] = "X";
            
            document.getElementById(item).innerHTML = "X";
            //Now it's computer's turn
            player.turn = false;
            return index;
        }
    }
    //if it's computer's turn
    else{
        //Random number between 0 and the number of element left 
        var rand = Math.floor(Math.random() * (gridChange.length - 1));

        //set new Item name and find index 
        item = gridChange[rand];
        index = grid.indexOf(item);

        //remove that element from copied array
        gridChange.splice(rand, 1);

        //Replace ID name with O
        grid[index] = "O";
        document.getElementById(item).innerHTML = "O";
        

        //Now it's player's turn
        player.turn = true;

        return index;

    }
}

/*
Basic explanation of this algorithm:
    In order to win this game, same characters (either X or O) should be filled in one line

    If the index of X or O is even number(including 0), that means it is filled in the corner.
    which is 0,2,6,8. Therefore, if the index is one of those numnber, we can check the rest numbers.
    If two of them has the same character, it means it might have a line with same characters, if not,
*/

//Get index from move function
function checkWin(grid, gridChange, index){

    //Current length will be grid - gridChange
    var moves = grid.length - gridChange.length;
    var checkEven = [0,2,6,8];
    //if move is less than 3, game cannot be done 
    if(moves < 3) return -1;
    
    
    for(var i = 0; i < moves; i++){
        //if the index is even number, (0 % 2 is 0)
        if((index % 2) == 0){
            //remove that index
            checkEven.splice()
            //Since index is even number, checking number is even number
            //check the rest numbers
            if(grid[checkNum] == grid[index]){

            }
        }
        else{

        }
    }
    return 1;
}

function endGame(){
    //Player Won
    if(checkWin(grid) == 1){
        
    }
    //Computer Won
    else if(checkWin(grid) == -1){

    }
    
    return false;
}


//Main play of Tic Tac Toe
function play(playerNum, event){
    
    let username = getUsername(playerNum);
    console.log(username);
    //Add EventListener to container div
    for(var i = 0; i < grid.length; i++){
        //shoule be move because we are calling play every single time when we click that cell  
        document.getElementById(grid[i]).addEventListener("click", move);
    }


    
    let index = 0; //index of the item that user or computer moved
    //Display the name
    //document.getElementById("turn").innerHTML = "It's Your Turn " + username + "!";
    
    //First, player will play the game
    let player = { turn: true }; //make an object to pass it by reference
    var checkwin = -1;
    var i = 0;
    //2: player won, 1: computer won, 0: draw, -1 still playing
    while(i < 10){
        index = move(event, player);
        checkwin = checkWin(grid, gridChange,index);
        i++;
        console.log(grid);
        console.log(gridChange);
    }

}


