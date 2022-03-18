// ==UserScript==
// @name           ebird media downloader
// @namespace    https://github.com/sun-jiao
// @match          https://ebird.org/*
// @grant          GM_xmlhttpRequest
// @version        1.2
// @author       Sun Jiao
// @license        GPL_v3
// @description    Edit the report button to download the medias from ebird or view it in browser.
// ==/UserScript==


const PREFIX = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/';
const SUFFIX = '/2400';

function link_func() {
    var ul_list = document.getElementsByClassName('UnorderedList UnorderedList--flat'); //获取所有UnorderedList
    if(ul_list.length == 0){
        console.log('error1');
        return;}
    var lis = ul_list[ul_list.length - 1].getElementsByTagName("li");//最后一个UnorderedList就是媒体页面右下角的「报告-记录-Library」的List
    if(lis.length < 2){
        console.log('error2');
        return;}
    var a0 = lis[0].getElementsByTagName("a")[0];//「报告」按钮
    var a2 = lis[lis.length - 1].getElementsByTagName("a")[0];//「Macaulay Library」按钮
    var href = a2.getAttribute("href");//获取「Macaulay Library」指向的链接
    var splits = href.split("/");
    var id = splits[splits.length - 1];//链接的末尾即是媒体id
    console.log(id);
    if(typeof id == 'undefined' || id.includes(".")){
        console.log('error3');
        return;}
    var id_media_item = document.querySelectorAll('[data-asset-id=\"' + id + '\"]');//获取[data-asset-id="${id}"]的元素，这种元素可能有多个，其中只有一个是我们需要的
    if(id_media_item.length == 0){
        console.log('error4');
        return;}

    for (var i = 0 ; i < id_media_item.length ; i++){//遍历上述多个元素
        if(id_media_item[i].tagName == 'DIV'){//tag name = div的是我们需要的那个
            var car = id_media_item[i].getElementsByClassName('Carousel-inner');//获取class name = 'Carousel-inner' 的下级元素
            if(car.length == 0){
                console.log('error5');
                continue;} //
            var img = car[0].getElementsByClassName('SpecimenMedia-image');//获取class name = 'SpecimenMedia-image' 的下级元素，代表这是一张图片
            //视频的class name是SpecimenMedia-video；音频的是SpectrogramPlayer
            if(img.length == 0){
                console.log('result1');
                a0.setAttribute("href", PREFIX + id);
            }else{
                console.log('result2');
                a0.setAttribute("href", PREFIX + id + SUFFIX);
            }
        }
    }

    console.log("link");
}

document.addEventListener("click", link_func);

