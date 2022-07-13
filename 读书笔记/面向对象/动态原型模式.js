// 动态原型模式
//构造函数,原型优点
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
  }
}

const person = new Person("name", "age", "job");

person.sayName();
