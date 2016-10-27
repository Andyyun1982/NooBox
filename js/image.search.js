var parameters={};
var ids=["google","baidu","tineye","bing","yandex","saucenao","iqdb"];
var result;
function getParameters(){
  var temp=window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i=0;i<temp.length;i++){
    var temp2=temp[i].split('=');
    var key=temp2[0];
    var value=temp2[1];
    parameters[key]=value;
  }
}

var firstDisplay=true;
var isDataURI=false;

function display(engine){
  if(firstDisplay){
    firstDisplay=false;
    $('#imageDiv').html('<img id="imageInput" src="'+result.imageUrl+'"></img>');
    for(var i=0;i<result.finished.length;i++){
      var engine=result.finished[i];
    //for(engine of result.finished){
      $('#'+engine+'Iframe').attr('src',result[engine+'Url']);
      remainIframes++;
      $('#moreResults').append('<li><a target="_blank"  href="'+result[engine+'Url']+'"><img class="moreResultsImages" id="moreResult'+engine+'" src="/thirdParty/'+engine+'.png" /></a></li>');
      switch(engine){
        case 'google':
          var googleKeyword=(result.googleKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.googleUrl+'">'+'(by Google)'+'</a>';
          $('#keywords_google').append(googleKeyword);
          displayWebsites(result.googleRelatedWebsites||[],'relatedWebsites_google');
          displayWebsites(result.googleWebsites||[],'websites_google');
          break;
        case 'bing':
          var bingKeyword=(result.bingKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.bingUrl+'">'+'(by Bing)'+'</a>';
          $('#keywords_bing').append(bingKeyword);
          break;
        case 'baidu':
          var baiduKeyword=(result.baiduKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.baiduUrl+'">'+'(by Baidu)'+'</a>';
          $('#keywords_baidu').append(baiduKeyword);
          displayWebsites(result.baiduRelatedWebsites||[],'relatedWebsites_baidu');
          displayWebsites(result.baiduWebsites||[],'websites_baidu');
          break;
        case 'yandex':
          displayWebsites(result.yandexWebsites.slice(0,3)||[],'relatedWebsites_yandex');
          displayWebsites(result.yandexWebsites.slice(3,result.yandexWebsites.length)||[],'websites_yandex');
          break;
        case 'saucenao':
          displayWebsites(result.saucenaoRelatedWebsites||[],'relatedWebsites_saucenao');
          displayWebsites(result.saucenaoWebsites||[],'websites_saucenao');
          break;
        case 'iqdb':
          displayWebsites(result.iqdbRelatedWebsites||[],'relatedWebsites_iqdb');
          displayWebsites(result.iqdbWebsites||[],'websites_iqdb');
          break;
      }
    }
  }
  else{
    if(engine!="none"&&(!$('#moreResult'+engine).length)){
      $('#'+engine+'Iframe').attr('src',result[engine+'Url']);
      $('#moreResults').append('<li><a target="_blank"  href="'+result[engine+'Url']+'"><img class="moreResultsImages" id="moreResult'+engine+'" src="/thirdParty/'+engine+'.png" /></a></li>');
      remainIframes++;
    }
    switch(engine){
      case 'google':
        var googleKeyword=(result.googleKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.googleUrl+'">'+'(by Google)'+'</a>';
        $('#keywords_google').append(googleKeyword);
        displayWebsites(result.googleRelatedWebsites||[],'relatedWebsites_google');
        displayWebsites(result.googleWebsites||[],'websites_google');
        break;
      case 'bing':
        var bingKeyword=(result.bingKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.bingUrl+'">'+'(by Bing)'+'</a>';
        $('#keywords_bing').append(bingKeyword);
        break;
      case 'baidu':
        var baiduKeyword=(result.baiduKeyword||'(None)')+'&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank"  href="'+result.baiduUrl+'">'+'(by Baidu)'+'</a>';
        $('#keywords_baidu').append(baiduKeyword);
        displayWebsites(result.baiduRelatedWebsites||[],'relatedWebsites_baidu');
        displayWebsites(result.baiduWebsites||[],'websites_baidu');
        break;
      case 'yandex':
        displayWebsites(result.yandexWebsites.slice(0,3)||[],'relatedWebsites_yandex');
        displayWebsites(result.yandexWebsites.slice(3,result.yandexWebsites.length)||[],'websites_yandex');
        break;
      case 'saucenao':
        displayWebsites(result.saucenaoRelatedWebsites||[],'relatedWebsites_saucenao');
        displayWebsites(result.saucenaoWebsites||[],'websites_saucenao');
        break;
      case 'iqdb':
        displayWebsites(result.iqdbRelatedWebsites||[],'relatedWebsites_iqdb');
        displayWebsites(result.iqdbWebsites||[],'websites_iqdb');
        break;
    }
  }
  setTimeout(updateImageSize,100);
}

function updateImageSize(){
  $('.websiteLink').each(function(){
    var img=$(this).find('.websiteImage')[0];
    if(img){
      $(this).find('.websiteImageSize').text(img.naturalWidth+' × '+img.naturalHeight+' - ');
    }
  });
}

function displayWebsites(websiteList,id){
  var html="";
  for(var i=0;i<websiteList.length;i++){
    var website=websiteList[i];
    html+='<div class="websiteLink"><div class="websiteLinkHeader"><img class="websiteSearchIcon" src="thirdParty/'+website.searchEngine+'.png" /><a target="_blank"  class="websiteTitle" href="'+website.link+'">'+website.title+'</a></div>';
    if(website.imageUrl)
      html+='<img class="websiteImage" src="'+website.imageUrl+'"></img>';
    if(id.indexOf("google")==-1){
      html+='<div class="websiteDescription"><span class="websiteImageSize"></span>'+website.description+'</div></div>'
    }
    else{
      html+='<div class="websiteDescription">'+website.description+'</div></div>'
    }
  }
  $('#'+id).append(html);
}

function displayLoader(){
  var i=result.remains;
  for(var j=1;j<=ids.length;j++){
    $(".loading"+j).hide();
  }
  for(var j=1;j<=i;j++){
    $(".loading"+j).show();
  }
}

function update(engine){
  getDB('NooBox.Image.result_'+parameters.cursor,function(value){
    result=value;
    display(engine);
    displayLoader();
    if(result.remains==0){
      setTimeout(function(){
        remainIframes=0;
      },1000);
      if((!isDataURI)&&$('.websiteLink').length==0){
        var img=$('#imageInput')[0];
        var workerCanvas = document.createElement('canvas'),
        workerCtx = workerCanvas.getContext('2d');
        workerCanvas.width = img.naturalWidth;
        workerCanvas.height = img.naturalHeight;
        workerCtx.drawImage(img, 0, 0);
        var imgDataURI = workerCanvas.toDataURL();
        chrome.runtime.sendMessage({job:'image_search_re_search',cursor:parameters.cursor,data:imgDataURI},function(response){
          window.close();
        });
      }
    }
    if(parameters.image.match(/^dataURI/)){
      $('#imageDiv').html('<img id="imageInput" src="'+result.dataURI+'"></img>');
    }
  });
}

var remainIframes=0;
function init(){
  window.addEventListener('error', function(e) {
    console.log(e.target);
    setTimeout(function(){
      var temp=e.target.src;
      e.target.src='/images/loader.svg';
      if(remainIframes>0){
        setTimeout(function(){
          e.target.src=temp;
        },500);
      }
      else{
        e.target.src='';
      }
    },500);
  }, true);
  getParameters();
  if(parameters.image.match(/^dataURI/)){
    isDataURI=true;
  }
  update();
  updateBackgroundImage();
}

var updateBackgroundImage=function(){
  getDB('NooBox.Image.background',function(data){
    $('body').css('background-image','url('+data+')');
  });
}

document.addEventListener('DOMContentLoaded', function(){
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.job=='image_result_update'&&request.cursor==parameters.cursor){
        update(request.engine);
      }
    });
  init();
});

