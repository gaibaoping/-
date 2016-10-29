## 配置使用人的账号和邮箱
```
git config --global user.name zhufengzhufeng
git config --global user.email xxxxx
git config --list 查看所有配置
```
## cd命令
change directory
## clear清屏
mkdir 创建目录
## 初始化git
```
git init
```
## 初始化文件
```
echo hello > index.txt
```

> 一个大于号表示清空并写入 >> 表示 追加

## 删除文件rm

## 查看状态
```
git status
``` 
## 将文件加入到暂存区中
```
git add file
git add ./git add -A
```
## 提交commit
```
git commit -m"first"
```
## vi控制台
如果进入编辑模式可以i键进入插入模式

- i表示编辑
- 退出esc + :wq

## 查看版本库信息
```
git log --oneline
```
## 比较代码差异
- 比较工作区和暂存区的区别
```
    git diff
```
- 比较工作区和版本库的区别
```
    git diff master
```
- 比较暂存区和版本库的区别
```
    git diff --cached
```
## 从暂存区删除本地的add
```
git reset HEAD xxx
```
## 从缓存区或从历史区将代码覆盖掉工作区
```
git checkout xxx
```
## 回到过去
```
git reset --hard 版本号
回到上一个版本：git reset --hard HEAD^
上几个：git reset --hard HEAD~几
```
## 查看未来的版本
```
git reflog
```
## 查看所有分支
git branch
## 创建分支
git branch xxx
## 切换分支
git checkout xxx
## 创建并切换分支
git checkout -b xxx
## 删除分支
git branch -d xxx
## 合并分支
```
git merge 分支
```
<<<<<<< HEAD
> 在主干上拉取一条分支，在分支上进行开发，开发后，在主干上将代码进行合并，主干上目前没有人开发，可以使用快转的方式，将我们的指针直接指向到分支的最新装态 fast-forward

## 在github上部署静态页
需要将特定的内容推送到github上的gh-pages分支上

- 创建一个gh-pages的分支
```
git checkout -b gh-pages
```
- 将代码commit 到这个分支上
```
git add .
git commit -m 'ok'
```
- 连接远程仓库和本地仓库
```
git remote add aaa 地址
```
- 将代码推送到远程仓库上
```
git push aaa gh-pages
```
=======
>>>>>>> d10e6424106f87137fc1cf6774bc822413a89f55
