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
  var requiredHPMap = [];
  for (var i = dungeon.length - 1; i >= 0; i--){
    var row = []
    for(var k = dungeon[0].length -1; k >= 0; k--){
      // look to this cells right and bottom and choose the cell that requires the lesser amount of HP
      var move;
      // this is the bottom right corner
      if(k >= dungeon[0].length - 1 && i >= dungeon.length - 1){
        move = 1;
      }
      // this is the right most cell
      else if(k >= dungeon[0].length - 1){
        // get the cell below
        move = requiredHPMap[i+1][k];
      }
      // this is the bottom row 
      else if ( i >= dungeon.length - 1){
        // get the cell to the right
        move = row[k+1]
      } else {
        move = Math.min(requiredHPMap[i+1][k], row[k+1]);
      }
      // add that to the amount of HP required to enter this cell.
      if(dungeon[i][k] >= move){
        row[k] = 1;
      } else {
        row[k] = move - dungeon[i][k];
      }
    }
    requiredHPMap[i] = row
  }
  console.log(requiredHPMap);
  return requiredHPMap[0][0];
};

console.assert(calculateMinimumHP([
  [-2, -3 , 3],
  [-5, -10, 1],
  [10, 30, -5]]) === 7, "Minimum HP of given map should be 7");
console.assert(calculateMinimumHP([
  [0,0,0],
  [0,0,0],
  [0,0,0]]) === 1, "Minimum HP of all empty map to be 1");
console.assert(calculateMinimumHP([
  [10,10,10],
  [10,10,10],
  [10,10,10]]) === 1, "Minimum HP of all positive map to be 1");
