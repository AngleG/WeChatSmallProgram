// pages/edit_addr/edit_addr.js
var app = getApp()
var fileData = require("../../utils/data")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: fileData.provinceData(),
    city: fileData.cityData(),
    proviIndex: 0,
    cityIndex: 0,
    phoneNumber: '',
    codeValue:'',
    provinceValue:'',
    cityValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var init = fileData.searchAddrFromAddrs(options.addrid);
    this.setData({
      data_name:init.name,
      data_phone:init.phone,
      data_province:init.province,
      data_addr:init.addr
    })
    new app.WeToast()
  },
// 省份选择
  bindProviPickerChange: function(e){
    console.log('province picker发送选择改变，携带值为：'+e.detail.value)
    this.setData({
      proviIndex: e.detail.value,
      provinceValue: e.detail.value
    })
  },
// 城市选择
  bindCityPickerChange:function(e){
    console.log('city picker发送选择改变，携带值为：' + e.detail.value)
    if (e.detail.value != 0){
      this.setData({
        cityIndex: e.detail.value,
        cityValue: e.detail.value
      })
    }
    
  },
  //验证手机号
  testPhone: function(e){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    console.log(e.detail.value.length);
    this.setData({
      phoneNumber: e.detail.value
    })
    if (!myreg.test(this.data.phoneNumber) || this.data.phoneNumber.length == 0) {
      that.wetoast.toast({
        title: '手机号有误',
        titleClassName: 'my_wetoast_title'
      })
      return false
    }
  },

  bindCodeIpt:function(e){
    console.log(e.detail.value)
    if (e.detail.value != undefined){
      this.setData({
        codeValue: e.detail.value
      })
    }
  },
//提交
  submitForm:function(e){
   
    var that = this;
    var pro = this.data.provinceValue;
    var cit = this.data.cityValue;
    var code = this.data.codeValue;
    var phone = this.data.data_phone;
    setTimeout(function(){
      if (pro == '' || cit == '' || code == "" || phone == "") {
        that.wetoast.toast({
          title: '请完善信息',
          titleClassName: 'my_wetoast_title'
        })
      } else {
        that.wetoast.toast({
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMA+0IPA2iTLO7YuiXr4/IcCqYkFbKZN/bUiHlbBs7J3L5hTtvDjFFx6Uzm0WRUAAAB20lEQVRo3u3Zy3KCQBCF4R4QFZGL4F0x4jXp93/AVBbmFFMx4MB0pVLz7bv+zdk1OY7jOI7j/C3ROh6RGG/MPBXrBYpZrDcYMrNYz5/ww5Ssi0L+FpM1GAlqOVkWKIkaRiJRw0jgLSW7olCy5o1FahgJhNZqGAmsC7LKn0jWolCmhpFAaa2GkcDBJyswEsGaPxGqYSRwsVbDSOCYkU2BkqhhJEI1jAQm1moYCcz3ZJE3lqwFSqqGkcDMXg0jQW1A9kShcS39MBiJcc0/89w3GgksUGsyY+bzyGQkqFFrFX9ZVQYjMahFyeMmazuSDrWs5IcyNxoJX6m9IUNyMxgJb+gF9evroHEkJjW4cs0lbRiJWQ0WXPPutRgJbOlVM65R24aRGNVgoPV4XjSOBDWD3pzr4mXDSFAzsdd7KmgxEr6ToezImlnWNBIOyFh2Yc16pI+kew38A2uSnT6S7jXwS9YN909HoirqqFiz7pA+GYnaUWfFmXXjXeGF/dYgfeNmqHXvxa1qN+pJ3qKnTtSb0VSmhp5EDZYJ/2LlEQn0UOudtxKpoackanD6sZcsyZKbkqjBTknUoBKpQcAg8Te6i9RgK1KDjWANvTgnIQvURGxUmZPjOI7jOM7/9wkPMejs5BepRwAAAABJRU5ErkJggg==',
          imgClassName: 'my_wetoast_img',
          imgMode: 'scaleToFill',
          title: '保存成功',
          titleClassName: 'my_wetoast_title',
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
      }
    }, 500)
    
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