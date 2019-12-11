const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: "",
    email: "",
    loginFlag: "手机号登录",
    // 登录路径
    loginPath:"",
    // 用户登录信息
    userLoginMsg:{},
    // 用户信息
    userMsg: {},
    // 底部栏音乐播放显示标志
    bottomFlag: false

  },
  switchLogin(e) {
    this.setData({
      loginFlag: e.detail.name
    })
  },
  // 完成电话的输入
  completePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 完成密码的输入
  completePassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 完成邮箱的输入
  completeEmail(e){
    this.setData({
      email: e.detail.value
    })
  },
  // 登录
  login() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.loginFlag === "手机号登录") {
      this.setData({
        loginPath: `/login/cellphone?phone=${this.data.phone}&password=${this.data.password}`
      })
    } else {
      this.setData({
        loginPath: `/login?email=${this.data.email}&password=${this.data.password}`
      })
    }
    app.globalData.fly.get(this.data.loginPath).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        userLoginMsg: res.data
      })
      this.userDetails()
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '用户名或密码错误',
        content: '重新输入',
        success: (res => {
          // 点击确认
          if (res.confirm) {
            console.log(res.confirm)
          } else { //点击取消
            console.log(res.cancel)
          }
        })
      })
    })
  },
  //获取用户详情
  userDetails(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/user/detail?uid=${this.data.userLoginMsg.account.id}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        userMsg: res.data
      })
      wx.setStorageSync("userMsg", this.data.userMsg)
      wx.switchTab({
        url: '../me/me',
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 去注册
  register(){
    wx.navigateTo({
      url: `../register/register`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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