// 拼圖問題
// 要把打亂的圖形變成初始圖形(?)
// ---------
// | 0 1 2 |
// | 3 4 5 |
// | 6 7 x |
// ---------
// 參考gomoku.js

var Board = function (rMax, cMax) {
  this.B = []
  this.rMax = rMax
  this.cMax = cMax
  for (var r = 0; r < rMax; r++) {
    this.B[r] = []
    for (var c = 0; c < cMax; c++) {
      var x = c + rMax * r
      if (x != (rMax * cMax - 1)) {
        this.B[r][c] = x.toString(16)
      } else {
        this.B[r][c] = '*'
      }
    }
  }
}

Board.prototype.toString = function () {
  var str = '---------\n'
  for (var r = 0; r < this.rMax; r++) {
    str += "|" + ' ' + this.B[r].join(' ') + ' ' + "|" + '\n'
  }
  str += '---------\n'
  return str
}

Board.prototype.show = function () {
  console.log(this.toString())
}

var Direction = { s: 0.125, a: 0.375, w: 0.625, d: 0.875 }

var keyboard = function (d) { //按鍵參數
  return Direction[d]
}

var checkK = function () {

}

var checkposition = function (p) { //檢查[*]的位置
  for (var r = 0; r < p.rMax; r++) {
    for (var c = 0; c < p.cMax; c++) {
      if (p.B[r][c] == '*') {
        pos = [r, c]
        return pos
      }
    }
  }
}

var Move = function (board, Move) { // 移動參數
  p = checkposition(board)
  r = p[0]
  c = p[1]
  if (Move < 0.25) {
    console.log('down:* is at:(%s ,%s)', r, c)
    if ((r + 1) < board.rMax) {
      board.B[r][c] = board.B[r + 1][c]
      board.B[r + 1][c] = '*'
      return 0
    } else {
      throw 'Valid Move: can not move down!'
    }
  } else if (Move >= 0.25 && Move < 0.5) {
    console.log('left:* is at:(%s ,%s)', r, c)
    if ((c - 1) >= 0) {
      board.B[r][c] = board.B[r][c - 1]
      board.B[r][c - 1] = '*'
      return 0
    } else {
      throw 'Valid Move: can not move left!'
    }
  } else if (Move >= 0.5 && Move < 0.75) {
    console.log('up:* is at:(%s ,%s)', r, c)
    if ((r - 1) >= 0) {
      board.B[r][c] = board.B[r - 1][c]
      board.B[r - 1][c] = '*'
      return 0
    } else {
      throw 'Valid Move: can not move up!'
    }
  } else if (Move >= 0.75 && Move < 1) {
    console.log('right:* is at:(%s ,%s)', r, c)
    if ((c + 1) < board.cMax) {
      board.B[r][c] = board.B[r][c + 1]
      board.B[r][c + 1] = '*'
      return 0
    } else {
      throw 'Valid Move: can not move right!'
    }
  } else {
    throw 'Valid Move!'
  }
}



var start = function (n) {
  var p = new Board(n, n)
  console.log('origin puzzle:\n')
  p.show()
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
  console.log('here go the puzzle:\n')
  p.show()
  //console.log('* is at:(%s ,%s)', Pos[0], Pos[1])
  compute(p)
  /*  while (checkcomplete(p)) {
      var mv = checkmove(p, Pos[0], Pos[1], '')
      console.log('next movement is: %s', mv)
    }*/
}

var checknomatch = function (p) { // 找還沒歸位的點
  for (var r = 0; r < p.rMax; r++) {
    for (var c = 0; c < p.cMax; c++) {
      var x = c + r * p.rMax
      //console.log('check %s is %s?', p.B[r][c], x.toString(16))
      if (p.B[r][c] != x.toString(16)) {
        var nm = [r, c]
        return nm
      }
    }
  }
}

var checkmatch = function (p, r, c) { // 找數字在哪個點
  for (var row = 0; row < p.rMax; row++) {
    for (var cal = 0; cal < p.cMax; cal++) {
      var x = c + r * p.rMax
      if (p.B[row][cal] == x.toString(16)) {
        var m = [row, cal]
        return m
      }
    }
  }
}
var cmatch = function (p, r, c) {
  // console.log('cmatch(%d, %d)', r, c)
  var x = c + r * p.rMax
  if (p.B[r][c] == x) {
    return true
  } else {
    return false
  }
}

