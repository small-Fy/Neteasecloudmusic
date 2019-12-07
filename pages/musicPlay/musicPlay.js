const app = new getApp()
let time = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌单信息开关
    discMsg: false,
    // 歌曲信息开关
    musicMsg: false,
    // 专辑名
    name: "",
    // 歌曲路径
    src: "",
    id: "",
    // 歌曲id
    musicId: "",
    // 专辑id
    playListId: "",
    musicData: [],
    // 歌单里所有歌曲的id
    trackIds: [],
    // 子组件传来的歌曲id
    sonId: "",
    musicDetails: [],
    // 进度
    percentage: 0,
    // 当前时间
    currentTime: 0,
    // 总时长
    totalTime: 0,
    backgroundAudio: {},
    // 播放或暂停,true为播放
    playFlag: true,
    // 循环序号
    cycleIndex: 0,
    // 循环方式
    cycleStyle: ["../../images/circulationList.png", "../../images/randomBroadcast.png", "../../images/singleCycle.png"]
  },
  back() {
    wx.navigateTo({
      url: '../musicDetail/musicDetail?flag=true',
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
      this.getPic(id,444)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取专辑封面
  getPic(id) {
    console.log(id,123456789)
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/song/detail?ids=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        poster: res.data.songs[0].al.picUrl,
        musicDetails: res.data.songs,
        name: res.data.songs[0].al.name
      })
      this.audioPlay()
    }).catch(err => {
      console.log(err)
    })
  },
  // 播放
  audioPlay() {
    let backgroundAudio = wx.getBackgroundAudioManager()
    backgroundAudio.src = this.data.src
    backgroundAudio.title = this.data.name
    backgroundAudio.coverImgUrl = this.data.poster
    this.setData({
      backgroundAudio
    })
    wx.setStorageSync('musicDetail', {
      src: this.data.src,
      singerName: this.data.musicDetails[0].ar[0].name,
      poster: this.data.poster,
      musicName: this.data.musicDetails[0].name,
      flag:true
    })
    this.data.backgroundAudio.onTimeUpdate(() => {
      let aaa = (this.data.backgroundAudio.currentTime % 60).toFixed(0)
      let bbb = (this.data.backgroundAudio.duration % 60).toFixed(0)
      if (aaa.length < 2) {
        aaa = `0${(this.data.backgroundAudio.currentTime % 60).toFixed(0)}`
      }
      if (bbb.length < 2) {
        bbb = `0${(this.data.backgroundAudio.duration % 60).toFixed(0)}`
      }
      this.setData({
        percentage: Math.floor(this.data.backgroundAudio.currentTime / this.data.backgroundAudio.duration * 100),
        totalTime: `0${Math.floor(this.data.backgroundAudio.duration / 60)}:${bbb}`,
        currentTime: `0${Math.floor(this.data.backgroundAudio.currentTime / 60)}:${aaa}`
      })
      if (this.data.backgroundAudio.duration === this.data.backgroundAudio.currentTime) {
        this.nextSong()
      }
    })
    this.setData({
      startFlag: true,
      playFlag: true
    })
  },
  // 暂停
  audioPause() {
    this.setData({
      startFlag: false,
      playFlag: false
    })
    this.data.backgroundAudio.pause()
  },
  // 快进或回退
  fastForward(event) {
    this.data.backgroundAudio.seek(event.detail / 100 * this.data.backgroundAudio.duration)
  },
  // 切换播放模式
  changeModel() {
    if (this.data.cycleIndex === 0) {
      this.setData({
        cycleIndex: this.data.cycleIndex + 1
      })
    } else if (this.data.cycleIndex === 1) {
      this.setData({
        cycleIndex: this.data.cycleIndex + 1
      })
    } else {
      this.setData({
        cycleIndex: 0
      })
    }
  },
  // 下一曲
  nextSong() {
    // 顺序播放
    if (this.data.cycleIndex === 0) {
      let musicId = 0
      // 当当前音乐id不在歌单里（即不是从歌单页面进入时）
      let aaa = this.data.trackIds.some(item => {
        return item.id === Number(this.data.musicId)
      })
      // 当当前音乐id不在歌单里（即不是从歌单页面进入时）
      if (!aaa) {
        musicId = this.data.trackIds[0].id
      }else{
        this.data.trackIds.map((item, index) => {
          if (item.id === Number(this.data.musicId)) {
            if (index < this.data.trackIds.length - 1) {
              musicId = this.data.trackIds[index + 1].id
            } else {
              musicId = this.data.trackIds[0].id
            }
          }
        })
      }
      this.setData({
        musicId
      })
      this.getUrl(this.data.musicId)
    } else if (this.data.cycleIndex === 1) { //随机播放
      let index = Math.floor(Math.random() * this.data.trackIds.length)
      this.setData({
        musicId: this.data.trackIds[index].id
      })
      this.getUrl(this.data.musicId)

    } else { //单曲循环
      this.setData({
        musicId: this.data.musicId
      })
      this.getUrl(this.data.musicId)
    }
  },
  // 上一曲
  lastSong() {
    // 顺序播放
    if (this.data.cycleIndex === 0) {
      let musicId = 0
      console.log(this.data.trackIds, 111)
      this.data.trackIds.map((item, index) => {
        if (item.id === Number(this.data.musicId)) {
          if (index === 0) {
            musicId = this.data.trackIds[this.data.trackIds.length - 1].id
          } else {
            musicId = this.data.trackIds[index - 1].id
          }
        }
      })
      this.setData({
        musicId
      })
      this.getUrl(this.data.musicId)
    } else if (this.data.cycleIndex === 1) { //随机播放
      let index = Math.floor(Math.random() * this.data.trackIds.length)
      this.setData({
        musicId: this.data.trackIds[index].id
      })
      this.getUrl(this.data.musicId)

    } else { //单曲循环
      this.setData({
        musicId: this.data.musicId
      })
      this.getUrl(this.data.musicId)
    }
  },
  // 显示歌单信息
  showDiscMsg() {
    this.setData({
      discMsg: true
    })
  },
  // 隐藏歌单信息
  closeDiscMsg() {
    this.setData({
      discMsg: false
    })
  },
  // 获得子组件传来的id
  getSonId(e) {
    this.setData({
      sonId: e.detail.sonId,
      cycleIndex: e.detail.cycleIndex
    })
    this.getUrl(this.data.sonId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.name,
      musicId: options.musicId,
      playListId: options.playListId,
      trackIds: wx.getStorageSync("trackIds")
    })
    console.log(this.data.musicId,987654321)
    this.getUrl(this.data.musicId)
    if (this.data.sonId) {
      this.getSonId()
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