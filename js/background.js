var QQGroupWebURL = 'http://qun.qzone.qq.com/group';
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

 
function init(){
      chrome.tabs.getSelected(function( tab){
     var current_tab_url = tab.url;
     var re=/http(s)?:\/\/qun.qzone.qq.com\/group*/g; 
     if(!(re.test(current_tab_url))){ 
         openQQGroupPage();
     }else{
         getQQGroupList();
     }
 });
}



function click(e) {

}

init();
  

 