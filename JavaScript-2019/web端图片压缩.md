## web端上传图片压缩



```JavaScript
// file 为File类型文件
imgArchive(param.file).then(path => {
  // 可上传文件(已经压缩)
})
```



```JavaScript
/**
 * 图片压缩
 * @param {string} url
 */
export function imgArchive(url) {
  let multiple = 1;
  return new Promise((resolve, reject) => {
    var image = new window.Image();
    image.src = URL.createObjectURL(url);
    image.onload = () => {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      let newheight = 0;
      let newwidth = 0;
      // if (image.width < 1500) {
      //   newheight = image.height / 1;
      //   newwidth = image.width / 1;
      // } else {
      //   newheight = image.height / 1;
      //   newwidth = image.width / 1;
      // }
      newheight = image.height / multiple;
      newwidth = image.width / multiple;
      canvas.width = newwidth;
      canvas.height = newheight;
      context.drawImage(image, 0, 0, newwidth, newheight);
      const dataUrl = canvas.toDataURL("image/jpeg");
      var blob = dataURLtoBlob(dataUrl);
      const files = new window.File([blob], url.name, { type: url.type });
      resolve(files);
    };
    image.onerror = () => {
      reject("请上传图片");
    };
  });
}

/**
 * blob转File对象
 * @param {Blob} dataurl
 */
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
```

