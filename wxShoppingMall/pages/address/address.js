// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: getaddressList(),
    status: null
  },
  //添加收货地址
  addAddrEvent: function(e){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  radioChange: function(e){
    // console.log(this.data);
    var index = e.detail.value;
    var addressList = this.data.addressList;

    if (!addressList[index].checked){
      for (let i = 0; i < addressList.length;i++){
        addressList[i].checked=false;
      }
    }
    addressList[index].checked = !addressList[index].checked;
    this.setData({
      addressList: addressList
    })
    
    //  console.log(e);
  },
  deleteEvent: function(e){
    let addrList = this.data.addressList;
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    addrList.splice(index, 1);
    this.setData({
      addressList: addrList
    })
    console.log(addrList);
  },
  //使用收货地址
  useEvent:function(e){
    wx.redirectTo({
      url: '../balance/balance?addruse=' + this.data.status,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.status);
    this.setData({
      status: options.status
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
  
  }
})

function getaddressList(){
  var arr = [
    {
      id: 0,
      username: "wxx",
      phonenum: "15738872345",
      addr: "上海,上海市,闵行区 ",
      addrDetail: "吴中路1189号8楼836",
      checked: false
    }, {
      id: 1,
      username: "小五",
      phonenum: "15738872345",
      addr: "上海,上海市,普陀区 ",
      addrDetail: "xxxxxxx",
      checked: false
    }
  ]
  return arr;
}