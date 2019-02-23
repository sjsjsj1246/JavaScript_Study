//5. 실행 컨텍스트와 클로저.js

/**
 * 5.1 실행 컨텍스트 개념
 * 콜 스택에 들어가는 실행정보 하나와 비슷
 * 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념
 * 실행 가능한 자바스크립트 코드블록(대부분 함수)이 실행되는 환경
 * 현재 실행되는 컨텍스트에서 이 컨텍스트와 관련없는 실행코드가 실행되면, 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이용된다.
 */

console.log("This is global context");

function ExContext1() {
    console.log("This is ExContext1");
};

function ExContext2() {
    ExContext1();
    console.log("This is ExContext2");
}

ExContext2();

/**
 * This is global context
 * This is ExContext1
 * This is ExContext2
 */
// 전역 컨텍스트 -> ExContext2 생성 -> ExContext1 생성 -> ExContext1 반환 -> ExContext2 반환

//5.2 실행 컨텍스트 생성 과정

//5.2.1 활성 객체 생성
/**
 * 실행 컨텍스트가 생성되면 자바스크립트 엔진은 해당 컨텍스트에서 실행에 필요한 여러가지 정보를 담을
 * 객체를 생성하는데, 이를 활성 객체라고 한다.
 * 이 객체에 앞으로 사용하게 될 매개변수나 사용자가 정의한 변수 및 객체를 저장하고, 새로 만들어진
 * 컨텍스트로 접근 가능하게 되어 있다.
 */

//5.2.2 arguments 객체 생성
/**
 * 다음 단계에서는 arguments 객체를 생성한다. 활성 객체는 arguments 프로퍼티로 이 객체를 참조한다.
 */

//5.2.3 스코프 정보 생성
/**
 * 현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성한다. 
 * 이 정보는 컨텍스트 안에서 연결 리스트와 유사한 형식으로 만들어진다.
 * 현재 컨텍스트에서 특정 변수에 접근해야 할 경우 이 리스트를 활용한다. 이 리스트를 스코프 체인이라고 한다 [[scope]]
 * 활성 객체가 스코프 체인의 제일 앞에 추가되며 이 체인을 활용하여 변수 등에 접근할 수 있다.
 */

//5.2.4 변수 생성
/**
 * 현재 실행 컨텍스트 내부에서 사용되는 지역변수의 생성이 이루어진다.
 * 활성객체(변수객체라고도 부름) 안에서 호출된 함수 인자는 각각의 프로퍼티가 만들어지고 그 값이 할당된다.
 * 값이 넘겨지지 않았다면 undefined가 할당된다.(함수에 인자를 적게넣어도 동작은하는 이유)
 * 중요한 것은 변수의 생성만 이루어지고 초기화는 나중에 이루어진다는 것
 */

//5.2.5 this 바인딩

//5.2.6 코드 실행
/**
 * 변수의 초기화, 연산, 함수실행등이 이루어진다.
 */

//tmi 전역 객체에는 arguments객체가 없다. Node.js에선 최상위 코드가 전역 코드가 아니다

//5.3 스코프 체인
/**
 * C로 예를 들면 {}로 묶여 있는 범위 안에서 선언된 변수는 블록이 끝나는 순간 사라지므로 밖에서는 접근할 수 없다.
 * if, for 문 등등 도 마찬가지, 하지만 자바스크립트에는 if for같은 구문 유효 범위가 없다. 오직 함수만이 유효범위의
 * 한 단위가 된다. 이 유효범위를 나타내는 스코프가 [[scope]]프로퍼티로 각 함수 객체 내에서 연결리스트 형식으로 
 * 관리되는데 이를 스코프 체인이라고 한다.
 * 실행된 함수는 [[scope]]프로퍼티를 가지고 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조한다. 이 실행 컨텍스트는
 * 실행된 함수의 [[scope]]를 기반으로 새로운 스코프 체인을 만든다.
 */

