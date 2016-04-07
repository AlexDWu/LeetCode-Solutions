/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // given a list of directional edges in a graph
  // return false if there is a cycle.

  // turn prerequisits edge list into an adjacency list
  var adjacency = prerequisites.reduce(function(accum, edge){
    // edge[1] is prereq to edge[0]
    accum[edge[1]] = accum[edge[1]] || {};
    accum[edge[1]].edges = accum[edge[1]].edges || [];
    accum[edge[1]].edges.push(edge[0]);
    accum[edge[1]].visited = false;
    accum[edge[1]].inStack = false;
    return accum;
  }, {})
  console.log(adjacency);

  var hasCycle = function(node){
    if(!node.visited){
      // mark node as visited and in recursion stack
      node.visited = true;
      node.inStack = true;

      // if some key leads to a cycle
      if (node.edges.some(function(key) {
        var node = adjacency[key];
        if(node){ // if the node exists
          console.log('node exists', key);
          if ( !node.visited && hasCycle(node) ){
            console.log('going to return true');
            return true;
          }
          else if (node.inStack){
            console.log('going to return true');
            return true;
          }
        }
      })){
        return true
      }
    }
    node.inStack = false;
    return false;
  }
  return Object.keys(adjacency).every(function(key){
    return !hasCycle(adjacency[key]);
  })
};

console.log(canFinish(2, [[0,1],[1, 0]]));
