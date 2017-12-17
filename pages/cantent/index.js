//index.js
import navpub from "../component/nav/index.js"
//获取应用实例
const app = getApp()
Page({
  ...navpub, 
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    size:2,
    index:1,
    listArr:[]
  },
  //事件处理函数
  toast: function (event){
    wx.navigateTo({ 
      url: '../likeman/likeman'
    }) 
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })   
      }  
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          }) 
        }
      })
    }
    
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      }) 
      app.globalgetuser(e.detail.userInfo)
    }
  },
  onReady: function () {
    console.log(this)
    const self = this;
    wx.request({
      url: app.globalData.urls + '/article/articlelist',
      method: 'POST',
      data: {
        size: this.data.size,
        index: this.data.index
      },
      success(data) {
        console.log(data)
        self.setData({
          listArr: data.data.data
        })
      }
    }) 
  }
})
