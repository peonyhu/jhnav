# jhnav
List a navigation of jinhui sites which were frequently used

## 项目依赖安装
npm install

## 运行项目前操作
```
export NODE_ENV=production //设置node的环境变量 并通过process.env.NODE_ENV来获取这个值

```

## 创建数据库 ##
mysql -h localhost -u root -p密码 回车
source path+nav.sql


## 修改项目中关于数据库的配置 ##

```
    vim ./config/db.js

```