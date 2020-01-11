// This is a sudoku solving modeule.
// currently, I will not be using an elegant solution

// let's start with a board object contructor that creates a blank board

// for this sudoku, 1-9 are the numbers in the squares and 0 indicates a blank


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

    // this board keeps track of all the possible numbers that could be at that point
    this.note_board = [];

    this.note_board_create = function () {
        for (var i = 0; i < 81; ++i) {
            this.note_board[i] = [];
            for (var j = 0; j < 9; ++j) {
                this.note_board[i][j] = true;
            }
        }
    }


    // method to add num from row, col, and nonet to the internal array of note numbers
    this.add_note_number = function (num, row, col) {
        for (var i = 0; i < 9; ++i) {
            this.note_board[row * 9 + i][num - 1] = false; // add num to row
            this.note_board[i * 9 + col][num - 1] = false; // add num to col
        }
        var nonet = this.nonet_at(row, col);
        var start = nonet % 3 * 3 + (9 * 3 * Math.floor(nonet / 3));
        for (var i = 0; i < 3; ++i) {
            for (var j = start + i * 9; j < start + i * 9 + 3; ++j) {
                this.note_board[j][num - 1] = false;
            }
        }
    }



    // method to remove num from row, col, and nonet of the internal array of note numbers
    this.remove_note_number = function (num, row, col) {
        for (var i = 0; i < 9; ++i) {
            this.note_board[row * 9 + col][i] = true;
            this.note_board[row * 9 + i][num - 1] = true; // remove num from row
            this.note_board[i * 9 + col][num - 1] = true; // remove num from col
        }
        var nonet = this.nonet_at(row, col);
        var start = nonet % 3 * 3 + (9 * 3 * Math.floor(nonet / 3));
        for (var i = 0; i < 3; ++i) {
            for (var j = start + i * 9; j < start + i * 9 + 3; ++j) {
                this.note_board[j][num - 1] = true;
            }
        }
    }

    // waiting for a number to be pressed when trying to add a number to the grid
    this.waiting_for_num = false;

    this.state = 1;
    // 0 is adding starting numbers
    // 1 is adding regular numbers
    // 2 is adding note numbers

    this.pressed_num;

    this.pressed_pos = 0;

    this.pressed_row;

    this.pressed_col;

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
                document.getElementById(new_board.pressed_pos).childNodes[0].nodeValue = new_board.pressed_num;
                document.getElementById(new_board.pressed_pos).style.backgroundColor = "ccd1d1";
                document.getElementById(new_board.pressed_pos).style.zIndex = 1;
                for (var i = 1; i < 10  ; ++i) {
                    document.getElementById(new_board.pressed_pos + "-" + i).style.zIndex = -1;
                    document.getElementById(new_board.pressed_pos + "-" + i).innerHTML = "";
                }
                --this.squares_left;
                this.note_board[pos][num-1] = false;
                return true;
            }
            this.given_board[pos] = 0; // invalid number
        } else {
            var temp = this.given_board[pos];
            this.given_board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                document.getElementById(new_board.pressed_pos).childNodes[0].nodeValue = new_board.pressed_num;
                document.getElementById(new_board.pressed_pos).style.backgroundColor = "ccd1d1";
                document.getElementById(new_board.pressed_pos).style.zIndex = 1;
                for (var i = 1; i < 10; ++i) {
                    document.getElementById(new_board.pressed_pos + "-" + i).style.zIndex = -1;
                    document.getElementById(new_board.pressed_pos + "-" + i).innerHTML = "";
                }
                this.note_board[pos][temp-1] = true;
                this.note_board[pos][num-1] = false;
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
        document.getElementById(new_board.pressed_pos).childNodes[0].nodeValue = " ";
        document.getElementById(new_board.pressed_pos).style.backgroundColor = "white";
        return true;
    }   

    // method to add a num at the pos of col and row to cuurent_board
    // num is between 1-9
    // row, col is between 0-8
    // returns true if a number has been added or replaced, false if there was a starting number there
    this.add_number = function (num, row, col) {
        this.pressed_num = num;
        var pos = col + row * 9;
        this.pressed_pos = pos;
        var nonet = this.nonet_at(row, col);
        if (this.board[pos] == 0) {
            this.board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                --this.squares_left;
                document.getElementById(pos).childNodes[0].nodeValue = num;
                document.getElementById(pos).style.zIndex = 1;
                for (var i = 1; i < 10; ++i) {
                    document.getElementById(pos + "-" + i).style.zIndex = -1;
                    document.getElementById(pos + "-" + i).innerHTML = "";
                }
                if (this.squares_left == 0) {
                    for (var i = 0; i < 9; ++i) {
                        if (!this.check_row(i) || !this.check_column(i) || !this.check_nonet(i)) {
                            console.log("Your sudoku was not correct");
                            return;
                        }
                    }
                    console.log("You have done good");
                }
                this.add_note_number(num, row, col);
                return true;
            }
            
            this.board[pos] = 0; // invalid number
        } else if (this.given_board[pos] == 0) { //replace an added number
            var temp = this.board[pos];
            this.board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                document.getElementById(pos).childNodes[0].nodeValue = num;
                this.add_note_number(num, row, col);
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
        var num = this.board[pos];
        if (this.board[pos] == 0 || this.given_board[pos] != 0) {
            return false;
        }
        this.board[pos] = 0;
        ++this.squares_left;
        document.getElementById(new_board.pressed_pos).childNodes[0].nodeValue = " ";
        this.remove_note_number(num, row, col);
        return true;
    }

    // method to add notes in the cells
    this.add_note = function (row, col) {
        
    }

    // this was test to see just how bad a brute force algorithm would be.
    // there seems to be an issue once the algorithm runs to 15 added numbers, after that, there is a huge issue with the back tracking.
    // therefore a better ai is to be used.
    this.solve_hard_code = function () {
        this.state = 1;
        var starting = [];
        var prev = [];
        //creates the board of initial numbers
        for (var i = 0; i < 81; ++i) {
            if (this.board[i] == 0) {
                starting[i] = false;
            } else {
                starting[i] = true;
            }
            prev[i] = 0;
        }

        var backtracking = false;
        var pos = 0;
        var row = 0;
        var col = 0;
        var moves = 0;

        while (moves < 100) {
            if (pos < 0) {
                alert("Unsolvable");
                break;
            }
            ++moves;
            col = pos % 9;
            row = Math.floor(pos / 9);
            //console.log(backtracking);
            if (backtracking) {
                if (this.given_board[pos] != 0) {
                    --pos;
                } else {
                    ++prev[pos];
                    if (prev[pos] < 9) {
                        while(prev[pos] < 9) {
                            if (this.note_board[pos][prev[pos]]) {
                                backtracking = false;
                                this.add_number(prev[pos]+1, row, col);
                                ++pos;
                                break;
                            }
                            ++prev[pos];
                        }
                    } else {
                        this.remove_number(row, col);
                        prev[pos] = 0;
                        --pos;
                    }
                }
            } else {
                //don't do anything if there was a starting position number there
                if (this.given_board[pos] != 0) {
                    ++pos;
                } else {
                    //move to the previous numbers
                    if (prev[pos] < 9) {
                        if (prev[pos] == 0) {
                            ++prev[pos];
                        }
                        while(prev[pos] < 9) {
                            if (this.note_board[pos][prev[pos]]) {
                                this.add_number(prev[pos]+1, row, col);
                                ++pos;
                                break;
                            }
                            ++prev[pos];
                        }
                    } else {
                        backtracking = true;
                        --pos;
                    }
                }
            }
        }
    }




    /* method to solve board using methods laidout by this website: https://www.learn-sudoku.com/pencil-marks.html
    this algorithm assumes that there are any number of numbers on the board
    this algorithm will try to solve using the following steps:
        1. look for any single notes that exist on the board.
            a. if there are single numbers, add that number in and update the rest of the board (row, col, nonet)
            b. if there are no single numbers, move to the next step
            c. if a number was added, do the whole process again, this should loop over the whole 81x9 array again to find any single numbers
        2. look for any hidden singles on each row, col, and nonet
            a. repeat the process if there was a hidden single, else, move to the next step
    */
    // for this ai, I will only be using the beginner's method.  In the future, the advanced method might be used, but for now, it is just a working concept
    this.solve_board_ai = function () {
        this.state = 1;
        var pos = 0; // position on the baord
        var num = 1; // number that we are focussing on
        var changed = true;
        var notesLeftBoard = [
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
        while (changed) {
            changed = false;

            /**********************************    NAKED SINGLES    *******************************************/

            for (var i = 0; i < 81; ++i) {
                var numNotes = 0;
                var single = 0;
                var row = Math.floor(i / 9);
                var col = i % 9;
                //check for singles
                for (var j = 0; j < 9; ++j) {
                    if (this.note_board[i][j] != 0) {
                        ++numNotes;
                        single = j+1;
                    }
                }
                notesLeftBoard[i] = numNotes;

                //only work on singles
                if (numNotes == 1 && this.board[i] == 0) {
                    this.add_number(single, row, col);
                    i = -1; //to keep looking for singles until 
                    changed = true;
                }
            }

            /**********************************    HIDDEN SINGLES    *******************************************/

            //for rows
            for (var i = 0; i < 9; ++i) {
                var occurance = [0, 0, 0, 0, 0, 0, 0, 0, 0] // number of occurances on the board for the number, for a number n (from 1-9), the index is n-1 (0-8)
                for (var j = 0; j < 9; ++j) {
                    for (var k = 0; k < 9; ++k) {
                        if (this.note_board[i*9+j][k] && this.board[i*9+j] == 0) {
                            ++occurance[k];
                        } 
                    }
                }
                console.log(occurance);
                //check for singles
                for (var j = 0; j < 9; ++j) {
                    if (occurance[j] == 1) {
                        for (var k = 0; k < 9; ++k) {
                            if (this.note_board[i*9+k][j] && this.board[i*9+k] == 0) {
                                this.add_number(j+1, i, k);
                                changed = true;
                            }
                        }
                    } else if (occurance[j] == 2) {

                    }
                }
            }

            //for columns
            for (var i = 0; i < 9; ++i) {
                var occurance = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var j = 0; j < 9; ++j) {
                    for (var k = 0; k < 9; ++k) {
                        if (this.note_board[j*9+i][k] && this.board[j*9+i] == 0) {
                            ++occurance[k];
                        } 
                    }
                }
                console.log(occurance);
                //check for singles
                for (var j = 0; j < 9; ++j) {
                    if (occurance[j] == 1) {
                        for (var k = 0; k < 9; ++k) {
                            if (this.note_board[k*9+i][j] && this.board[k*9+i] == 0) {
                                this.add_number(j+1, k, i);
                                changed = true;
                            }
                        }
                    }
                }
            }

            /**********************************    NAKED MULTIPLES    *******************************************/

            /*var firstNote;
            for (var i = 0; i < 9; ++i) {
                for (var j = 0; j < 9; ++j) {
                    if (notesLeft(this.note_board[i*9+j]) == 2) {
                        firstNote = this.note_board[i*9+j]//array of 9 true/false for valid numbers 
                        for (var k = j + 1; k < 9; ++k) {
                            if (arrayEqual(firstNote, this.note_board[i*9+k])) {
                                // i == row that contains double
                                // j == column where first occurance
                                // k == column where second occurance
                                //remove instances from rest of row and nonet(potentially)
                                
                                for (var a = 0; a < 9; ++a) {
                                    if ((a != j) && (a != k)) {
                                        for (var b = 0; b < 9; ++b) {
                                            if (firstNote[b]) {
                                                this.note_board[i*9+a][b] = false;
                                                changed = true;
                                            }
                                        }
                                    }
                                }

                                //clear nonet
                                if (this.nonet_at(i, j) == this.nonet_at(i, k)) {
                                    var nonetPos = nonetStarting(this.nonet_at(i, j));
                                    for (var a = 0; a < 3; ++a) {
                                        for (var b = 0; b < 3; ++b) {
                                            console.log(nonetPos + a*9 + b + ", " + (i*9+k));
                                            if ((nonetPos + a*9 + b != i*9+j) && (nonetPos + a*9 + b != i*9+k)) {
                                                for (var c = 0; c < 9; ++c) {
                                                    if (firstNote[c]) {
                                                        this.note_board[nonetPos + a*9+b][c] = false;
                                                        changed = true;
                                                    }   
                                                }
                                            }
                                        }
                                    }
                                }
                                alert();
                                break;
                            }
                        } 
                        break;
                    }
                }
            }*/
//comment
        }
        console.log(notesLeftBoard);
    }



    // method to determine if the given_board is a solvable puzzle
    this.check_solveable = function (row, col, nonet) {

    }

    // method to check the items in a row of an array to see if they are valid
    // returns true if the row is valid and all the numbers from 1-9 appear at most once
    this.check_row = function (row) {
        var a = [];
        if (this.state == 0) {
            for (var i = 0; i < 9; ++i) {
                a[i] = this.given_board[row * 9 + i];
            }
        } else if (this.state == 1) {
            for (var i = 0; i < 9; ++i) {
                a[i] = this.board[row * 9 + i];
            }
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
        if (this.state == 0) {
            for (var i = 0; i < 9; ++i) {
                a[i] = this.given_board[i * 9 + col];
            }
        } else if (this.state == 1) {
            for (var i = 0; i < 9; ++i) {
                a[i] = this.board[i * 9 + col];
            }
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
        if (this.state == 0) {
            for (var i = 0, k = 0; i < 3; ++i) {
                for (var j = start + i * 9; j < start + i * 9 + 3; ++j, ++k) {
                    a[i * 3 + k] = this.given_board[j];
                }
                k = 0;
            }
        } else if (this.state == 1) {
            for (var i = 0, k = 0; i < 3; ++i) {
                for (var j = start + i * 9; j < start + i * 9 + 3; ++j, ++k) {
                    a[i * 3 + k] = this.board[j];
                }
                k = 0;
            }
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

    /*this.update_squares_left () {
        this.squares_left = 81;
         for (var i = 0; i < 81; ++1) {
            if (this.board[i] != 0) {
                --this.squares_left;
            }
        }
    }*/

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

    // method that addes the sides to the gird in the html
    this.add_sides = function () {
        for (var i = 0; i < 81; ++i) {
            if (i % 3 == 0) {
                document.getElementById(i).style.borderLeft = "2px solid black";
            }
            if (i % 3 == 2) {
                document.getElementById(i).style.borderRight = "2px solid black";
            }
            if (Math.floor(i / 9) % 3 == 0) {
                document.getElementById(i).style.borderTop = "2px solid black";
            }
            if (Math.floor(i / 9) % 3 == 2) {
                document.getElementById(i).style.borderBottom = "2px solid black";
            }
        }
    }

    // method to add notes for the numbers that would be there;
}

function notesLeft (a) {
    var retVal = 0;
    for (var i = 0; i < 9; ++i) {
        if (a[i] != 0) {
            ++retVal;
        } 
    }
    return retVal;
}


function arrayEqual (a, b) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

function nonetStarting (nonet) {
    switch (nonet) {
        case 0:
            return 0;
        case 1:
            return 3;
        case 2:
            return 6;
        case 3:
            return 27;
        case 4:
            return 30;
        case 5:
            return 33;
        case 6:
            return 54;
        case 7:
            return 57;
        case 8:
            return 60;
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

    
var new_board = new board();
new_board.add_sides();
new_board.note_board_create();
document.getElementById("add_reg").style.backgroundColor = "#ecab44";

// function to add note taking numbers into each cell
$(document).ready (function () {
    for (var i = 0; i < 81; ++i) {
        for (var j = 1; j < 10; ++j) {
            var new_id = i + "-" + j;
            $("<div></div>").attr("id", new_id).addClass("smallsquare").appendTo("#" + i);
        }
    }
});

// function that detects if there is a key press
document.addEventListener("keydown", function(event) {
    if (new_board.waiting_for_num) {
        if (new_board.state == 0) { // add starting numbers
            if (event.keyCode >= 49 && event.keyCode <= 57) {
                new_board.pressed_num = event.keyCode - 48;
                if (new_board.add_starting_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode >= 97 && event.keyCode <= 105) { // numpad numbers
                new_board.pressed_num = event.keyCode - 96;
                if (new_board.add_starting_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode == 8 || event.keyCode == 48) { // if 0 or backspace is pressed
                new_board.pressed_num = 0;
                if (new_board.remove_starting_number(new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            }
        } else if (new_board.state == 1) { // adding regular numbers
            if (event.keyCode >= 49 && event.keyCode <= 57) {
                new_board.pressed_num = event.keyCode - 48;
                if (new_board.add_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode >= 97 && event.keyCode <= 105) {
                new_board.pressed_num = event.keyCode - 96;
                if (new_board.add_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode == 8 || event.keyCode == 48) {
                new_board.pressed_num = 0;
                if (new_board.remove_number(new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            }
        } else if (new_board.state == 3 && new_board.board[new_board.pressed_pos] == 0) { // adding notes
            if (event.keyCode >= 49 && event.keyCode <= 57) {
                new_board.pressed_num = event.keyCode - 48;
                document.getElementById(new_board.pressed_pos + "-" + new_board.pressed_num).innerHTML = new_board.pressed_num;
            } else if (event.keyCode >= 97 && event.keyCode <= 105) {
                new_board.pressed_num = event.keyCode - 96;
                document.getElementById(new_board.pressed_pos + "-" + new_board.pressed_num).innerHTML = new_board.pressed_num;
            } else if (event.keyCode == 8 || event.keyCode == 48) {
                new_board.pressed_num = 0;
                // nothing is here yet as I think about what to do to when 0 or backspace is pressed
            }
        } 
    }
});



// HTML relating sections
var html = {

    click_square: function (pos) {
        
        if (new_board.given_board[new_board.pressed_pos] == 0) {
            document.getElementById(new_board.pressed_pos).style.backgroundColor = "white";
        } else if (new_board.waiting_for_num) {
            document.getElementById(new_board.pressed_pos).style.backgroundColor = "ccd1d1";
        }
        new_board.pressed_pos = pos;
        new_board.pressed_row = Math.floor(pos / 9);
        new_board.pressed_col = pos % 9;
        new_board.waiting_for_num = true;
        document.getElementById(pos).style.backgroundColor = "#b2babb";
    },

    change_state: function (state) {
        if (state == 0) {
            if (confirm("Are you sure you want to erase all non-starting numbers?")) {
                document.getElementById("add_start").style.backgroundColor = "#ecab44";
                document.getElementById("add_reg").style.backgroundColor = "#ffc300";
                document.getElementById("add_note").style.backgroundColor = "#ffc300";
                new_board.state = 0;
                new_board.pressed_pos = 0;
                for (var i = 0; i < 9; ++i) {
                    for (var j = 0; j < 9; ++j) {
                        if (new_board.given_board[new_board.pressed_pos] == 0) {
                            new_board.remove_number(i, j);
                        }
                        ++new_board.pressed_pos;
                    }
                }
            }
            return;
        } else if (state == 1) { //change to adding manual numbers
            document.getElementById("add_reg").style.backgroundColor = "#ecab44";
            document.getElementById("add_start").style.backgroundColor = "#ffc300";
            document.getElementById("add_note").style.backgroundColor = "#ffc300";
            new_board.state = 1;
            new_board.board = new_board.given_board.slice();
        } else if (state == 2) { // reset the board
            if (confirm("Are you sure you want to reset the entire baord?")) {
                new_board.pressed_pos = 0;
                for (var i = 0; i < 9; ++i) {
                    for (var j = 0; j < 9; ++j) {
                        new_board.pressed_pos = i * 9 + j;
                        new_board.remove_starting_number (i, j);
                        new_board.remove_number(i, j);
                        document.getElementById(i * 9 + j).style.backgroundColor = "white";
                    }
                }
            }
        } else if (state == 3) {
            document.getElementById("add_note").style.backgroundColor = "#ecab44";
            document.getElementById("add_start").style.backgroundColor = "#ffc300";
            document.getElementById("add_reg").style.backgroundColor = "#ffc300";
            new_board.state = 3;
        }
    }

}

// make sure the way to check if all numbers have been placesd already is to check the array directly
