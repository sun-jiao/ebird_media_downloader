// ==UserScript==
// @name           ebird picture downloader
// @namespace    https://github.com/sun-jiao
// @match          https://ebird.org/*
// @grant          GM_xmlhttpRequest
// @version        1.1
// @author       Sun Jiao
// @license        GPL_v3
// @description    Display a banner to download the picture on ebird or view it in browser.
// ==/UserScript==


const PREFIX = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/';
const SUFFIX = '/2400';

function link_func() {
    var ul_list = document.getElementsByClassName('UnorderedList UnorderedList--flat');
    if(ul_list.length == 0){
        console.log('error1');
        return;}
    var lis = ul_list[ul_list.length - 1].getElementsByTagName("li");
    if(lis.length < 2){
        console.log('error2');
        return;}
    var a0 = lis[0].getElementsByTagName("a")[0];
    var a2 = lis[lis.length - 1].getElementsByTagName("a")[0];
    var href = a2.getAttribute("href");
    var splits = href.split("/");
    var id = splits[splits.length - 1];
    if(typeof id !== 'undefined' && ! id.includes(".")){
        a0.setAttribute("href", PREFIX + id + SUFFIX);
    }
    console.log("link");
}

document.addEventListener("click", link_func);
document.addEventListener("change", link_func);