//5.3.1 전역 실행 컨텍스트의 스코프 체인
var var1 = 1;
var var2 = 2;
console.log(var1);
console.log(var2);
/**
 * 전역 스코프 체인 생성 -> 변수객체 만듦 -> 참조할 상위 컨텍스트가 없으므로 자기 자신을 가리킴(변수객체의 [[scope]]가 자기자신을 가리킴)
 * -> var1, var2 변수들이 생성되고 변수객체에 의해 참조된다. -> 이 객체가 곧 전역 개체가 된다.
 *  구조 : 전역실행컨텍스트( 변수객체( [[scope]], var1, var2, this )   )
 */


//5.3.2 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인

var var1 = 1;
var var2 = 2;
function func() {
    var var1 = 10;
    var var2 = 20;
    console.log(var1);  //10
    console.log(var2);  //20
}
func();
console.log(var1);  //1
console.log(var2);  //2
/**
 * 전역 실행 컨텍스트 생성 -> func()함수 객체 생성 -> func()의 [[scope]] = 전역 변수객체 -> func의 컨텍스트 생성
 * -> func()의 [[scope]]맨 앞에 func의 변수 객체를 넣는다.
 * 스코프 체인 = 현재 실행 컨텍스트의 변수객체 + 상위 컨텍스트의 스코프 체인
 */

//5.4 클로저 : 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수

function outerFunc() {
    var x = 10;
    var innerFunc = function () { console.log(x); }
    return innerFunc;
}

var inner = outerFunc();
inner();    //outerFunc컨텍스트는 사라졌지만 Inner스코프 체인에는 남아있어서 참조 가능하다.

//예제
function outerFunc() {
    var x = 1;

    return function () {
        // x와 arguments를 활용한 로직;
    }
}

var new_func = outerFunc();
new_func();

//5.4.2 클로저의 활용 -> 함수형 프로그래밍, 경험 중요
function HelloFUnc(func) {
    this.greeting = "hello";
}

HelloFUnc.prototype.call = function (func) {
    func ? func(this.greeting) : this.func(this.greeting);
}

var userFunc = function (greeting) {
    console.log(greeting);
}

var objHello = new HelloFUnc();
objHello.func = userFunc;
objHello.call();
//정해진 형식의 함수를 콜백해주는 라이브러리가 있을 경우, 그 정해진 형식과는 다른 형식의 사용자 정의 함수를
//호출할 때 유용하다.
// +
function saySomething(obj, methodName, name) {
    return (function (greeting) {
        return obj[methodName](greeting, name)
    });
}

function newObj(obj, name) {
    obj.func = saySomething(this, 'who', name);
    return obj;
}

newObj.prototype.who = function (greeting, name) {
    console.log(greeting + ' ' + (name || "everyone"));
}

var obj1 = new newObj(objHello, 'zzoon');
obj1.call();

//함수의 캡슐화
var getCompletedStr = (function () {
    var buffar = [
        'I am',
        '',
        '. I live in ',
        '',
        ". I'm ",
        '',
        ' years old.'
    ];

    return (function (name, city, age) {
        buffar[1] = name;
        buffar[3] = city;
        buffar[5] = age;

        return buffar.join('');
    })
})()

var str = getCompletedStr('zzoon', 'seoul', 20);
console.log(str);

//setTimeout()에 지정되는 함수의 사용자 정의
function callLater(obj, a, b) {
    return (function () {
        obj['sum'] = a + b;
        console.log(obj["sum"]);
    })
}

var sumObj = {
    sum: 0
}

var func = callLater(sumObj, 1, 2);
setTimeout(func, 500);

/**
 * 5.4.3 클로저 사용시 주의사항
 * 1. 클로저의 프로퍼티 값이 쓰기 가능이므로 그 값이 항상 변할 수 있음을 조심
 * 2. 여러 개의 클로저가 같은 스코프 체인에 들어가 있을수 있다
 * 3. 루프 안에서 클로저를 활용할 떄는 주의하자 참조값을 넣어주면 안됨
 *  */