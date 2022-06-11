// ==UserScript==
// @name           eBird media downloader
// @namespace      https://github.com/sun-jiao
// @match          https://*.ebird.org/*
// @match          https://*.macaulaylibrary.org/*
// @match          https://birdsoftheworld.org/*
// @grant          GM_xmlhttpRequest
// @version        2.0
// @author         Sun Jiao
// @license        GPL_v3
// @description    Edit the report button to download the medias from ebird or view it in browser.
// ==/UserScript==


const PREFIX = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/';
const SUFFIX = '/2400';
const SPEC = '/spectrogram_small';
const AUDIO = '/audio';
const VIDEO = '/mp4/1280';

var list; //list
var ID; //

var download = "Download";

(function() {
    'use strict';

    setDownload();

    try {
        ebird()
    } catch (error) {
        console.error(error);
    }

    window.addEventListener('load', function () {
        try {
            ebird()
        } catch (error) {
            console.error(error);
        }
    })

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
        // fired when a mutation occurs
        try {
            ebird()
        } catch (error) {
            console.error(error);
        }
        // console.log(mutations, observer);
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
        subtree: true,
        attributes: true
    });
})();

function setDownload(){
    var userLang = navigator.language || navigator.userLanguage;
    switch(userLang.split("-")[0]){
        case("zh"):{
            download = "下载";
            break;
        }
        case("fr"):{
            download = "Télécharger";
            break;
        }
        case("ja"):{
            download = "ダウンロード";
            break;
        }
        case("uk"):{
            download = "Завантаження файлів";
            break;
        }
        case("ko"):{
            download = "다운로드";
            break;
        }
        case("ru"):{
            download = "скачать";
            break;
        }
        case("pt"):{
            download = "Baixar";
            break;
        }
    }
}

function ebird(){
    switch(window.location.hostname){
        case("ebird.org"):{
            list = document.getElementsByClassName('Lightbox-specimenLinks')[0].getElementsByClassName('UnorderedList UnorderedList--flat').at(-1); //UnorderedList
            if(list == undefined){
                return;
            }

            //最后一个UnorderedList就是媒体页面右下角的「报告-记录-Library」的List, lis中的最后一个li一般是「Macaulay Library」按钮, 指向该媒体文件的Macaulay Library链接

            var href1 = list.getElementsByTagName("li").at(-1).getElementsByTagName("a")[0].getAttribute("href");
            ID = getID(href1);
            break;
        }
        case("macaulaylibrary.org"):{
            list = document.getElementsByClassName("actions")[0]
            ID = getID(window.location.href);
            break;
        }
        case("birdsoftheworld.org"):
        case("media.ebird.org"):
        case("search.macaulaylibrary.org"):{
            var boxes = document.getElementsByClassName("Lightbox-figure");
            for (var i = 0; i < boxes.length; i++){
                var box = boxes[i];
                var inner = box.getElementsByClassName("Lightbox-media-inner");
                if (inner.length == 1){
                    list = box.getElementsByClassName("Lightbox-links")[0];
                    var href2 = list.getElementsByTagName("div").at(-1).getElementsByTagName("a")[0].getAttribute("href");
                    ID = getID(href2);
                }
            }
            break;
        }
        default:
            return;
    }

    console.log('ID:' + ID);

    var href = PREFIX + ID + SUFFIX;

    if (document.getElementsByClassName("SpectrogramPlayer").length > 0){
        href = PREFIX + ID + AUDIO;
    } else if (document.getElementsByClassName("VideoPlayer-video").length > 0){
        href = PREFIX + ID + VIDEO;
    }

    if(list.getElementsByClassName("Raccoon-s-script").length > 0){
        return;
    }

    var text = "\t<div class=\"Raccoon-s-script\">\r\t\t\t\t<a target=\"_blank\" rel=\"noopener\" class=\"\" href=\"" + href + "\">\r\t\t\t\t\t<svg class=\"Icon Icon--download\" role=\"img\"><use xlink:href=\"#Icon--download\"></use></svg>\r\t\t\t\t\t下载\r\t\t\t\t</a>\r\t\t\t</div>"
    var body = stringToHTML(text);
    var new_div = body.getElementsByTagName("div")[0]
    list.appendChild(new_div);
}

function getID(href){
    //一般来说该媒体文件在Macaulay Library的链接的末尾即是媒体id，例如：https://macaulaylibrary.org/zh-CN/asset/230539581
    //有些情况下，上面那种链接之后还会以#号或者?问号为分隔附一段，应当被删除。
    //例如：https://macaulaylibrary.org/asset/180854341#_ga=2.225998489.2098077357.1654784315-1293864495.1651583523
    //或者：https://macaulaylibrary.org/asset/180854341?_gl=1*v5o4c3*_ga*MTI5Mzg2NDQ5NS4xNjUxNTgzNTIz*_ga_QR4NVXZ8BM*MTY1NDg0MDgwMC4xOC4xLjE2NTQ4NDA4MTQuNDY.#_ga=2.28237631.2098077357.1654784315-1293864495.1651583523
    //有些时候不是以asset结尾，例如：https://macaulaylibrary.org/photo/106358811
    if (href.includes("asset/")){
        return href.split("asset/")[1].split(/[^0-9]/)[0];
    } else {
        return href.split("/").at(-1);
    }
}

/**
 * Convert a template string into HTML DOM nodes
 * Copied from: https://www.codegrepper.com/code-examples/javascript/convert+string+to+html+format+in+javascript
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
function stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
}

/**
 * In fact this is an official function for Array, but not supported for HTMLCollection.
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
 * @param  {Int} num    The index number.
 */
HTMLCollection.prototype.at = function(num) {
    if(num >= 0){
        return this[num];
    } else {
        return this[this.length + num];
    }
};
