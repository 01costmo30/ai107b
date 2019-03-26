// 請用梯度下降法尋找 x^2 -2x + y^2 +2y - 8 的最低點
function f(p) {
  let x = p.x, y = p.y
  return x*x - 2*x + y*y + 2*y - 8
}

let quickf = {}

quickf.clone = function (p) {
  return {...p}
}

quickf.df = function (f, p, k) { // 各變數的偏微分
  h = 0.01
  p1 = quickf.clone(p)
  p1[k] += h
  return (f(p1) - f(p)) / h
}

quickf.grad = function (f, p) { // 把各變數的偏微分存成陣列
  let gv = {}
  for (let k in p) {
    gv[k] = quickf.df(f, p, k)
    // console.log(gv[k])
  }
  return gv
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
      v[k] += gv[k]*(-0.01)
    }
  }
  return v
}

console.log(gradientD(f, {x:1, y:1}))