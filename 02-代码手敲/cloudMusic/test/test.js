/*
 * @Author: liming
 * @Date: 2022-01-04 06:01:00
 * @LastEditTime: 2022-01-04 06:05:30
 * @FilePath: \cloudMusic\test\test.js
 */

// 位移运算符 >>>(右移) <<<(左移)
let num = 3;
//将目标数据先转换成二进制，然后移动指定的位数
console.log(num >>> 2); //0
//0000 0011 这是3的二进制
//0000 0000 右移2位，右边的11没了，左边用0补齐

console.log(num >>> 1); //1

//右移0位会将非number数据强制转为number，但原本值不变