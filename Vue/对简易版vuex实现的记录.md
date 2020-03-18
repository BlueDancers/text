# 对简易版Vuex实现的记录

>来源: https://juejin.im/post/5e3771e4e51d4502671a444d

1. 注册vuex的服务，也就是执行install方法，在vue的全局生命周期里面，执行mixin方法，挂载到this.$mystore下面才可以，需要注意的是在每个页面下this.$store都必须引用同一个vuex实例



基本流程，对整个store进行初始化

state =》 挂载到vue，使其自带响应式 =》 读取state的时候返回vue挂载的data值

getters =>  遍历getters并在_getters里面挂载无参数方法（getters无参数），但是函数内部自动传入store.state =》将getters挂载到vue实例上， 并且对store.getters进行Object.defineProperty处理，get函数中读取complate，完成数据相应，变化数据触发defineProperty中的get事件

commit =》 遍历mutations函数，并留存一个参数，并且返回一个函数第一参数为store.state，第二参数为用户传的值，也就是留存的参数 =》 class 中暴露commit函数，接收commit的参数参数1位 为触发的commit 参数2 为传入到commit事件里面的参数，里面的参数改变了state的值，触发了响应式事件 =》 页面发生变化 =》 注意：this要强制指向当前store



diapatch =》遍历actions函数，并存留一个参数，并且返回一个参数，第一参数为对象，内部传入 { state,commit,dispatch,getttes}，第二参数为暴露出去的值