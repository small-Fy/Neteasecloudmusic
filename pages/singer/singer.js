const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: ['name', 'author', 'poster', 'src', 'playFlag'],

  /**
   * 页面的初始数据
   */
  data: {
    // 歌手列表
    artists: [],
    // 每页显示30条
    limit: 20,
    // 当前页码
    offset: 0,
    // 歌手分类标志
    categoryFlag:0,
    // 歌手姓氏标志
    letterFlag:0,
    // 底部栏音乐播放显示标志
    bottomFlag: false,
    singerCategory: [{
        category: '入驻歌手',
        code: '5001'
      },
      {
        category: '华语男歌手',
        code: '1001'
      },
      {
        category: '华语女歌手',
        code: '1002'
      },
      {
        category: '华语组合/乐队',
        code: '1003'
      },
      {
        category: '欧美男歌手',
        code: '2001'
      },
      {
        category: '欧美女歌手',
        code: '2002'
      },
      {
        category: '欧美组合/乐队',
        code: '2003'
      },
      {
        category: '日本男歌手',
        code: '6001'
      },
      {
        category: '日本女歌手',
        code: '6002'
      },
      {
        category: '日本组合/乐队',
        code: '6003'
      },
      {
        category: '韩国男歌手',
        code: '7001'
      },
      {
        category: '韩国女歌手',
        code: '7002'
      },
      {
        category: '韩国组合/乐队',
        code: '7003'
      },
      {
        category: '其他男歌手',
        code: '4001'
      },
      {
        category: '其他女歌手',
        code: '4002'
      },
      {
        category: '其他组合/乐队',
        code: '4003'
      }
    ],
    letter: ["热","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  },
  // 歌手分类
  getSinger(cat, initial) {
    if (cat === "热"){
      cat=""
    }
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/artist/list?cat=${cat}&initial=${initial}&limit=${this.data.limit}&offset=${this.data.offset}`).then(res => {
      if (res) {
        wx.hideLoading()
      }
      this.setData({
        artists: this.data.artists.concat(res.data.artists)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 选择歌手分类
  chooseCategory(e){
    this.setData({
      categoryFlag: e.currentTarget.dataset.index,
      letterFlag:0,
      artists:[]
    })
    this.getSinger(this.data.singerCategory[this.data.categoryFlag].code, '')
  },
  // 选择字母
  chooseLetter(e){
    this.setData({
      letterFlag: e.currentTarget.dataset.index,
      artists: []
    })
    this.getSinger(this.data.singerCategory[this.data.categoryFlag].code, this.data.letter[this.data.letterFlag])
  },
  lower(){
    this.setData({
      offset: this.data.offset+1
    })
    this.getSinger(this.data.singerCategory[this.data.categoryFlag].code, this.data.letter[this.data.letterFlag])
  },
  toSingerDetail(e){
    wx.setStorageSync("picurl", e.currentTarget.dataset.picurl)
    wx.navigateTo({
      url: `../singerDetail/singerDetail?id=${e.currentTarget.dataset.id}&name=${e.currentTarget.dataset.name}&accountId=${e.currentTarget.dataset.accountid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSinger('5001', '')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})