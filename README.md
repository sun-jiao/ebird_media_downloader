# ebird_picture_downloader

适用于eBird，Macaulay Library，Birds of the World的图片下载脚本。

## 本脚本可以和不可以做什么：

从eBird下载图片需要使用审查元素，本脚本可以在网页中添加下载按钮，无需通过审查元素直接下载图片。

本脚本不可以从eBird批量爬取图片，也不可以破解 2400 px 的限制！

## 版权说明：

* 由于ebird的限制，对于宽度 < 2400 px 的图片来说，这样下载的就是原图，而对于宽度 > 2400 px 的图片来说，下载的不是原图，而是宽度 = 2400 px 的高清图。因为真正的原图只有作者可以下载。

* 使用时请务必遵守ebird的规范并尊重原作者的版权，请勿用于非法用途。

## 脚本安装：

tampermonkey的安装我就不写了，网上教程一搜一大把。

给两个链接：

[Tampermonkey油猴插件——使用教程 - 知乎](https://zhuanlan.zhihu.com/p/128453110)

[Tampermonkey(油猴)的安装和使用的小白教程 - 简书](https://www.jianshu.com/p/aa313195ae65)

Tampermonkey安装好后，

* 先点开这个文件：
![image](https://user-images.githubusercontent.com/14086980/158395104-b7596f51-8ae9-4a8c-aa9d-fa8044547d67.png)

* 点击这个Raw：
![image](https://user-images.githubusercontent.com/14086980/158395258-b67f2144-838f-436c-a6d2-18903c1745e5.png)

* 点击安装：
![image](https://user-images.githubusercontent.com/14086980/158398055-9b99cc3d-2ecc-41fb-9023-ff24733b230c.png)

* 安装完成后即可使用（安装前打开的页面需要刷新或重新进入才能生效），点击右下角的「下载」按钮即可下载：

![image](https://user-images.githubusercontent.com/14086980/173176251-acaa6d4a-daa3-4b6d-abb5-798531f076a8.png)

