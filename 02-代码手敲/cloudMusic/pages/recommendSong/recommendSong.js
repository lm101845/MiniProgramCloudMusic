import request from '../../utils/request.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '', //天
        month: '', //月
        //在小程序里面其实也是有内置的日期函数的
        recommendList: [], //推荐列表数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //判断用户是否登录
        let userInfo = wx.getStorageSync('userInfo');
        if (!userInfo) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                success: () => {
                    //跳转至登录界面
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                }
            })
        }
        //更新日期的状态数据
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })

        //获取每日推荐的数据
        this.getRecommendList();
    },

    //获取用户每日推荐的数据
    async getRecommendList() {
        let recommendListData = await request('/recommend/songs');
        this.setData({
            recommendList: recommendListData.recommend
        })
    },
    // 跳转至songDetail页面
    toSongDetail(event) {
        let song = event.currentTarget.dataset.song;
        // console.log(song,'123121321');
        // 如何在路由跳转时传参:query参数
        wx.navigateTo({
            // url: '/pages/songDetail/songDetail?song=' + song,
            //在js里面是不能有对象形式的数组的
            //因为小程序中对路由传参有字数限制，所以不能直接将song对象给传过去 
            // url: '/pages/songDetail/songDetail?song=' + JSON.stringify(song),
            //JS对象--》JSON字符串
            url: '/pages/songDetail/songDetail?musicId=' + song.id,
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