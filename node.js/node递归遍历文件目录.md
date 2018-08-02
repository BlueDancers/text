# node递归遍历文件目录

仅仅实现了遍历文件目录的功能,想把文件的层级分好,但是没有实现

```JavaScript
let fs = require('fs');
let path = require('path');
var filePath = path.resolve("G:/学习视频/MYSQL");
fileDisplay(filePath)

//var count = "|-";

function fileDisplay (filePath) {
  console.log("打印文件夹",filePath);
  //count = count + "-";
  fs.readdir(filePath, function (err, paths) {
    
    //console.log(count);
    if(!err){
      paths.forEach(Filedir => {
        var filedir = path.join(filePath, Filedir);
        fs.stat(filedir,(err,stats)=>{
          if(!err) {
            if(stats.isFile()){
              console.log("打印文件",filedir);
            };
            if(stats.isDirectory()){
              fileDisplay(filedir)
            };
          }
        })
      });
    }
  })
}

```

