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

    // waiting for a number to be pressed when trying to add a number to the grid
    this.waiting_for_num = false;

    this.state = 0;
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
                document.getElementById(new_board.pressed_pos).innerHTML = new_board.pressed_num;
                document.getElementById(new_board.pressed_pos).style.backgroundColor = "ccd1d1";
                --this.squares_left;
                return true;
            }
            this.given_board[pos] = 0; // invalid number
        } else {
            var temp = this.given_board[pos];
            this.given_board[pos] = num;
            if (this.check_row(row) && this.check_column(col) && this.check_nonet(nonet)) {
                document.getElementById(new_board.pressed_pos).innerHTML = new_board.pressed_num;
                document.getElementById(new_board.pressed_pos).style.backgroundColor = "ccd1d1";
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
        document.getElementById(new_board.pressed_pos).innerHTML = "";
        document.getElementById(new_board.pressed_pos).style.backgroundColor = "white";
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
                if (this.square_left == 0) {
                    for (var i = 0; i < 9; ++i) {
                        if (!this.check_row(i) || !this.check_col(i) || !this.check_nonet(i)) {
                            alert("Your sudoku was not correct");
                            return;
                        }
                    }
                    alert("You have done good");
                }
                document.getElementById(new_board.pressed_pos).innerHTML = new_board.pressed_num;
                return true;
            }
            this.board[pos] = 0; // invalid number
        } else if (this.given_board[pos] == 0) { //replace an added number
            var temp = this.board[pos];
            this.board[pos] = num;
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
        ++this.squares_left;
        document.getElementById(new_board.pressed_pos).innerHTML = "";
        return true;
    }

    // method to solve board using backtracking BRUTE FORCE
    this.solve_board_backtrack = function () {
        var pos = 0;
        var num = 1;
        while (1) {
            if (pos == 81) {
                return (alert("Solved!"));
            }
            
        }
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
        console.log(a);
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
document.getElementById("add_start").style.backgroundColor = "#ecab44";

// function to add note taking numbers into each cell
$(document).ready (function () {
    for (var i = 0; i < 81; ++i) {
        for (var j = 1; j < 10; ++j) {
            var new_id = String(i) + "-" + String(j);
            $("<div></div>").attr("id", new_id).addClass("smallsquare").appendTo("#" + i);
        }
    }
});

document.addEventListener("keydown", function(event) {
    if (new_board.waiting_for_num) {
        if (new_board.state == 0) {
            if (event.keyCode >= 49 && event.keyCode <= 57) {
                new_board.pressed_num = event.keyCode - 48;
                if (new_board.add_starting_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode >= 97 && event.keyCode <= 105) {
                new_board.pressed_num = event.keyCode - 96;
                if (new_board.add_starting_number(new_board.pressed_num, new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            } else if (event.keyCode == 8 || event.keyCode == 48) {
                new_board.pressed_num = 0;
                if (new_board.remove_starting_number(new_board.pressed_row, new_board.pressed_col)) {
                    new_board.waiting_for_num = false;
                }
            }
        } else if (new_board.state == 1) {
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
        } else if (new_board.state == 2) {
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
                for (var i = 0; i < 9; ++i) {
                    for (var j = 0; j < 9; ++j) {
                        if (new_board.given_board[i] == 0) {
                            new_board.remove_number(i, j);
                        }
                    }
                }
                new_board.board = new_board.given_board.slice();
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
                        document.getElementById(i * 9 + j).style.backgroundColor = "white";
                    }
                }
                new_board.board = new_board.given_board.slice();
            }
        } else if (state == 3) {
            document.getElementById("add_note").style.backgroundColor = "#ecab44";
            document.getElementById("add_start").style.backgroundColor = "#ffc300";
            document.getElementById("add_reg").style.backgroundColor = "#ffc300";
            new_board.state = 2;
        }
    }

}

// make sure the way to check if all numbers have been placesd already is to check the array directly
