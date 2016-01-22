// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    makeMatrix: function(boardObject){
      return _.reduce(this.attributes, function(accumulator, value){
        if (Array.isArray(value)){
          accumulator.push(value)
        }
        return accumulator
      },[])
    },

    hasRowConflictAt: function(rowIndex) {
      //if the count of not 0 in the array is greater than 1, then it has a conflict
      var counter = 0;
      _.each(this.get(rowIndex), function(item) {
        if(item !== 0) {
          counter++;
        }
      });
      return counter > 1 ? true: false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;
      var context = this;
      _.each(this.attributes, function(item, index){
        if(Array.isArray(item)){
          if(context.hasRowConflictAt(index)) {
            result = true;
          }
        }
      });
      
      return result; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var counter = 0;
      _.each(this.attributes, function(item) {
        if(item.constructor === Array) {
          if(item[colIndex] !== 0) {
            counter++;
          }
        }
      });
      return counter > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      var context = this;
      _.each(this.attributes, function(item, index){
        if(Array.isArray(item)){
          if(context.hasColConflictAt(index) === true){
            result = true;
          }
        }
      })
      return result; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var arrayHolder = [];
      var result = false;
      _.each(this.attributes, function(item) {
        if(item.constructor === Array) {
          arrayHolder.push(item);
        }
      });

      
      for (var a = 0; a < arrayHolder.length; a++){
        counter = 0
      for( var i = a, j = majorDiagonalColumnIndexAtFirstRow; i < arrayHolder.length; i++, j++ ){
        if (arrayHolder[i][j] === 1){
          counter++;
        }
      }
      if (counter > 1){
         result = true;
      }
    }
      // if (counter > 1){
      //   result = true;
      // }
      return result;

    },
    

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var startIndex;
      var result = false;
      var context = this;
      _.each(this.attributes, function(item) {
        if(item.constructor === Array) {
          _.each(item, function(array, index) {
            if(context.hasMajorDiagonalConflictAt(index)) {
              result = true;
            }
          }); 
        }
      });
      return result; 
    },   


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var arrayHolder = [];
      var result = false;
      _.each(this.attributes, function(item) {
        if(item.constructor === Array) {
          arrayHolder.push(item);
        }
      }); 
         for (var a = 0; a < arrayHolder.length; a++){
          counter = 0
          for(var i = a, j = minorDiagonalColumnIndexAtFirstRow; i < arrayHolder.length; i++, j--) {
            if(arrayHolder[i][j] === 1) {
              counter++;
            }
        
          }
          if (counter > 1){
         result = true;
      }
      }
      return result; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var startIndex;
      var result = false;
      var context = this;
      _.each(this.attributes, function(item) {
        if(item.constructor === Array) {
          _.each(item, function(array, index) {
            if(context.hasMinorDiagonalConflictAt(index)) {
              result = true;
            }
          }); 
        }
      });
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
