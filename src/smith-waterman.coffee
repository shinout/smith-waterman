GAP = -1
MISMATCH = -1
MATCH = 1

class Cell
  constructor: (i,j)->
    @p1 = i
    @p2 = j
    @pointers = []
    @score = 0

  add: (cell)->
    @pointers.push cell

SmithWaterman = (seq1, seq2, options={})->
  gapscore      = options.gap or GAP
  mismatchScore = options.mismatch or MISMATCH
  matchScore    = options.match or MATCH

  # initialization
  matrix = []
  for i in [0...seq1.length + 1]
    matrix[i] = []
    for j in [0...seq2.length + 1]
      matrix[i][j] = new Cell(i,j)

  # calculate scores
  maxCells = [matrix[0][0]]
  for i in [1...seq1.length + 1]
    B1 = seq1[i-1]
    for j in [1...seq2.length + 1]
      B2 = seq2[j-1]

      # mismatch or match
      matchORMismatch = if B1 is B2 then matchScore else mismatchScore
      path1 = matrix[i-1][j-1].score + matchORMismatch

      # gap
      path2 = matrix[i][j-1].score + gapscore
      path3 = matrix[i-1][j].score + gapscore

      score = Math.max(0, path1, path2, path3)
      matrix[i][j].score = score

      # set max cells
      if maxCells[0].score is score
        maxCells.push matrix[i][j]
      else if maxCells[0].score < score
        maxCells = [matrix[i][j]]

      # set pointers
      if path1 is score
        matrix[i][j].add matrix[i-1][j-1]
      if path2 is score
        matrix[i][j].add matrix[i][j-1]
      if path3 is score
        matrix[i][j].add matrix[i-1][j]

  maxScore = maxCells[0].score
  return maxScore if options.score

  # traceback
  # deep-first search
  paths = []
  dfs = (cell, path)->
    path = [] unless path
    path.push cell
    if cell.score is 0 or cell.pointers.length is 0
      paths.push path.reverse()
      return
    for child in cell.pointers
      dfs child, path.slice()

  dfs maxCell for maxCell in maxCells

  # parse paths
  ret = []
  for path in paths
    a1 = []
    a2 = []
    prevP1 = null
    prevP2 = null
    for cell in path
      p1 = cell.p1
      p2 = cell.p2
      continue if p1 is 0 or p2 is 0
      b1 = if prevP1 is p1 then "-" else seq1[p1-1]
      b2 = if prevP2 is p2 then "-" else seq2[p2-1]
      a1.push b1
      a2.push b2
      prevP1 = p1
      prevP2 = p2
    ret.push s1: a1.join(""), s2: a2.join(""), score: maxScore

  delete matrix[i] for matline,i in matrix
  return ret

module.exports = SmithWaterman
