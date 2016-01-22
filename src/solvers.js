/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  
  var board = new Board({'n':n});
  var xStart = 0;
  var yStart = 0;
  for(var y = 0; y < n; y++) {
    for(var x = 0; x < n; x++) {
      board.togglePiece(y, x); //toggling at starting index
      if(board.hasAnyRooksConflicts()) {
        board.togglePiece(y, x);
      }
    }
  }
  var matrix = board.makeMatrix(board.attributes)
  var solution = matrix;
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var findSolution = function(yAxis) {
    if(yAxis === n) {
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++) {
      board.togglePiece(yAxis, i);
      if(!board.hasAnyRooksConflicts()) {
        findSolution(yAxis + 1);
      } 
      board.togglePiece(yAxis, i);
    }
  }

  findSolution(0);

  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  
  var board = new Board({n:n});
  var solution = board.makeMatrix(board.attributes);
  var findSolution = function(yAxis) {
    if(yAxis === n) {
      solution = _.map(board.makeMatrix(board.attributes), function(item) {
        return item.slice();
      });
      console.log('solution ', solution)
      return;
    }

    for(var i = 0; i < n; i++) {
      board.togglePiece(yAxis, i);
      if(!board.hasAnyQueensConflicts()) {
        findSolution(yAxis + 1);
      } 
      board.togglePiece(yAxis, i);
    }
  }

  findSolution(0);
 

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var findSolution = function(yAxis) {
    if(yAxis === n) {
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++) {
      board.togglePiece(yAxis, i);
      if(!board.hasAnyQueensConflicts()) {
        findSolution(yAxis + 1);
      } 
      board.togglePiece(yAxis, i);
    }
  }

  findSolution(0);

  

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
 

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };
