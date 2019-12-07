const app = new getApp()
let time = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 专辑id
    id: "",
    // 专辑里的歌曲
    songs: [],
    // 专辑详情
    album: {},
    // 收藏量
    subCount: "",
    // 分享量
    shareCount: "",
    // 评论量
    commentCount: "",
    // 发行时间
    publishTime:"",
    // 点击播放的序号
    clickItem: -1,
    // 底部组件显示标志
    bottomFlag: false,
  },
  // 专辑详情
  getdisDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/album?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        let aaa = ""
        this.setData({
          album: res.data.album,
          songs: res.data.songs,
          publishTime: time.formatTimeTwo(res.data.album.publishTime, 'Y-M-D')
        })
      }
      console.log(this.data.album, "album")
      console.log(this.data.songs, "songs")
    }).catch(err => {
      console.log(err)
    })
  },
  // 专辑动态信息
  getdisMsg(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/album/detail/dynamic?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          subCount: res.data.subCount,
          shareCount: res.data.shareCount,
          commentCount: res.data.commentCount
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击播放
  playMusic(e) {
    this.setData({
      // name: e.currentTarget.dataset.item.name,
      // author: e.currentTarget.dataset.item.ar[0].name,
      clickItem: e.currentTarget.dataset.index,
      bottomFlag: true
      // musicId: e.currentTarget.dataset.item.id
    })
    // wx.navigateTo({
    //   url: `../../pages/musicPlay/musicPlay?musicId=${e.currentTarget.dataset.item.id}&playListId=${this.id}&name=${this.data.name}`,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    // 进入页面就获取专辑详情
    this.getdisDetail(this.data.id)
    // 获取专辑动态信息
    this.getdisMsg(this.data.id)
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