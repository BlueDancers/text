# git撤销上一次提交

​	当我们提交到git提交错了东西怎么办 ? :)

​		或许是代码提交错误了

​		或许是commit说明有问题

​		这时候就要撤销上一次的提交了



````bash
git reset --hard HEAD~1 // 撤销上一次提交
git push --force 覆盖远程主机提交
````



