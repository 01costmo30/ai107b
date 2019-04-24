// n!
function factorial(n) {
  if (n == 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}
// 看回呼結構
function showfactorial(n) {
  if (n == 1) {
    return 1
  }
  console.log("n=", n)
  let fn = n * showfactorial(n - 1)
  console.log('fn=', fn)
  return fn
}

var sum = 0;

function f(n) {
  for (i = 1; i <= n; i++) {
    if (i == 1) {
      sum = i;
    } else {
      sum = sum * i;
    }
  }
  console.log(sum);
}

console.log(showfactorial(5))
// console.log(factorial(5))
// f(5)