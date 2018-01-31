// banner 数据
function getBannerData(){
  var arr = ['../../images/b1.jpg', '../../images/b2.jpg'];
  return arr;
}

//nav Data
function getNavIndexData(){
  var arr = [
    {
      id: 0,
      icon: '../../images/zhaopai-product.png',
      title: '招牌产品'
    },
    {
      id: 1,
      icon: '../../images/hot-product.png',
      title: '热销产品'
    },
    {
      id: 2,
      icon: '../../images/latest-product.png',
      title: '最新产品'
    },
    {
      id: 3,
      icon: '../../images/recom-product.png',
      title: '推荐产品'
    }
  ]
  return arr;
}

// product List
function getProductData(){
  var arr = [
    [
      {
        id: 0,
        imgUrl: '../../images/product1.jpg',
        title: '鲜果盛宴 水果蛋糕',
        price: '￥248',
        carImg: '../../images/car.png'
      },
      {
        id: 1,
        imgUrl: '../../images/product1.jpg',
        title: '水果蛋糕',
        price: '￥229',
        carImg: '../../images/car.png'
      },
      {
        id: 2,
        imgUrl: '../../images/product2.jpg',
        title: '蔓越莓红丝绒蛋糕',
        price: '￥300',
        carImg: '../../images/car.png'
      },
      {
        id: 3,
        imgUrl: '../../images/product4.jpg',
        title: '安逸兔蛋糕',
        price: '￥288',
        carImg: '../../images/car.png'
      },
      {
        id: 4,
        imgUrl: '../../images/product3.jpg',
        title: '蓝莓轻乳拿破仑',
        price: '￥298',
        carImg: '../../images/car.png'
      }
    ],
    [
      {
        id: 4,
        imgUrl: '../../images/product3.jpg',
        title: '蓝莓轻乳拿破仑',
        price: '￥298',
        carImg: '../../images/car.png'
      },
      {
        id: 3,
        imgUrl: '../../images/product2.jpg',
        title: '蔓越莓红丝绒蛋糕',
        price: '￥300',
        carImg: '../../images/car.png'
      }
    ],
    [
      {
        id: 1,
        imgUrl: '../../images/product1.jpg',
        title: '水果蛋糕',
        price: '￥229',
        carImg: '../../images/car.png'
      },
      {
        id: 1,
        imgUrl: '../../images/product1.jpg',
        title: '水果蛋糕',
        price: '￥229',
        carImg: '../../images/car.png'
      },
      {
        id: 3,
        imgUrl: '../../images/product2.jpg',
        title: '蔓越莓红丝绒蛋糕',
        price: '￥300',
        carImg: '../../images/car.png'
      }
    ],
    [
      {
        id: 4,
        imgUrl: '../../images/product5.jpg',
        title: '爱丽丝花境',
        price: '￥298',
        carImg: '../../images/car.png'
      },
      {
        id: 5,
        imgUrl: '../../images/product6.jpg',
        title: '拿破仑莓恋',
        price: '￥318',
        carImg: '../../images/car.png'
      }
    ]
  ]
  return arr;
}

// 对外暴露接口
module.exports = {
  getBannerData: getBannerData,
  getNavIndexData: getNavIndexData,
  getProductData: getProductData
}