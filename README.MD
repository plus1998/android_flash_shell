### 说明
通过nodejs的子进程调用adb、fastboot实现批量刷机等操作

适用于mac系统 windows需要自行适配

### 1. 准备
下载好适配机型的Recovery、刷机包、Magisk、Riru、Lsposed等需要文件，修改main.js中的代码

### 2. 安装环境
安装Nodejs
安装fastboot
安装adb

### 3. 安装依赖

```powershell
npm install
```

### 4. 执行

```powershell
npm run start
```