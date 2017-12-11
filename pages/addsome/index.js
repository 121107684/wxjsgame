// pages/addsome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '美国', '巴西', '日本'],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseImage: function () {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]
        
        // wx.uploadFile({
        //   url: 'uploadFileUrl',
        //   filePath: imageSrc,
        //   name: 'data',
        //   success: function (res) {
        //     console.log('uploadImage success, res is:', res)

        //     wx.showToast({
        //       title: '上传成功',
        //       icon: 'success',
        //       duration: 1000
        //     })

        //     self.setData({
        //       imageSrc
        //     })
        //   },
        //   fail: function ({ errMsg }) {
        //     console.log('uploadImage fail, errMsg is', errMsg)
        //   }
        // })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  }
})