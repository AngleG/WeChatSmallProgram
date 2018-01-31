// pages/user/user.js
var app = getApp()
var fileData = require('../../utils/data')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: fileData.userData(),
    addrData: util.replacePhone(fileData.userData().addrs, true)
  },

  /**
   * 编辑地址
   */
  bindEditAddr: function(e){
    wx.navigateTo({
      url: '../edit_addr/edit_addr?addrid=' + e.currentTarget.dataset.addrid,
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
  
  }
})