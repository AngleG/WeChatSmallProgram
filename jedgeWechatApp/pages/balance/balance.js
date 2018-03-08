// pages/balance/balance.js
var request = require("../../request/request.js");
var app = getApp();

const date = new Date()
console.log(date.getFullYear());
const thisYears = date.getFullYear();
const years = [thisYears]
const months = []
let days = []
let hours = []
const minutes = ["00", "30"]

// for (let i = 1990; i <= date.getFullYear(); i++) {
//   years.push(i)
// }
const thisMonth = date.getMonth()+1;
const thisDay = date.getDate();
const thisHours = date.getHours() + 2;
const thisMinutes = date.getMinutes();

console.log(thisMonth);

for (let i = thisMonth; i <= 12; i++) {
  months.push(i)
}

for (let i = thisDay; i <= 31; i++) {
  days.push(i)
}


for (let i = thisHours; i<= 20; i++){
  hours.push(i)
}

var val = []

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    url: "https://ha0q.cn/wxshop/",
    sessionid: '',
    addrid: 0,
    ids: '',
    selectWay: 1,
    addrStatus: 'none',
    checkedWay: true,
    inputName: '',
    inputPhone: '',
    balanceProduct: [],
    freight: 0,           //运费
    totalPrice: 0,
    totalPrice1: 0,
    stores: getStoresData(),
    storePopup: false,
    toSelectStore: '请选择门店',
    toSelectAddr: '',
    toSelectAddr1: '',
    addruse: false,
    pickerSlide: false,
    selectTime: false,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: thisMonth,
    days: days,
    day: thisDay,
    hours: hours,
    hour: date.getHours() +2,
    minutes: minutes,
    minute: minutes[0],
    year: date.getFullYear(),
    value: [9999, 0, 0, 1, 0]
  },
  //选择配送方式
  radioChange: function(e){
    console.log(e.detail.value + this.data.checkedWay);
    // let radioChecked = e.detail.value;
    if (this.data.selectWay == 1){
      this.setData({
        selectWay: 2,
        freight: 10
      })
      if(this.data.sessionid){
        request.request(
          '/address/getDefault',
          { sessionid: this.data.sessionid},
          (res) => {
            console.log('存在默认收货地址');
          }
        )
      }
    }else{
      this.setData({
        selectWay: 1,
        freight: 0,
        addruse: false
      })
    }
    this.totalPrice();
  },
  // 输入联系人信息
  inputNameEvent: function(e){
    let name = e.detail.value;
    this.setData({
      inputName: name
    })
    // console.log(this.data.inputName);
  },
  inputPhoneEvent: function (e) {
    let phone = e.detail.value;

    this.setData({
      inputPhone: phone
    })
    // console.log(this.data.inputPhone);
  },
  //请选择门店
  selectStoreEvent: function(e){
    // console.log('123');
    if (!this.data.storePopup){
      this.setData({
        storePopup: true
      })
    }
  },
  //选择收货地址
  selectAddrEvent:function(e){
    
    wx.navigateTo({
      url: '../address/address?status=' + this.data.addrStatus,
    })
  },
  //关闭门店弹出层
  close1BtnEvent: function(){
    if (this.data.storePopup) {
      this.setData({
        storePopup: false
      })
    }
  },
  // 点击选择的门店
  selectThiStore: function(e){
    var thiStore = e.currentTarget.dataset.name;
    console.log(thiStore);
    this.setData({
      toSelectStore: thiStore,
      storePopup: false
    })
  },
  // 拨打电话
  callEvent: function(e){
    console.log(e.currentTarget.dataset.phone);
    let phoneNum = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success: function(){
        console.log("拨打成功");
      }
    })
  },
  // 导航
  openLocationEvent: function(e){
    wx.getLocation({
      type: 'gcj02',      //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: '德必易园',
          address: '闵行区吴中路1189号'
        })
      },
    })
    
  },
  // 选择时间
  bindChange: function (e) {
    val = e.detail.value
    let selectMonths = this.data.months[val[1]];
    // console.log(selectMonths);
    let selectDay = this.data.days[val[2]];
   
    // 选择的月份大于当前月份 根据月份调整每月的天数
    // console.log("--selectDay--" + selectDay + "===" + thisDay);
    if (selectMonths > thisMonth){     
      this.getRealTimeDate(selectMonths, years, false);
      hours = [];
      for (let i = 8; i <= 20; i++) {
        hours.push(i)
      }
    } else {      //选择的月份等于当前月份  根据当前月份调整该月的天数
      this.getRealTimeDate(selectMonths, years, true);
      if (selectDay > thisDay) {
        hours = [];
        for (let i = 8; i <= 20; i++) {
          hours.push(i)
        }
      } else {
        // console.log("----");
        hours = [];
        for (let i = thisHours; i <= 20; i++) {
          hours.push(i)
        }
      }  
    }
    console.log(this.data.hours[0]);
    
    this.setData({
      hours: hours,
      days: days,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
    
  },
  // 点击选择时间
  selectedDateTime: function(e){
    console.log(this.data.pickerSlide);
    this.setData({
      pickerSlide: true,
      selectTime: true
    })
  },
  entureBtnEvent: function(e){
    this.setData({
      pickerSlide: false,
      hours: hours,
      days: days,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
    
  },
  cancelBtnEvent: function(e){
    this.setData({
      pickerSlide: false,
      selectTime: false
    })
  },
  // 提交订单
  submitEvent: function(e){
    let that = this;
    let iptName = this.data.inputName;
    let iptPhone = this.data.inputPhone;
    let store = this.data.toSelectStore;
    let time = this.data.selectTime;
    const promptIcon0 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADcUlEQVRoQ+1a3VHbQBD+VpYmeQsdhFQQUwFQAc5gYeUJ0wFUEKcC6CDmKSIyE6UCTAVxKoipIOaRsazN6BjbkpCt090pDjPoSZ7Zvfu+25/bXZnwzB965vhhhAC3WluzV/YuEZoM7DHTVvKePhxmjIh4QsAweW88RLcUhhPdA9QiEHXaBwB1QWgpAWGEAPftq8EPJX1AzQLRx8NjsNUDsK26cU5vDIp79tfry6rrVbIAu25z1uBzgPaqbiQnz8PGjM4oCEZy8hUsEHluF8znINqSXVxJjnkCojPbD/oy+lIWiDz3C4CuzIIGZfq2H5yUrVdKYEPg57hLSawlsGHwUiRWEhA+DySuU/lh4BbgJEulHuoRsFt5sUeFk1UxUUhAZBuLb1QDlsH7jj8YpsFOvfYegW6UCDBPGhTtkB+O8/qFBCKvfaOTKo0TEKh5aPuD/VICOq4zX7weAsWu9MQCkef+1r1hayQwtv3gXSay0j+io8MWLOu7kp+mlGokAMTxB/vbdTjfLmOBqNMOQXTwXxMAX9r+YHGpLgiIkvi180cXvAg301koB8r2gwXuxYsp9/kXBNJutCAw9do9An16DhZg8GfHH4iLMkXAHWrclBnedbtQctM7fiBK+iWBjvsz3waqWqN2AoyRcxXsZAhEnsuqgPN6dRNI9psH8jKIXwgs7fBiAQlffuJC0447IsJ7CV0JER42iDL9wIyT/sDMMIAZv5yrQMydakmjEgy1RIrTqMGLTAudhHLhRWaylJDAoCeSqkhrKeb00JVrFxZziZqpcrocgo7EinJaEDDU0BDzWUzIjActRpOJznWgC911DY0g4bXHAL3V2ai+i4zvbH+QGSgX9cTK86A56foIPJ0PFY5Vpp5eaV0HgXTuT3vHmsEWhiC8UXEl4wQY9w2aNqUHW4+xoD5aJMapZWWDOI6TIMaFyoFUHi3ON4m8dh+gY8VNDall02Z+UYnx+iZJrAefKebWHddmLFEOXprAIiYYF6qBLe1PjHsQTo1+Ylrkd6+1HcHpm5pe5EklqdLGtFuUbVYdQGkMFCk+ZijRoGjd2Mu1+Q6gnuypl94DsuYWtRMlH7pV56l8iZjD9LBWdu+5nJIFCq1ydNhii5qibWQkfzXItKdJGwjCJPlQQTGPdEAbs0DV06pD3pgF6gAns+ZfjRzPQIn/iXQAAAAASUVORK5CYII=';

    const promptIcon1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEMUlEQVRoQ91aTXISQRT+3mCVZKWeQDyB5ARhXFjCxmRrSSQnkJwg5ASSE0gg5Ta4gSoXDp5APEHwBIZVsCrwrNczQwYYZrpnJpByqrJJXnd/3+v33yFk8NUc5+mM/+6BuMhAiYAC3J/gN2JgRMAATEOLHv9o2fZ12uMp6QYKNCZvAa4DVEy2Dw8BalrIf01KxphAzekXZsAHD/jTZMCXV/G1SwTnLbs8MtnTiMCh0z/JFngYEavRtt+c6ZLQIuBqnS+Tm4ouHF+OhxboQOc2Ygm8d3r7FvAZoIzMRZcMX8+Aowu70o1aEUmg6vRrpMBv72PgqGOXW+sQrCXwEMDPDSqCRCgB12zocnt6Xz15Bj4IM6cVAp7D/ty8zcepi68t0O6yY68QOHR6Aj5hYooDkfbvPGzbld3gLgsEDp1+A8BJ2mNSr2eM1R6EJyuZAnzcsStN//dzAg/FdJjxK0f50i1uSuF+uGhKcwIPQ/t81rYrdamzpph8IqC25jZP23ZZrAWKgFuY3VxtzXEZ4xlxTaKMh8WJ9kO5hZ0XUgAqAtuM+a7JYF+iix549078BKcIbDHynFvI10WTJuA9CioikVfX/0kdOQw34EA0MQfvHmYh/4w2nnUZ41vKlb7Yr4c+56rT/xzhsGtVI9mZNhl9/BAZ7L5Snn9K1e+9ARHtGVqAsXgY+LTBg5l/yA1chTTgxgBjFsyd1Zd753wrPsKthMs0fcZICLA+Wj6bgbrE3CKi55rrztt2eSEhJXXasPO0CDDzbyaqXdjlgZ/4pnzT1TC9FfBe2G4C9FFTAZFiegSWCih/x0OnFwUkFPx7p1+yACcL8KqU0DWhda2dCsNMrWDlKA7beVVeKcm9nPMzS5+TKDTSted1JMQhczxtEeFlWLTRvDHjSxHTNg6j60h42pXhVCNsHJK16ah6yAujxk0Mg5sdu3JsorJ7qrdOE5cSDLQ6dvlIh0TV6dUJ9ElH1kRGlRJpijkdEvfZa6hiThhXv/eH4oAm7H3ZOBIxoTbJkWqNH+kyaWiERA754+URuTfJllIl82+hoXEfKCajsCmA/skykN2xgySqTu+SQPv6e2hKMsYW5QvzltJN71mMVO5I3EfYDNBbbOrd+qZfmDGG6W5BWae6iSkmlwSUNHWqLxbQviolgiuzuQW1o7yyLL+R6YOMkAy2oisE0kakTBBGgQ+pscKHu5mYUsZ0lOmgGDvclWM33uhrcNUer/t7pe1XNTBpi0S90vy/T0y+esIaFm3VpREMzEujtol9pfRzxJTRTVovmfIIzkvj1moRuPOLXp2YGumT3RpYjDETN4IPGJkSmGdsmdsz6pkRkRcZgvzPRNP0fyaMbiCoDe8RYl+IJDUtMRUBnkO+awrcx5KYwDIZ70moyMxS/xSWBwXSgEuJQUSDGXj4CDuDpKCDZ/8DLvFB50/aNIkAAAAASUVORK5CYII=';
    if (this.data.selectWay == 1){
      if (iptName == "" || iptPhone == ""){
        this.wetoast.toast({
          img: promptIcon0,
          title: '请完善提货人信息',
          titleClassName: 'my_wetoast_title'
        })
      } else if (store == "请选择门店"){
        this.wetoast.toast({
          img: promptIcon0,
          title: '请选择门店',
          titleClassName: 'my_wetoast_title'
        })
      }else if(!time){
        this.wetoast.toast({
          img: promptIcon0,
          title: '请选择提货时间',
          titleClassName: 'my_wetoast_title'
        })

      }else{
        console.log('提交订单');
        let timestamp = Date.parse(new Date());
        console.log("当前的时间戳：" + timestamp);
        this.wetoast.toast({
          img: promptIcon1,
          title: '提交成功,待支付 (仅为模拟)',
          titleClassName: 'my_wetoast_title'
        })
      }
      
    }else{
      if (this.data.addrid){
        request.request(
          "/offorder/cartcreate",
          { sessionid: this.data.sessionid, catid: this.data.ids, addressid: this.data.addrid, total_price: this.data.totalPrice1*100, postfee: this.data.freight*100},
          (res) =>{
            if(res.status == 200){
              
              // let timestamp = Date.parse(new Date());
              // console.log("当前的时间戳：" + timestamp);
              wx.requestPayment({
                timeStamp: res.data.timestemps+'',
                nonceStr: res.data.nonce_str,
                package: 'prepay_id=' + res.data.prepay_id,
                signType: 'MD5',
                paySign: res.data.sign,
                success: function(res){
                  console.log("支付成功：" + res);
                  wx.navigateTo({
                    url: '../order/order',
                  });
                  // that.wetoast.toast({
                  //   img: promptIcon1,
                  //   title: '提交成功,待支付 (仅为模拟)',
                  //   titleClassName: 'my_wetoast_title'
                  // })
                },
                fail: function(res){
                  console.log(res);
                }
              }); 
            }
          }
        )
      }else{
        this.wetoast.toast({
          img: promptIcon0,
          title: '请完善收货地址',
          titleClassName: 'my_wetoast_title'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast();
    let ids = options.ids;
    console.log("ids: "+ids);
    if (ids != ''){
      this.setData({
        ids: ids
      })
      
    }
    var that = this;
    let addrid = options.addrid;
    if (addrid){
      that.setData({
        selectWay: 2,
        freight: 10,
        checkedWay: false,
        addruse: true,
        addrid: addrid
      })
      console.log(this.data.addrid);
    }
    
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
    var that=this;
    this.getBalanceData();
    // this.totalPrice();
    
    this.getDefaultAddr();
    
  },
  //获取默认收货地址
  getDefaultAddr: function(){
    let that = this;
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        let sessionId = res.data;
        that.setData({
          sessionid: sessionId
        });
        if (that.data.sessionid) {
          request.request(
            '/address/getDefault',
            { sessionid: that.data.sessionid },
            (res) => {
              if (res.data) {
                console.log('存在默认收货地址');
                that.setData({
                  addrid: res.data.id,
                  addruse: true,
                  toSelectAddr: res.data.username + " " + res.data.telephone,
                  toSelectAddr1: res.data.province + "/" + res.data.city + "/" + res.data.district + "/" + res.data.addrDetail
                })
              }else{
                that.setData({
                  addrid: 0,
                  addruse: false,
                  toSelectAddr: '',
                  toSelectAddr1: ''
                })
              }
            }
          )
        }
      }
    })
  },
  getRealTimeDate(objMonth,objYears,istoday){
    let x=1
    if (istoday){
      x = thisDay;
    }
    if (objMonth == 4 || objMonth == 6 || objMonth == 9 || objMonth == 11) {
      days = [];
      for (let i = x; i <= 30; i++) {
        days.push(i)
      }
    } else if (objMonth == 2) {
      if ((0 === objYears[0] % 4) && (0 === objYears[0] % 100) || (0 === objYears[0] % 400)) {  //闰年
        days = [];
        for (let i = x; i <= 29; i++) {
          days.push(i)
        }
      } else {   //平年
        days = [];
        for (let i = x; i <= 28; i++) {
          days.push(i)
        }
      }
    } else {
      days = [];
      for (let i = x; i <= 31; i++) {
        days.push(i)
      }
    }
  },
  // totalPrice
  totalPrice(){
    let balanceProduct = this.data.balanceProduct;
    let totalPrice = 0;
    for (let i = 0; i < balanceProduct.length; i++){
      totalPrice += balanceProduct[i].itemPrice/100 * balanceProduct[i].num;
    }
    
    if (this.data.selectWay == 1){
      this.setData({
        totalPrice: totalPrice,
        totalPrice1: totalPrice
      })
    }else{
      this.setData({
        totalPrice: totalPrice,
        totalPrice1: (totalPrice + this.data.freight)
      })
    }
  },
  getBalanceData: function(){
    var that = this;
    if(this.data.ids != ''){
      wx.getStorage({
        key: 'sessionid',
        success: function (res) {
          let sessionId = res.data;
          that.setData({
            sessionid: sessionId
          })
          console.log("sessionid:" + that.data.sessionid);
          if (that.data.sessionid) {
            request.request(
              "/update/cart/" + that.data.ids,
              { sessionid: that.data.sessionid },
              (res) => {
                if(res.status == 200){
                  that.setData({
                    balanceProduct: res.data
                  })
                  that.totalPrice();
                }
              }
            )
          }
        }
      })
    }
    // if(){

    // }
  }
})
//获取字符串
// function getRandomStr(){
//   var randomStr = '';
//   var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//   for(let i=0; i<32; i++){
//     randomStr += chars[parseInt(Math.random()*62)];
//   }
//   return randomStr;
// }

function getStoresData(){
  var arr = [
    {
      id: 0,
      area: '开福区',
      name: '多穗麦吉',
      address: '开福区芙蓉中路华创国际广场购物中心一层B-110',
      phone: '64826292'
    },
    {
      id: 1,
      area: '芙蓉区',
      name: '王府店',
      address: '芙蓉区车站北路230号步步高生活广场王府店一层',
      phone: '64826292'
    }
  ]
  return arr;
}