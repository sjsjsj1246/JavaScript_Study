//6. 객체지향 프로그래밍

/**
 * 클래스, 생성자, 메서드
 * 상속
 * 캡슐화
 */

//6.1 클래스, 생성자, 메서드
//모두 함수로 구현한다.

function Person(arg) {
    this.name = arg;

    Person.prototype.getName = function () {
        return this.name;
    }

    Person.prototype.setName = function (value) {
        this.name = value;
    }
}

var me = new Person("zzoon"); // 객체를 생성하는, 기존 객체지향 프로그래밍에서의 방법과 비슷
console.log(me.getName());

me.setName("iamhjoo");
console.log(me.getName());
var a = new Person("a");
var b = new Person("b");
var c = new Person("c");
/**
 * 하지만 문제가 있다. 객체마다 중복되는 메서드를 메모리에 올려놓고 사용하기 때문에
 * 자원 낭비를 가져온다.
 * -> 생성자 함수의 프로토타입에 메서드를 추가하면 한번만 생성되게 할 수 있음
 * => 메서드는 프로토타입에 정의하자
 */
//메서드를 추가하는 함수
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
}

function Person(arg) {
    this.name = arg;
}

Person.method("setName", function(value) {
    this.name = value;
})

Person.method("getName", function() {
    return this.name;
})

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());


