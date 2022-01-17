# JS文件格式相互转换



### base64 转 File

```js
/**
 * base64转file文件
 * @param dataurl
 * @param filename
 * @returns
 */
 export function dataURLtoFile(dataurl: string, filename: string) {
  // 获取到base64编码
  const arr = dataurl.split(',')
  // 将base64编码转为字符串
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: 'image/jpeg',
  })
}
```



### base64 转 blob

````js
/**
 * base64转blob文件
 * @param dataURI
 * @returns
 */
export function dataURItoBlob(dataURI) {
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] // mime类型
  var byteString = atob(dataURI.split(',')[1]) //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}
````



### blob转url

```js
/**
 * blob 转 url
 * @param base64
 * @param contentType
 * @returns
 */
export function translateBase64ImgToBlob(base64, contentType) {
  var arr = base64.split(',') //去掉base64格式图片的头部
  var bstr = atob(arr[1]) //atob()方法将数据解码
  var leng = bstr.length
  var u8arr = new Uint8Array(leng)
  while (leng--) {
    u8arr[leng] = bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
  }
  var blob = new Blob([u8arr], { type: contentType })
  var blobImg: any = {}
  blobImg.url = URL.createObjectURL(blob) //创建URL
  blobImg.name = new Date().getTime() + '.png'
  return blobImg
}
```





