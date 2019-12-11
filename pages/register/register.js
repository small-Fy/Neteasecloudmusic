const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],
  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:"",
    captcha:"",
    nickname:"",
    verifyFlag:false,
    // 底部栏音乐播放显示标志
    bottomFlag: false
  },
  // 发送验证码
  sendCode(){
    console.log(111)
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/captcha/sent?phone=${this.data.phone}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      console.log(res,666)
    }).catch(err => {
      console.log(err)
    })
  },
  // 验证验证码
  verificationCode(){
    console.log(123)
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/captcha/verify?phone=${this.data.phone}&captcha=${this.data.captcha}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      console.log(res,999988778)
      this.setData({
        verifyFlag:true
      })
    }).catch(err => {
      this.setData({
        verifyFlag: false
      })
      wx.showToast({
        title: '验证码错误',
        icon: "none"
      })
    })
  },
  // 完成手机号的输入
  confirmPhone(e) {
    console.log(e,13)
    this.setData({
      phone: e.detail
    })
    this.checkPhone()
    console.log(this.data.phone, 111)
  },
  // 完成密码的输入
  confirmPassword(e) {
    this.setData({
      password: e.detail
    })
    console.log(this.data.password, 222)
  },
  // 完成验证码的输入
  confirmCaptcha(e) {
    this.setData({
      captcha: e.detail
    })
    console.log(this.data.captcha, 333)
  },
  // 完成昵称的输入
  confirmName(e) {
    this.setData({
      nickname: e.detail
    })
    console.log(this.data.nickname, 444)
  },
  // 前往登录界面
  toLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //注册
  register() {
    this.verificationCode()
    if (this.data.verifyFlag){
      app.globalData.fly.get(`/register/cellphone?phone=${this.data.phone}&password=${this.data.password}&captcha=${this.data.captcha}&nickname=${this.data.nickname}`).then(res => {
        wx.switchTab({
          url: '../me/me',
        })
      }).catch(err => {
        wx.showToast({
          title: '登录失败',
          icon: "none"
        })
      })
    }
  },
  // 发送验证码
  sendCode() {
    console.log(111)
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/captcha/sent?phone=${this.data.phone}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      console.log(res, 666)
    }).catch(err => {
      console.log(err)
    })
  },
  // 检测手机号码是否已注册
  checkPhone() {
    app.globalData.fly.get(`/cellphone/existence/check?phone=${this.data.phone}`).then(res => {
      if (res.data.exist===1){
        wx.showToast({
          title: '手机号已被注册',
          icon:"none"
        })
        this.setData({
          phone:''
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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
    if (this.store.data.playFlag) {
      this.setData({
        bottomFlag: true
      })
    }
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