var checkrow = function(x) {
  var o = new Board(3, 3)
  for (var r=0;r<o.rMax;r++) {
    for (var c=0;c<o.cMax;c++) {
      var x1 = c + r*o.rMax
      if (x == x1) {
        return r
      }
    }
  }
}

var moveto = function (p, r1, c1, ism) {
  var vector = []
  var vnum = []
  t=0
  while((r!=r1||c!=c1) && t<5) {
    t++
    if (r==r1&&c==c1) {
      console.log('----- break -----')
      break
    }
    var pos = checkposition(p)
    var r = pos[0], c=pos[1]
    console.log('p(%s, %s)',r,c)
    // check 可走方向
    if (r == 0) { // 是頂層？
      if (c == 0) { // 左上？
        if (r !=r1) {
          if (checkrow(p.B[r+1][c]) != r1) {
            Move(p, keyboard('s'))
          }
        }else if (c != c1) {
          if (ism ||(!ism && checkrow(p.B[r+1][c]) != r1))
          Move(p, keyboard('d'))
        }
      }else if (c == (p.cMax-1)) { // 右上？
        if (r !=r1) {
          if (checkrow(p.B[r+1][c]) != r1) {
            Move(p, keyboard('s'))
          }
        }else if (c != c1) {
          Move(p, keyboard('a'))
        }
      }else {
        if (r !=r1) {
          if (checkrow(p.B[r+1][c]) != r1) {
            Move(p, keyboard('s'))
          }
        }else if (c > c1) {
          Move(p, keyboard('a'))
        }if (c < c1) {
          Move(p, keyboard('d'))
        }
      }
    }else if (r == (p.rMax-1)) { // 是底層？
      if (c == 0) { // 左下？
        if (r !=r1 && (checkrow(p.B[r-1][c]) != r1)) {
          Move(p, keyboard('w'))
        }else if (c != c1) {
          Move(p, keyboard('d'))
        }
      }else if (c == (p.cMax-1)) { // 右下？
        if (r !=r1) {
          //if (checkrow(p.B[r-1][c]) != r1) {
            Move(p, keyboard('w'))
          //}
        }else if (c != c1) {
          Move(p, keyboard('a'))
        }
      }else {
        if (r !=r1) {
          if (checkrow(p.B[r-1][c]) != r1) {
            Move(p, keyboard('w'))
          }
        }if (c > c1) {
          Move(p, keyboard('a'))
        }else if (c < c1) {
          Move(p, keyboard('d'))
        }
      }
    }else{
      if (c == 0) { // 左中？
        if (r > r1 && (ism||(!ism&&((r1>0&&checkrow(p.B[r-1][c]) != r1)||r1==0)))) {
          Move(p, keyboard('w'))
        }else if ((ism && r < r1)||(!ism&&checkrow(p.B[r+1][c]) != r1)) {
          Move(p, keyboard('s'))
        }if ((c != c1) && (ism||(!ism&&checkrow(p.B[r][c+1]) != r1))) {
          Move(p, keyboard('d'))
        }
      }else if (c == (p.cMax-1)) { // 右中？
        if (r > r1 && (ism||(!ism&&((r1>0&&checkrow(p.B[r-1][c]) != r1)||r1==0)))) {
          Move(p, keyboard('w'))
        }else if ((ism && r < r1)||(!ism&&checkrow(p.B[r+1][c]) != r1)) {
          Move(p, keyboard('s'))
        }if ((c != c1) && (ism||(!ism&&checkrow(p.B[r][c-1]) != r1))) {
          Move(p, keyboard('a'))
        }
      }else {
        if ((r > r1) && (ism||(!ism&&((r1>0&&checkrow(p.B[r-1][c]) != r1)||r1==0)))) {
          Move(p, keyboard('w'))
        }else if ((r < r1) && (ism||(!ism&&checkrow(p.B[r+1][c]) != r1))) {
          Move(p, keyboard('s'))
        }if ((c > c1)) {
          Move(p, keyboard('a'))
        }else if ((c < c1) && (ism||(!ism&&checkrow(p.B[r][c+1]) != r1))) {
          Move(p, keyboard('d'))
        }
      }
    }
  }
}

