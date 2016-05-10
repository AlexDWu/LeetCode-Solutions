var _ = require('lodash');
// Given numRows, generate the first numRows of Pascal's triangle.

// For example, given numRows = 5,
// Return

var expected = [
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  var output = [];
  for(var i = 0; i < numRows; i++){
    if(i === 0){
      output.push([1]);
    }
    else {
      var row = [];
      for(var k = 0; k <= i; k++){
        if(k === 0){
          row.push(1);
        } else if (k === i){
          row.push(1);
        } else {
          row.push(output[i-1][k] + output[i-1][k-1]);
        }
      }
      output.push(row);
    }
  }
  return output 
};
console.log(generate(5));
console.assert(_.isEqual(generate(5), expected), "expect a correctly created triangle with 5 rows");
