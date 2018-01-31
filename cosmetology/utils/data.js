/**
 * banner数据
 */
function getBannerData(){
  var arr = ['../../images/banner_01.png', '../../images/banner_02.png','../../images/banner_03.png','../../images/banner_04.png']
  return arr
}

/**
 * 首页nav数据
 */
function getIndexNavData(){
  var arr = [
    {
      id:1,
      icon:"../../images/nav_icon_01.png",
      title: "推荐"
    },
    {
      id:2,
      icon:"../../images/nav_icon_02.png",
      title: "美甲"
    },
    {
      id:3,
      icon:"../../images/nav_icon_03.png",
      title:"美容"
    },
    {
      id:4,
      icon:"../../images/nav_icon_04.png",
      title:"美发"
    },
    {
      id:5,
      icon:"../../images/nav_icon_05.png",
      title:"美睫"
    }
  ]
  return arr
}

/**
 * 首页对应标签内容数据
 */
function getIndexNavSectionData(){
  var arr = [
    [
      {
        artype: 'nails',
        subject:"秋季自然特价美甲",
        coverpath:"../../images/recommend_img_01.png",
        price:"￥198",
        message:"我们追求的是没有最长只有更长！"
      },
      {
        artype: 'eyelash',
        subject: "睫毛稀疏 种睫毛来帮忙",
        coverpath: "../../images/recommend_img_02.png",
        price: "￥1888",
        message: "我们追求的是没有最长只有更长！"
      },
      {
        artype: 'beauty',
        subject: "爱丽克EircParisSalon",
        coverpath: "../../images/recommend_img_03.png",
        price: "￥1588",
        message: "我们追求的是没有最长只有更长！"
      },
      {
        artype: 'hair',
        subject: "伊本造型",
        coverpath: "../../images/recommend_img_05.png",
        price: "￥198",
        message: "伊本造型是由著名形象设计师杨进先生创办."
      },
      {
        artype: 'beauty1',
        subject: "画对了妆，微微一笑颜值倍儿高！",
        coverpath: "../../images/recommend_img_06.png",
        price: "￥198",
        message: "《微微一笑很倾城》的剧照简直美腻到不要不要的."
      }
    ],
    [
      {
        artype:'nails',
        subject:"秋季自然美甲",
        coverpath:"../../images/recommend_img_01.png",
        price:"￥198",
        message:"我们追求的是没有最长只有更长！"
      }
    ],
    [
      {
        artype: 'beauty',
        subject: "爱丽克EircParisSalon",
        coverpath: "../../images/recommend_img_03.png",
        price: "￥1588",
        message: "我们追求的是没有最长只有更长！"
      },
      {
        artype: 'beauty1',
        subject: "画对了妆，微微一笑颜值倍儿高！",
        coverpath: "../../images/recommend_img_06.png",
        price: "￥198",
        message: "《微微一笑很倾城》的剧照简直美腻到不要不要的"
      }
    ],
    [
      {
        artype: 'hair',
        subject: "伊本造型",
        coverpath: "../../images/recommend_img_05.png",
        price: "￥198",
        message: "《微微一笑很倾城》的剧照简直美腻到不要不要的"
      }
    ],
    [
      {
        artype: 'eyelash',
        subject: "睫毛稀疏 种睫毛来帮忙",
        coverpath: "../../images/recommend_img_02.png",
        price: "￥1888",
        message: "我们追求的是没有最长只有更长!"
      }
    ]
  ]
  return arr
}
/**
 * 选择器数据
 */
function getPickerData(){
  var arr = [
    {
      name:'小敏',
      phone:'18236781526',
      province:'郑州',
      city:'郑州',
      addr:'金水区郑汴路xx大厦B座1206'
    },
    {
      name:'xx',
      phone:'15738893646',
      province:'上海',
      city:'上海',
      addr:'闵行区吴中路1189号易园'
    }
  ]
  return arr;
}

/**
 * 用户信息
 */
function userData(){
  var arr = {
    uid:'1',
    nickname:'小怪兽',
    name:'小晋',
    phone:'18236781526',
    avatar:'../../images/avatar.png',
    addrs:[
      {
        addrid:'1',
        name: '小晋',
        phone: '18236781526',
        province: '郑州',
        city: '直辖市',
        addr: '金水区郑汴路xx大厦B座1206'
      },
      {
        addrid: '2',
        name: 'xx',
        phone: '15738893646',
        province: '上海',
        city: '直辖市',
        addr: '闵行区吴中路1189号易园'
      }
    ]
  }
  return arr
}
/**
 * 技师数据
 */
function getSkillData(){
  var arr = [
    {
      artype: 'hair',
      company: "西狮独品美容美发有限公司",
      avatar:"../../images/skilledt_img_01.png",
      nickname:"张技师",
      price:"￥500",
      message:"从事美发行业10余年，有丰富经验",
      distance:"300m"
    },
    {
      artype: 'nails',
      company: "圆月亮美甲沙龙",
      avatar: "../../images/skilledt_img_02.png",
      nickname: "包技师",
      price: "￥800",
      message: "从事美发行业20余年，有丰富经验",
      distance: "380m"
    },
    {
      artype: 'eyelash',    
      company: "璀璨美睫会所",
      avatar: "../../images/skilledt_img_03.png",
      nickname: "吴技师",
      price: "￥600",
      message: "从事美发行业20余年，有丰富经验",
      distance: "200m"
    },
    {
      artype: 'beauty1',    
      company: "柔丝妮美容养生馆",
      avatar: "../../images/skilledt_img_04.png",
      nickname: "郭技师",
      price: "￥800",
      message: "从事美发行业30余年，有丰富经验",
      distance: "400m"
    }
  ]
  return arr
}
/**
   * 查询地址
   */
var user_data = userData();
function searchAddrFromAddrs(addrid){
  var result;
  for(let i=0; i<user_data.addrs.length; i++){
    var addr = user_data.addrs[i]
    console.log(addr);
    if(addr.addrid == addrid){
      result = addr
    }
  }
  return result || {}
}

/**
 * 省
 */
function provinceData(){
    var arr = [
      '请选择省份', '河南省'
    ]
    return arr
  }
/**
 * 市
 */
function cityData(){
    var arr = [
      '请选择城市', '郑州市', '开封市', '信阳市'
    ]
    return arr
  }

/**
 * 对外暴露接口
 */
module.exports = {
  getBannerData: getBannerData,
  getIndexNavData: getIndexNavData,
  getIndexNavSectionData: getIndexNavSectionData,
  getPickerData: getPickerData,
  userData: userData,
  getSkillData: getSkillData,
  cityData: cityData,
  provinceData: provinceData,
  searchAddrFromAddrs: searchAddrFromAddrs
}