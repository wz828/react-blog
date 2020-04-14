---
title: JavaScript 基础：21点算法
date: 2017-12-15 12:52:34
tags:
    - JavaScript
---
在赌场 21 点游戏中，玩家可以通过计算牌桌上已经发放的卡牌的高低值来让自己在游戏中保持优势，这就叫 **21 点算法** 。
根据下面的表格，每张卡牌都分配了一个值。如果卡牌的值大于 0，那么玩家应该追加赌注。反之，追加少许赌注甚至不追加赌注。

|Count Change | Cards|
|--|--|
|+1|2, 3, 4, 5, 6|
|0|7, 8, 9|
|-1|10, 'J', 'Q', 'K', 'A'|

写一个函数实现 21 点算法，它根据参数card的值来递增或递减变量count，函数返回一个由当前count和Bet(count>0)或Hold(count<=0) 拼接的字符串。
注意count和"Bet"或Hold应该用空格分开。

例如：
-3 Hold
5 Bet

既然 card 的值为 7、8、9 时，count 值不变，那我们就可以忽略这种情况。

```js
var count = 0;
function cc(card) {   /*方法一：使用switch*/
  switch(card){
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      count++;
      break;
    case 10:
    case "J":
    case "Q":
    case "K":
    case "A":
      count--;
      break;
  }
  if (count > 0){
    return count + " Bet";
  } else {
    return count + " Hold";
  }
}

cc(2); cc(3); cc(7); cc('K'); cc('A');
cc(2); cc(3); cc(4); cc(5); cc(6);    //返回5 Bet
cc(7); cc(8); cc(9);                  //返回 0 Hold
cc(10); cc('J'); cc('Q'); cc('K'); cc('A'); //返回 -5 Hold
cc(3); cc(7); cc('Q');  cc(8); cc('A'); //返回 -1 Hold
cc(2); cc('J'); cc(9);  cc(2); cc(7); //返回 1 Bet
cc(2); cc(2);  cc(10);  //返回 1 Bet
cc(3); cc(2);  cc('A'); cc(10); cc('K'); //返回 -1 Hold

```

```js
function cc(card) {   /*方法二：使用正则和 if */
  var regex = /[JQKA]/;
  if (card > 1 && card < 7){count++;}
  else if (card === 10 || String(card).match(regex)){count--;}

  if (count > 0) return count + " Bet";
  return count + " Hold";
}
```