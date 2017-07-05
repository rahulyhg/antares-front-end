/*! anchorific 2014-08-06  https://raw.githubusercontent.com/renettarenula/anchorific.js/master/min/anchorific.min.js */
"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b}),function(a,b,c,d){"use strict";var e={init:function(b,c){var d=this;d.elem=c,d.$elem=a(c),d.opt=a.extend({},this.opt,b),d.headers=d.$elem.find("h1, h2, h3, h4, h5, h6"),d.previous=0,0!==d.headers.length&&(d.first=parseInt(d.headers.prop("nodeName").substring(1),null)),d.build()},opt:{navigation:".anchorific",speed:200,anchorClass:"anchor",anchorText:"#",top:".top",spy:!0,position:"append",spyOffset:!0},build:function(){var b,c=this,d=function(){};c.opt.navigation&&(a(c.opt.navigation).append("<ul />"),c.previous=a(c.opt.navigation).find("ul").last(),d=function(a){return c.navigations(a)});for(var e=0;e<c.headers.length;e++)b=c.headers.eq(e),d(b),c.anchor(b);c.opt.spy&&c.spy(),c.opt.top&&c.back()},navigations:function(b){var c,e,f,g=this,h=g.name(b);b.attr("id")!==d&&(h=b.attr("id")),c=a("<a />").attr("href","#"+h).text(b.text()),e=a("<li />").append(c),f=parseInt(b.prop("nodeName").substring(1),null),e.attr("data-tag",f),g.subheadings(f,e),g.first=f},subheadings:function(b,c){var d=this,e=(a(d.opt.navigation).find("ul"),a(d.opt.navigation).find("li"));b===d.first?d.previous.append(c):b>d.first?(e.last().append("<ul />"),a(d.opt.navigation).find("ul").last().append(c),d.previous=c.parent()):(a("li[data-tag="+b+"]").last().parent().append(c),d.previous=c.parent())},name:function(a){var b=a.text().replace(/[^\w\s]/gi,"").replace(/\s+/g,"-").toLowerCase();return b},anchor:function(b){var c,e,f=this,g=f.name(b),h=f.opt.anchorText,i=f.opt.anchorClass;b.attr("id")===d&&b.attr("id",g),e=b.attr("id"),c=a("<a />").attr("href","#"+e).html(h).addClass(i),"append"===f.opt.position?b.append(c):b.prepend(c)},back:function(){var b=this,c=a("body, html"),d=a(b.opt.top);d.on("click",function(a){a.preventDefault(),c.animate({scrollTop:0},b.opt.speed)})},top:function(b){var c,d=this,e=d.opt.top;e!==!1&&(c=a(b).scrollTop()>200?a(e).fadeIn():a(e).fadeOut())},spy:function(){var c,e,f,g=this;a(b).scroll(function(){g.top(this),c=g.headers.map(function(){return a(this).offset().top-a(b).scrollTop()<g.opt.spyOffset?this:void 0}),c=a(c).eq(c.length-1),c&&c.length&&(e=a('li:has(a[href="#'+c.attr("id")+'"])'),f!==d&&f.removeClass("active"),e.addClass("active"),f=e)})}};a.fn.anchorific=function(b){return this.each(function(){if(!a.data(this,"anchorific")){var c=Object.create(e);c.init(b,this),a.data(this,"anchorific",c)}})}}(jQuery,window,document);

$(function() {


    //restrain
    if (!$('.page-pattern-lib').length) {
        return false;
    }

        $('.pattern-menu').velocity({
            opacity: 1,
        }, 500);

        $( ".org__preview" ).resizable();

        $( ".org__preview" ).each(function(index, el) {

            var thisH = $(this).height();

            $(this).css('min-height', thisH);
            $(this).css('min-width', '320px');
            
        });

    var $previewHTML = $('body').find('.org__code textarea[name="html"]');
    var $previewJS = $('body').find('.org__code textarea[name="js"]');



    //HTML PREVIEWS
    $previewHTML.each(function(index, el) {

        CodeMirror.fromTextArea($previewHTML[index], {
            lineNumbers: true,
            theme: 'ambiance',
            lineWrapping: true,
            mode: "text/html",
            htmlMode: false,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: true,
            scrollbarStyle: "simple",
        });

    });

    //JS PREVIEWS
    $previewJS.each(function(index, el) {

        CodeMirror.fromTextArea($previewJS[index], {
            lineNumbers: true,
            theme: 'ambiance',
            lineWrapping: true,
            mode: "text/javascript",
            htmlMode: false,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: true,
            scrollbarStyle: "simple",
        });

    });


    $('.pattern-content').anchorific({
        navigation: '.pattern-menu', // position of navigation
        speed: 200, // speed of sliding back to top
        anchorClass: 'anchor', // class of anchor links
        anchorText: '', // prepended or appended to anchor headings
        top: '.top', // back to top button or link class
        position: 'append', // position of anchor text
        spyOffset: 100, // specify heading offset for spy scrolling
        spy: true,
    });


});



// $(document).ready(function(){
//     console.log('boom');

//         $( ".org__code" ).each(function(index, el) {

//             var thisContent = $(this).find('code.hljs').html();
//             console.log(thisContent);
//         });

//   hljs.initHighlightingOnLoad();


// });

