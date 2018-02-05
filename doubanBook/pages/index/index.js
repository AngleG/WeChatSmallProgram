//index.js
//获取应用实例
const app = getApp()
var request = require('../../request/request.js');
var utils = require('../../utils/util.js');

//动态球颜色
var iconColor = [
  '#42BD56', '#31A040'
]

Page({
  data: {
    scrollHeight: 0,
    pageIndex: 0,     //页码
    totalRecord: 0,   //图书总数
    isInit: true,     //是否第一次进入应用
    loadingMore: false,
    footerIconColor: iconColor[0],
    pageData: [],    //图书数据
    searchKey: null
  },
  onLoad: function () {
    
  },
  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow: function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log('宽：' + res.windowWidth +" 高：" + res.windowHeight);
        that.setData({
          //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750)
        })
      },
    })
  },
  searchInputEvent: function(e){
    this.setData({
      searchKey: e.detail.value
    })
  },
  searchClickEvent: function(e){
    if(!this.data.searchKey){
      return
    }
    this.setData({
      pageIndex: 0,
      pageData: []
    })
    requestData.call(this);
  },

  //上拉刷新
  scrollLowerEvent: function(e){
    if(this.data.loadingMore){
      return
    }
    requestData.call(this);
  },
  //图书详情
  toDetailPage: function(e){
    console.log(e.currentTarget.dataset.bid);
    var bid = e.currentTarget.dataset.bid;
    wx.navigateTo({
      url: '../detail/detail?id=' + bid,
    })
  }
})
/**
   * 请求图书信息
   */
function requestData() {
  var _this = this;
  var q = this.data.searchKey;
  var start = this.data.pageIndex;
  this.setData({
    loadingMore: true,
    isInit: false
  })
  updateRefreshBall.call(this);
  console.log(start);
  request.requestSearchBook({
    q: q,
    start: start
  }, (data) => {
    if(data.total == 0){
      _this.setData({ totalRecord: 0});
    }else{
      _this.setData({
        pageData: _this.data.pageData.concat(data.books),
        pageIndex: start + 1,
        totalRecord: data.total
      });
      
    }
  }, () => {
    _this.setData({ totalRecord : 0});
  }, () => {
    _this.setData({ loadingMore: false });
  })
}
/**
 * 下拉刷新变色球
 */
function updateRefreshBall() {
  var cIndex = 0;
  var _this = this;
  var timer = setInterval(function () {
    if (!_this.data.loadingMore) {
      clearInterval(timer)
    }
    if (cIndex >= iconColor.length) {
      cIndex = 0;
    } else {
      _this.setData({
        footerIconColor: iconColor[cIndex++]
      })
    }
  }, 100)
}
