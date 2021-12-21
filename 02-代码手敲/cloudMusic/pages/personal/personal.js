/*
 * @Author: liming
 * @Date: 2021-12-21 23:34:47
 * @LastEditTime: 2021-12-22 01:15:18
 * @FilePath: \cloudMusic\pages\personal\personal.js
 */
// pages/personal/personal.js
let startY = 0; //手指起始的坐标
let moveY = 0; //手指移动的坐标
let moveDistance = 0; //移动的距离


Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0)',
        coverTransition: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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