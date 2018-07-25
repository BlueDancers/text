# js数组去重(优化写法)

```javascript
// 数组排重
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];    //获取迭代的数值
        if(!json[_self]){          //假如json在_self这个下标没有数值,就说明这个数据没有
            res.push(_self);       //没有的话就push
            json[_self] = 1;       //同时给这和匹配不到的下标一个值,保证下次进不来
        }                          // 这样写的话 不需要循环遍历 对性能要求更小
    }
    return res;
}
```

