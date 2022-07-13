// 优势:节省内存空间
//

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.fridends = ["a", "b"];
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(this.name);
  },
};

const person = new Person("name", "age", "job");

//修改属性

person.fridends.push("1");
console.log(person.fridends);
person.sayName();
console.log(person instanceof Person);
