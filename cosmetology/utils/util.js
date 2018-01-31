const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 转换地址数据
 */
function replacePhone(arr, isreplace){
  var newAddr = [];
  for(let i=0; i<arr.length; i++){
    if(isreplace){""
      let phone = arr[i].phone;
      arr[i].phone = phone.replace(phone.substring(3,7), "****");
    }
    newAddr[i] = arr[i].name + ' ' + arr[i].phone + '\n' + arr[i].province + arr[i].city + arr[i].addr
  }
  return newAddr;
}
module.exports = {
  formatTime: formatTime,
  replacePhone: replacePhone
}
