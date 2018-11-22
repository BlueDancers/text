# Vue项目的移动端适配

## rem

- 字体单位
  - 值根据html根元素大小决定,同样可以最为宽度,高度的单位
- 适配原理
  - 将px替换成rem,动态修改html的font-size的值
- 兼容性
  - IOS6与android 2.1以上,兼容性完美



## vw

vw: 1vw等于视口宽度的1%

vh: 1vh等于视口宽度的1%

vmin: 选取vw和vh中最小的那个

vmax:选取vw与vh中最大的那个

- 兼容性
  - IOS8以上 android 4.4以上