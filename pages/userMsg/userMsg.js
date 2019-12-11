const app = new getApp()
let time = require('../../utils/util.js')
import areaList from "../../lib/area.js"
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    // 用户信息
    userMsg: {},
    // 昵称
    nickname: '',
    // 个性签名
    signature: "",
    // 省份id
    province: "",
    provinceCode: "",
    // 城市id
    city: "",
    cityCode: "",
    // 性别
    gender: "保密",
    updateGender:0,
    // 生日
    birthday: "",
    updateBirthday: "",
    // 底部栏音乐播放显示标志
    bottomFlag: false,
    // 是否显示弹出层
    showData: false,
    showCity: false,
    showGender:false,
    // activeNames: ['0'],
    currentDate: new Date().getTime(),
    minDate: new Date(new Date() - 36500 * 24 * 3600 * 1000).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },
  // 确认生日
  confirmBirthday(event) {
    this.setData({
      updateBirthday: event.detail,
      birthday: time.formatTimeTwo(event.detail, 'Y-M-D'),
      showData: false
    });
  },
  // 确认地址
  confirmCity(e) {
    console.log(e.detail.values, 444)
    this.setData({
      provinceCode: e.detail.values[0].code,
      province: e.detail.values[0].name,
      cityCode: e.detail.values[1].code,
      city: e.detail.values[1].name,
      showCity: false
    })
  },
  // 确认个性签名
  confirmSignature(e) {
    this.setData({
      signature: e.detail
    })
  },
  // 确认昵称
  confirmName(e) {
    this.setData({
      nickname: e.detail
    })
  },
  // 显示性别弹出层
  showGenderPopup(){
    this.setData({
      showGender: true
    });
  },
  // 关闭弹出层
  onClose(){
    this.setData({
      showGender: false,
      showData: false,
      showCity: false
    });
  },
  // 关闭生日弹出层
  cancelBirthday(){
    this.setData({
      showData: false
    });
  },
  // 关闭地址弹出层
  cancelCity(){
    this.setData({
      showCity: false
    });
  },
  // 显示弹出层
  showDataPopup() {
    this.setData({
      showData: true
    });
  },
  showCityPopup() {
    this.setData({
      showCity: true
    });
  },
  // 选择性别
  chooseGender(e) {
    if (e.currentTarget.dataset.gender === 0) {
      this.setData({
        updateGender: e.currentTarget.dataset.gender,
        showGender: false,
        gender: "保密"
      })
    } else if (e.currentTarget.dataset.gender === 1) {
      this.setData({
        updateGender: e.currentTarget.dataset.gender,
        showGender: false,
        gender: "男"
      })
    } else {
      this.setData({
        updateGender: e.currentTarget.dataset.gender,
        showGender: false,
        gender: "女"
      })
    }
  },
  //更新用户信息
  update() {
    app.globalData.fly.get(`/user/update?gender=${this.data.updateGender}&signature=${this.data.signature}&city=${this.data.cityCode}&nickname=${this.data.nickname}&birthday=${this.data.updateBirthday}&province=${this.data.provinceCode}`).then(res => {
      console.log(111)
    }).catch(err => {
      this.data.userMsg.profile.gender = this.data.updateGender
      this.data.userMsg.profile.signature = this.data.signature
      this.data.userMsg.profile.city = this.data.cityCode
      this.data.userMsg.profile.nickname = this.data.nickname
      this.data.userMsg.profile.birthday = this.data.updateBirthday
      this.data.userMsg.profile.province = this.data.provinceCode
      this.setData({
        userMsg: this.data.userMsg
      })
      wx.setStorageSync("userMsg", this.data.userMsg)
      wx.switchTab({
        url: '../me/me',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userMsg: wx.getStorageSync("userMsg"),
      birthday: time.formatTimeTwo(wx.getStorageSync("userMsg").profile.birthday, 'Y-M-D'),
      updateBirthday: wx.getStorageSync("userMsg").profile.birthday,
      nickname: wx.getStorageSync("userMsg").profile.nickname,
      signature: wx.getStorageSync("userMsg").profile.signature,
      areaList: areaList,
      provinceCode: wx.getStorageSync("userMsg").profile.province,
      cityCode: wx.getStorageSync("userMsg").profile.city,
    })
    this.setData({
      province: areaList.province_list[this.data.provinceCode],
      city: areaList.city_list[this.data.cityCode]
    })
    if (wx.getStorageSync("userMsg").profile.gender === 0) {
      this.setData({
        gender: "保密",
        updateGender:0
      })
    } else if (wx.getStorageSync("userMsg").profile.gender === 1) {
      this.setData({
        gender: "男",
        updateGender: 1
      })
    } else {
      this.setData({
        gender: "女",
        updateGender: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userMsg: wx.getStorageSync("userMsg"),
      birthday: time.formatTimeTwo(wx.getStorageSync("userMsg").profile.birthday, 'Y-M-D'),
      nickname: wx.getStorageSync("userMsg").profile.nickname,
      signature: wx.getStorageSync("userMsg").profile.signature
    })
    if (this.store.data.playFlag) {
      this.setData({
        bottomFlag: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})