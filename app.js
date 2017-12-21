//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const self = this
    // 登录
    wx.login({ 
      success: function (data) {
        console.log(data)
        const jscode = data.code
        wx.getSetting({ 
          success: res => {
            console.log(res)  
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({ 
                success: res => {
                  console.log(res, 'res')
                  // 可以将 res 发送给后台解码出 unionId
                  self.globalData.userInfo = res.userInfo
                       
                  wx.request({
                    url: self.globalData.urls + '/login/login',
                    method: 'POST',
                    data: {
                      jscode: jscode,
                      userinfo: res.userInfo
                    },
                    success(data) {
                      self.globalData.userInfo = data.data.data;
                    }
                  })

                  
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (self.userInfoReadyCallback) {
                    self.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })



        // wx.request({
        //   url: openIdUrl,
        //   data: {
        //     code: data.code,
        //     userinfo: this.globalData.userInfo
        //   },
        //   success: function (res) {
        //     console.log('拉取openid成功', res)
        //     self.globalData.openid = res.data.openid
        //     callback(null, self.globalData.openid)
        //   },
        //   fail: function (res) {
        //     console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
        //     callback(res)
        //   }
        // })
      },
      fail: function (err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }
    }) 

    // 获取用户信息

  },
  globalData: {
    userInfo: null,
    urls: 'http://127.0.0.1:8088'
  },
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
       
    } 
  }, 
  globalgetuser: function (passdata) {
    var self = this
    wx.login({
      success: function (res) {
        console.log(res) 
        var jscode = res.code
        wx.request({
          url: self.globalData.urls + '/login/login',
          method: 'POST',
          data: {
            jscode: jscode,
            userinfo: passdata
          },
          success(data) {
            self.globalData.userInfo = data.data.data;
          }
        })
      }
    })

  }
})
