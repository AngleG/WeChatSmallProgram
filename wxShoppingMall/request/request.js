var utils = require('../utils/util');
const api = "https://ha0q.cn/wxshop";

/**
 * 网络请求
 */
function request(url, data, successCb, errorCb, completeCb) {
  wx.request({
    url: api + url,
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (res) {
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function (res) {
      utils.isFunction(completeCb) && completeCb();
    }
  })
}
// 对外暴露接口
module.exports= {
  request: request
}