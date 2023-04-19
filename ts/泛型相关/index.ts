//https://juejin.cn/post/7170662948656906253

// Exclude<T,U>  排除T中U  TU 都为具体类型/字面量类型
// 源码定义
// type Exclude<T, U> = T extends U ? never : T;

type Ex1 = Exclude<string | number, number>;

type Ex2 = Exclude<"a" | "b" | "c", "a" | "b">;

//Extract <T,U> 提取T中U 都为具体类型/字面量类型
// 源码定义
// type Extract<T, U> = T extends U ? T : never;
type Ext1 = Extract<string | number, number>;

type Ext2 = Extract<"a" | "b" | "c", "a" | "b">;

// Omit<T,K>  T(对象类型)  排除T中K
// 源码定义
//  keyof any 就是 string | number | symbol
// type Omit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }
interface User {
  name: string;
  age: number;
  sex: string;
}
type Om = Omit<User, "age">;

// Pick<T,K>  T(对象类型)  提取T中K
// 定义源码
//  type Pick<T,K extendds keyof any>= { [P in K]: T[P]; }
type Pk = Pick<User, "name" | "sex">;

// Record<K,V> 创建自定对象
// 源码定于
// type Record<K:any,V> = {[P in K]:V}
//自定义对象
// 空对象
type Empty = Record<any, never>;
// 任意对象
type Obj = Record<any, unknown>;
type Obj1 = Record<any, {}>;
// 自定义对象key
type keys = "name" | "age";
type KeyObj = Record<keys, string>;

type KeyObjAny = Record<keys, unknown>;
type KeyObjAny1 = Record<keys, {}>;

// 自定义对象value
type values<T> = {
  a?: T;
  b?: T;
  test?: string;
};
type ValueObj = Record<keys, values<string | number>>;

let obj: ValueObj = {
  name: {
    a: "1",
    b: 11,
    test: "111",
  },
  age: {
    a: 2,
    b: 11,
  },
};

// 固定value值
type ConstantValueObj = Record<keys, 111>;
let obj1: ConstantValueObj = {
  name: 111,
  age: 111,
};

//Partial<T>  生成 T(对象类型) 属性全部可选
// 定义源码
// type Partial<T> ={ [P in keyof T]?:T[P]}
type ParUser = Partial<User>;

// Required<T> 生成 T(对象类型) 属性全部必填
// 定义源码
// type Required<T> ={ [P in keyof T]-?:T[P]}
type RequiredUser = Required<ParUser>;

// Readonly<T> 生成 T(对象类型) 属性全部只读
// 定义源码
// type Readonly<T> ={ readonly [P in keyof T]:T[P]}
type ReadonlyUser = Readonly<User>;

// Partial/Required/Readonly 实现深度(层次嵌套)
interface UseWithChildren extends User {
  children: string[];
}

// 递归 Partial
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type UseWithChildrenDeepPartial = DeepPartial<UseWithChildren>;

// 递归 Required
type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

type UseWithChildrenDeepRequired = DeepRequired<UseWithChildrenDeepPartial>;

// 递归 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

type UseWithChildrenDeepReadonly = DeepReadonly<UseWithChildren>;

// NonNullable<T> 去掉T 中 null 和 undefined, T(字面量/具体类型的联合类型),不可为对象类型
// 定义源码
// 4.8版本之前的版本
// type NonNullable<T> = T extends null | undefined ? never : T;
// 4.8
// type NonNullable<T> = T & {}

type NoNullT = NonNullable<string | null | undefined>;
type NoNullArr = NonNullable<string[] | null | undefined>;

// 递归
type DeepNonNullable<T> = T extends object
  ? {
      [P in keyof T as T[P] extends null | undefined
        ? never
        : P]: DeepNonNullable<T[P]>;
    }
  : T;

type UseWithChildrenDeepNonNullable = DeepNonNullable<UseWithChildren>;
