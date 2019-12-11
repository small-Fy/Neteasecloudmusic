const app = new getApp()
let WxParse = require('../../lib/wxParse/wxParse.js');
let time = require('../../utils/util.js')
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    // 电台ID(9位)
    radioId: "",
    // 电台ID(10位)
    radiosId: "",
    // 电台详情
    djRadio: {},
    // 电台节目
    programs: [],
    // 总期数
    programsTotail: 0,
    // 顶部点击序号
    topClick: 1,
    // 每页数据量
    limit: 40,
    // 用于分页
    offset: 0,
    // 节目排序方式
    asc: false,
    // 排序图标数组
    sort: ["descending", "ascending"],
    // 排序图标索引
    sortIndex: 0,
    // 播放标志索引
    clickItem: -1,
    // 底部栏音乐播放显示标志
    bottomFlag: false
  },
  // 排序
  sorting() {
    if (this.data.sortIndex === 0) {
      this.setData({
        sortIndex: 1,
        programs: [],
        offset: 0,
        asc: true
      })
      this.programDetail(this.data.radioId, this.data.offset, this.data.asc)
    } else {
      this.setData({
        sortIndex: 0,
        programs: [],
        offset: 0,
        asc: false
      })
      this.programDetail(this.data.radioId, this.data.offset, this.data.asc)
    }
  },
  // 电台详情
  radioDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/dj/detail?rid=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          djRadio: res.data.djRadio
        })
        WxParse.wxParse('article', 'md', res.data.djRadio.desc, this, 5);
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 电台节目
  programDetail(id, offset, asc) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/dj/program?rid=${id}&limit=${this.data.limit}&asc=${asc}&offset=${this.data.offset}`).then(res => {
      if (res) {
        wx.hideLoading()
        console.log(res.data, 999)
        let mins = ""
        let sec = ""
        res.data.programs.map(item => {
          item.createTime = time.formatTimeThere(item.createTime, "M-D"),
            item.listenerCount = (item.listenerCount / 10000 > 10) ? `${(item.listenerCount / 10000).toFixed(1)}万` : item.listenerCount
            mins = Math.floor(item.duration / 60000) >= 10 ? Math.floor(item.duration / 60000) : `0${Math.floor(item.duration / 60000)}`
          sec = Math.floor((item.duration % 60000) / 1000) > 10 ? Math.floor((item.duration % 60000) / 1000) : `0${Math.floor((item.duration % 60000) / 1000)}`
          item.duration = `${mins}:${sec}`
        })
        if (res.data.count) {
          this.setData({
            programs: this.data.programs.concat(res.data.programs),
            programsTotail: res.data.count
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 顶部点击事件
  clickTop(e) {
    this.setData({
      topClick: e.currentTarget.dataset.index
    })
  },
  // 点击播放
  playMusic(e) {
    this.setData({
      clickItem: e.currentTarget.dataset.index
    })
    wx.navigateTo({
      url: `../musicPlay/musicPlay?djProgramId=${e.currentTarget.dataset.item.id}&musicId=${e.currentTarget.dataset.item.mainSong.id}&djFlag=${true}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      radioId: options.radioId,
      radiosId: options.radiosId
    })
    this.radioDetail(this.data.radioId)
    this.programDetail(this.data.radioId, this.data.offset)
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
    this.setData({
      offset: this.data.offset + this.data.limit
    })
    this.programDetail(this.data.radioId, this.data.offset, this.data.asc)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})