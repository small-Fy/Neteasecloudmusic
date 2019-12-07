const app = new getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    randomMath: 0,
    // 热搜榜
    hotSearch: [],
    // 搜索推荐
    allMatch: [],
    // 默认搜索词
    defaultWord: "",
    // 搜索关键词
    keyWord: "",
    // 推荐搜索显示标志
    searchShow: false,
    // 搜索历史记录
    searchHistory: []
  },
  ready() {
    this.randomIndex()
    this.getHotSearch()
    this.getDefault()
    this.getHistory()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹出层
    closePop() {
      this.setData({
        searchShow: false
      })
    },
    // 点击热搜
    hotSearch(e) {
      this.data.searchHistory.splice(this.data.searchHistory.indexOf(e.currentTarget.dataset.keyword), 1)
      this.data.searchHistory.unshift(e.currentTarget.dataset.keyword)
      this.setData({
        searchHistory: this.data.searchHistory,
        searchFlag: true,
        keyWord: e.currentTarget.dataset.keyword
      })
      wx.setStorageSync("searchHistory", this.data.searchHistory)
    },
    // 删除历史记录
    deleteHistory() {
      wx.showModal({
        title: '删除历史消息',
        content: '是否确认',
        success: (res => {
          // 点击确认
          if (res.confirm) {
            this.setData({
              searchHistory: []
            })
            wx.setStorageSync("searchHistory", this.data.searchHistory)
          } else { //点击取消
            console.log(res.cancel)
          }
        })
      })
    },
    // 获取本地的搜索记录
    getHistory() {
      if (!wx.getStorageSync("searchHistory")) {
        this.setData({
          searchHistory: wx.getStorageSync("searchHistory")
        })
      }
    },
    // 随机获取banner的index
    randomIndex() {
      this.setData({
        randomMath: Math.floor(Math.random() * (this.properties.banners.length - 1))
      })
    },
    // 获取热搜
    getHotSearch() {
      wx.showLoading({
        title: '加载中',
      })
      app.globalData.fly.get("/search/hot/detail").then(res => {
        if (res) {
          wx.hideLoading()
          this.setData({
            hotSearch: res.data.data
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取默认搜索关键词
    getDefault() {
      wx.showLoading({
        title: '加载中',
      })
      app.globalData.fly.get("/search/default").then(res => {
        if (res) {
          wx.hideLoading()
          this.setData({
            defaultWord: res.data.data.realkeyword
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 确认搜索时
    wordConfirm(e) {
      console.log(this.data.searchHistory,444)
      this.setData({
        keyWord: e.detail.value.trim() === '' ? this.data.defaultWord : e.detail.value.trim()
      })
      if (this.data.searchHistory.indexOf(this.data.keyWord) < 0) {
        this.data.searchHistory.unshift(this.data.keyWord)
      } else {
        this.data.searchHistory.splice(this.data.searchHistory.indexOf(this.data.keyWord), 1)
        this.data.searchHistory.unshift(this.data.keyWord)
      }
      this.setData({
        searchHistory: this.data.searchHistory,
        searchFlag: true,
        searchShow: false
      })
      wx.setStorageSync("searchHistory", this.data.searchHistory)
    },
    // 输入框有值输入时
    wordInput(e) {
      let keyword = e.detail.value.trim()
      if (keyword !== "") {
        this.setData({
          searchShow: true
        })
        // 获取搜索推荐
        app.globalData.fly.get(`/search/suggest?keywords=${keyword}&type=mobile`).then(res => {
          if (res) {
            wx.hideLoading()
            this.setData({
              allMatch: res.data.result.allMatch
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.setData({
          searchShow: false,
          searchFlag:false
        })
      }
    },
    // 点击搜索建议
    toSearchDetail(e) {
      if (this.data.searchHistory.indexOf(e.currentTarget.dataset.keyword) < 0) {
        this.data.searchHistory.unshift(e.currentTarget.dataset.keyword)
      } else {
        this.data.searchHistory.splice(this.data.searchHistory.indexOf(e.currentTarget.dataset.keyword), 1)
        this.data.searchHistory.unshift(e.currentTarget.dataset.keyword)
      }
      this.setData({
        searchHistory: this.data.searchHistory,
        keyWord: e.currentTarget.dataset.keyword,
        searchFlag: true,
        searchShow: false
      })
      wx.setStorageSync("searchHistory", this.data.searchHistory)
    },
    // 点击搜索历史
    clickHistory(e) {
      this.data.searchHistory.splice(this.data.searchHistory.indexOf(e.currentTarget.dataset.item), 1)
      this.data.searchHistory.unshift(e.currentTarget.dataset.item)
      this.setData({
        searchHistory: this.data.searchHistory,
        searchFlag:true,
        keyWord: e.currentTarget.dataset.item
      })
      wx.setStorageSync("searchHistory", this.data.searchHistory)
    }
  }
})