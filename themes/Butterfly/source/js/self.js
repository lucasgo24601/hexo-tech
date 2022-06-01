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

$(function () {
  $('body').on('click', '.aplayer', function () {
    if ($('.aplayer-button').hasClass('aplayer-play')) {
      $('.aplayer-lrc').removeClass('lrc-show');
    } else {
      $('.aplayer-lrc').addClass('lrc-show');
    }
  })
});