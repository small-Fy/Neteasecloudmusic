const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Component(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag','musicId'],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 播放暂停标志
    startFlag: false,
    author: '',
    musicDetail: {}
  },
  /**
   * 组件的方法列表
   */
  ready() {
    if (!app.globalData.backgroundAudio.paused) {
      this.audioPlay()
    } else {
      this.audioPause()
    }
    this.store.data.playFlag = true
  },

  methods: {
    // 播放
    audioPlay() {
      this.setData({
        startFlag: true
      })
      app.globalData.backgroundAudio.play()
    },
    // 暂停
    audioPause() {
      this.setData({
        startFlag: false
      })
      app.globalData.backgroundAudio.pause()
    },
    // 播放
    play() {
      app.globalData.backgroundAudio.src = this.store.data.src
      app.globalData.backgroundAudio.title = this.store.data.name
      app.globalData.backgroundAudio.coverImgUrl = this.store.data.poster
    },
    // 点击跳转到播放页面
    toPlay() {
      console.log(this.store.data.musicId, 98754131)
      wx.navigateTo({
        url: `../../pages/musicPlay/musicPlay?musicId=${this.store.data.musicId}&name=${this.store.data.name}`,
      })
    }
  }
})