const handler = {
  get: function (targte, name) {
    console.log(`get ${name}`);
    const value = Reflect.get(targte, name);
    return Reflect.get(targte, name);
  },
  set: function (targte, name, value) {
    console.log(`set ${name}`);
    Reflect.set(targte, name, value);
  },
  getOwn,
};
const ProxyObject = new Proxy({}, handler);

// ProxyObject.name = 1;
console.log(ProxyObject.name);
