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
    "keyWord" (value) {
      if (value !== "") {
        this.setData({
          searchMsg: []
        })
        this.getMsg(value, this.data.offset, this.data.limit, this.data.type[4])
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
        if (res.data.result.albumCount !== 0) {
          if (res.data.result.albumCount > this.data.searchMsg.length) {
            wx.hideLoading()
            res.data.result.albums.map(item => {
              item.publishTime = time.formatTimeTwo(item.publishTime, "Y.M.D")
            })
            this.setData({
              searchMsg: this.data.searchMsg.concat(res.data.result.albums),
              dataFlag: true
            })
          } else {
            wx.hideLoading()
          }
        } else {
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
      console.log(987654)
      this.getMsg(this.properties.keyWord, this.data.offset, this.data.limit, this.data.type[4])
    }
  }
})