const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userMsg: {},
    // 关注列表
    focusList: [],
    // 动态列表
    dynamicList: [],
    // 粉丝列表
    fansList: [],
    loginFlag:false
  },
  // 去登陆
  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //获取用户关注列表
  userFocus() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/user/follows?uid=${this.data.userMsg.bindings[0].userId}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          focusList: res.data.follow
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //获取粉丝关注列表
  userFans() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/user/followeds?uid=${this.data.userMsg.bindings[0].userId}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          fansList: res.data.followeds
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //获取动态列表
  userDynamic() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/user/event?uid=${this.data.userMsg.bindings[0].userId}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          dynamicList: res.data.events
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 退出登录
  quit() {
    app.globalData.fly.get(`/logout`).then(res => {
      if (res.data.code===200) {
        wx.setStorageSync("userMsg", {})
        this.setData({
          loginFlag:false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 编辑个人资料
  editMsg() {
    wx.navigateTo({
      url: `../userMsg/userMsg`,
    })
  },
  // 判断是否登录
  ifLogin() {
    if (this.data.userMsg.level) {
      this.setData({
        loginFlag: true
      })
      this.userFocus()
      this.userFans()
      this.userDynamic()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userMsg: wx.getStorageSync("userMsg")
    })
    this.ifLogin()
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
      userMsg: wx.getStorageSync("userMsg")
    })
    this.ifLogin()
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