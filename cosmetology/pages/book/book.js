// pages/book/book.js
var app = getApp()
var fileData = require('../../utils/data')
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrArray: util.replacePhone(fileData.userData().addrs, true),
    addrIndex:0,
    date: '2017-12-08',
    time: '13:30',
    bookToastHidden:true,
    state:'',
    leaveWords:''
  },

  /**
   * 选择地址
   */
  bindAddrPickerChange:function(e){
    console.log("addrPicker发送改变选择，携带值为："+e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },

  bindDateChange:function(e){
    console.log("date Picker发送改变选择，携带值为：" + e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e){
    console.log("time Picker发送改变选择，携带值为：" +e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },
  bindWords:function(e){
    console.log(e.detail.value);
    if (e.detail.value != undefined){
      this.setData({
        leaveWords: e.detail.value
      })
    }
  },
  bindToastTap:function(){
    
    var that = this;
    if (this.data.leaveWords != undefined && this.data.leaveWords != ""){
      console.log(this.data.leaveWords);
      that.wetoast.toast({
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMA+0IPA2iTLO7YuiXr4/IcCqYkFbKZN/bUiHlbBs7J3L5hTtvDjFFx6Uzm0WRUAAAB20lEQVRo3u3Zy3KCQBCF4R4QFZGL4F0x4jXp93/AVBbmFFMx4MB0pVLz7bv+zdk1OY7jOI7j/C3ROh6RGG/MPBXrBYpZrDcYMrNYz5/ww5Ssi0L+FpM1GAlqOVkWKIkaRiJRw0jgLSW7olCy5o1FahgJhNZqGAmsC7LKn0jWolCmhpFAaa2GkcDBJyswEsGaPxGqYSRwsVbDSOCYkU2BkqhhJEI1jAQm1moYCcz3ZJE3lqwFSqqGkcDMXg0jQW1A9kShcS39MBiJcc0/89w3GgksUGsyY+bzyGQkqFFrFX9ZVQYjMahFyeMmazuSDrWs5IcyNxoJX6m9IUNyMxgJb+gF9evroHEkJjW4cs0lbRiJWQ0WXPPutRgJbOlVM65R24aRGNVgoPV4XjSOBDWD3pzr4mXDSFAzsdd7KmgxEr6ToezImlnWNBIOyFh2Yc16pI+kew38A2uSnT6S7jXwS9YN909HoirqqFiz7pA+GYnaUWfFmXXjXeGF/dYgfeNmqHXvxa1qN+pJ3qKnTtSb0VSmhp5EDZYJ/2LlEQn0UOudtxKpoackanD6sZcsyZKbkqjBTknUoBKpQcAg8Te6i9RgK1KDjWANvTgnIQvURGxUmZPjOI7jOM7/9wkPMejs5BepRwAAAABJRU5ErkJggg==',
        imgClassName: 'my_wetoast_img',
        imgMode: 'scaleToFill',
        title: '预约成功',
        titleClassName:'my_wetoast_title',
        success(data){
          console.log(Date.now() + ':success')
        },
        fail(data){
          console.log(Date.now() + ':fail')
        },
        complete(data){
          console.log(Date.now() + ':complete')  //无论成功或失败，complete都会执行
        }
      })
      // that.setData({
      //   state:'预约成功',
      //   bookToastHidden: false
      // })
    }else{
      console.log('预约失败');
      that.wetoast.toast({
        title: '请输入留言',
        titleClassName: 'my_wetoast_title'
      })
      // that.setData({
      //   state: '请输入留言',
      //   bookToastHidden: false
      // })
    }
  },

/**
 * hideToast
 */
  hideToast: function(){
    this.setData({
      bookToastHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.artype = options.artype
    this.setData({
      artype: this.artype
    })
    new app.WeToast()
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