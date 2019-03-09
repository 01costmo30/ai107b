// 首先尋找 函數 x^2 + 4x - 8 的最低點 ， 然後再用該副程式來
// 尋找 函數 x^4 - 10x^3 + 20x^2 + 5x + 7 的最低點
// 。4次方函數有2個（高/低）點，本次要找兩個低點

function q(x) {
  return -1*(x*x + 4*x - 8);
}

function f(x) {
  return -1*(x*x*x*x - 10*x*x*x + 20*x*x + 5*x + 7);
}

var dx = 0.01

function hillclimbing(f, x) {
  while (true) {
    // console.log(f, '(%s)=%s', x.toFixed(4), -1*f(x).toFixed(4))
    if (f(x+dx) >=f(x)) {
      x = x+dx
    }else if (f(x-dx)>=f(x)) {
      x = x-dx
    }else {
      max = -1*f(x).toFixed(4)
      return max
    }
  }
}

console.log('q(x)最低點：', hillclimbing(q, 0.0))

var ans = [];

while (true) {
  if (ans.length == 0) {
    e = hillclimbing(f, 0.0)
    ans.push(e)
  }else {
     e = hillclimbing(f, Math.random()*10)
  }
  if (e != ans[0]) {
    ans.push(e)
    console.log('f(x)最低點：', ans)
    break
  }
}

hillclimbing(f, 0.0)
