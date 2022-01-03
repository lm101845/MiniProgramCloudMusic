/*
 * @Author: liming
 * @Date: 2021-12-21 23:34:55
 * @LastEditTime: 2022-01-04 06:49:57
 * @FilePath: \cloudMusic\pages\video\video.js
 */
import request from '../../utils/request.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [], //导航标签数据
        navId: '', //导航的标识
    },

    /**
     * 生命周期函数--监听页面加载——只执行一次
     */
    onLoad: function(options) {
        //获取导航数据
        this.getVideoGroupList()
            //获取视频列表数据
            // this.getVideoList(this.data.navId)
    },

    //获取导航数据
    async getVideoGroupList() {
        let videoGroupListData = await request('/video/group/list');
        this.setData({
                videoGroupList: videoGroupListData.data.slice(0, 14),
                //我们不需要108个，只需要前14个
                navId: videoGroupListData.data[0].id
            })
            //获取视频列表数据——什么时候拿到了导航的标签数据，什么时候再去拿对应的列表数据
        this.getVideoList(this.data.navId)
    },

    //获取视频列表数据
    async getVideoList(navId) {
        // if (!navId) { //判断navId是否存在 
        //     return;
        // }
        let videoListData = await ('/video/group', { id: navId })
        console.log(videoListData, '===============');
    },
    //点击切换导航的回调
    changeNav(event) {
        let navId = event.currentTarget.id; //通过id向event传参的时候，如果传的是number类型，那么就会自动转换成字符串
        //let navId = event.currentTarget.dataset.id; //通过data-x形式传参的时候，它是会自动帮我们转成字符串的
        //console.log(typeof navId); //string
        this.setData({
            // navId: navId * 1
            navId: navId >>> 0 //使用位移运算符，位移0位也是可以的
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