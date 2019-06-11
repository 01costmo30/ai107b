// 拼圖問題
// 要把打亂的圖形變成初始圖形(?)
// ---------
// | 0 1 2 |
// | 3 4 5 |
// | 6 7 x |
// ---------
// 參考 - gomoku.js
// 　　 - graphSearch.js
// 　　 - 聖偉的答案
// mermer:
//  很棒我寫的不是人工智慧是人工解題QQ
//  明明看了程式也改了好幾次但到最後寫出來還是完全往反方向走QQ
//  不是我在説但我覺得我真的沒有AI的慧根QQ

var util = require('util')

var printf = function() {
  return process.stdout.write(util.format.apply(null, arguments)); 
}

var Board = function (rMax, cMax) {
  this.B = []
  this.rMax = rMax
  this.cMax = cMax
  this.dir = '-'
  this.old_B = null
  for (var r = 0; r < rMax; r++) {
    this.B[r] = []
    for (var c = 0; c < cMax; c++) {
      var x = c + rMax * r
      if (x != (rMax * cMax - 1)) {
        this.B[r][c] = x.toString(16)
      } else {
        this.B[r][c] = '*'
        this.x = r
        this.y = c
      }
    }
  }
}

Board.prototype.toString = function (x) {
  var str = '---------\n'
  if (x == 'b') {
    for (var r = 0; r < this.rMax; r++) {
      str += "|" + ' ' + this.B[r].join(' ') + ' ' + "|" + '\n'
    }
    str += '---------'
    return str
  }else if (x == 'old') {
    for (var r = 0; r < this.rMax; r++) {
      str += "|" + ' ' + this.old_B[r].join(' ') + ' ' + "|" + '\n'
    }
    str += '---------'
    return str
  }
}

Board.prototype.show = function (x) {
  console.log(this.toString(x))
}

Board.prototype.clone = function () {
  return {...this}
}

var Direction = { s: 0.125, a: 0.375, w: 0.625, d: 0.875 }

var keyboard = function (d) { //按鍵參數
  return Direction[d]
}

var Move = function (board, Move) { // 移動參數
  r = board.r
  c = board.c
  if (Move < 0.25) {
    if ((r + 1) < board.rMax) {
      printf('↓:')
      board.B[r][c] = board.B[r + 1][c]
      board.B[r + 1][c] = '*'
      board.dir = 's'
      board.r += 1
      // return board
      // return '↓'
    } /*else {
      throw 'Valid Move: can not move down!'
    }*/
  } else if (Move >= 0.25 && Move < 0.5) {
    if ((c - 1) >= 0) {
      printf('←:')
      board.B[r][c] = board.B[r][c-1]
      board.B[r][c-1] = '*'
      board.dir = 'a'
      board.c -= 1
      // return board
      // return '←'
    }/* else {
      throw 'Valid Move: can not move left!'
    }*/
  } else if (Move >= 0.5 && Move < 0.75) {
    printf('↑:')
    if ((r - 1) >= 0) {
      board.B[r][c] = board.B[r - 1][c]
      board.B[r - 1][c] = '*'
      board.dir = 'w'
      board.r -= 1
      // return board
      // return '↑'
    }/* else {
      throw 'Valid Move: can not move up!'
    }*/
  } else if (Move >= 0.75 && Move < 1) {
    printf('→:')
    if ((c + 1) < board.cMax) {
      board.B[r][c] = board.B[r][c-1]
      board.B[r][c-1] = '*'
      board.dir = 'd'
      board.c += 1
      // return board
      // return '→'
    }/* else {
      throw 'Valid Move: can not move right!'
    }*/
  }/* else {
    throw 'Valid Move!'
  }*/
}

/*var checkposition = function (p) { //檢查[*]的位置
  for (var row = 0; row < p.rMax; row++) {
    for (var cal = 0; cal < p.cMax; cal++) {
      if (p.B[row][cal] == '*') {
        pos = { r: row, c: cal }
        return pos
      }
    }
  }
}*/
var correct_puz = [[0, 1, 2],
[3, 4, 5],
[6, 7, "*"]]


