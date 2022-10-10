//给string 添加拼接方法
//参考地址https://www.cnblogs.com/laogao123/p/9695361.html

String.prototype.signMix = function () {
  if (arguments.length === 0) return this;
  var param = arguments[0],
    str = this;
  if (typeof param === "object") {
    for (var key in param)
      str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    return str;
  } else {
    for (var i = 0; i < arguments.length; i++)
      str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return str;
  }
};

//使用案例:

// var str1 = "hello {0}".signMix("world"); //hello world

// var str2 = "{0}总冠军, {1}总冠军".signMix("湖人", "骑士"); // 湖人总冠军，骑士总冠军

// var user = {name: "James",sex: "male",age: 34};
// var str3 = "史上第一个30000+8000+8000球员：{name}, 性别{sex}, 今年{age}岁".signMix(user);
// //史上第一个30000+8000+8000球员：James, 性别male, 今年34岁

// var optionData= {name: "flower",selected:true, spell: "abc", value:"1"};
// var optionStr='<option value="{value}" match="{spell}" selected="{selected}">{name}</option>'.signMix(optionData)
// //<option value="1" match="abc" selected="true">flower</option>
