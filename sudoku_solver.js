// This is a sudoku solving modeule.
// currently, I will not be using an elegant solution

// let's start with a board object contructor that creates a blank board

// for this sudoku, 1-9 are the numbers in the squares and 0 indicates a blank


/************************************* THINGS TO DO ******************************************/

// determine how adding a number will be detected
// determine when to stop adding numbers
// determine a fast way to check a sudoku


function board () {
    // determines if the board is solved 
    this.solved = false;

    // determines how many unused pieces are left
    this.squares_left = 81;

    // stores in an array the current numbers on the board
    this.current_board = [
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0
    ];

    // stores the array of intitial starting numbers of the board
    this.given_board = [
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0
    ];

    // method to create a new board
    this.create_board = function () {

    }

    // method to add a num at loc to cuurent_board
    // num is between 1-9
    // loc is between 0-80
    this.add_number = function (num, loc) {
        if (this.current_board[loc] == 0) {
            
        } else if (this.given_board[loc] == 0) { //replace an added number

        } else { //trying to replace an initial number

        }
    }

    // method to remove the number at loc from current board, if there is no number there, nothing is changed
    // during the create_baord method, if remove_number is used, it will alter given_board
    // remove_number does not affect given_board once the board has been created
    this.remove_number = function (loc) {

    }

    // method to determine if the given_board is a solvable puzzle
    this.check_solveable = function () {

    }

    // method to sum the items in a row of an array
    this.sum_row = function (row) {

    }

    // method to sum the items in a column of an array
    this.sum_column = function (column) {

    }

    // method to sum the items in a nonet of an array
    this.sum_nonet = function (nonet) {

    }

    // method to check if the puzzle is solved
    this.check_win = function() {

    }


}



