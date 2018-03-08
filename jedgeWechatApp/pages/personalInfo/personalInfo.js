// pages/personalInfo/personalInfo.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArray: ["保密", "男", "女"],
    genderIndex: 0,
    date: "1994-01-01",
    datenow: getNowDate(),
    region: ['上海', '上海市', '普陀区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      headUrl: options.src
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // console.log(this.data.avatarUrl);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
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
  // 选择要上传的头像
  selectPicEvent:function(e){
    var self = this;
    console.log(this.data.userInfo.avatarUrl);
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        self.setData({
          headUrl: tempFilePaths
        })
        console.log(self.data.headUrl[0]);
      }
    })
  },
  // 性别选择
  bindPickerChange: function(e){
    console.log(e.detail.value);
    this.setData({
      genderIndex: e.detail.value
    })
  },
  // 生日
  bindDateChange:function(e){
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  // 地区
  bindRegionChange: function(e){
    console.log(e.detail.value);
    this.setData({
      region: e.detail.value
    })
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
  
  }
})
function getNowDate(){
  const dateNow = new Date();
  const thisYear = dateNow.getFullYear();
  let thisMonth = dateNow.getMonth() + 1;
  let thisDay = dateNow.getDate();
  thisMonth = thisMonth.toString();
  thisDay = thisDay.toString();
  // console.log(thisDay.length);
  if (thisMonth.length == 1){
    thisMonth = "0"+thisMonth;
  }else{
    thisMonth = thisMonth;
  }
  if (thisDay.length == 1){
    thisDay = "0" + thisDay;
  }else{
    thisDay = thisDay;
  }

  const now = thisYear + '-' + thisMonth + '-' + thisDay;
  // console.log(typeof now);
  return now;
}