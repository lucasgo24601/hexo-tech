var objDom = document.getElementById("top-container");
getRandom(objDom)
var objDom = document.getElementById("nav");
getRandom(objDom)
function getRandom(objDom) {
  if (objDom) {
    var url = objDom.style.backgroundImage.substring(5)
    url = url.substring(0, url.length - 2);

    if (url.indexOf(',') != -1) {
      var rnadomList = url.split(',');
      var bgindex = Math.floor(Math.random() * rnadomList.length);
      objDom.style.backgroundImage = 'url(' + rnadomList[bgindex] + ')'
    }
  }
}




var offset = 100,
  offset_opacity = 1200,
  scroll_top_duration = 700,
  $back_to_top = $('.cd-top')
var scrollFunc = function () {
  if ($(this).scrollTop() > offset) {
    $back_to_top.css("visibility", "visible")
    $back_to_top.addClass('cd-is-visible')
    $('.changeSkin-gear').css('bottom', '0')
    if ($(window).height() > 20) {
      $('.cd-top.cd-is-visible').css('top', '0')
    } else {
      $('.cd-top.cd-is-visible').css('top', ($(window).height() - 950) + 'px')
    }
  } else {
    $('.changeSkin-gear').css('bottom', '-999px')
    $('.cd-top.cd-is-visible').css('top', '-900px')
    $back_to_top.removeClass('cd-is-visible cd-fade-out')
  }
  if ($(this).scrollTop() > offset_opacity) {
    $back_to_top.addClass('cd-fade-out')
  }
}
scrollFunc();
$(window).scroll(scrollFunc)
$back_to_top.on('click', function (event) {
  event.preventDefault()
  $('body,html').animate({
    scrollTop: 0
  }, scroll_top_duration)
})







$(function () {
  $('body').on('click', '.aplayer', function () {
    if ($('.aplayer-button').hasClass('aplayer-play')) {
      $('.aplayer-lrc').removeClass('lrc-show');
    } else {
      $('.aplayer-lrc').addClass('lrc-show');
    }
  })
});