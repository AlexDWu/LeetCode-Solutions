// Given a binary tree, flatten it to a linked list in-place.

// For example,
// Given

//          1
//         / \
//        2   5
//       / \   \
//      3   4   6
// The flattened tree should look like:
//    1
//     \
//      2
//       \
//        3
//         \
//          4
//           \
//            5
//             \
//              6
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  // I'm going to have flatten return the last node in a flattened tree
  // to help the recursive step
  if(root){
    var getFurthestRight = function(node){
      while (node.right !== null){
        node = node.right;
      }
      return node;
    }
    if(root.right === null && root.left === null){
      return;
    }
    else if(root.left === null){
      flatten(root.right);
    }
    else if(root.right === null){
      root.right = root.left;
      root.left = null
      flatten(root.right);
    }
    else {
      flatten(root.left)
      var oldRight = getFurthestRight(root.left).right = root.right;
      root.right = root.left;
      root.left = null;
      flatten(oldRight);
    }
  }
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
var root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right = new TreeNode(5);
root.right.right = new TreeNode(6);
flatten(root);

var count = 1;
while(root !== null){
  console.assert(root.val === count, "root value:" + root.val + ", expect: " + count);
  count++; 
  root = root.right;
}
