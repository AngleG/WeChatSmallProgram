//index.js
//获取应用实例
const app = getApp();
var fileData = require('../../utils/data.js');
var request = require('../../request/request.js')

Page({
  data: {
    url: "https://ha0q.cn/wxshop/",
    colors: ['#75dfd5', '#ff5e45', '#4093c1', '#ff5a93'],
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navListItems: fileData.getNavIndexData(),
    list: [],
    curNavId: 0
  },
  switchTab: function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({
      curNavId: index
    })
    console.log("curNavId: " + this.data.curNavId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getProductData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 跳转至详情页
  navigateDetail: function(e){
    console.log('navigator');
    wx.navigateTo({
      url: '../detail/detail?pid='+e.currentTarget.dataset.pid,
    })
  },
  getProductData: function(){
    var that = this;
    request.request(
      "/rest/item",
      {page: 0, rows: 30},
      (res)=>{
        // console.log(res);
        // let arr = [];
        // for(let i=0; i<res.rows.length; i++){
        //   arr.push(res.rows[i].image.split(",")[0]);
        // }
        // console.log(arr);
        that.setData({
          list: res.rows
        })
      },
      ()=>{},
      ()=>{}
    )
  }
})