var standardmove = function (puz) {
  var old_puz = puz.clone()
  if (old_ouz.B.toString() == correct_puz.toString()) {
    old_puz.show('b')
    return old_puz.old_B
  }
  var x = old_puz.r, y = old_puz.c
  if (old_puz.dir != 'w') {
    var new_puz = old_puz.clone()
    if ((x-1)>=0) {
      p.Move(keyboard('w'))
      new_puz.old_B = old_puz.B
      puz = new_puz.clone()
    }
  }if (old_puz.dir != 'd') {
    var new_puz = old_puz.clone()
    if ((y+1)<puz.cMax) {
      p.Move(keyboard('d'))
      new_puz.old_B = old_puz.B
      puz = new_puz.clone()
    }
  }if (old_puz.dir != 's') {
    var new_puz = old_puz.clone()
    if ((x+1)<puz.rMax) {
      p.Move(keyboard('s'))
      new_puz.old_B = old_puz.B
      puz = new_puz.clone()
    }
  }if (old_puz.dir != 'a') {
    var new_puz = old_puz.clone()
    if ((y-1)>=0) {
      p.Move(keyboard('a'))
      new_puz.old_B = old_puz.B
      puz = new_puz.clone()
    }
  }
  var result = standardmove(puz)
  if (result != null) {
    if (result.toString() == old_puz.B.toString()) {
      result.show('old')
      return old_puz.old_B
    }else
    return result
  }
}

var start = function (n) {
  var p = new Board(n, n)
  console.log('origin puzzle:\n')
  //console.log(p)
  p.show('b')
  Move(p, 0.5)
  //console.log(p)
  /*while (!checkcomplete(p)) {
    for (var i = 0; i < (Math.pow(2, n) * n); i++) {
      while (1) {
        try {
          Move(p, Math.random())
        } catch (err) {
          continue
        } finally {
          break
        }
      }
    }
  }*/
  console.log('\nhere go the puzzle:\n')
  p.show('b')
  //standardmove(p)
  //compute(p)
}

var compute = function (p) {
  var t = 0
  while (checkcomplete(p) && t < 3) {
    var v = vector(p)
    if (!adjust(p, v)) {  // 是不是可以直接解決
      console.log("--------------------------------------------------")
      console.log("| GoodNews:No need to adjust before complete it! |")
      console.log("--------------------------------------------------")
      console.log("Moves:")
      regulerMove(p)
      printf("\n")
      p.show()
    } else {       // 先處理需要移動兩步以上的數字
      console.log("-------------------------------------------------")
      console.log("|  Warning: Need to adjust before complete it!  |")
      console.log("-------------------------------------------------")
      adjustMove(p)
      printf("\n")
      p.show()
    }
    t++
  }
}

var adjust = function (p, v) {  // return 是否在歸位前需要做位置調整
  for (var row = 0; row < p.rMax; row++) {
    for (var cal = 0; cal < p.cMax; cal++) {
      if (v[row][cal].length > 1) {
        return true
      }
    }
  }
  return false
}

var regulerMove = function (p) {
  var o = new Board(p.rMax, p.cMax)
  t = 0
  while (checkcomplete(p) && t < 10) {
    v = vector(p)
    var pos = checkposition(p)
    var r = pos.r
    var c = pos.c
    var w = [], s = [], a = [], d = []
    if ((r - 1) >= 0) {
      w = v[r-1][c]
    }
    if ((r + 1) < p.rMax) {
      s = v[r+1][c]
    }
    if ((c - 1) >= 0) {
      a = v[r][c-1]
    } if ((c + 1) < p.cMax) {
      d = v[r][c+1]
    }
    // console.log("pos(%d, %d):", r, c, w, s, a, d)
    if (w && w.length != 0 && w[0] == "w") {
      Move(p, keyboard('w'))
    } else if (s && s.length != 0 && s[0] == "s") {
      Move(p, keyboard('s'))
    } else if (a && a.length != 0 && a[0] == "a") {
      Move(p, keyboard('a'))
    } else if (d && d.length != 0 && d[0] == "d") {
      Move(p, keyboard('d'))
    }
    t++
  }
}

