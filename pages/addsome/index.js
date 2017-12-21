// pages/addsome/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['仅自己', '关注我的', '全部'],
    whocansee: 0,
    imagesArr: [],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        }, 
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [ 
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ]
    ],
    areadata: [0, 0],
    arttext:'测试文章'
  },
  arttextinput:function(e){
    console.log(e)
    this.setData({
      arttext: e.detail.value
    })
  },
  gamearea: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      areadata: e.detail.value
    })
  },
  gameareain: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      areadata: this.data.areadata
    };
    data.areadata[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.areadata[0]) {
          case 0:
            data.objectMultiArray[1] = [
              { id: 0, name: '扁性动物' },
              { id: 1, name: '线形动物' },
              { id: 2, name: '环节动物' },
              { id: 3, name: '软体动物' },
              { id: 3, name: '节肢动物' }
            ];
            // data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.objectMultiArray[1] = [
              { id: 0, name: '鱼' },
              { id: 1, name: '线形两栖动物' },
              { id: 2, name: '爬行动物' }
            ];
            break;
        }
        data.areadata[1] = 0;
        // data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },  
  savedata(){ 
    console.log(app.globalData.userInfo.openid)
    wx.request({
      url: app.globalData.urls+"/article/addnew",
      method:'POST',
      data: {
        openidu: app.globalData.userInfo.openid,
        imagesArr: this.data.imagesArr,
        whocansee: this.data.whocansee,
        areadata: this.data.areadata,
        arttext: this.data.arttext
      },  
      success: function (res) {
        console.log(res)
      }  
    }) 
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
        
        const uploadTask = wx.uploadFile({
          url: app.globalData.urls+'/uploadfile/upimg',
          filePath: imageSrc,
          name: 'data',
          success: function (res) {
            var imgArrthis=[]
            var imgpath = app.globalData.urls + JSON.parse(res.data).data.img
            self.data.imagesArr.push(imgpath)
            var imgArrthis = self.data.imagesArr
            console.log(imgArrthis)
            self.setData({ imagesArr: imgArrthis})
            
            
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      whocansee: e.detail.value
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