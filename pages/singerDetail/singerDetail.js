const app = new getApp()
let time = require('../../utils/util.js')
let WxParse = require('../../lib/wxParse/wxParse.js')
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    // 歌手ID
    id: "",
    // 歌手账户id
    accountId: 0,
    // 歌手名
    name: "",
    // 歌手图片
    picUrl: "",
    // 点击对象
    clickItem: -1,
    topIndex: 0,
    singerDetails: [],
    // 底部播放组件显示标志
    bottomFlag: false,
    // 歌单内所有歌的id
    trackIds: [],
    // 热门歌曲
    hotSongs: [],
    // 所有歌曲
    allSongs: [],
    // 专辑
    hotAlbums: [],
    // 歌手动态
    events: [],
    // 歌手详情
    briefDesc: "",
    // 偏移数量, 用于分页
    offset: 0,
    // 取出数量
    limit: 50,
    top: ["主页", "歌曲", "专辑", "动态"],
    // 底部栏音乐播放显示标志
    bottomFlag: false,
  },
  // 切换显示顶部显示内容
  chooseClassify(e) {
    this.setData({
      topIndex: e.currentTarget.dataset.index
    })
    if (this.data.topIndex === 1) {
      this.getAll(this.data.id)
    } else if (this.data.topIndex === 2) {
      this.getAlbum(this.data.id)
    } else if (this.data.topIndex === 3) {
      this.getEvent(this.data.accountId)
    }
  },
  // 获取歌手详情
  getSingerDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/artist/desc?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          briefDesc: res.data.briefDesc
        })
      }
      WxParse.wxParse('article', 'md', this.data.briefDesc, this, 5);
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取歌手热门50首歌曲
  getTop50(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/artists/top/song?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        let aaa = []
        res.data.hotSongs.map(item => {
          aaa.push({
            id: item.id
          })
        })
        this.setData({
          hotSongs: res.data.hotSongs.slice(0, 5),
          trackIds: aaa
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取歌手所有歌曲
  getAll(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/artists?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          allSongs: res.data.hotSongs
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取歌手所有专辑
  getAlbum(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/artist/album?id=${id}&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
      if (res) {
        wx.hideLoading()
        res.data.hotAlbums.map(item => {
          item.publishTime = time.formatTimeTwo(item.publishTime, "Y.M.D")

        })
        this.setData({
          hotAlbums: res.data.hotAlbums
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取歌手动态
  getEvent(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/user/event?uid=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        events: res.data.events.map((item, index) => {
          item.json = JSON.parse(item.json)
          item.eventTime = time.formatTimeTwo(item.eventTime, "Y年M月D日")
          item.info.commentThread.resourceTitle = item.info.commentThread.resourceTitle.slice(0, 5)
        })
        this.setData({
          events: res.data.events
        })
        console.log(res.data.events)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 播放音乐
  playMusic(e) {
    this.setData({
      clickItem: e.currentTarget.dataset.index
    })
    wx.setStorageSync("trackIds", this.data.trackIds)
    wx.navigateTo({
      url: `../../pages/musicPlay/musicPlay?musicId=${e.currentTarget.dataset.item.id}&playListId=${e.currentTarget.dataset.item.al.id}&name=${e.currentTarget.dataset.item.al.name}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      accountId: options.accountId,
      picUrl: wx.getStorageSync("picurl"),
      name: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getSingerDetail(this.data.id)
    this.getTop50(this.data.id)
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