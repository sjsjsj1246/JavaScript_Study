//4. 함수와 프로토타입

//4.1 함수 정의 함수도 하나의 값처럼 취급됨
/**
 * 함수 생성법:
 * 1. 함수 선언문
 * 2. 함수 표현식
 * 3. Function() 생성자 함수
 */

//함수 리터럴
function add(x, y) {
    return x + y;
}

//함수 선언문 : 함수명이 정해져 있어야 한다
function add(x, y) {
    return x + y;
}

//함수 표현식   중괄호 뒤에 ;를 붙이는게 좋음
var add = function (x, y) {
    return x + y;
};
// 익명 함수를 add 라는 변수에 넣어줌
var plus = add;

console.log(add(3, 4));      //7
console.log(plus(3, 4));     //7

//add, plus 함수 변수는 동일한 익명 함수를 참조한다.
//익명함수의 이름은 재귀호출이나, 디버깅을 할 때 쓰임
var add = function sum(x, y) {
    return x + y;
};

console.log(add(3, 4));      //7
console.log(sum(3, 4));      //error 외부 코드에서 접근 불가능

var factorialVar = function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n + factorial(n - 1);
};

console.log(factorialVar(3));   //6

//Function() 생성자 함수를 통한 함수 생성하기 별로안씀
var add = new Function('x', 'y', 'return x+y');
console.log(add(3, 4));      //7

//함수 호이스팅 함수 선언문 이전의 코드도 실행이됨, 바람직하진 않음
//함수 표현식으로는 불가능함
console.log(add(2, 3));

function add(x, y) {
    return x + y;
}

console.log(add(3, 4));

//4.2 함수 객체
function add(x, y) {
    return x + y;
}

add.result = add(3, 2);
add.status = 'OK';

console.log(add.result);    //5
console.log(add.status);    //OK

/**
 * 자바스크립트에서 함수는 값으로 취급된다.
 * 1.리터럴에 의해 생성
 * 2.변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
 * 3.함수의 인자로 전달 가능
 * 4.함수의 리턴값으로 리턴 가능
 * 5.동적으로 프로퍼티를 생성 및 할당 가능
 * 
 * 이와 같은 특징을 가지는 객체를 일급 객체라고 부른다.
 * 함수형 프로그래밍 가능
 */

var bar = function () { return 100; };
console.log(bar());

var obj = {};
obj.baz = function () { return 200; };    //객체의 프로퍼티에 추가
console.log(obj.baz());

var foo = function (func) {
    func();
};

//함수 인자로 함수전달
foo(function () {
    console.log('function can be used as the atgument');
});
//function can be used as the atgument

//함수 리턴으로 함수
var foo = function () {
    return function () {
        console.log('this function is the return vlaue');
    }
}

var bar = foo();
bar();  //this function is the return vlaue

//함수 객체의 기본 프로퍼티
function add(x, y) {
    return x + y;
};

console.dir(add);
/**
 * 
ƒ add(x,y)
    arguments: null
    caller: null
    length: 2
    name: "add"
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
        apply: ƒ apply()
        arguments: (...)
        bind: ƒ bind()
        call: ƒ call()
        caller: (...)
        constructor: ƒ Function()
        length: 0
        name: ""
        toString: ƒ toString()
        Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
        get arguments: ƒ ()
        set arguments: ƒ ()
        get caller: ƒ ()
        set caller: ƒ ()
        __proto__: Object
        [[FunctionLocation]]: <unknown>
        [[Scopes]]: Scopes[0]
    [[FunctionLocation]]: VM524:1
    [[Scopes]]: Scopes[1]
 */
//length와 prototype 프로퍼티를 가짐 length는 인자의 개수
//__proto__ 와 prototype 은 다름 

function myFunction() {
    return true;
}

