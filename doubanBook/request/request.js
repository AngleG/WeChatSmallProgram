var API = require('./api.js');
var utils = require('../utils/util');

/**
 * 网络请求
 */
function request(url, data, successCb, errorCb, completeCb){
  wx.request({
    url: url,
    data: data,
    header: {
      'Content-Type': 'applciation/json'
    },
    method: 'GET',
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

/**
 * 搜索图书
 */
function requestSearchBook(data, successCb, errorCb, completeCb){
  request(API.api_book_search, data, successCb, errorCb, completeCb);
}

/**
 * 获取图书详细信息
 */
function requestBookDetail(id, data, successCb, errorCb, completeCb){
  request(API.api_book_detail.replace(':id',id), data, successCb, errorCb, completeCb);
}
/**
 * 关键字是否是tag
 */
function requestHasTag(tag, successCb, errorCb, completeCb){
  request(API.api_book_search, {tag: tag, count: 1}, successCb, errorCb, completeCb);
}

module.exports = {
  requestSearchBook: requestSearchBook,
  requestBookDetail: requestBookDetail,
  requestHasTag: requestHasTag
}
 