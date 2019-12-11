const app = new getApp()
let time = require('../../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyWord: {
      type: String
    }
  },
  observers: {
    "keyWord"(value) {
      if (value !== "") {
        this.setData({
          searchMsg: []
        })
        this.getMsg(value, this.data.offset, this.data.limit, this.data.type[2])
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 用户搜索信息
    searchMsg: [],
    // 是否有数据标志
    dataFlag: true,
    // 偏移量，用于分页
    offset: 0,
    // 每页数据量
    limit: 30,
    type: ["1018", "1", "1014", "100", "10", "1000", "1009", "1002"]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取用户搜索信息
    getMsg(keyword, offset, limit, type) {
      wx.showLoading({
        title: '加载中',
      })
      app.globalData.fly.get(`/search?keywords=${keyword}&offset=${offset}&limit=${limit}&type=${type}`).then(res => {
        if (res.data.result.videoCount !== 0) {
          if (res.data.result.videoCount > this.data.searchMsg.length) {
            wx.hideLoading()
            let mins = ""
            let sec = ""
            res.data.result.videos.map(item => {
              // 计算视频时长
              mins = Math.floor(item.durationms / 60000) > 10 ? Math.floor(item.durationms / 60000) : `0${Math.floor(item.durationms / 60000)}`
              sec = Math.floor((item.durationms % 60000) / 1000) > 10 ? Math.floor((item.durationms % 60000) / 1000) : `0${Math.floor((item.durationms % 60000) / 1000)}`
              item.durationms = `${mins}:${sec}`
              // 计算播放次数
              if (item.playTime / 100000 > 1) {
                item.playTime = `${parseInt(item.playTime / 10000)}万`
              }
            })
            this.setData({
              searchMsg: this.data.searchMsg.concat(res.data.result.videos),
              dataFlag: true
            })
          } else {
            wx.hideLoading()
          }
        }else{
          this.setData({
            dataFlag: false
          })
          wx.hideLoading()
        }
        
      }).catch(err => {
        console.log(err)
      })
    },
    // 滑动触底
    toBottom() {
      this.setData({
        offset: this.data.offset + this.data.limit
      })
      this.getMsg(this.properties.keyWord, this.data.offset, this.data.limit, this.data.type[2])
    }
  }
})