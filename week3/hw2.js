// 請用梯度下降法尋找 3x+2y=5, x+y=2 的聯立方程組解答

const quickf = require('./quickf')

function f(p) {
  let x = p.x, y = p.y
  return (3 * x + 2 * y - 5) * (3 * x + 2 * y - 5) + (x + y - 2) * (x + y - 2)
}

function gradientD(f, p) {
  let v = quickf.clone(p)
  while (true) {
    let gv = quickf.grad(f, p)
    let norm = 0
    for (let k in gv) {
      norm += gv[k] * gv[k]
    }
    if (norm < 0.00001) {
      break
    }
    for (let k in gv) {
      v[k] += gv[k] * (-0.01)
    }
    console.log('f(p)=', f(p).toFixed(7), 'v=', v)
  }
  return v
}

console.log(gradientD(f, { x: 10, y: 10 }))