// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: ["全部", "待付款", "待收货", "待自提", "已完成"],
    active: 0,
    orderList: getOrderListData(),
    thiStatus: "全部"
  },
  //nav navigator
  navNavigatorEvent: function(e){
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    let that = this;
    
    this.setData({
      active: index,
      thiStatus: that.data.navlist[index]
    })
  },
  navigatorToDetail: function(e){
    wx.navigateTo({
      url: '../detail/detail?'+e.currentTarget.dataset.pid,
    })
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
})
function getOrderListData(){
  var arr = [
    {
      id: 0,
      smallPic: '../../images/product1.jpg',
      name: '水果蛋糕',
      size: '6寸',
      price: '288',
      count: 1,
      status: "待付款",
      freight: 0
    },
    {
      id: 1,
      smallPic: '../../images/product2.jpg',
      name: '蔓越莓红丝绒蛋糕',
      size: '10寸',
      price: '330',
      count: 1,
      status: "待收货",
      freight: 10
    },
    {
      id: 2,
      smallPic: '../../images/product1.jpg',
      name: '蓝莓轻乳拿破仑',
      size: '6寸',
      price: '298',
      count: 2,
      status: "待自提",
      freight: 0
    },
    {
      id: 3,
      smallPic: '../../images/product3.jpg',
      name: '水果蛋糕',
      size: '6寸',
      price: '288',
      count: 1,
      status: "已完成",
      freight: 0
    }
  ]
  return arr
}