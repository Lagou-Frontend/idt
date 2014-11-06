idt
===

Integration Develop Tool [ 集成开发工具 ]

### 安装

##### windows下，为了保持统一，请下载：
[git bash](http://msysgit.github.io/)

##### windows下，如果想解决`git bash`下的中文乱码问题，请看[这里](http://www.cnblogs.com/wangkongming/p/3821305.html)

#### 下面的步骤mac和windows一致

##### 请确保已经安装好[nodejs](http://nodejs.org/)

##### 请确保已经安装好 grunt-cli

`(sudo) npm install -g grunt-cli`

> 此步骤中，在windows下如果出现npm相关的错误，则可能是没有在`c:\Users\xxx\AppData\Roaming`下建立`npm`文件夹。

##### 进入合适的目录，执行(或者采用有界面版本的[github for windows](https://windows.github.com/))，检出项目：

`git clone https://github.com/Lagou-Frontend/idt.git`

##### 检出完毕之后，执行：

`cd idt`

`(sudo) ./install`

来安装依赖库，完毕后可以开始使用。

---

### 使用

服务器开始：

`(sudo) ./start`

服务器调试：

`(sudo) ./debug`

---

### 主要用到的命令：`./start`

当看到：

    Running "connect:baseServer" (connect) task
    WebServer Pid: 1481
    Running on port: 8000
    Waiting forever...
    Started connect web server on http://0.0.0.0:8000

这种输出，则启动成功。`./debug`的使用类似，不再赘述，它提供了调试的入口。

---

### mock数据

现在可以访问：`http://localhost:8000/`来进入`WebContent`目录，静态服务器的根目录指向这里。找到对应的`template`目录，打开指定要着手开发的模板（html），第一次打开，会出现：

    已经自动生成 velocity 对应的 mockdata 文件，请写入数据：）

的提示，再次刷新页面，就可以正常访问此页面，进入**idt**的`mock`目录，在`velocity/`子目录中即可看到与此模板（html）相对应的`xxx.html.js`的mock数据文件，在这里写入`velocity`的模板数据。

> `mock/velocity`子目录中，存在`common.js`，是基本每个页面都会用到的公用mock数据文件，在开发中，会自动与对应当前页面的mock数据文件进行合并。

> 同理，页面中`ajax`的请求数据，在`mock/ajax`子文件夹中进行，与模板数据的处理逻辑基本保持一致。
