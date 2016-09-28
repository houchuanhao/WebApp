var APP_ID = 'zOawejELhfBoQpr7mzRApScE-9Nh9j0Va';
// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
var APP_KEY = 'SMMIefmNARVitXLAwEzcq8s9';
AV.init({
	 appId: APP_ID,
	 appKey: APP_KEY
	});
function sign_up(username_id,password_id,email_id){   //注册
	var username=$("#"+username_id).val();
	var password=$("#"+password_id).val();
	var email=$("#"+email_id).val();
	//alert(username+password+email);
	// 初始化
  var user = new AV.User();
  
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {
      console.log(loginedUser);
	  alert("注册成功");
  }, (function (error) {
	  alert("注册失败");
  }));
	
}

function logIn(username_id,password_id)  //登录
{
	var username=$("#"+username_id).val();
	var password=$("#"+password_id).val();
	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});
	AV.User.logIn(username, password).then(function (loginedUser) {
    console.log(loginedUser);
	alert("登录成功");
   }, function (error) {
	   alert("登录失败");
   });
	
}
function PasswordReset(email_id)  //重置密码
{
	//alert("正在找回密码");
	var email=$("#"+email_id).val();
	alert(email);
	 AV.User.requestPasswordReset(email).then(function (success) {
		 alert("我们已将找回密码方式发送至您的邮箱，请注意查收"+email);
  	 }, function (error) {
		 alert("找回密码失败");
 	 });
}
function BusinessSignUp(FormId)
{
	/*
	1.商家登录注册模块不需要短信/邮箱验证
	2.商家登录模块有5个<input />标签，而且是兄弟节点
	3.5个input标签的顺序不能变，顺序为（1）商家名称 （2）联系方式（3）地址 （4）商家介绍 （5） logo图片的上传
	4.此函数的参数FormId为这5个<input />标签的父亲节点的ID
	*/
	var business=AV.Object.extend('business');
	var Business =new business();
	var chils=$("#"+FormId).children('input');
	/*
	alert(chils.length);
	alert(chils);
	for(var i=0;i<chils.length;i++)
	{
		var s=chils[i];
		alert(s.value);
	}
	*/
	//名称 联系方式 地址 介绍  logo
	//var Business=new AV.business;
	var BForm=new Array("BusinessName","BusinessPhoneNumber","address","introduction");
	for(var i=0;i<=3;i++)
	{
		Business.set(BForm[i],chils[i].value);
	}
	Business.save();
	var fileUploadControl=chils[4];
    if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var name = 'BusinessLogo.jpg';

    var avFile = new AV.File(name, file);
    avFile.save().then(function(obj) {
		alert(obj.url());
		var query=new AV.Query('business');
		query.equalTo('BusinessPhoneNumber',chils[1].value);
		query.first().then(function (data) {
       		alert(data.get('address'));
			Business.set('url',obj.url());
			Business.save();
  			}, function (error) {
  			});
        // 数据保存成功
   		 console.log(obj.url());
    	}, function(error) {
        // 数据保存失败
        console.log(error);
      	});
    }
}

function BusinessSignUp1(FormId)
{	
	var UserName=$("#"+FormId+">:first"); //
	var s=UserName.nextAll('input');
	var user=new AV.User;
	user.setUserName(UserName);
  // 设置密码
    user.setPassword('000000');
  // 设置邮箱
    user.setEmail(s[2].value);
	user.set('mobilePhoneNumber',s[0].value);
	
    AV.User.requestPasswordReset(email).then(function (success) {
		 alert("我们已将找回密码方式发送至您的邮箱，请注意查收"+email);
  	 }, function (error) {
		 alert("找回密码失败");
 	 });
	
	alert(firstChild.val());
	alert(s.val());
	alert(s.length);
	for(var i=0;i<5;i++)
	{
		var p=s[i];
		alert(p.value);
	}
}

function getBusinessName()
{
	var query=new AV.Query('business');
	 query.exists('BusinessName');
 	 query.find().then(function (results) {
		 var l=results.length;
		 var Str="";
		 for(var j=0;j<l;j++)
		 {
			 s=results[j].get('BusinessName');
			 var ss=results[j].get('objectId');
			 Str=Str+s+ss+"<br />";
			 
			 document.getElementById('BusinessName').innerHTML=Str;
			// alert(results[j].get('BusinessName'));	 
		 }
    // results 返回的就是有图片的 Todo 集合
 	 }, function (error) {
 	 });
}
function Release(formId)  //发布兼职
{
    var chils=$("#"+formId).children('input,select,textarea');
	var l=chils.length;
	/*
	alert(l);
	for(var i=0;i<l;i++)
	{
		alert(chils[i].value);
	}
	*/
	//chils[0]是商家id
	//判断商家id是否存在
	var query=new AV.Query('business');
	query.equalTo('objectId',chils[0].value);
	query.find().then(function (results) {
		if(results.length==0)
		{
			alert("商家id错误");
		}
		else   //已经确定商家ID正确
		{
				var Job=AV.Object.extend('Job');
				var job=new Job();
				var JArray=new Array("BusinessId","PartType","JobType","JobAddress","JobContent");
				//chils 顺序为 商家ID,兼职类型，工作类型，工作地点，工作内容
				for(var i=0;i<5;i++)
				{
					job.set(JArray[i],chils[i].value);
				}
				job.save().then(function(job){
					alert("保存成功");
					},function(error){
						alert("保存失败");
					});
	//	var BForm=new Array{""};
		}
    // results 返回的就是有图片的 Todo 集合
 	 }, function (error) {
		 alert("查询失败，请检查网络状态");
 	 });
}























