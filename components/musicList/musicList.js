const app = new getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 背景音乐回调函数
    backgroundAudio:{
      type:Object
    },
    startFlag:{
      type:Boolean
    },
    name:{
      type:String
    },
    author: {
      type: String
    },
    poster: {
      type: String
    },
    src:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 背景音乐回调函数
    backgroundAudio:{},
    // 播放暂停标志
    startFlag:false,
    author: '',
    musicDetail:{}
  },
  /**
   * 组件的方法列表
   */
  ready(){
    console.log(12345789)
    this.setData({
      musicDetail: wx.getStorageSync("musicDetail")
    })
    this.audioPlay()
  },
  
  methods: {
    // 播放
    audioPlay() {
      console.log(999)
      this.setData({
        startFlag: true
      })
      this.play()
    },
    // 暂停
    audioPause() {
      console.log(this.data.musicDetail.src, this.data.musicDetail.name, this.data.musicDetail.poster,888)
      this.setData({
        startFlag: false
      })
      this.data.backgroundAudio.pause()
    },
    // 播放
    play() {
      let backgroundAudio = wx.getBackgroundAudioManager()
      backgroundAudio.src = this.data.musicDetail.src
      backgroundAudio.title = this.data.musicDetail.musicName
      backgroundAudio.coverImgUrl = this.data.musicDetail.poster
      this.setData({
        backgroundAudio
      })
    },
  }
})