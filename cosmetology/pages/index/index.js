//index.js
//获取应用实例
const app = getApp()
var fileData = require('../../utils/data.js')

Page({
  data: {
    colors:['red','orange','yellow','green','purple'],
    // banner初始化
    banner_url: fileData.getBannerData(),
    // 指示点
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    curNavId:1,
    curIndex:0
  },
  //标签切换
  switchTab: function(e){
    let id = e.currentTarget.dataset.id,
    index = parseInt(e.currentTarget.dataset.index);
    console.log("index: " +index + " id: " + id);
    // this.curIndex = parseInt(e.currentTarget.dataset.index);
    console.log(e);
    var that = this;
    this.setData({
      curNavId: id,
      curIndex: index,
    })
  },
  // 跳转至详情页
  navigateDetail: function(e){
    wx.navigateTo({
      url: '../detail/detail?artype='+ e.currentTarget.dataset.artype,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面渲染后执行
  onLoad: function () {
    var that = this;
    this.setData({
      list: that.data.navSectionItems
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // book
  bookTap: function(e){
    wx.navigateTo({
      url: '../book/book?artype='+e.currentTarget.dataset.artype,
    })
  }
})
