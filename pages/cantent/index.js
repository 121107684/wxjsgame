//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    
  },
  //事件处理函数
  toast: function (event){
    wx.navigateTo({ 
      url: '../likeman/likeman'
    })
  },
  onLoad: function () {
    console.log(app)
  }
})
