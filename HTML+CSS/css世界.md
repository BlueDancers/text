# css世界

> 阅读 张鑫旭大神 的css世界一书的笔记



所有的盒子(display) 都分内在盒子与外在盒子,外在盒子负责元素是一行显示还是换行显示,内在盒子负责宽高,内容呈现什么的,所以内在容器也被称为**容器盒子**

于是

display:block;  外在盒子为block 容器盒子也为block 可以脑补为display:block-block

display:inline.; 外在盒子为inline,所以一行显示,内在盒子也为inline,所以也是一行显示,并且无法设置宽高

display: inline-block 外在盒子为inline 内在盒子为block 所以`inline-block`可以一行显示的同时也可以设置其大小长宽



鑫三无原则

无宽度(块级元素) 因为块级元素宽度是自适应的,假如设置的宽度,那么就会影响都margin padding 等等,会发生意料之外的情况











