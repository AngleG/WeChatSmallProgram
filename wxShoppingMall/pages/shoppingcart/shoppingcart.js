// pages/shoppingcart/shoppingcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carlist: getCarListData(),
    totalPrice: 0,
    selectedAllStatus: true
  },
  
  gotoDetail: function(e){
    console.log(e.currentTarget.dataset.pid);
    wx.redirectTo({
      url: '../detail/detail?' + e.currentTarget.dataset.pid,
    })
  },
  getLocation: function(){
    wx.navigateTo({
      url: '../location/location',
    })
  },
  deleteBtn: function(e){
    // console.log(e.currentTarget.dataset.carid);
    // console.log(this.data.carlist);
    var index = e.currentTarget.dataset.index;
    var carlist = this.data.carlist;
    // console.log(index);
    carlist.splice(index, 1);
    // console.log(this.data.carlist);
    this.setData({
      carlist: carlist
    })
    this.getTotalPrice();
  },
  selectItemEvent: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    let carlist = this.data.carlist;
    carlist[index].selected = !carlist[index].selected;
    if (!carlist[index].selected){
      this.setData({
        selectedAllStatus: false
      })
    }else{
      for (let i = 0; i < carlist.length; i++){
        if (carlist[i].selected){
          that.setData({
            selectedAllStatus: true
          })
        }
      }
      
    }
    this.setData({
      carlist: carlist
    })
    this.getTotalPrice();
  },
  selectAllEvent: function(e){
    let selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    let carlist = this.data.carlist;
    for(let i=0; i<carlist.length; i++){
      carlist[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carlist: carlist
    })
    this.getTotalPrice();
  },
  bindReduceEvent: function(e){
    let carlist = this.data.carlist;
    let index = e.currentTarget.dataset.carid;
    // console.log(index);
    if (carlist[index].count > 1){
      carlist[index].count -= 1;
    }else{
      carlist[index].count = 1;
    }
    this.setData({
      carlist: carlist
    });
    this.getTotalPrice();
  },
  bindAddEvent: function(e){
    let carlist = this.data.carlist;
    let index = e.currentTarget.dataset.carid;
    // console.log(index);
    carlist[index].count += 1;
    
    this.setData({
      carlist: carlist
    });
    this.getTotalPrice();
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
    this.getTotalPrice();
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
  // 计算总价
  getTotalPrice(){
    let carlist = this.data.carlist;
    var total = 0;
    for(let i=0; i<carlist.length; i++){
      if(carlist[i].selected){
        total += carlist[i].price*carlist[i].count;
      }
    }
    this.setData({
      carlist: carlist,
      totalPrice: total
    })
  }
})
function getCarListData(){
  var arr = [
    {
      id: 0,
      smallPic: '../../images/product1.jpg',
      name: '水果蛋糕',
      size: '6寸',
      price: '288',
      count: 1,
      selected: true
    },
    {
      id: 1,
      smallPic: '../../images/product2.jpg',
      name: '蔓越莓红丝绒蛋糕',
      size: '10寸',
      price: '330',
      count: 1,
      selected: true
    },
    {
      id: 2,
      smallPic: '../../images/product3.jpg',
      name: '蓝莓轻乳拿破仑',
      size: '6寸',
      price: '298',
      count: 2,
      selected: true
    }
  ]
  return arr;
}