快速搭建基于 es6+sass 的webpack基础配置，用于日常的demo测试。

# 开始使用

```bash
# 全局安装脚手架
npm i zws-demo-cli -g

# 创建项目
demo create my-project

# 初始化项目
cd my-project
npm install

# 运行项目
npm run dev

# 打包
npm run build
```

# 自定义脚手架

### 为啥需要自定义脚手架

如果不用脚手架的话，我们需要初始化模版的时候就要手动 ``git clone`` 该项目到指定目录，然后删除 ``.git`` 文件和 ``REANDME`` 文件，这个过程很重复冗余。脚手架就是为了解决重复的工作，提高开发效率，并且而已增加配置和模块的定制功能。

### 制作一个简单的脚手架

需要用到三个模块：

- commander: 创建脚手架命令和命令触发的执行过程
- git-clone: 克隆模版文件
- shelljs: 执行终端命令

主要思路：

1. 注册命令和命令执行回调，在回调中克隆模版项目到命令行中输入的工程目录中，然后删除``.git``和``REANDME``文件
2. 在 ``package.json`` 文件中利用bin注册命令，内容为入口文件
3. 通过 ``npm publish`` 发布包


实现代码：

```node

#!/usr/bin/env node

const clone = require('git-clone')
const commander = require('commander')
const shell = require('shelljs')
const log = require('tracer').colorConsole()

commander.version('1.0.1')

commander
  .command('create <project>')
  .description('create a new project with base config')
  .action(project => {
    if (project) {
      let pwd = shell.pwd()
      log.info(`正在拉取模版代码，下载到: ${pwd}/${project}/ ...`)
      clone('git@github.com:wozien/my-webpack-template.git', `${pwd}/${project}`, null, () => {
        shell.rm('-rf', `${pwd}/${project}/.git`)
        shell.rm(`${pwd}/${project}/README.md`)
        log.info('模版工程建立完成')
      })
    } else {
      log.error('初始化项目命令: demo create myproject')
    }
  })

commander.parse(process.argv)

```







