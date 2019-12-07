const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌单id
    id: "",
    // 编辑推荐
    copywriter: "",
    // 歌单
    playlist: {},
    // 播放量
    playCount: 0,
    // 收藏量
    trackCount: "",
    // 专辑名
    name: "",
    // 开始标志
    startFlag: false,
    // 底部播放组件
    bottomFlag: false,
    // 播放回调函数
    backgroundAudio: {},
    musicData: [],
    // 歌曲url
    src: '',
    // 专辑封面
    poster: "",
    // 歌手
    author: ""
  },
  back() {
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  // 获取歌单详情
  musicDetail() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/playlist/detail?id=${this.data.id}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      if (res.data.playlist.playCount / 100000000 > 1) {
        this.setData({
          playlist: res.data.playlist,
          playCount: `${(res.data.playlist.playCount / 100000000).toFixed(1)}亿`
        })
        console.log(this.data.playlist, 45679)
      } else {
        this.setData({
          playlist: res.data.playlist,
          playCount: `${parseInt(res.data.playlist.playCount/10000)}万`
        })
      }
      if (res.data.playlist.trackCount / 100000000 > 1) {
        this.setData({
          trackCount: `${(res.data.playlist.trackCount / 100000000).toFixed(1)}亿`
        })
      } else if (res.data.playlist.trackCount / 10000 > 1) {
        this.setData({
          trackCount: `${parseInt(res.data.playlist.trackCount / 10000)}万`
        })
      } else {
        this.setData({
          trackCount: res.data.playlist.trackCount
        })
      }
      console.log(this.data.trackCount, 45679)
      this.setData({
        playlist: res.data.playlist
      })
      wx.setStorageSync("playlist", this.data.playlist)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取url
  getUrl(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/song/url?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        musicData: res.data.data,
        src: res.data.data[0].url
      })
      this.getPic(this.data.musicId)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取专辑封面
  getPic(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/song/detail?ids=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        poster: res.data.songs[0].al.picUrl,
        bottomFlag: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击播放
  playMusic(e) {
    console.log(e.currentTarget.dataset.item, 111)
    this.setData({
      name: e.currentTarget.dataset.item.name,
      author: e.currentTarget.dataset.item.ar[0].name,
      clickItem: e.currentTarget.dataset.index,
      musicId: e.currentTarget.dataset.item.id
    })
    wx.setStorageSync("trackIds", this.properties.playlist.trackIds)
    wx.setStorageSync('musicDetail', {
      src: this.data.src,
      singerName: this.data.author,
      poster: this.data.poster,
      musicName: this.data.name,
      flag: false
    })
    wx.navigateTo({
      url: `../../pages/musicPlay/musicPlay?musicId=${e.currentTarget.dataset.item.id}&playListId=${this.id}&name=${this.data.name}`,
    })
    this.getUrl(this.data.musicId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.flag){
      this.setData({
        id: wx.getStorageSync("ic").id,
        copywriter: wx.getStorageSync("ic").copywriter,
        bottomFlag: options.flag
      })
    }else{
      this.setData({
        id: options.id,
        copywriter: options.copywriter
      })
      wx.setStorageSync("ic", {
        id: options.id,
        copywriter: options.copywriter
      })
    }
    // 获取歌单
    this.musicDetail()
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