(function() {
  var Cell, GAP, MATCH, MISMATCH, SmithWaterman;

  GAP = -1;

  MISMATCH = -1;

  MATCH = 1;

  Cell = (function() {
    function Cell(i, j) {
      this.p1 = i;
      this.p2 = j;
      this.pointers = [];
      this.score = 0;
    }

    Cell.prototype.add = function(cell) {
      return this.pointers.push(cell);
    };

    return Cell;

  })();

  SmithWaterman = function(seq1, seq2, options) {
    var B1, B2, a1, a2, b1, b2, cell, dfs, gapscore, i, j, matchORMismatch, matchScore, matline, matrix, maxCell, maxCells, maxScore, mismatchScore, p1, p2, path, path1, path2, path3, paths, prevP1, prevP2, ret, score, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3;
    if (options == null) {
      options = {};
    }
    gapscore = options.gap || GAP;
    mismatchScore = options.mismatch || MISMATCH;
    matchScore = options.match || MATCH;
    matrix = [];
    for (i = _i = 0, _ref = seq1.length + 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      matrix[i] = [];
      for (j = _j = 0, _ref1 = seq2.length + 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
        matrix[i][j] = new Cell(i, j);
      }
    }
    maxCells = [matrix[0][0]];
    for (i = _k = 1, _ref2 = seq1.length + 1; 1 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
      B1 = seq1[i - 1];
      for (j = _l = 1, _ref3 = seq2.length + 1; 1 <= _ref3 ? _l < _ref3 : _l > _ref3; j = 1 <= _ref3 ? ++_l : --_l) {
        B2 = seq2[j - 1];
        matchORMismatch = B1 === B2 ? matchScore : mismatchScore;
        path1 = matrix[i - 1][j - 1].score + matchORMismatch;
        path2 = matrix[i][j - 1].score + gapscore;
        path3 = matrix[i - 1][j].score + gapscore;
        score = Math.max(0, path1, path2, path3);
        matrix[i][j].score = score;
        if (maxCells[0].score === score) {
          maxCells.push(matrix[i][j]);
        } else if (maxCells[0].score < score) {
          maxCells = [matrix[i][j]];
        }
        if (path1 === score) {
          matrix[i][j].add(matrix[i - 1][j - 1]);
        }
        if (path2 === score) {
          matrix[i][j].add(matrix[i][j - 1]);
        }
        if (path3 === score) {
          matrix[i][j].add(matrix[i - 1][j]);
        }
      }
    }
    maxScore = maxCells[0].score;
    if (options.score) {
      return maxScore;
    }
    paths = [];
    dfs = function(cell, path) {
      var child, _len, _m, _ref4, _results;
      if (!path) {
        path = [];
      }
      path.push(cell);
      if (cell.score === 0 || cell.pointers.length === 0) {
        paths.push(path.reverse());
        return;
      }
      _ref4 = cell.pointers;
      _results = [];
      for (_m = 0, _len = _ref4.length; _m < _len; _m++) {
        child = _ref4[_m];
        _results.push(dfs(child, path.slice()));
      }
      return _results;
    };
    for (_m = 0, _len = maxCells.length; _m < _len; _m++) {
      maxCell = maxCells[_m];
      dfs(maxCell);
    }
    ret = [];
    for (_n = 0, _len1 = paths.length; _n < _len1; _n++) {
      path = paths[_n];
      a1 = [];
      a2 = [];
      prevP1 = null;
      prevP2 = null;
      for (_o = 0, _len2 = path.length; _o < _len2; _o++) {
        cell = path[_o];
        p1 = cell.p1;
        p2 = cell.p2;
        if (p1 === 0 || p2 === 0) {
          continue;
        }
        b1 = prevP1 === p1 ? "-" : seq1[p1 - 1];
        b2 = prevP2 === p2 ? "-" : seq2[p2 - 1];
        a1.push(b1);
        a2.push(b2);
        prevP1 = p1;
        prevP2 = p2;
      }
      ret.push({
        s1: a1.join(""),
        s2: a2.join(""),
        score: maxScore
      });
    }
    for (i = _p = 0, _len3 = matrix.length; _p < _len3; i = ++_p) {
      matline = matrix[i];
      delete matrix[i];
    }
    return ret;
  };

  module.exports = SmithWaterman;

}).call(this);
