// pages/shoppingcart/shoppingcart.js
var request = require("../../request/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://ha0q.cn/wxshop/",
    carlist: [],
    totalPrice: 0,
    selectedAllStatus: true,
    itemSelected: true,
    sessionid: ''
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
  
    var index = e.currentTarget.dataset.index;
    var carlist = this.data.carlist;
    var itemid = e.currentTarget.dataset.itemid;
    if(this.data.sessionid != ''){
      request.request(
        "/delete/" + itemid ,
        { sessionid: this.data.sessionid },
        (res) => {
          console.log(res);
          if(res.status == 200){
            carlist.splice(index, 1);
            this.setData({
              carlist: carlist
            })
            this.getTotalPrice();
          }
        }
      )
      
    }
    
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
      var isall=true;
      for (let i = 0; i < carlist.length; i++){
        if (!carlist[i].selected){
          isall=false;
        }
      }
        that.setData({
          selectedAllStatus: isall
        })
      
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
    let itemid = e.currentTarget.dataset.itemid;
    console.log(itemid);
    
    if (carlist[index].num <= 1){
      carlist[index].num = 1;
      this.setData({
        carlist: carlist
      });
      this.getTotalPrice();
    }else{
      request.request(
        "/update/num/" + itemid + "/" + parseInt(carlist[index].num-1),
        { sessionid: this.data.sessionid},
        (res) => {
          
          console.log(res);
          if (carlist[index].num > 1) {
            carlist[index].num -= 1;
          } else {
            carlist[index].num = 1;
          }
          this.setData({
            carlist: carlist
          });
          this.getTotalPrice();
        }
      )
    }
    
  },
  bindAddEvent: function(e){
    let carlist = this.data.carlist;
    let index = e.currentTarget.dataset.carid;
    let itemid = e.currentTarget.dataset.itemid;
    // console.log(index);
    request.request(
      "/update/num/" + itemid + "/" + parseInt(carlist[index].num +1),
      { sessionid: this.data.sessionid },
      (res) => {
        if(res.status == 200){
          carlist[index].num += 1;

          this.setData({
            carlist: carlist
          });
          this.getTotalPrice();
        }
      }
    )
    
  },
  //去结算
  navigateTobalance: function(e){
    let carlist = this.data.carlist;
    let str = '';
    for(let i=0; i < carlist.length; i++){
      if (carlist[i].selected){
        str += carlist[i].id + ',';
      }
    }
    var ids = str.substr(0, str.length-1);
    console.log(ids);
    wx.navigateTo({
      url: '../balance/balance?ids='+ids,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("onLoad: 监听页面加载");
    this.getSessionId();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady 监听页面初次渲染完成");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    console.log("onShow 监听页面显示");
    this.getCarListData();
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
        total += carlist[i].itemPrice/100*carlist[i].num;
        
      }
      
    }
    this.setData({
      carlist: carlist,
      totalPrice: total
    })
  },
  getCarListData: function(){
    var that = this;
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        let sessionId = res.data;
        that.setData({
          sessionid: sessionId
        })
        console.log("sessionid:" + that.data.sessionid);
        if (that.data.sessionid != '') {
          request.request(
            "/cart/list",
            { sessionid: that.data.sessionid },
            (res) => {
              let arr = [];
              for (let i = 0; i < res.data.length; i++) {
                let obj = res.data[i];
                obj.selected = true;
                arr.push(obj);
              }

              if (res.status == 200) {
                that.setData({
                  carlist: arr,
                  selectedAllStatus: true
                })
                that.getTotalPrice();
              }
            }
          )
        }
      }
    })
    
  },
  getSessionId: function(){
    var that = this;
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        let sessionId = res.data;
        that.setData({
          sessionid: sessionId
        })
        // that.getCarListData();
      }
    })
  }
  
})
