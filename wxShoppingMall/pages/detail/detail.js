// pages/detail/detail.js
var app = getApp();
var fileData = require('../../utils/data.js');
var request = require('../../request/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://ha0q.cn/wxshop/",
    banner_url: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    pid: 0,
    radioItems: [
      {name: '6寸', value:'6', checked: 'true'},
      {name: '8寸', value:'8'},
      {name: '10寸', value:'10'}
    ],
    radioCheckedVal: 6,
    detailsProduct: [],
    detailsProductInfo: {},
    shoppingCartInfo: getShoppingCartData(),
    productCount: 1,
    display: true,
    navigateToId: ''
  },
  radioChange: function(e){
    console.log(e.detail.value);
    this.setData({
      radioCheckedVal: e.detail.value
    })
  },
  // 点击加入购物车按钮 显示弹出层
  addToCartEvent: function (e) {
    this.setData({
      display: false,
      closePopup: true,
      navigateToId: 'car'
    })
    console.log("maskHidden: " + this.data.display);
  },
  //点击购买
  buyEvent: function(e){
    this.setData({
      display: false,
      closePopup: true,
      navigateToId: 'buy'
    })
    console.log("maskHidden: " + this.data.display);
  },
  //确定购买
  confirmBuyEvent:function(e){
    if (!this.data.display) {
      this.setData({
        display: true
      })
    } else {
      this.setData({
        display: flase
      })
    }
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  // count--
  countReduceEvent: function(e){
    let count = this.data.productCount;
    // console.log(count);
    if (count <= 1){
      count =1;
      this.setData({
        productCount: count
      })
    }else{
      count--;
      this.setData({
        productCount: count
      })
    }
  },
  // count++
  countAddEvent: function(e){
    let count = this.data.productCount;
    // console.log(count);
    count++;
    this.setData({
      productCount: count
    })
  },
  // 关闭弹出层
  closeEvent: function(e){
    if (!this.data.display){
      this.setData({
        display: true
      })
    }else{
      this.setData({
        display: flase
      })
    }
  },
  // 点击确定加购
  confirmEvent: function(e){

      if (!this.data.display) {
        this.setData({
          display: true
        })
      } else {
        this.setData({
          display: flase
        })
      }
    
    this.wetoast.toast({
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMA+0IPA2iTLO7YuiXr4/IcCqYkFbKZN/bUiHlbBs7J3L5hTtvDjFFx6Uzm0WRUAAAB20lEQVRo3u3Zy3KCQBCF4R4QFZGL4F0x4jXp93/AVBbmFFMx4MB0pVLz7bv+zdk1OY7jOI7j/C3ROh6RGG/MPBXrBYpZrDcYMrNYz5/ww5Ssi0L+FpM1GAlqOVkWKIkaRiJRw0jgLSW7olCy5o1FahgJhNZqGAmsC7LKn0jWolCmhpFAaa2GkcDBJyswEsGaPxGqYSRwsVbDSOCYkU2BkqhhJEI1jAQm1moYCcz3ZJE3lqwFSqqGkcDMXg0jQW1A9kShcS39MBiJcc0/89w3GgksUGsyY+bzyGQkqFFrFX9ZVQYjMahFyeMmazuSDrWs5IcyNxoJX6m9IUNyMxgJb+gF9evroHEkJjW4cs0lbRiJWQ0WXPPutRgJbOlVM65R24aRGNVgoPV4XjSOBDWD3pzr4mXDSFAzsdd7KmgxEr6ToezImlnWNBIOyFh2Yc16pI+kew38A2uSnT6S7jXwS9YN909HoirqqFiz7pA+GYnaUWfFmXXjXeGF/dYgfeNmqHXvxa1qN+pJ3qKnTtSb0VSmhp5EDZYJ/2LlEQn0UOudtxKpoackanD6sZcsyZKbkqjBTknUoBKpQcAg8Te6i9RgK1KDjWANvTgnIQvURGxUmZPjOI7jOM7/9wkPMejs5BepRwAAAABJRU5ErkJggg==',
      imgClassName: 'my_wetoast_img',
      imgMode: 'scaleToFill',
      title: '加入成功',
      titleClassName: 'my_wetoast_title',
      duration: 800,
      success(data) {
        console.log(Date.now() + ':success')
      },
      fail(data) {
        console.log(Date.now() + ':fail')
      },
      complete(data) {
        console.log(Date.now() + ':complete')  //无论成功或失败，complete都会执行
      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast();
    let pid = options.pid;
    console.log(pid);
    this.setData({
      pid: pid
    })
    this.getDetailsProduct();
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
  getDetailsProduct: function () {
    var that = this;
    console.log(that.data.pid);
    request.request(
      "/itemdesc/"+that.data.pid,
      {},
      (res) => {
        that.setData({
          banner_url: res.tbitem.image.split(','),
          detailsProduct:res.list,
          detailsProductInfo: res.tbitem
        })
      },
      () => { },
      () => { }
    )
  }
})
// 商品详情数据
// function getDetailsProduct(){
//   var arr = { id: 0, pic: ['../../images/details1.jpg', '../../images/details2.jpg']}
//   return arr;
// }
// 加入购物车
function getShoppingCartData(){
  var arr = { id: 0, smallPic: '../../images/product1.jpg', name:'水果蛋糕', size: '6寸', price: '￥288'}
  return arr
}