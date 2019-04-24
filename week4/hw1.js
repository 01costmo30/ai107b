// 請用反傳遞算法尋找 x^2 -2x + y^2 +2y - 8 的最低點
function f(p) {
  let x = p.x, y = p.y
  return x*x - 2*x + y*y + 2*y - 8
}
