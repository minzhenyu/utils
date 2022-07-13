function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

// 正常使用
const person = new Person("name", "age", "job");
person.sayName();

//普通函数使用
Person("name3", "age3", "job3");
global.sayName(); //浏览器环境 window

// 指定对象作用域调用
const o = new Object();
Person.call(o, "name1", "age1", "job1");
o.sayName();

Person.apply(o, ["name2", "age2", "job2"]);
o.sayName();
