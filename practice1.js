// f(n) = 2的n次方
function f(n) {
  if (n == 0) {
    return 1
  } else {
    return f(n - 1) * 2
  }
}
// 看回呼結構
function sf(n) {
  if (n == 0) {
    return 1
  }
  console.log('n=', n)
  let sf = f(n - 1) * 2
  console.log('sf=', sf)
  return sf
}

// console.log(f(3))
console.log(sf(5))