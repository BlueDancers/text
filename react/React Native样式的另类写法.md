```
import {
  StyleSheet,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {
          height: 2,
          width: 2,
        },
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
});
```

以上代码有两个：

1. 通过 `Platform.select()` 这个骚写法可以很方便地做平台适配；
2. `elevation` 这个是安卓下的阴影实现