// app.js
//App(Object object)
//它的作用是注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等
//App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
App({
  onLaunch() {
    //小程序初始化完成时触发，全局只触发一次
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
