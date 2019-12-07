const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner图
    banners:[],
    // 推荐歌单
    musicList: [],
    // 新碟
    albumsDisc:[],
    // 新歌
    albumsMusic: [],
    // 推荐新势力
    newPower:[],
    // 推荐电台
    radios:[],
    // 推荐节目
    program:[],
    // 搜索组件显示标志
    searchFlag:false
  },
  // 获取搜索框焦点
  onFocus(){
    this.setData({
      searchFlag: true
    })
  },
  // 关闭弹出层
  onClose(){
    this.setData({
      searchFlag:false
    })
  },
  // 获取banner图
  getBanner() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/banner?type=2").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        banners: res.data.banners
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 推荐歌单
  getMusicList() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/personalized?limit=6").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        musicList: res.data.result
      })
      this.data.musicList.map(item => {
        if (item.playCount / 100000000 > 1) {
          item.changeCount = `${(item.playCount / 100000000).toFixed(1)}亿`
        }else{
          item.changeCount = `${parseInt(item.playCount / 10000)}万`
        }
      })
      this.setData({
        musicList: this.data.musicList
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 新碟
  getNewDisc() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/album/newest").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        albumsDisc: res.data.albums.slice(0, 6)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 新歌
  getNewMusic() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/top/song").then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          albumsMusic: res.data.data.slice(0, 6)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 推荐新势力
  getNewPower() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/personalized/newsong").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        newPower: res.data.result.slice(0, 6)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 推荐电台
  getRadios() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/personalized/djprogram").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        radios: res.data.result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 推荐节目
  getProgram() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/program/recommend").then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        program: res.data.programs.slice(0,6)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBanner()
    this.getMusicList()
    this.getNewDisc()
    this.getNewMusic()
    this.getNewPower()
    this.getRadios()
    this.getProgram()
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