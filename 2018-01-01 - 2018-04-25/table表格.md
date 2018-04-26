#css表格

今天写某个平台的前端数据展示 主要使用表格展示 正好复习总结一下css的表格

>  首先说说thead、tbody、tfoot

```
<thead></thead>
<tbody></tbody>
<tfoot> </tfoot> 
无论前后顺序如何改变， <thead> 内的元素总是在表的最上面， <tfoot> 总在表的最下面
```

> 表结构

```javascript
<table>
   <caption>Book List</caption>
  //caption 标签必须紧随 table 标签之后。您只能对每个表格定义一个标题。通常这个标题会被居中于表格之上。
  <thead>
    <tr>
      <th></th>   //table head 定义表格内的表头单元格。此th元素内部的文本通常会呈现为粗体
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    	<td><td>   //table data cell 
    	<td><td>
    	<td><td>
    	<td><td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tfoot>
<table>
```

dome帮助理解

```javascript
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>table</title>
    <style type="text/css">
        table {
            background-color: #FFF;
            border: none;
            color: #565;
            font: 12px arial;
        }

        table caption {
            font-size: 24px;
            border-bottom: 2px solid #B3DE94;
            border-top: 2px solid #B3DE94;
        }

        table,
        td,
        th {
            margin: 0;
            padding: 0;
            vertical-align: middle;
            text-align: left;
        }

        tbody td,
        tbody th {
            background-color: #DFC;
            border-bottom: 2px solid #B3DE94;
            border-top: 3px solid #FFFFFF;
            padding: 9px;
        }


        tfoot td,
        tfoot th {
            font-weight: bold;
            padding: 4px 8px 6px 9px;
            text-align: center;
        }

        thead th {
            font-size: 14px;
            font-weight: bold;
            line-height: 19px;
            padding: 0 8px 2px;
            text-align: center;
        }

        tbody tr.odd th,
        tbody tr.odd td {
            /*odd就是偶数行*/
            background-color: #CEA;
            border-bottom: 2px solid #67BD2A;
        }
        tbody tr:hover td,
        tbody tr:hover th {
            /*tr也有hover样式*/
            background-color: #8b7;
            color: #fff;
        }
    </style>
</head>

<body>
    <table summary="book list">
        <caption>table</caption>
        <thead>
            <tr>
                <th>Title</th>
                <th>ID</th>
                <th>Country</th>
                <th>Price</th>
                <th>Download</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Tom</th>
                <td>1213456</td>
                <td>Germany</td>
                <td>$3.12</td>
                <td>Download</td>
            </tr>
            <tr class="odd">
                <th>Chance</th>
                <td>1213457</td>
                <td>Germany</td>
                <td>$123.34</td>
                <td>Download</td>
            </tr>
            <tr>
                <th>John</th>
                <td>1213458</td>
                <td>Germany</td>
                <td>$34.37</td>
                <td>Download</td>
            </tr>
            <tr class="odd">
                <th>oKathleen</th>
                <td>1213459</td>
                <td>Germany</td>
                <td>$23.67</td>
                <td>Download</td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="odd">
                <td>tfoot</td>
                <td>tfoot</td>
                <td>tfoot</td>
                <td>tfoot</td>
                <td>tfoot</td>
            </tr>
        </tfoot>
    </table>
</body>

</html>
</body>
</html>
```



![](http://on7r0tqgu.bkt.clouddn.com/FoHbud2rFoYam-7NvKPf5OBAR3EX.png)

