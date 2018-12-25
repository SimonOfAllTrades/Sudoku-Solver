// This is a sudoku solving modeule.
// currently, I will not be using an elegant solution

// let's start with a board object contructor that creates a blank board

// for this sudoku, 1-9 are the numbers in the squares and 0 indicates a blank


/************************************* THINGS TO DO ******************************************/

// determine how adding a number will be detected
// determine when to stop adding numbers
// determine a fast way to check a sudoku


function board () {
    // determines how many unused pieces are left
    this.squares_left = 81;

    // stores in an array the current numbers on the board
    this.board = [
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
        if (this.given_board[pos] == 0) { // available space in the original board
            this.given_board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                --this.squares_left;
                return true;
            }
            this.given_board[pos] = 0; // invalid number
        } else {
            var temp = this.given_board[pos];
            this.given_board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                return true;
            }
            this.given_board[pos] = temp;
        }
        return false;
    }

    // method to remove a starting number at row and col
    // returns true if a starting number was removed, or false if there was no number there
    this.remove_starting_number = function (row, col) {
        var pos = col + row * 9;
        if (this.given_board[pos] == 0) {
            return false;
        }
        this.given_board[pos] = 0;
        ++this.squares_left;
        return true;
    }   

    // method to add a num at the pos of col and row to cuurent_board
    // num is between 1-9
    // row, col is between 0-8
    // returns true if a number has been added or replaced, false if there was a starting number there
    this.add_number = function (num, row, col) {
        var pos = col + row * 9;
        var nonet = this.nonet_at(row, col);
        if (this.board[pos] == 0) {
            this.board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                --this.squares_left;
                return true;
            }
            this.board[pos] = 0; // invalid number
            return true;
        } else if (this.given_board[pos] == 0) { //replace an added number
            var temp = this.board[pos];
            this.baord[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                return true;
            }
            this.board[pos] = temp;
        }
        return false;
    }

    // method to remove the number at loc from current board, if there is no number there, nothing is changed
    // returns true if successfuly removed, fasle if there was no number there or there was a starting number
    this.remove_number = function (row, col) {
        var pos = col + row * 9;
        if (this.board[pos] == 0 || this.given_board[pos] != 0) {
            return false;
        }
        this.board[pos] = 0;
        --this.squares_left;
        return true;
    }

    // method to determine if the given_board is a solvable puzzle
    this.check_solveable = function (row, col, nonet) {

    }

    // method to check the items in a row of an array to see if they are valid
    // returns true if the row is valid and all the numbers from 1-9 appear at most once
    this.check_row = function (row) {
        var a = [];
        for (var i = 0; i < 9; ++i) {
            a[i] = this.board[row * 9 + i];
        }
        a = selectionsort(a, 9);
        for (var i = 0; i < 8; ++i) {
            if (a[i] == a[i + 1] && a[i] != 0) { // if there is a duplicate number besides 0
                return false;
            }
        }
        // a has unique numbers other than 0
        return true;
    }

    // method to check the items in a column of an array to see if they are valid
    // returns true if the col is valid and all the numbers from 1-9 appear at most once
    this.check_column = function (col) {
        var a = [];
        for (var i = 0; i < 9; ++i) {
            a[i] = this.board[i * 9 + col];
        }
        a = selectionsort(a, 9);
        for (var i = 0; i < 8; ++i) {
            if (a[i] == a[i + 1] && a[i] != 0) { // if there is a duplicate number
                return false;
            }
        }
        // a has unique numbers other than 0
        return true;
    }

    // method to check the items in a nonet of an array to see if they are valid
    this.check_nonet = function (nonet) {
        var start = nonet % 3 * 3 + (9 * 3 * Math.floor(nonet / 3));
        var a = [];
        for (var i = 0, k = 0; i < 3; ++i) {
            for (var j = start + i * 9; j < start + i * 9 + 3; ++j, ++k) {
                a[i * 3 + k] = this.board[j];
            }
            k = 0;
        }
        a = selectionsort(a, 9);
        for (var i = 0; i < 8; ++i) {
            if (a[i] == a[i + 1] && a[i] != 0) { // if there is a duplicate number
                return false;
            }
        }
        // a has unique numbers other than 0
        return true;
    }

    // method to check if the puzzle is solved
    this.check_win = function() {
        if (this.squares_left == 0) {
            return true;
        }
        return false;
    }

    // method to find the nonet given col and row
    // returns the an integer from 1-9
    this.nonet_at = function (row, col) {
        if (row < 3) {
            if (col < 3) {
                return 0;
            } else if (col < 6) {
                return 1;
            } else {
                return 2;
            }
        } else if (row < 6) {
            if (col < 3) {
                return 3;
            } else if (col < 6) {
                return 4;
            } else {
                return 5;
            }
        } else {
            if (col < 3) {
                return 6;
            } else if (col < 6) {
                return 7;
            } else {
                return 8;
            }
        }
    }

}


// selectionsort sorts len items in a in ascending order
// returns array of sorted numbers
function selectionsort (a, len) {
    for (var j = len - 1; j > 0; --j) {
        for (var i = 0; i < j; ++i) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
            }
        }
    }
    return a;
}


// HTML relating sections
var html = {
    get click_square (pos) {
        var row = Math.floor(pos / 9);
        var col = pos % 9;
        
    }
}
