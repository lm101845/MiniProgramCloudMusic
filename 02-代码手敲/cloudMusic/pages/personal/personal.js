/*
 * @Author: liming
 * @Date: 2021-12-21 23:34:47
 * @LastEditTime: 2021-12-27 06:19:46
 * @FilePath: \cloudMusic\pages\personal\personal.js
 */
// pages/personal/personal.js
let startY = 0; //手指起始的坐标
let moveY = 0; //手指移动的坐标
let moveDistance = 0; //移动的距离

import request from '../../utils/request.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0)',
        coverTransition: "",
        userInfo: {}, //用户信息
        recentPlayList: [], //最近播放
    },

    /**
     * 生命周期函数--监听页面加载——只执行一次
     */
    onLoad: function(options) {
        //读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo');
        //这里用同步的写法
        //你读取的字段userInfo和当初存储的字段一定要一致才行
        // console.log('userInfo', userInfo);
        //这个是用户登陆的情况下才有数据，如果用户没有登陆，我去访问个人中心，是没有数据的，所以我们需要去判断一下
        if (userInfo) {
            //userInfo存在，说明用户已经登陆
            //更新userInfo的状态
            this.setData({
                userInfo: JSON.parse(userInfo)
                    //需要点击编译按钮(页面重新加载,onLoad函数执行)才行，才会出现JSON格式的userInfo
                    //TODO:如何解决第一次登陆回调的时候，个人中心页面没有数据的问题——使用wx.reLaunch
            })
            console.log('userInfo', userInfo);

            //获取用户播放记录
            this.getUserRecentPlayList(this.data.userInfo.userId);
        }
    },

    //获取用户播放记录的功能函数
    //单独封装成一个函数，避免在生命周期函数上使用async/await(防止加载出问题，Vue里面的生命周期函数也最好不要用async,await)
    async getUserRecentPlayList(userId) {
        //获取用户播放记录
        let recentPlayListData = await request('/user/record', { uid: userId, type: 0 })
            //没有唯一值，我们自己给它一个唯一值
        let index = 0;
        //allData里面的数据太多了，我们只截取10条即可
        let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
                item.id = index++
                    //让每次循环进来index都会加1
                    return item;
            })
            //将数据更新到data中
        this.setData({
            // recentPlayList: recentPlayListData.allData.splice(0, 10)
            recentPlayList
        })
    },
    handleTouchStart(event) {
        this.setData({
                coverTransition: ""
            })
            // console.log('touchstart');
            //获取手指的起始坐标
        startY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
        // console.log('touchmove');
        moveY = event.touches[0].clientY;
        moveDistance = moveY - startY;
        //手指移动的距离
        //动态更新coverTransform的值
        if (moveDistance < 0) {
            return;
        }
        if (moveDistance >= 80) {
            moveDistance = 80;
        }
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },
    handleTouchEnd(event) {
        // console.log('touchend');
        this.setData({
            coverTransform: `translateY(0rpx)`,
            coverTransition: "transform 0.3s"
        })
    },

    //跳转至登陆Login页面的回调
    toLogin() {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示——可以执行多次
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