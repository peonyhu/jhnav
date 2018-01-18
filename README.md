## Nodejs是什么？ ##
nodejs 是用C++实现的基于V8引擎的JavaScript的运行环境，可以让JavaScript脚本脱离浏览器在服务器端运行

[nodejs中文文档](http://nodejs.cn/)

[nodejs英文文档](https://nodejs.org/en/)


## Node.js特点 ##

1.  事件驱动
2.  非阻塞I/O

>   事件驱动编程主要思想是通过事件或状态的变化来进行应用程序的流程控制，一般通过事件监听完成，一旦事件被检测到，则调用相应的回调函数。事件驱动主要执行过程是当进来的一个新的请求的时候，请求将会被压入队列中，然后通过一个循环来检测队列中的事件状态变化，如果检测到有状态变化的事件，那么就执行该事件对应的处理代码，一般都是回调函数。

>   线程驱动是当收到一个请求的时候，将会为该请求开一个新的线程来处理请求。而线程主要是由线程池来管理的。当线程池中有空闲的线程，会从线程池中拿取线程来处理，如果线程池中没有空闲的线程，新来的请求将会进入队列排队，直到有请求执行完成释放线程


## Node.js可以用来做什么 ##

1.  Web服务器

    *   动态网页
    *   ajax
    *   WebSocket

2.  桌面应用 -基于Electron，node-webkit

    +   Atom
    +   VSCode

3.  命令行工具

    -  网络爬虫
    -  本地开发构建工具

## 项目概述 ##

1.  项目语言： node.js
1.  项目框架： express
1.  模板： ejs
1.  数据库： mysql
1.  ORM框架：Sequelize
1.  自动化构建工具： gulp

## 项目实现主要功能 ##

1.  登录、退出登录
2.  扫描二维码实现PC登录
3.  对导航的增、删、改、查
4.  读取官网公告

## 项目搭建流程 ##

1.  node环境
2.  node模块安装（package.json中）



## 项目目录结构 ##

### 目录 ###

```

├── config              // 配置文件
├── controller          // 控制器
├── views               // 视图文件
├── public              // css、js、image
├── node_modules        // 模块安装目录 
└── dist                // 静态文件输出目录，public、views中的文件构建后会输出到此目录

```

### 文件 ###

```

├── app.js              // 项目入口文件
├── routes.js           // 路由配置文件
├── gulpfile-config.js  // 构建目录配置文件
├── gulpfile.js         // 构建脚本  
├── package.json        
├── README.md   
└── gitignore

```
## 功能点拆分 ##

1.  登录、退出登录
>   cookie、数据查询
2.  扫描二维码实现PC登录
>   socket.io实现推送、数据写入、数据查询、cookie
3.  对导航的增、删、改、查
>   应用Sequelize框架实现数据的增、删、改、查
4.  读取官网公告
>   node做为中间服务器调用php接口

## 技术点拆分 ##

### 模块加载 ###

>   分析路径->查找文件->编译执行

>   Node的模块分为两类：核心模块和文件模块。

>   核心模块是Node提供的模块，核心模块已经被编译过，它在Node进程启动时就被加载到内存中，所以在引用核心模块时，不需要进行路径的分析和源文件的查找，并优先判断，使用核心模块的效率是很高的。

>   文件模块是用户自定义开发的模块，在引入用户自定义模块时，首先要根据require中传入的路径（可以是相对路径，也可以是绝对路径）进行解析，定位到模块源文件，并对源文件进行扩展名分析等操作后，对模块进行编译，再将模块放到缓存中，方便下次使用。由于Node在查找自定义模块路径是逐级向上递归查找的，所以文件路径越深，查找耗时会越多，所以在引入自定义模块时路径要尽量精确。

### 数据库操作 ###

>   [Sequelize 中文API文档](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md)

>   [Sequelize 英文API文档](http://docs.sequelizejs.com/)


## 项目地址 ##

[git@github.com:keepchasing/jhnav.git](git@github.com:keepchasing/jhnav.git)