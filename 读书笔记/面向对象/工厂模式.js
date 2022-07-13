function creatPerson(name, age, job) {
  const o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}

const person = creatPerson("name", "age", "job");
person.sayName();
