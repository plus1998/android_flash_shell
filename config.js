const path = require('path')
module.exports = {
  filePath: {
      recovery: path.join(__dirname, '../twrp-3.5.2_9-0-cancro.img'),
      rom: path.join(__dirname, '../MK90.0-cancro-210603-RELEASE.zip'),
      magisk: path.join(__dirname, '../../Magisk-v23.0.apk'),
      boot: path.join(__dirname, '../boot.img'),
      riru: path.join(__dirname, '../../riru-v25.4.4-release.zip'),
      lsp: path.join(__dirname, '../../LSPosed-v1.4.5-5767-release.zip'),
      apks: [
      path.join(__dirname, '../../TiktokFollowbackHook_v1.5.1.apk'),
      path.join(__dirname, '../../v2rayNG_1.6.13_armeabi-v7a.apk'),
      path.join(__dirname, '../../com-zhiliaoapp-musically-19.2.4.apk')
      ]
  },
}