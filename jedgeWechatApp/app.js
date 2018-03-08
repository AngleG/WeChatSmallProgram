//app.js
let { WeToast } = require('src/wetoast.js')      //返回构造函数，变量名可自定义

App({
  WeToast,     //后面可以通过app.WeToast访问
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        // console.log(code);
        if (code){
          wx.getUserInfo({
            success: function(r){
              //发起网络请求
              // console.log(r.encryptedData);
              // console.log(r.iv);
              wx.request({
                url: "https://ha0q.cn/wxshop/login",
                header:{
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data:{
                  encryptedData: r.encryptedData,
                  iv: r.iv,
                  code: code
                },
                success: function(result){
                  // console.log(result.data.sessionid);
                  wx.setStorage({
                    key: 'sessionid',
                    data: result.data.sessionid,
                  })
                }
              })
            },
            fail: function(){
              console.log("获取用户信息失败")
            }
          })  
        }else{
          console.log("获取用户登录状态失败！" + res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})