let quickf = module.exports = {}

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