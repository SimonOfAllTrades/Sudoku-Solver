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

    // method to create a new board and request the client to add and remove numbers
    // returns void
    this.create_board = function () {

    }

    // method to add num at col and row to the initial numbers on the board
    // num is between 1-9
    // row, col is between 0-8
    // returns true if a number was successfully added, false if there was a number or there was a number in the same row, column or nonet
    this.add_starting_number = function (num, row, col) {
        var pos = col + row * 9;
        var nonet = this.nonet_at(row, col);
        if (this.given_board[pos] == 0) { //available space
            this.given_board[pos] = num;
            if (this.check_row(row) && this.check_column(column) && this.check_nonet(nonet)) {
                return true;
            } 
            this.given_board[pos] = 0;
        }
        return false;
    }

    // method to remove a starting number at row and col
    // returns true if a starting number was removed, or false if there was no number there
    this.remove_starting_number = function (row, col) {

    }

    // method to add a num at the pos of col and row to cuurent_board
    // num is between 1-9
    // row, col is between 0-8
    // returns true if a number has been added or replaced, false if there was a starting number there
    this.add_number = function (num, row, col) {
        var pos = col + row * 9;
        var nonet = this.nonet_at(row, col);
        if (this.current_board[pos] == 0) {
            
        } else if (this.given_board[pos] == 0) { //replace an added number

        }
        return false;
    }

    // method to remove the number at loc from current board, if there is no number there, nothing is changed
    // returns true if successfuly removed, fasle if there was no number there or there was a starting number
    this.remove_number = function (loc) {

    }

    // method to determine if the given_board is a solvable puzzle
    this.check_solveable = function () {

    }

    // method that determines if the added number is valid
    this.valid_move = function () {

    }

    // method to check the items in a row of an array to see if they are valid
    this.check_row = function (row) {

    }

    // method to check the items in a column of an array to see if they are valid
    this.check_column = function (column) {

    }

    // method to check the items in a nonet of an array to see if they are valid
    this.check_nonet = function (nonet) {

    }

    // method to check if the puzzle is solved
    this.check_win = function() {

    }

    // method to find the nonet given col and row
    // returns the an integer from 1-9
    this.nonet_at(row, col) {
        if (row < 3) {
            if (col < 3) {
                return 1;
            } else if (col < 6) {
                return 2;
            } else {
                return 3;
            }
        } else if (row < 6) {
            if (col < 3) {
                return 4;
            } else if (col < 6) {
                return 5;
            } else {
                return 6;
            }
        } else {
            if (col < 3) {
                return 7;
            } else if (col < 6) {
                return 8;
            } else {
                return 9;
            }
        }
    }

}



