const cp = require('child_process')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

module.exports = {
  // 开机状态重启到bootloader
  async rebootToBootloader(device) {
    cp.execSync(`adb${device ? (' -s ' + device) : ''} reboot bootloader`)
  },
  async bootloaderRebootToSystem(device) {
    cp.execSync(`fastboot${device ? (' -s ' + device) : ''} reboot`)
  },
  async recoveryRebootToSystem(device) {
    cp.execSync(`adb${device ? (' -s ' + device) : ''} reboot`)
  },
  async bootloaderRebootToRecovery(device) {
    cp.execSync(`fastboot${device ? (' -s ' + device) : ''} reboot recovery`)
  },
  // fastboot刷入镜像
  async fastbootFlash(path, device) {
    cp.execSync(`fastboot${device ? (' -s ' + device) : ''} flash boot ${path}`)
  },
  // adb sideload
  async sideload(path, device) {
    cp.exec(`adb${device ? (' -s ' + device) : ''} sideload ${path}`, error => {
      if (error) {
        console.error(device + " 刷机错误 ", error.message)
      } else {
        console.log(device + "刷机完成, 正在重启")
        try {
          setTimeout(() => {
            this.recoveryRebootToSystem(device)
          }, 3000)
        } catch (error) {
          console.log('重启失败，请手动重启')
        }
      }
    })
  },
  // 推送文件到sdcard
  async pushToSdcard(path, device) {
    const tempArr = path.split('/')
    const fileName = tempArr[tempArr.length - 1]
    cp.execSync(`adb${device ? (' -s ' + device) : ''} push ${path} /sdcard/${fileName}`)
  },
  // 安装程序
  async installApk(path, device) {
    const command = `adb${device ? (' -s ' + device) : ''} install ${path}`
    cp.exec(command, error => {
      console.log(error ? `${path} ${device} 安装失败 ${error.message}` : `${path} ${device} 安装成功`)
    })
  },
  // 拉取/sdcard/Dwnload 到 ./
  async pullMagiskPathed(device) {
    const command = `adb${device ? (' -s ' + device) : ''} pull /sdcard/Download/ ${path.join(__dirname, `./${device}`)}`
    console.log(command)
    cp.execSync(command)
  },
}
