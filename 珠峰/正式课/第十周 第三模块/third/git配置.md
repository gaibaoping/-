## ����ʹ���˵��˺ź�����
```
git config --global user.name zhufengzhufeng
git config --global user.email xxxxx
git config --list �鿴��������
```
## cd����
change directory
## clear����
mkdir ����Ŀ¼
## ��ʼ��git
```
git init
```
## ��ʼ���ļ�
```
echo hello > index.txt
```

> һ�����ںű�ʾ��ղ�д�� >> ��ʾ ׷��

## ɾ���ļ�rm

## �鿴״̬
```
git status
``` 
## ���ļ����뵽�ݴ�����
```
git add file
git add ./git add -A
```
## �ύcommit
```
git commit -m"first"
```
## vi����̨
�������༭ģʽ����i���������ģʽ

- i��ʾ�༭
- �˳�esc + :wq

## �鿴�汾����Ϣ
```
git log --oneline
```
## �Ƚϴ������
- �ȽϹ��������ݴ���������
```
    git diff
```
- �ȽϹ������Ͱ汾�������
```
    git diff master
```
- �Ƚ��ݴ����Ͱ汾�������
```
    git diff --cached
```
## ���ݴ���ɾ�����ص�add
```
git reset HEAD xxx
```
## �ӻ����������ʷ�������븲�ǵ�������
```
git checkout xxx
```
## �ص���ȥ
```
git reset --hard �汾��
�ص���һ���汾��git reset --hard HEAD^
�ϼ�����git reset --hard HEAD~��
```
## �鿴δ���İ汾
```
git reflog
```
## �鿴���з�֧
git branch
## ������֧
git branch xxx
## �л���֧
git checkout xxx
## �������л���֧
git checkout -b xxx
## ɾ����֧
git branch -d xxx
## �ϲ���֧
```
git merge ��֧
```
<<<<<<< HEAD
> ����������ȡһ����֧���ڷ�֧�Ͻ��п������������������Ͻ�������кϲ���������Ŀǰû���˿���������ʹ�ÿ�ת�ķ�ʽ�������ǵ�ָ��ֱ��ָ�򵽷�֧������װ̬ fast-forward

## ��github�ϲ���̬ҳ
��Ҫ���ض����������͵�github�ϵ�gh-pages��֧��

- ����һ��gh-pages�ķ�֧
```
git checkout -b gh-pages
```
- ������commit �������֧��
```
git add .
git commit -m 'ok'
```
- ����Զ�ֿ̲�ͱ��زֿ�
```
git remote add aaa ��ַ
```
- ���������͵�Զ�ֿ̲���
```
git push aaa gh-pages
```
=======
>>>>>>> d10e6424106f87137fc1cf6774bc822413a89f55
