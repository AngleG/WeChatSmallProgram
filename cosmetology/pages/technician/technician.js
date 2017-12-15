// pages/technician/technician.js
var app = getApp()
var fileData = require('../../utils/data.js')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //cas picker
    casArray: ['美发','美容','美甲','美睫'],
    casIndex: 0,
    addrArray: util.replacePhone(fileData.userData().addrs, false),
    addrIndex: 0,
    skillData: fileData.getSkillData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      list: that.data.skillData
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
  
  },
  /**
   * 跳转至详情
   */
    navigateDetail: function(e){
      wx.navigateTo({
        url: '../technician_detail/technician_detail?artype=' + e.currentTarget.dataset.artype,
      })
    },
  
  /**
   * 选择类别
   */
  bindCasPickerChange: function(e){
    console.log('Category picker发送选择改变，携带值为'+e.detail.value);
    this.setData({
      casIndex: e.detail.value
    })
  },
  /**
   * 选择地址
   */
  bindAddrPickerChange: function(e){
    console.log('Category picker发送选择改变，携带值为' + e.detail.value);
    this.setData({
      addrIndex: e.detail.value
    })
  }
})