// 請用梯度下降法尋找 x^2 -2x + y^2 +2y - 8 的最低點

const quickf = require('./quickf')

function f(p) {
  let x = p.x, y = p.y
  return x * x - 2 * x + y * y + 2 * y - 8
}

function gradientD(f, p) {
  let v = quickf.clone(p)
  while (true) {
    //for (i=0;i<1;i++) {
    // console.log(f(v))
    let gv = quickf.grad(f, v)
    let norm = 0
    for (let k in gv) {
      norm += gv[k] * gv[k]
    }
    //console.log('f(p)=', f(p).toFixed(7), 'norm=', norm.toFixed(7))
    if (norm < 0.00001) {
      break
    }
    for (let k in gv) {
      v[k] += gv[k] * (-0.01)
    }
  }
  return v
}

console.log(gradientD(f, { x: 1, y: 1 }))