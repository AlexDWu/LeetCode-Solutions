// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. 
// The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned 
// in the top-left room and must fight his way through the dungeon to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point 
// drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these 
// rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health 
// (positive integers).

// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward 
// in each step.


// Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

// For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the 
// optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

// -2 (K)  -3  3
// -5  -10 1
// 10  30  -5 (P)

// Notes:

// The knight's health has no upper bound.
// Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room 
// where the princess is imprisoned.

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    return 1 + (-1 * dungeon.map(function(row, row_index){
       return row.map(function(cell, col_index){
            if(row_index === 0 ){ // this is the first row
                if(col_index > 0){ // if this isn't the top left corner
                    // look to the left and add that value to this space's value
                    return cell + dungeon[row_index][col_index - 1];
                } else {
                    // don't do anything if row_index === 0 and col_index === 0
                    return cell;
                }
            } else {
                if(col_index > 0){ // this isn't the left-most column
                    //check if the the top or the left deals more damage
                    if(dungeon[row_index - 1][col_index] > dungeon[row_index][col_index - 1]){
                        return cell + dungeon[row_index - 1][col_index];
                    } else {
                        return cell + dungeon[row_index][col_index - 1];
                    }
                } else { // this is the left-most column
                    // only get things from above
                    return cell + dungeon[row_index - 1][col_index];
                }
            }
        })
    })[dungeon.length - 1][dungeon[0].length - 1]);
};

console.log(calculateMinimumHP([
    [-2, -3 , 3],
    [-5, -10, 1],
    [10, 30, -5]]));
