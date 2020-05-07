## git常用命令

git add .**添加指定文件到暂存区**

git reset file  **撤销提交**

git status  **显示有变更的文件**

git commit -m "first commit" **提交暂存区到仓库区**

git push **提交到当前分支**

git pull **拉取当前分支最新代码**

git status **查看缓存的文件**

git branch **查看分支**

git branch dev **创建dev分支**

git checkout dev **切换到dev分支**

git merge dev **合并dev分支到当前分支**

git branch -d dev **删除本地dev分支**

git push origin --delete all-platforms **删除远程分支**

git log **显示当前分支的版本历史**

git reset --hard commitId **回到指定commit**

git checkout -b my-test  **在当前分支下创建my-test的本地分支分支**

git push origin name:name **把新建的本地分支push到远程服务器**



### 解决冲突

对于git pull之后提示有冲突的文件都会存在于缓存区中，需要打开文件进行冲突的手动合并，之后在进行提交（建议借助git可视化工具进行冲突解决）

建立里程碑

通过git工具的release来打版本号，建立版本数据



### 合并分支

合并分支使用merge

例如

我当前在master分支上，我希望合并test分支

```bash
git merge test
```

即可完成分支





其他更多命令请看 

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)