var adjustMove = function (p) {
  // var pb = p.clone()
  var pm = []
  var an = adjustment(p, pm)
  console.log(an)
  if (an.length==1) {
    vx = an.pop()
    var vectorx = []
    x = checkposition(p)
    row = x.r - vx[0]
    cal = x.c - vx[1]
    vectorx = vectoring (row, cal, x, vectorx)
    var t=0
    while (vectorx.length > 0 && t < 5 && !((checkposition(p).r - vx[0]) == 0 && (checkposition(p).c - vx[1]) == 0)) {
      console.log(vectorx)
      var sa = score(p)
      var v = vector(p)
      x = checkposition(p)
      for (var i=0;i<vectorx.length;i++) {
        if (vectorx[i] == "w" && (x.r-1)>=0) {
          for (var j=0;j<v[x.r-1][x.c].length;j++) {
            if (v[x.r-1][x.c][j] == "w") {
              vectorx.splice(i, 1)
              Move(p, keyboard('w'))
              break
            }
          }
        }else if (vectorx[i] == "s" && (x.r+1)<p.rMax) {
          for (var j=0;j<v[x.r+1][x.c].length;j++) {
            if (v[x.r+1][x.c][j] == "s") {
              vectorx.splice(i, 1)
              Move(p, keyboard('s'))
              break
            }
          }
        }else if (vectorx[i] == "a" && (x.c-1)>=0) {
          for (var j=0;j<v[x.r][x.c-1].length;j++) {
            if (v[x.r][x.c-1][j] == "a") {
              vectorx.splice(i, 1)
              Move(p, keyboard('a'))
              break
            }
          }
        }else if (vectorx[i] == "d" && (x.c+1)<p.cMax) {
          for (var j=0;j<v[x.r][x.c+1].length;j++) {
            if (v[x.r][x.c+1][j] == "d") {
              vectorx.splice(i, 1)
              Move(p, keyboard('d'))
              break
            }
          }
        }
      }if (vectorx.length == 1) {
        if (vectorx[0] == "a" || vectorx[0] == "d") {
          vectorx.push("w", "s")
        }else if (vectorx[0] == "w" || vectorx[0] == "s") {
          vectorx.push("a", "d")
        }
      }else if (vectorx.length > 1) {
        // console.log(sa)
        for (var i=0;i<vectorx.length;i++) {
          if (vectorx[i] == "w" && (x.r-1)>=0 && sa.score[x.r-1][x.c] == 10) {
            vectorx.splice(i, 1)
            Move(p, keyboard('w'))
          }else if (vectorx[i] == "s" && (x.r+1)<p.rMax && sa.score[x.r+1][x.c] == 10) {
            vectorx.splice(i, 1)
            Move(p, keyboard('s'))
          }else if (vectorx[i] == "a" && (x.c-1)>=0 && sa.score[x.r][x.c-1] == 10) {
            vectorx.splice(i, 1)
            Move(p, keyboard('a'))
          }else if (vectorx[i] == "d" && (x.c+1)<p.cMax && sa.score[x.r][x.c+1] == 10) {
            vectorx.splice(i, 1)
            Move(p, keyboard('d'))
          }
        }
      }var sa = score(p)
      console.log(sa.totals)
      t++
    }
  }
}

var adjustment = function(p, pm) {
  var v = vector(p)
  var anum = [] // 待處理數字位置
  for (var r = 0; r < p.rMax; r++) {
    for (var c = 0; c < p.cMax; c++) {
      if (v[r][c].length>1) {
        anum.push([r, c])
      }
    }
  }
  return anum
}

var score = function (p) {
  var sa = new scorearray(p)
  var v = vector(p)
  sa = vectorscore(p, v, sa)
  // sa = positionscore(p, sa)
  return sa
}

