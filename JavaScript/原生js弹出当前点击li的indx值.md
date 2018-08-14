# 原生js弹出当前点击li的indx值

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript">
		window.onload = function () {

			var list = document.getElementsByTagName('li');
			for (var i = 0; i < list.length; i++) {
				console.log(list[i]);
				list[i].onclick = (function (n) {
					return function () {
						alert(n+1);
					}
				})(i)
                //这些匿名函数不会立即执行，仅仅是被定义，只有在点击时才执行
			}
		}
	</script>
</head>
<body>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
	</ul>
</body>
</html>
```

使用let去实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
	</style>
	<script type="text/javascript">
		window.onload = function () {

			var list = document.getElementsByTagName('li');
			for (let i = 0; i < list.length; i++) {
				list[i].onclick = ()=> {
					alert(i)
					console.log(i);
				}
			}
		}
	</script>
</head>
<body>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
	</ul>
</body>

</html>
```

