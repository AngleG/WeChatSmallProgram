// pages/classify/classify.js
var fileData = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navProductItems: fileData.getProductData(),
    curNavId: 0,
    classifyList: ['水果蛋糕','慕斯蛋糕','童趣蛋糕','乳脂蛋糕','奶油蛋糕'],
    sizeList: ['全部', '6寸', '8寸', '10寸', '12寸'],
    selectId: '',
    key: ''
  },
  gotoDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?=' + e.currentTarget.dataset.pid,
    })
  },
  navClickEvent: function(e){
    console.log(e.currentTarget.dataset.key);
    let key = e.currentTarget.dataset.key;
    this.setData({
      key: key
    })
  },
  // 选择种类
  selectEvent:function(e){
    console.log(e.currentTarget.dataset.index);
    this.setData({
      selectId: e.currentTarget.dataset.index
    })
  },
  //重置
  cancelEvent:function(e){
    this.setData({
      key: "",
      selectId: ''
    })
  },
  //确定
  entureEvent: function(e){
    this.setData({
      key: ""
    })
  },
  //搜索
  searchEvent:function(e){
    wx.navigateTo({
      url: '../search/search',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var list = this.data.navProductItems;
    this.setData({
      list: that.data.navProductItems
    })
    // for(var i=0; i< this.data.list.length; i++){
    //   this.setData({
    //     curNavId: i
    //   })
    // }
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