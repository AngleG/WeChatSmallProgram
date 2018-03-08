// pages/address/address.js
var request = require("../../request/request.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionid: '',
    addressList: [],
    status: null
  },
  //添加收货地址
  addAddrEvent: function(e){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  // 设置默认地址
  radioCheckedEvent: function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var addressList = this.data.addressList;
    let addid = e.currentTarget.dataset.addid;
    for (let i = 0; i < addressList.length; i++) {
      addressList[i].checked = '0';
      addressList[i].check = false;
    }
    request.request(
      "/address/updateCheck",
      { sessionid: this.data.sessionid, id: addid+'' },
      (res) => {
        if (res.status == 200) {
          addressList[index].checked = '1';
          addressList[index].check = true;
          that.setData({
            addressList: addressList
          });
          console.log(this.data.addressList);
        }
      }
    )

  },
  // 编辑
  editEvent:function(e){
    let aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + aid,
    })
  },
  // 删除
  deleteEvent: function(e){
    let that = this;
    let addrList = this.data.addressList;
    let index = e.currentTarget.dataset.index;
    let aid = e.currentTarget.dataset.aid;
    // console.log(index);
    request.request(
      "/address/delete",
      { sessionid: this.data.sessionid, id: aid},
      (res) => {
        if(res.status == 200){
          that.wetoast.toast({
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEMUlEQVRoQ91aTXISQRT+3mCVZKWeQDyB5ARhXFjCxmRrSSQnkJwg5ASSE0gg5Ta4gSoXDp5APEHwBIZVsCrwrNczQwYYZrpnJpByqrJJXnd/3+v33yFk8NUc5+mM/+6BuMhAiYAC3J/gN2JgRMAATEOLHv9o2fZ12uMp6QYKNCZvAa4DVEy2Dw8BalrIf01KxphAzekXZsAHD/jTZMCXV/G1SwTnLbs8MtnTiMCh0z/JFngYEavRtt+c6ZLQIuBqnS+Tm4ouHF+OhxboQOc2Ygm8d3r7FvAZoIzMRZcMX8+Aowu70o1aEUmg6vRrpMBv72PgqGOXW+sQrCXwEMDPDSqCRCgB12zocnt6Xz15Bj4IM6cVAp7D/ty8zcepi68t0O6yY68QOHR6Aj5hYooDkfbvPGzbld3gLgsEDp1+A8BJ2mNSr2eM1R6EJyuZAnzcsStN//dzAg/FdJjxK0f50i1uSuF+uGhKcwIPQ/t81rYrdamzpph8IqC25jZP23ZZrAWKgFuY3VxtzXEZ4xlxTaKMh8WJ9kO5hZ0XUgAqAtuM+a7JYF+iix549078BKcIbDHynFvI10WTJuA9CioikVfX/0kdOQw34EA0MQfvHmYh/4w2nnUZ41vKlb7Yr4c+56rT/xzhsGtVI9mZNhl9/BAZ7L5Snn9K1e+9ARHtGVqAsXgY+LTBg5l/yA1chTTgxgBjFsyd1Zd753wrPsKthMs0fcZICLA+Wj6bgbrE3CKi55rrztt2eSEhJXXasPO0CDDzbyaqXdjlgZ/4pnzT1TC9FfBe2G4C9FFTAZFiegSWCih/x0OnFwUkFPx7p1+yACcL8KqU0DWhda2dCsNMrWDlKA7beVVeKcm9nPMzS5+TKDTSted1JMQhczxtEeFlWLTRvDHjSxHTNg6j60h42pXhVCNsHJK16ah6yAujxk0Mg5sdu3JsorJ7qrdOE5cSDLQ6dvlIh0TV6dUJ9ElH1kRGlRJpijkdEvfZa6hiThhXv/eH4oAm7H3ZOBIxoTbJkWqNH+kyaWiERA754+URuTfJllIl82+hoXEfKCajsCmA/skykN2xgySqTu+SQPv6e2hKMsYW5QvzltJN71mMVO5I3EfYDNBbbOrd+qZfmDGG6W5BWae6iSkmlwSUNHWqLxbQviolgiuzuQW1o7yyLL+R6YOMkAy2oisE0kakTBBGgQ+pscKHu5mYUsZ0lOmgGDvclWM33uhrcNUer/t7pe1XNTBpi0S90vy/T0y+esIaFm3VpREMzEujtol9pfRzxJTRTVovmfIIzkvj1moRuPOLXp2YGumT3RpYjDETN4IPGJkSmGdsmdsz6pkRkRcZgvzPRNP0fyaMbiCoDe8RYl+IJDUtMRUBnkO+awrcx5KYwDIZ70moyMxS/xSWBwXSgEuJQUSDGXj4CDuDpKCDZ/8DLvFB50/aNIkAAAAASUVORK5CYII=',
            title: '删除成功',
            titleClassName: 'my_wetoast_title'
          });
          console.log('删除成功');
          addrList.splice(index, 1);
          that.setData({
            addressList: addrList
          })
        }
      }
    )
    
  },
  //使用收货地址
  useEvent:function(e){
    wx.navigateBack({
      url: '../balance/balance?addrid=' + e.currentTarget.dataset.addrid,
    })
    // wx.redirectTo({
    //   url: '../balance/balance?addrid=' + e.currentTarget.dataset.addrid,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载");
    new app.WeToast();
    this.setData({
      status: options.status
    });
    this.getSessionId();
    console.log(this.data.sessionid);
  },
  getaddressList: function(){
    var that = this;
    if(this.data.sessionid != ''){
      request.request(
        "/address/getall",
        { sessionid: this.data.sessionid },
        (res) => {
          
          let objCheck = [];
          if(res.data.length !=0 ){
            for(let i=0; i<res.data.length; i++){
              let obj = res.data[i]
              if (res.data[i].checked == '0'){
                obj.check = false;
              }else{
                obj.check = true;
              }
              objCheck.push(obj);
            }
            console.log(objCheck);
            that.setData({
              addressList: res.data
            })
          }
        }
      )
    }
    
  },
  getSessionId: function () {
    var that = this;
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        let sessionId = res.data;
        that.setData({
          sessionid: sessionId
        });
        that.getaddressList();
      }
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
    // console.log("监听页面显示");
    this.getaddressList();
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

// function getaddressList(){
//   var arr = [
//     {
//       id: 0,
//       username: "wxx",
//       phonenum: "15738872345",
//       addr: "上海,上海市,闵行区 ",
//       addrDetail: "吴中路1189号8楼836",
//       checked: false
//     }, {
//       id: 1,
//       username: "小五",
//       phonenum: "15738872345",
//       addr: "上海,上海市,普陀区 ",
//       addrDetail: "xxxxxxx",
//       checked: false
//     }
//   ]
//   return arr;
// }