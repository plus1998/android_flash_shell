const readline = require('readline')
const util = require('./util')
const path = require('path')
const fs = require('fs')
const cp = require('child_process')

async function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
async function rebootToBootloader(device) {
  // 1: 进入bootloader
  try {
    console.log("请按住音量-")
    await util.rebootToBootloader(device)
    console.log('等待设备重启')
    await sleep(3000)
  } catch (error) {
    console.error('请手动进入fastboot模式（按住音量-和开机）')
  }
}
// 1 刷rec
async function flashRec(device) {
  // 2.刷入rec
  await util.fastbootFlash(path.join(__dirname, '../twrp-3.5.2_9-0-cancro.img'), device)
  // 3.重启到rec
  await sleep(3000)
  await util.bootloaderRebootToRecovery(device)
}
// 2 sideload刷机
async function flashSystem(device) {
  console.log("正在刷机，在手机上查看进度")
  util.sideload(path.join(__dirname, '../MK90.0-cancro-210603-RELEASE.zip'), device)
}
// 3 安装面具
async function installMagisk() {
  await util.installApk(path.join(__dirname, '../../Magisk-v23.0.apk'))
}
// 4 发送东西到sdcard
async function pushSomethingToSdcard(device) {
  console.log(path.join(__dirname, '../boot.img'))
  await util.pushToSdcard(path.join(__dirname, '../boot.img'), device)
  await util.pushToSdcard(path.join(__dirname, '../../riru-v25.4.4-release.zip'), device)
  await util.pushToSdcard(path.join(__dirname, '../../LSPosed-v1.4.5-5767-release.zip'), device)
  console.log('传输完成！')
}
// 5 刷面具补丁
async function flashMagiskPathed(device) {
  try {
    await util.pullMagiskPathed(device)
    // fs读取文件夹
    const dir = path.join(__dirname, `./${device}/`)
    const fileList = fs.readdirSync(dir)
    console.log(device + " 找到补丁文件, 正在重启到bootloader")
    let isFlashed = false
    for (const file of fileList) {
      if (file.startsWith('magisk_patched-23000_')) {
        await util.rebootToBootloader(device)
        console.log(device + " 正在刷入补丁")
        await util.fastbootFlash(dir + file)
        await sleep(2000)
        console.log(device + " 正在重启到系统")
        await util.bootloaderRebootToSystem()
        isFlashed = true
      }
      await sleep(2000)
      if (isFlashed) fs.unlinkSync(dir + file)
    }
    fs.rmdirSync(dir)
  } catch (error) {
    console.error(device + " adb操作失败", error.message)
  }
}
async function installAllApk() {
  console.log("正在异步安装 引流插件")
  await util.installApk(path.join(__dirname, '../../TiktokFollowbackHook_v1.5.1.apk'))
  console.log("正在异步安装 v2ray")
  await util.installApk(path.join(__dirname, '../../v2rayNG_1.6.13_armeabi-v7a.apk'))
  console.log("正在异步安装 tiktok 19.2.4")
  await util.installApk(path.join(__dirname, '../../com-zhiliaoapp-musically-19.2.4.apk'))
  console.log("执行完成，请等待结果")
}

async function chooseFunc() {
  console.log(`
  功能列表 (支持多设备)：
  1. 刷入recovery
  2. sideload 刷机
  3. 安装面具
  4. 发送boot镜像、Lsposed、Riru 到sdcard根目录
  5. 刷入面具补丁
  6. 安装引流插件、tiktok、v2ray
  `)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(`输入序号执行：`, async index => {
    const result1 = cp.execSync('adb devices');
    const string1 = result1.toString();
    const adb_devices = string1.replace('List of devices attached', '').split('\n').filter(o => o).map(o => o.split('\t')[0]);

    const result2 = cp.execSync('fastboot devices');
    const string2 = result2.toString();
    const fastboot_devices = string2.split('\n').filter(o => o).map(o => o.split('\t')[0]);
    console.log('找到adb设备：', adb_devices, '找到fastboot设备：', fastboot_devices)
    switch (index) {
      case '1':
        adb_devices.forEach(rebootToBootloader)
        await sleep(5000)
        fastboot_devices.forEach(flashRec)
        break
      case '2':
        console.log(`
        1. 确保手机已经4清完毕 （不清除system）
        2. 确保已进入adb sideload模式
        `)
        adb_devices.forEach(flashSystem)
        break
      case '3':
        adb_devices.forEach(installMagisk)
        break
      case '4':
        adb_devices.forEach(pushSomethingToSdcard)
        break
      case '5':
        for (const device of adb_devices) {
          await flashMagiskPathed(device)
        }
        break
      case '6':
        adb_devices.forEach(installAllApk)
        break
      default:
        console.log('输入错误')
    }
    rl.close()
  })
}

async function main() {
  await chooseFunc()
}

main()