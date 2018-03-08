// pages/addAddress/addAddress.js
var requ = require("../../request/request.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionid: '',
    id: 0,
    region: ['请点击选择省', '市', '区'],
    inputName: '',
    inputPhone: '',
    addrDetail: '',
    checked: false,
    check: '0'
  },
  inputNameEvent: function(e){
    let name = e.detail.value;
    console.log(name);
    this.setData({
      inputName: name
    })
  },
  inputPhoneEvent: function(e){
    let phone = e.detail.value;
    this.setData({
      inputPhone: phone
    })
  },
  inputAddrEvent: function(e){
    let addrDatail = e.detail.value;
    this.setData({
      addrDetail: addrDatail
    })
  },
  checkboxChange: function(e){
    if (!this.data.checked){
      this.setData({
        checked: true,
        check: '1',
        checkAddr: true
      })
    }else{
      this.setData({
        checked: false,
        check: '0'
      })
    }
    console.log(this.data.checked);
  },
  saveEvent: function(e){
    wx.redirectTo({
      url: '../address/address'
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //保存
  saveEvent:function(){
    var that = this;
    let iptName = this.data.inputName;
    let iptPhone = this.data.inputPhone;
    let iptAddr = this.data.addrDetail;
    let regions = this.data.region[0];
    
    const promptIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADcUlEQVRoQ+1a3VHbQBD+VpYmeQsdhFQQUwFQAc5gYeUJ0wFUEKcC6CDmKSIyE6UCTAVxKoipIOaRsazN6BjbkpCt090pDjPoSZ7Zvfu+25/bXZnwzB965vhhhAC3WluzV/YuEZoM7DHTVvKePhxmjIh4QsAweW88RLcUhhPdA9QiEHXaBwB1QWgpAWGEAPftq8EPJX1AzQLRx8NjsNUDsK26cU5vDIp79tfry6rrVbIAu25z1uBzgPaqbiQnz8PGjM4oCEZy8hUsEHluF8znINqSXVxJjnkCojPbD/oy+lIWiDz3C4CuzIIGZfq2H5yUrVdKYEPg57hLSawlsGHwUiRWEhA+DySuU/lh4BbgJEulHuoRsFt5sUeFk1UxUUhAZBuLb1QDlsH7jj8YpsFOvfYegW6UCDBPGhTtkB+O8/qFBCKvfaOTKo0TEKh5aPuD/VICOq4zX7weAsWu9MQCkef+1r1hayQwtv3gXSay0j+io8MWLOu7kp+mlGokAMTxB/vbdTjfLmOBqNMOQXTwXxMAX9r+YHGpLgiIkvi180cXvAg301koB8r2gwXuxYsp9/kXBNJutCAw9do9An16DhZg8GfHH4iLMkXAHWrclBnedbtQctM7fiBK+iWBjvsz3waqWqN2AoyRcxXsZAhEnsuqgPN6dRNI9psH8jKIXwgs7fBiAQlffuJC0447IsJ7CV0JER42iDL9wIyT/sDMMIAZv5yrQMydakmjEgy1RIrTqMGLTAudhHLhRWaylJDAoCeSqkhrKeb00JVrFxZziZqpcrocgo7EinJaEDDU0BDzWUzIjActRpOJznWgC911DY0g4bXHAL3V2ai+i4zvbH+QGSgX9cTK86A56foIPJ0PFY5Vpp5eaV0HgXTuT3vHmsEWhiC8UXEl4wQY9w2aNqUHW4+xoD5aJMapZWWDOI6TIMaFyoFUHi3ON4m8dh+gY8VNDall02Z+UYnx+iZJrAefKebWHddmLFEOXprAIiYYF6qBLe1PjHsQTo1+Ylrkd6+1HcHpm5pe5EklqdLGtFuUbVYdQGkMFCk+ZijRoGjd2Mu1+Q6gnuypl94DsuYWtRMlH7pV56l8iZjD9LBWdu+5nJIFCq1ydNhii5qibWQkfzXItKdJGwjCJPlQQTGPdEAbs0DV06pD3pgF6gAns+ZfjRzPQIn/iXQAAAAASUVORK5CYII=';
    if (iptName == '' || iptPhone == '' || iptAddr == '' || regions == '请点击选择省'){
      
      this.wetoast.toast({
        img: promptIcon,
        title: '请完善收货信息',
        titleClassName: 'my_wetoast_title'
      })
    }else{
      let regions = this.data.region;
      let aid = this.data.id;
      if (aid == undefined){
        aid = 0;
      }
      if(this.data.sessionid !=''){
      requ.request(
        "/address/add",
        { sessionid: this.data.sessionid, id: aid, username: encodeURI(iptName), telephone: iptPhone, addr: encodeURI(regions.toString()), addrDetail: encodeURI(iptAddr),checked: this.data.check},
        (res) => {
          if(res.status == 200){
            that.wetoast.toast({
              img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEMUlEQVRoQ91aTXISQRT+3mCVZKWeQDyB5ARhXFjCxmRrSSQnkJwg5ASSE0gg5Ta4gSoXDp5APEHwBIZVsCrwrNczQwYYZrpnJpByqrJJXnd/3+v33yFk8NUc5+mM/+6BuMhAiYAC3J/gN2JgRMAATEOLHv9o2fZ12uMp6QYKNCZvAa4DVEy2Dw8BalrIf01KxphAzekXZsAHD/jTZMCXV/G1SwTnLbs8MtnTiMCh0z/JFngYEavRtt+c6ZLQIuBqnS+Tm4ouHF+OhxboQOc2Ygm8d3r7FvAZoIzMRZcMX8+Aowu70o1aEUmg6vRrpMBv72PgqGOXW+sQrCXwEMDPDSqCRCgB12zocnt6Xz15Bj4IM6cVAp7D/ty8zcepi68t0O6yY68QOHR6Aj5hYooDkfbvPGzbld3gLgsEDp1+A8BJ2mNSr2eM1R6EJyuZAnzcsStN//dzAg/FdJjxK0f50i1uSuF+uGhKcwIPQ/t81rYrdamzpph8IqC25jZP23ZZrAWKgFuY3VxtzXEZ4xlxTaKMh8WJ9kO5hZ0XUgAqAtuM+a7JYF+iix549078BKcIbDHynFvI10WTJuA9CioikVfX/0kdOQw34EA0MQfvHmYh/4w2nnUZ41vKlb7Yr4c+56rT/xzhsGtVI9mZNhl9/BAZ7L5Snn9K1e+9ARHtGVqAsXgY+LTBg5l/yA1chTTgxgBjFsyd1Zd753wrPsKthMs0fcZICLA+Wj6bgbrE3CKi55rrztt2eSEhJXXasPO0CDDzbyaqXdjlgZ/4pnzT1TC9FfBe2G4C9FFTAZFiegSWCih/x0OnFwUkFPx7p1+yACcL8KqU0DWhda2dCsNMrWDlKA7beVVeKcm9nPMzS5+TKDTSted1JMQhczxtEeFlWLTRvDHjSxHTNg6j60h42pXhVCNsHJK16ah6yAujxk0Mg5sdu3JsorJ7qrdOE5cSDLQ6dvlIh0TV6dUJ9ElH1kRGlRJpijkdEvfZa6hiThhXv/eH4oAm7H3ZOBIxoTbJkWqNH+kyaWiERA754+URuTfJllIl82+hoXEfKCajsCmA/skykN2xgySqTu+SQPv6e2hKMsYW5QvzltJN71mMVO5I3EfYDNBbbOrd+qZfmDGG6W5BWae6iSkmlwSUNHWqLxbQviolgiuzuQW1o7yyLL+R6YOMkAy2oisE0kakTBBGgQ+pscKHu5mYUsZ0lOmgGDvclWM33uhrcNUer/t7pe1XNTBpi0S90vy/T0y+esIaFm3VpREMzEujtol9pfRzxJTRTVovmfIIzkvj1moRuPOLXp2YGumT3RpYjDETN4IPGJkSmGdsmdsz6pkRkRcZgvzPRNP0fyaMbiCoDe8RYl+IJDUtMRUBnkO+awrcx5KYwDIZ70moyMxS/xSWBwXSgEuJQUSDGXj4CDuDpKCDZ/8DLvFB50/aNIkAAAAASUVORK5CYII=',
              title: '保存成功',
              titleClassName: 'my_wetoast_title'
            });
            setTimeout(function(){
              wx.redirectTo({
                url: '../address/address',
              })
            },1200);
            
          }
        }
      )
      }
    }
    
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast();
    this.getSessionId();
    let id = options.id;
    console.log(id);
    this.setData({
      id: id
    })
    
  },
  getEditAddr: function(){
    var that = this;
    requ.request(
      "/address/get",
      {sessionid: this.data.sessionid, id: this.data.id },
      (res)=>{
        if(res.data.length != 0){
          
          if (res.data.checked == '0'){
            that.setData({
              checked: false
            })
          }else{
            that.setData({
              checked: true
            })
          }
          that.setData({
            inputName: res.data.username,
            inputPhone: res.data.telephone,
            region: [res.data.province, res.data.city, res.data.district],
            addrDetail: res.data.addrDetail,
          })
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.id != undefined && this.data.sessionid != '') {
      this.getEditAddr();
    }
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