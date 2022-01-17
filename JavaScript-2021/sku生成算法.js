let arr = [
  [1, 2, 3],
  ['a', 'b', 'c'],
]
// arr 长度未知 子类数组长度未知

// 期待结果 1a,1b,1c,2a,2b,2c,3a,3b,3c
function handleCartesianProduct(array = []) {
  if (Object.prototype.toString.call(array) === '[object Array]' && array.length < 2) {
    // 只存在一个数组的情况下
    return [...array[0].map((el) => [el])]
  }
  // col 当前数据 row 迭代数据
  return array.reduce((col, row) => {
    const res = []
    col.forEach((c) => {
      row.forEach((r) => {
        const t = [].concat(Array.isArray(c) ? c : [c])
        t.push(r)
        res.push(t)
      })
    })
    return res
  })
}
let res = handleCartesianProduct(arr)
console.log(res)