var vectorscore = function (p, v, sa) {
  for (var row = 0; row < p.rMax; row++) {
    for (var cal = 0; cal < p.cMax; cal++) {
      var xlength = v[row][cal].length
      if (xlength > 0) {
        // var x = cal + p.rMax * row
        // var xp = checkmatch(p, x)
        // console.log("%d: ", x, xp, xlength)
        for (var i = 0; i < xlength; i++) {
          sa.score[row][cal] -= (1 + (2 * i))
          sa.totals -= (1 + (2 * i))
        }
      }
    }
  }
  return sa
}

var positionscore = function (p, sa) {
  var pos = []
  for (var row = 0; row < p.rMax; row++) {
    pos[row] = []
    for (var cal = 0; cal < p.cMax; cal++) {
      var x = cal + p.rMax * row
      if (x == ((p.rMax * p.cMax) - 1)) {
        continue
      }
      pos[row][cal] = checkmatch(p, x).c
    }
    sa = pscoreing(p, pos, sa, row)
  }
  return sa
}

var pscoreing = function (p, pos, sa, r) {
  for (var c = 0; c < (p.cMax-1); c++) {
    for (var i = c; i < p.cMax;i++) {
      if (pos[r][c]>pos[r][i]) {
        var x = i + p.rMax * r
        if (x == ((p.rMax * p.cMax) - 1)) {
          continue
        }
        console.log("逆向：%d", x)
        var xp = checkmatch(p, x)
        sa.score[xp.r][xp.c] -= 10
      }
    }
  }
  return sa
}

var scorearray = function (p) {
  this.score = {}
  this.totals = 0
  for (var row = 0; row < p.rMax; row++) {
    this.score[row] = {}
    for (var cal = 0; cal < p.cMax; cal++) {
      if (p.B[row][cal] != "*") {
        this.score[row][cal] = 10
        this.totals += 10
      } else {
        this.score[row][cal] = "-"
      }
    }
  }
}

var vector = function (p) {
  vec = {}
  for (var i=0;i<p.cMax;i++) {
    vec[i] = {}
    for (var j=0;j<p.cMax;j++) {
      vec[i][j] = []
    }
  }// console.log(vec)
  for (var r = 0; r < p.rMax; r++) {
    for (var c = 0; c < p.cMax; c++) {
      var x = c + p.rMax * r
      if (x == ((p.rMax * p.cMax) - 1)) {
        break
      }
      var num = checkmatch(p, x)
      var row = r - num.r
      var cal = c - num.c
      vec[num.r][num.c] = vectoring(row, cal, num , vec[num.r][num.c])
    }
  }
  return vec
}

// return 
// ------------------
// | [X0] [X1] [X2] |
// | [X3] [X4] [X5] |
// | [X6] [X7] [X*] |
// ------------------
// Xn是對*走回原位所需的方向

var vectoring = function(row, cal, x1, vec) {
  // console.log("%d:(%d, %d)",x, row, cal, num)
  if (cal < 0) {
    while (cal != 0) {
      vec.push("d")
      cal++
    }
  } else if (cal > 0) {
    while (cal != 0) {
      vec.push("a")
      cal--
    }
  }
  if (row < 0) {
    while (row != 0) {
      vec.push("s")
      row++
    }
  } else if (row > 0) {
    while (row != 0) {
      vec.push("w")
      row--
    }
  }
  return vec
}

var checkmatch = function (p, x) { // 找數字在哪個點
  for (var row = 0; row < p.rMax; row++) {
    for (var cal = 0; cal < p.cMax; cal++) {
      if (p.B[row][cal] == x) {
        var m = { r: row, c: cal }
        return m
      }
    }
  }
}

var checkcomplete = function (puzzle) { // 是不是完成了
  for (var r = 0; r < puzzle.rMax; r++) {
    for (var c = 0; c < puzzle.cMax; c++) {
      var x = c + r * puzzle.rMax
      if (x != (puzzle.rMax * puzzle.cMax - 1)) {
        if (puzzle.B[r][c] != x.toString(16)) {
          return true
        }
      } else {
        return false
      }
    }
  }
}

start(3)