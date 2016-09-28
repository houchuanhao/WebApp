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




