//함수 객체와 프로토타입 객체는 서로 연결되어 있다.
console.log(myFunction.prototype);
console.log(myFunction.prototype.constructor);
/**
 * {constructor: ƒ}
 * constructor: ƒ myFunction()
 * __proto__: Object
 * 
 * ƒ myFunction() {
 *  return true;
 *  }
 */

//4.3 함수의 다양한 형태
/**
 * 콜백 함수 : 익명 함수의 대표적인 용도
 * 코들르 통해 명시적으로 호출하는 함수가 아니라 특정 이벤트가 발생했을 때 시스템에서 호출되는 함수.
 * 웹페이지가 로드되거나 키보드가 입력되는 등의 이벤트 발생시 실행 등등
 */

/*
 < !DOCTYPE html >
    <html>
        <body>
            <script>
                //페이지 로드시 호출될 콜백 함수
                window.onload = function() {
                    alert('this is the callback function')
                };
         </script>
        </body>
    </html>
*/
// 즉시 실행 : 함수 익명함수 응용형태
(function (name) {
    console.log('this is the immediate function ->' + name);
})('foo');
//다시 실행할 수 없다, 최초 한번의 실행만을 필요로 하는 초기화 작업에 쓰임


//내부 함수 : 함수 내부에서 다시 함수의 정의 가능 
function parent() {
    var a = 100;
    var b = 200;

    function child() {
        var b = 300;

        console.log(a);     //100 부모 함수의 변수에 접근 가능
        console.log(b);     //300 자신의 변수가 우선
    }
    child();
}
parent();
child(); //error 일반적으로 내부함수는 부모 함수만 호출 가능

//함수 스코프 이해
function parent() {
    var a = 100;
    var child = function () {
        console.log(a);
    };
    return child;
}
var inner = parent();
inner();                //생성된 child를 참조한다.
//이미 실행이 끝난 parent()와 같은 부모 스코프의 변수를 참조하는 변수를 클로저라고 한다

var self = function () {
    console.log('a');
    return function () {
        console.log('b');
    }
}
self = self();  //a
self();         //b

//4.4 함수 호출과 this
//argument 객체
//함수를 호출할 때 인수들과 함께 암묵적으로 arguments 객체가 전달됨 유사 배열 객체임

function func(arg1, arg2) {
    console.log(arg1, arg2);
}

func();         //undefined undefined
func(1);        //1 undefined
func(1, 2);      //1 2
func(1, 2, 3);    //1 2 초과되면 무시

function add(a, b) {
    console.log(arguments);
    return a + b;
}

console.log(add(1));        //1
console.log(add(1, 2));     //3
console.log(add(1, 2, 3));  //3

/*
Arguments [1, callee: ƒ, Symbol(Symbol.iterator): ƒ]0: 1callee: ƒ add(a, b)length: 1Symbol(Symbol.iterator): ƒ values()__proto__: Object
NaN
Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]0: 11: 2callee: ƒ add(a, b)length: 2Symbol(Symbol.iterator): ƒ values()__proto__: Object
3
Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]0: 11: 22: 3callee: ƒ add(a, b)length: 3Symbol(Symbol.iterator): ƒ values()__proto__: Object
3
*/

/**
 * argument 구조
 * 1. 인자로 수정된 배열
 * 2. length 프로퍼티 : 인자의 개수
 * 3. callee 프로퍼티 : 실행중인 함수의 참조값
 */

