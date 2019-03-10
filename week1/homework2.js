// 請寫一個副程式尋找雙變數函數的最低點，尋找
// 函數 x^2 -2x + y^2 +2y - 8 的最低點

function f(x, y) {
  return -1 * (x*x - 2*x + y*y + 2*y - 8)
}

var dx = 0.01
var dy = 0.01

function hillclimbing(f, x, y) {
  while (true) {
    if (f(x+dx, y+dy) >= f(x, y)) {
      x += dx
      y += dy
    }else if (f(x-dx, y-dy) >= f(x, y)) {
      x -= dx
      y -= dy
    }else if (f(x+dx, y-dy) >= f(x, y)) {
      x += dx
      y -= dy
    }else if (f(x-dx, y+dy) >= f(x, y)) {
      x -= dx
      y += dy
    }else {
      max = -1*f(x, y).toFixed(4)
      console.log('x=%s , y=%y', x, y)
      return max
    }
  }
}

console.log('f(x)最低點：', hillclimbing(f, 0.0 , 0.0))
