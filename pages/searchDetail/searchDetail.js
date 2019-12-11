const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索关键词
    keyWord: "",
    // 推荐搜索显示标志
    searchShow:false,
    // 搜索推荐
    allMatch: [],
    // 当前选中标签的标识符
    active: 0,
    // 历史搜索记录
    searchHistory:[],
    // 底部栏音乐播放显示标志
    bottomFlag: false
  },
  // 点击遮罩层
  closePop(){
    this.setData({
      searchShow: false
    })
  },
  // 确认搜索时
  wordConfirm(e) {
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
        searchShow: false
      })
    }
  },
  // 获取搜索历史
  getHistory() {
    if (wx.getStorageSync("searchHistory")) {
      this.setData({
        searchHistory: wx.getStorageSync("searchHistory")
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
      searchShow: false
    })
    wx.setStorageSync("searchHistory", this.data.searchHistory)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      keyWord: options.keyWord
    })
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
    this.getHistory()
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