function sum() {
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

console.log(sum(1, 2, 3));   //6

//호출 패턴과 this 바인딩, this는 자신을 호출한 객체에 바인딩
var myObject = {
    name: 'foo',
    sayName: function () {
        console.log(this.name);
    }
};

var otherObject = {
    name: 'bar'
};

otherObject.sayName = myObject.sayName;

myObject.sayName();     //foo
otherObject.sayName();  //bar

//브라우저에서 자바스크립트를 실행하는 경우 전역 객체는 window 객체가 된다.

var foo = "i'm foo"

console.log(foo);           //i'm foo
console.log(window.foo);    //i'm foo

var test = "this is test";
console.log(window.test)    //this is test

var sayfoo = function () {
    console.log(this.test);
}

sayfoo();                   //this is test

//내부 함수와 this 바인딩
var value = 100;

var myObject = {
    value: 1,
    func1: function () {
        this.value += 1;
        console.log('func() called. this.value : ' + this.value);

        func2 = function () {
            this.value += 1;
            console.log('func2() called. this.value : ' + this.value);

            func3 = function () {
                this.value += 1;
                console.log('func3() called. this.value : ' + this.value);
            };

            func3();
        };

        func2();
    }
};
myObject.func1();

/*
func() called. this.value : 2
func2() called. this.value : 101
func3() called. this.value : 102
내부함수 호출패턴을 정의해 놓지 않았기 때문에 내부함수의 this가 window에 바인딩됐다.
이를 막기 위한 테크닉으로 부모 함수의 this를 내부 함수가 접근 가능한 다른 변수에 저장하는 방법을 쓴다
관례적으로 that이라고 이름 짓는다.
*/

var value = 100;

var myObject = {
    value: 1,
    func1: function () {
        var that = this;

        this.value += 1;
        console.log('func() called. this.value : ' + this.value);

        func2 = function () {
            that.value += 1;
            console.log('func2() called. this.value : ' + that.value);

            func3 = function () {
                that.value += 1;
                console.log('func3() called. this.value : ' + that.value);
            };

            func3();
        };

        func2();
    }
};
myObject.func1();

/*
func() called. this.value : 2
func2() called. this.value : 3
func3() called. this.value : 4
*/

//생성자 함수를 호출할 때 this 바인딩

//자바스크립트는 기존 함수에 new 연산자를 붙여서 호출하면 생성자 함수로 동작한다.
//특정 함수가 생성자 함수로 정의되어있음을 알리려고 함수 이름의 첫 문자를 대문자로 쓴다
/**
 * 생성자 함수 동작방식
 * 1. 빈 객체 생성 및 this 바인딩
 *      생성자 함수 코드가 실행되기 전에 빈 객체를 생성한다. this는 빈 객체를 가리킨다.
 *      이때 생겨난 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.
 * 2. this를 통한 프로퍼티 생성
 * 3. 생성된 객체 리턴
 */

var Person = function (name, age, gender) {
    this.name = name,
        this.age = age,
        this.gender = gender
};

var foo = new Person('foo', 33, 'woman');
console.dir(foo);

var baz = new Person('baz', 25, 'woman');
console.dir(baz);
//객체를 재생산해야 할 때는 이 방식이 좋음

//new를 붙이지 않으면 오류가 생길 수 있기 때문에 주의, 이떄문에 강제로 인스턴스를 생성하게 만드는 패턴이 있다
function A(arg) {
    if (!(this instanceof arguments.callee))     //this가 A의 인스턴스인지 확인한다 아니면 new를 붙여서 A 실행
        return new A(arg);
    this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value);
console.log(b.value);
console.log(global.value);

/**
 * this를 특정  객체에 명시적으로 바인딩하는 법
 * 함수 객체의 기본 프로퍼티에서 apply()와 call()메서드
 * function.apply(thisArg, argArray); 형식으로 사용
 * 본질적인 기능은 함수 호출
 * Person.apply(a,b) 하면 Person의 this에 a바인딩, 인자로 b를 넘겨줌
 */

function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
};

var foo = {};
Person.apply(foo, ['foo', 30, 'man']);
//=Person.call(foo,'foo',30,'man');
console.dir(foo);
/*
Object
    age: 30
    gender: "man"
    name: "foo"
    __proto__: Object
*/

//apply()를 사용하면 argument에 표준 배열 메서드를 사용 가능하다. pop(), shift() 같은

