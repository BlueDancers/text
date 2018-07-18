# toString的基本实现

```java
private static String MytoString(int[] arr) {
		int Max = arr.length-1;
		if(Max == -1) {
			return "[]";	//数组长度为0就返回空[]			
		}
		StringBuilder b = new StringBuilder();
		b.append('[');					//添加数组头
		for (int i = 0; ; i++) {		//无限循环的方式在循环里面进行判断 这样不用每次都与arr.length进行比较 性能优秀 
			b.append(arr[i]);    		//循环添加元素    
			if(i == Max) {				//当循环到i 与 arr数组长度相同的时候 就return
				return 	b.append(']').toString();	//return的最后要加']'
			}
			b.append(',');		//获取到数值要加 ',' 作为分割
		}
		
	}
```

