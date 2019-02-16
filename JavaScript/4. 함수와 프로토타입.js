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
obj.baz = function () {return 200;};    //객체의 프로퍼티에 추가
console.log(obj.baz());

var foo = function(func) {
    func();
};

//함수 인자로 함수전달
foo(function(){
    console.log('function can be used as the atgument');
});
//function can be used as the atgument

//함수 리턴으로 함수
var foo = function() {
    return function() {
        console.log('this function is the return vlaue');
    }
}

var bar = foo();
bar();  //this function is the return vlaue

//함수 객체의 기본 프로퍼티
function add(x,y) {
    return x+y;
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

 //콜백 함수 : 익명 함수의 대표적인 용도

 