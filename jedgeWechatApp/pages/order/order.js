// pages/order/order.js
var request = require('../../request/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://ha0q.cn/wxshop/",
    sessionid: '',
    navlist: ["全部", "待付款", "已付款", "待收货", "待自提", "已完成"],
    active: 0,
    orderList: [],
    thiStatus: "全部"
  },
  //nav navigator
  navNavigatorEvent: function(e){
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    let that = this;
    //订单状态查询 接口
    if (this.data.sessionid){
      if (index != 0){
        request.request(
          '/orderstatus/query',
          { sessionid: that.data.sessionid, status: index },
          (res) => {
            if(res.status == 200){
              getOrderList(res, that);
            }
          }
        );
      }else{
        this.getOrderListData();
      }
    }
    
    this.setData({
      active: index,
      thiStatus: that.data.navlist[index]
    });

  },
  navigatorToDetail: function(e){
    // wx.navigateTo({
    //   url: '../detail/detail?'+e.currentTarget.dataset.pid,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var index = options.orderid;
    // console.log(options.orderid);
    this.setData({
      active: index,
      thiStatus: that.data.navlist[index]
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
    this.getOrderListData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.getOrderListData();
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
  getOrderListData: function(){
    var that = this;
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        let sessionId = res.data;
        that.setData({
          sessionid: sessionId
        });
        request.request(
          '/orderuserid/query',
          { sessionid: that.data.sessionid},
          (res) => {
            getOrderList(res,that);
          }
        )
      }
    });
  }
})
function getOrderList(res, that){
  if (res.data.length != 0) {
    let arr = [];
    for (let i = 0; i < res.data.length; i++) {
      var o = {};
      if (res.data[i].status == 1) {
        o.status = '未付款';
      } else if (res.data[i].status == 2) {
        o.status = '已付款';
      } else if (res.data[i].status == 3) {
        o.status = '未发货';
      } else if (res.data[i].status == 4) {
        o.status = '已发货';
      } else if (res.data[i].status == 5) {
        o.status = '交易成功';
      }
      o.freight = res.data[i].postFee;
      o.payment = parseFloat(res.data[i].payment);
      let obj = res.data[i].orderItems;
      for (var j = 0; j < obj.length; j++) {
        o.name = obj[j].title;
        o.picPath = obj[j].picPath;
        o.price = obj[j].price;
        o.count = obj[j].num;
        o.size = obj[j].itemSize;
        arr.push(o);
      }

    }
    // console.log(arr);
    that.setData({
      orderList: arr
    });
    console.log(that.data.orderList);
  }else{
    that.setData({
      orderList: []
    });
  }
}
// function timeFormat(timestamp) {
//   //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
//   var time = new Date(timestamp);
//   var year = time.getFullYear();
//   var month = time.getMonth() + 1;
//   var date = time.getDate();
//   var hours = time.getHours();
//   var minutes = time.getMinutes();
//   var seconds = time.getSeconds();
//   return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0 (minutes) + ':' + add0(seconds);
// }
