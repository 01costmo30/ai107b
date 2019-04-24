let h = 0.0001

function df(f, x, n) {
  if (n==1) {
    // return 1
    //我寫的↑應該是↓
    return (f(x+h)-f(x)) / h
  }else {
    //let sdf = ((df(f,x,n-1)+h)-df(f,x,n-1)) / h
    //我寫的↑應該是↓
    return (df(f,x+h,n-1)-df(f,x,n-1)) / h
  }
  //結論：智商不足QAQ
}

function f(x) {
  return Math.exp(x)
}

console.log('df(f, 1, 5)=', df(f, 1, 2))


//function ddf(f, x, n) {
//  for (i=0;i<n;i++) {
    // 反而一般的不會寫OAO
//  }
//}