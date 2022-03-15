// ==UserScript==
// @name           ebird picture downloader
// @namespace    https://github.com/sun-jiao
// @match          https://ebird.org/*
// @grant          GM_xmlhttpRequest
// @version        1.0
// @author       Sun Jiao
// @license        GPL_v3
// @description    Display a banner to download the picture on ebird or view it in browser.
// ==/UserScript==


const PREFIX = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/';
const SUFFIX = '/2400';

function link_func() {
    var ul_list = document.getElementsByClassName('UnorderedList UnorderedList--flat');
    var lis = ul_list[ul_list.length - 1].getElementsByTagName("li");
    var a = lis[0].getElementsByTagName("a")[0];
    var href = a.getAttribute("href");
    var id = href.split("-")[1];
    if(typeof id !== 'undefined' && ! id.includes(".")){
        a.setAttribute("href", PREFIX + id + SUFFIX);
    }
    console.log("link");
}

document.addEventListener("click", link_func);
document.addEventListener("change", link_func);

