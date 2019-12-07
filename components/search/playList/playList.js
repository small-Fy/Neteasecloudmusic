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

  /**
   * 组件的初始数据
   */
  data: {
    // 用户搜索信息
    searchMsg: [],
    // 偏移量，用于分页
    offset: 0,
    // 每页数据量
    limit: 30,
    type: ["1018", "1", "1014", "100", "10", "1000", "1009", "1002"]
  },
  ready() {
    this.getMsg(this.properties.keyWord, this.data.offset, this.data.limit, this.data.type[5])
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
        if (res) {
          wx.hideLoading()
          res.data.result.playlists.map(item => {
            item.playCount = item.playCount / 10000 > 10 ? `${(item.playCount / 10000).toFixed(1)}万` : item.playCount
          })
          this.setData({
            searchMsg: this.data.searchMsg.concat(res.data.result.playlists)
          })
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
      this.getMsg(this.properties.keyWord, this.data.offset, this.data.limit, this.data.type[5])
    }
  }
})