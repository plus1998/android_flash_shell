const path = require('path')
module.exports = {
  using: 'cancro',
  // 小米4
  cancro: {
    recovery: path.join(__dirname, '../cancro/twrp-3.5.2_9-0-cancro.img'),
    // rom: path.join(__dirname, '../cancro/MK90.0-cancro-210603-RELEASE.zip'),
    rom: path.join(__dirname, '../cancro/MK71.2-cancro-190228-HISTORY.zip'),
    magisk: path.join(__dirname, '../Magisk-v23.0.apk'),
    boot: path.join(__dirname, '../cancro/boot.img'),
    riru: path.join(__dirname, '../riru-v25.4.4-release.zip'),
    lsp: path.join(__dirname, '../LSPosed-v1.4.5-5767-release.zip'),
    apks: [
      path.join(__dirname, '../TiktokFollowbackHook_v1.5.1.apk'),
      path.join(__dirname, '../v2rayNG_1.6.13_armeabi-v7a.apk'),
      path.join(__dirname, '../com-zhiliaoapp-musically-19.2.4.apk')
    ]
  },
  // 红米redmi note4x mido
  mido: {
    recovery: path.join(__dirname, '../mido/twrp-3.5.2_9-0-mido.img'),
    rom: path.join(__dirname, '../mido/lineage-16.0-20200325-nightly-mido-signed.zip'),
    magisk: path.join(__dirname, '../Magisk-v23.0.apk'),
    boot: path.join(__dirname, '../mido/boot.img'),
    riru: path.join(__dirname, '../riru-v25.4.4-release.zip'),
    lsp: path.join(__dirname, '../LSPosed-v1.4.5-5767-release.zip'),
    apks: [
      path.join(__dirname, '../TiktokFollowbackHook_v1.5.1.apk'),
      path.join(__dirname, '../v2rayNG_1.6.13_armeabi-v7a.apk'),
      path.join(__dirname, '../com-zhiliaoapp-musically-19.2.4.apk')
    ]
  },
}