function myFunction() {
    console.dir(arguments);

    var args = Array.prototype.slice.apply(arguments);
    // Array.prototype.slice() 메서드를 호출하는데 이 때 this를 arguments로 바인딩한다.
    // 즉 arguments.slice()처럼 사용하겠다는 의미
    // slice()는 배열 슬라이싱 함수 인자를 넘겨주지 않으면 그대로 반환함
    console.dir(args);
}

myFunction(1, 2, 3);

/**
 * 자바스크립트 함수는 항상 리턴값을 반환한다.
 * 1. 일반 함수나 베서드는 리턴값을 지정하지 않을 경우 undefined 값이 리턴된다.
 * 2. 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.
 */

// 4.5 프로토타입 체이닝
// 프로토타입 기반의 객체지향 프로그래밍
// 모든 객체는 자신을 생성한 생성자 함수의 protype 프로퍼티가 가리키는 프로토타입
// 객체를 자신의 부모 객체로 설정하는 [[prototype]]링크로 연결한다.

function Person(name) {
    this.name = name;
}

var foo = new Person('foo');

console.dir(Person);
console.dir(foo);
/*
ƒ Person(name)
    arguments: null
    caller: null
    length: 1
    name: "Person"
    prototype:
        constructor: ƒ Person(name)
        __proto__: Object
    __proto__: ƒ ()
    [[FunctionLocation]]: VM283:2
    [[Scopes]]: Scopes[1]

Person
    name: "foo"
    __proto__:
        constructor: ƒ Person(name)
        __proto__: Object
*/

// 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
var myObject = {
    name: 'foo',
    sayName: function () {
        console.log('My Name is ' + this.name);
    }
};

myObject.sayName();         //My Name is foo
console.log(myObject.hasOwnProperty('name'));       //true
console.log(myObject.hasOwnProperty('nickName'));   //false
// myObject 에는 hasOwnProperty()가 없으므로 [[prototype]] 링크를 찾아가서 실행한것이다
// 이렇게 계속 링크를 타고 올라가서 찾는다. 이것이 프로토타입 체이닝
myObject.sayNickName();     //error

// Object.prototype 객체는 프로토타입 체이닝의 종점이다.

// Number.prototype, String.prototype, Array.prototype 등등
String.prototype.testMethod = function () {
    console.log('this is the String.prototype.testMethod()');
};

var str = 'this is test';
str.testMethod();       //str의 프로토타입에 testMethod 추가

console.dir(String.prototype);

// 프로토타입 메서드와 this 바인딩
function Person(name) {
    this.name =name;
}

Person.prototype.getName = function () {
    return this.name;
};

var foo = new Person('foo');

console.log(foo.getName());             //foo, this에 foo 바인딩

Person.prototype.name = 'person';

console.log(Person.prototype.getName());  //person, this에 prototype 바인딩

//디폴트 프로토타입은 다른 객체로 변경이 가능하다.
function Person(name) {
    this.name;
}
console.log(Person.prototype.constructor);

var foo = new Person('foo');
console.log(foo.country);

Person.prototype = {
    country: 'korea'
};
console.log(Person.prototype.constructor);  //프로토타입 재정의

var bar = new Person('bar');
console.log(foo.country);
console.log(bar.country);
console.log(foo.constructor);
console.log(bar.constructor);

/*
Person(name)
undefined
Object()
Korea
Person(name)
Object
*/

//객체의 프로퍼티 읽기나 메서드를 실행할 때만 프로토타입 체이닝이 동작한다.
function Person(name) {
    this.name = name;
}

Person.prototype.country = 'korea';

var foo = new Person('foo');
var bar = new Person('bar');
console.log(foo.country);   //korea
console.log(bar.country);   //korea
foo.country = 'USA';        //쓰기는 안됨 프로토타입에 쓰는 것이 아니라 foo에 새로 만들기 때문

console.log(foo.country);   //USA   이건 프로토타입의 프로퍼티가 아니라 foo의 프로퍼티임
console.log(bar.country);   //korea