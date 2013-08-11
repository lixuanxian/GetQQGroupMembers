var QQGroupWebURL = 'http://qun.qzone.qq.com/group';
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

function closePopup() {
	window.close();
}
function openQQGroupPage() {
	chrome.tabs.create({
		url: QQGroupWebURL
	});
         closePopup();
}


function init(){
      chrome.tabs.getSelected(function( tab){
     var current_tab_url = tab.url;
     var re=/http(s)?:\/\/qun.qzone.qq.com\/group*/g; 
     if(!(re.test(current_tab_url))){ 
         openQQGroupPage();
     }
 });
}



function click(e) {

}

init();
  



//// 将选项保存至 localStorage。
//function save_options() {
//  var select = document.getElementById("color");
//  var color = select.children[select.selectedIndex].value;
//  localStorage["favorite_color"] = color;
//
//  // 更新状态，告诉用户选项已保存。
//  var status = document.getElementById("status");
//  status.innerHTML = "Options Saved.";
//  setTimeout(function() {
//    status.innerHTML = "";
//  }, 750);
//}
//
//// 从保存在 localStorage 中的值恢复选定的内容。
//function restore_options() {
//  var favorite = localStorage["favorite_color"];
//  if (!favorite) {
//    return;
//  }
//  var select = document.getElementById("color");
//  for (var i = 0; i < select.children.length; i++) {
//    var child = select.children[i];
//    if (child.value == favorite) {
//      child.selected = "true";
//      break;
//    }
//  }
//}
//document.addEventListener('DOMContentLoaded', restore_options);
//document.querySelector('#save').addEventListener('click', save_options);
