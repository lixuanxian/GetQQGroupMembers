// Set variables

window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
window.URL = window.URL || window.webkitURL;
var HOST = window.location.host;
var LocalURL = window.location.href;
var QQUin = $(".user_ava img[class=avatar]").attr('uin');
 var GetQQGroupMembersURL = 'http://qun.qzone.qq.com/cgi-bin/get_group_member?neednum=1&r=0.4437826597131789&g_tk=437403321';
//var GetQQGroupURL = 'http://qun.qzone.qq.com/cgi-bin/get_group_list?callbackFun=getQQGroup&uin=342494491&random=0.8364071836695075&g_tk=437403321&callbackFun=requestCallback';
  var GroupMemberListContent ="";
  var LastGroupID ='';//正在处理的id
  var CountHandGroupNumber = 0;//总共的选择的QQ群的数目
  var FileName = '导出的QQ群成员邮箱';
  var coutExportQQMembers = 0;//用来统计总共导出了多少个成员
//

$(document).ready(function() {
    $.each($("body script"),function(){
     var reg = /http(s)?:\/\/qun.qzone.qq.com\/cgi-bin\/get_group_member/g;
      src = $(this).attr('src');
      if(reg.test(src))
      {
      GetQQGroupMembersURL = src;
      Log(GetQQGroupMembersURL);
     
      }
      });
     var re=/http(s)?:\/\/qun.qzone.qq.com\/group*/g; 
     if(re.test(LocalURL)){ 
        getQQGroupList();
     }
  
});

function Log(message){
//   console.log(message);
}

//处理群列表
function handleGrouListWithList(groupList)
{
    
      GroupMemberListContent  = "";//把内容清空
      coutExportQQMembers = 0;//把记录导出多少成员的计算器设置为 0 
      CountHandGroupNumber= groupList.length;
      
       $.each(groupList,function(index){
            getQQGroupMemeberListWithAjax($(this).attr("data-groupid"));
         });
    
}

 function getQQGroupMemeber_Callback(data)
{
  
 if(undefined != data.data){
     Log(data);
     var items = data.data.item;
     $.each(items,function(index){
         var item = items[index];
        if(item.iscreator!=1 &&  item.ismanager!=1)   {
           coutExportQQMembers++;
           GroupMemberListContent += '\n'+item.uin+'@qq.com;';
         }
     });
     CountHandGroupNumber--;
     //当最后一个群被数据处理完成的时候，需要进行保持
     if(CountHandGroupNumber == 0) {
           saveToTextFile(GroupMemberListContent,FileName+'('+coutExportQQMembers+')');
       }
  }
}
function getQQGroupMemeberListWithAjax(groupid)
{
    var requestUrl = GetQQGroupMembersURL.replace('groupid=0','groupid='+groupid+' ');
    requestUrl = requestUrl.replace('callbackFun=_GroupMember','callbackFun=getQQGroupMemeber');
  Log("requestURL: "+requestUrl);
 var request =  $.ajax({
            type: "get",
            async: false,
            url:requestUrl,
//           dataType:"jsonp",
         success:getQQGroupMemeber_Callback,
            error: function(jqXHR, textStatus){
              Log(textStatus);
       
                },
            cache: false
        });
}

//对QQ列表进行处理
function getQQGroupList(){
  var  group_list = $("#my_group_list_container li a[class!='chooseGroup']");
  group_list.parent(".gb_toolbar .appbox").css({"display":"block"});
  $('.banner  ul').append('<li><div title="导出所有群中的成员" id="getGroupMemeber" style="cursor: pointer;" class="a_txt index_link"  ><span>导出所有群成员</span></div></li>');
  $('.banner  ul').append('<li><div title="导出选择群成员" id="getSelectedGroupMemeber" style="cursor: pointer;"  class="a_txt index_link" ><span>导出选择群成员</span></div></li>');
   
    $.each(group_list,function(index){
       $(this).parent("li").append('<div    class="chooseGroup"  title="'+$(this).attr("title")+'"    data-groupid="'+$(this).attr("data-groupid")+'"  style="margin-top: -11px;margin-left: 80px;  max-width:140px; "><input  style="margin-left: 10px; cursor: pointer;" class="chooseInput"   type="checkbox" >   <span  style="margin-left: 10px; cursor: pointer;"  title="导出群'+$(this).attr("title")+'"  class="chooseSave"  value="导出">   导出</span></div>')
   });
   
   $(".chooseGroup .chooseSave").bind("click",function(){
     var  ChooseGroupList = $(this).parent('div[class="chooseGroup"]');
     FileName = ChooseGroupList.attr('title');
        handleGrouListWithList(ChooseGroupList);
   });
   
      //处理所有成员
   $('#getGroupMemeber').bind("click",function(){
   FileName = '导出所有成员QQ群成员邮箱';
handleGrouListWithList(group_list);
   });

//导出选择群列表
   $('#getSelectedGroupMemeber').bind("click",function(){
      FileName = '导出选择群列表成员邮箱';
         var  ChooseGroupList = $("#my_group_list_container li .chooseGroup:has(input:checked)");
        handleGrouListWithList(ChooseGroupList);
   });
   
};




 
//用来保存文件
function saveToTextFile(content,title)
{
var uriContent = "data:text/plain;charset=utf-8,"+content;
//var newWindow=window.open(uriContent, title);
var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
save_link.href =  uriContent;
//data:text/plain;charset=utf-8,%E4%B8%AD%E6%96%87%E5%86%85%E5%AE%B9%EF%BC%8C%E6%96%87%E6%9C%AC%E6%B5%8B%E8%AF%95%EF%BC%8C
save_link.download = title+".txt";
var event = document.createEvent('MouseEvents');
event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
save_link.dispatchEvent(event);
URL.revokeObjectURL(uriContent);
}

 