var checkmove = function (p, nm, m) { // 先移到數字沒歸位的位置，再移到沒歸位數字的位置
  console.log('move m(%d, %d) to nm(%d, %d)', m[0],m[1],nm[0],nm[1])
  if ((pos[0] - nm[0]) != 0 || nm[1]-pos[1] != 0) {
    console.log('moveto')
    moveto(p, nm[0], nm[1], false)
  }else {
    moveto(p, m[0], m[1], true)
  }
}
t1 = 0
var compute = function (p) { //
  if (checkcomplete(p) && t1<6) {
    t1+=1
    var nm = checknomatch(p) // 沒歸位的點
    var m = checkmatch(p, nm[0], nm[1]) //沒歸位數的位置
    //console.log('move m(%d, %d) to nm(%d, %d)', m[0],m[1],nm[0],nm[1])
    checkmove(p, nm, m)
    p.show()
    //console.log('* is at:(%s ,%s)', Pos[0], Pos[1])
    compute(p)
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

/*var checkmove = function (p, r, c, lm) {
  var on = c + r*p.rMax
  var n = 0
  var mv
  if ((r + 1) < p.rMax) {
    if (p.B[r + 1][c] >= n|| p.B[r +1][c]==on) {
      if (lm != undefined && lm != 'w') {
        n = parseInt(p.B[r + 1][c], 16)
        console.log('s')
        mv = 's'
      }
    }
  } if ((r - 1) >= 0) {
    if (p.B[r - 1][c] >= n || p.B[r - 1][c] == on) {
      if (lm != undefined && lm != 's') {
        n = parseInt(p.B[r - 1][c], 16)
        console.log('w')
        mv = 'w'
      }
    }
  } if ((c + 1) < p.cMax) {
    if (p.B[r][c + 1] >= n || p.B[r][c + 1] == on) {
      if (lm != undefined && lm != 'a') {
        n = parseInt(p.B[r][c + 1], 16)
        console.log('d')
        mv = 'd'
      }
    }
  } if ((c - 1) >= 0) {
    if (p.B[r][c - 1] >= n || p.B[r][c - 1] == on) {
      if (lm != undefined && lm != 'd') {
        n = parseInt(p.B[r][c - 1], 16)
        console.log('a')
        mv = 'a'
      }
    }
  }
  return mv
}*/

/*if (r == 0) {
    if (c < (p.cMax - 1) && c > 0) {
      if (p.B[r][c + 1] < p.B[r + 1][c] && cmatch(p, r, c, r+1, c)) {
        mV = p.B[r][c + 1]
        mv = 'd'
        if (cmatch(p, r, c, r, c+1)) {
          return mv
        }
      } else {
        mV = p.B[r + 1][c]
        mv = 's'
      }
      if (p.B[r][c - 1] < mV && !cmatch(p, r, c-1, r, c-1)) {
        mv = 'a'
      }
      return mv
    } else if (c == 0) {
      if (p.B[r][c + 1] < p.B[r + 1][c]) {
        mv = 'd'
      } else {
        mv = 's'
      }
      return mv
    } else if (c == (p.cMax - 1)) {
      if (p.B[r][c - 1] < p.B[r + 1][c] && !cmatch(p, r, c-1, r, c-1)) {
        mv = 'a'
      } else {
        mv = 's'
      }
      return mv
    }
  } else if (r > 0 && r < (p.rMax - 1)) {
    if (p.B[r + 1][c] > p.B[r - 1][c] && !cmatch(p, r+1, c, r+1, c)) {
      mV = p.B[r + 1][c]
      mv = 's'
    } else {
      mV = p.B[r - 1][c]
      mv = 'w'
    }
    if (c >= 0 && c < (p.cMax - 1)) {
      if (p.B[r][c - 1] > mV || cmatch(p, r, c, r, c-1)) {
        mV = p.B[r][c - 1]
        mv = 'a'
        if (cmatch(p, r, c, r, c-1)) {
          return mv
        }
      }
    } if (c > 0 && c < p.cMax) {
      if (p.B[r][c + 1] > mV || cmatch(p, r, c, r, c+1)) {
        mv = 'd'
      }
    }
    return mv
  } else {
    if (c < (p.cMax - 1) && c > 0) {
      if (p.B[r][c + 1] > p.B[r - 1][c] && !cmatch(p, r, c, r-1, c)) {
        mV = p.B[r][c + 1]
        mv = 'd'
      } else {
        mV = p.B[r - 1][c]
        mv = 'w'
      }
      if (p.B[r][c - 1] > mV) {
        mv = 'a'
      }
      return mv
    } else if (c == 0) {
      if (p.B[r][c + 1] > p.B[r - 1][c] && !cmatch(p, r, c, r-1, c)) {
        mv = 'd'
      } else {
        mv = 'w'
      }
      return mv
    } else if (c == (p.cMax - 1)) {
      if (p.B[r][c - 1] > p.B[r - 1][c] && !cmatch(p, r, c, r-1, c)) {
        mv = 'a'
      } else {
        mv = 'w'
      }
      return mv
    }
  }*/

  /*t = 0
  while ((r1 != 0 || c1 != 0)&&t<5) {
    t+=1
    console.log('mvector(%d, %d)',r1, c1)
    console.log('m(%d, %d)', m[0], m[1])
    if (r1 == 0 && c1 == 0) {
      if (x == 'nm') {
        var pos1 = checkposition(p)
        var r1 = pos1[0], c1 = pos1[1]
        moveto(p, r1, c1, nmtom.r, nmtom.c, 'm', m)
      }
      console.log('----- ', x, ' break -----')
      break
    }if (r1 != 0) {
      if (x=='m'){
        if (r < (p.rMax - 1)) {
          console.log('row:0-1')
          if (r1 < 0) {
            // if (!cmatch(p, r + 1, c)) {}
            r1 += 1
            Move(p, keyboard('s'))
            continue
          }
        } else if (r > 0) {
          console.log('row:1-2')
          if (r1 > 0) {
            if ((r-1)==0) {
              if ((!cmatch(p, r - 1, c))) {
                r1 -= 1
                Move(p, keyboard('w'))
                continue
              }
            }else {
              r1 -= 1
              Move(p, keyboard('w'))
              continue
            }
          }
        }
      }else {
        if (r < (p.rMax - 1)) {
          console.log('row:0-1')
          if (r1 < 0 ) {
            // && (((r + 1) != m[0]) && (c != m[1]))
            // if (!cmatch(p, r + 1, c)) {}
            r1 += 1
            Move(p, keyboard('s'))
            continue
          }
        } else if (r > 0) {
          console.log('row:1-2')
          if (r1 > 0 ) {
            // && (((r - 1) != m[0]) && (c != m[1]))
            if ((r-1)==0) {
              if ((!cmatch(p, r - 1, c))) {
                r1 -= 1
                Move(p, keyboard('w'))
                continue
              }
            }else {
              r1 -= 1
              Move(p, keyboard('w'))
              continue
            }
          }
        }
      }
      
    }if (c1 != 0) {
      if (x=='m') {
        if (c > 0) {
          console.log('c>0')
          if (c1 < 0) {
            //&& (!cmatch(p, r, c - 1))
            c1 += 1
            Move(p, keyboard('a'))
            continue
          }
        } else if (c < (p.cMax - 1)) {
          console.log('c<3')
          if (c1 > 0) {
            //&& (!cmatch(p, r, c + 1))
            c1 -= 1
            Move(p, keyboard('d'))
            continue
          }
        }
      }else {
        if (c > 0) {
          console.log('column:1-2')
          if (c1 < 0 ) {
            // && ((r != m[0]) && ((c - 1) != m[1]))
            //&& (!cmatch(p, r, c - 1))
            c1 += 1
            Move(p, keyboard('a'))
            continue
          }
        } else if (c < (p.cMax - 1)) {
          console.log('column:0-1')
          if (c1 > 0) {
            //  && ((r != m[0]) && ((c + 1) != m[1]))
            // && (!cmatch(p, r, c + 1))
            c1 -= 1
            Move(p, keyboard('d'))
            continue
          }
        }
      }
      
    }
  }*/

/*if (process.argv[2] == 'a') Move(p ,keyboard('a'))
else if (process.argv[2] == 'd') Move(p ,keyboard('d'))
else if (process.argv[2] == 's') Move(p ,keyboard('s'))
else if (process.argv[2] == 'w') Move(p ,keyboard('w'))
else {
  console.log('上：w 右：d\n下：s 左：a')
}
p.show()*/