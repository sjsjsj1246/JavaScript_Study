/*
인사이드 자바스크립트 1~3장
자바스크립트는 bollen, number, string, null, undefined를 제외한 모든 것이 객체이다.(함수도 객체이다)
모든 객체는 숨겨진 링크인 프로토타입을 가진다. 이 링크는 해당 객체를 생성한 생성자의 프로토타입 객체를 가리킨다.
클래스는 없지만 객체지향 프로그래밍 가능
높은 수준의 모듈화 가능, 함수형 프로그래밍 가능but 가독성이 떨어질수도
너무 유연한 언어 파이썬과 마찬가지, 느슨한 타입 체크때문에 힘들수 있음
*/

// 숫자 타입
var intNum = 10;
var floatNum = 0.1;

// 문자열 타입
var singleQuoteStr = 'single quote string';
var doubleQuoteStr = "douvle quote string";
var singleChar = 'a';

// 불린 타입
var boolVar = true;

// undefined 타입
var emptyVar;

// null 타입
var nullVar = null;

console.log(typeof intNum, typeof floatNum, typeof singleQuoteStr, typeof doubleQuoteStr, typeof singleChar,
    typeof boolVar, typeof emptyVar, typeof nullVar);
// -> number number string string string boolean undefined object
// 모든 수를 double 처럼 저장, 문자 타입은 문자열 하나

// 숫자는 double로 간주
var num = 5 / 2

console.log(num); // 2.5
console.log(Math.floor(num)); // 2

// 문자열은 수정 불가(상수)
var str = 'test';
console.log(str[0], str[1], str[2], str[3]); //t e s t
str[0] = 'T';
console.log(str[0], str[1], str[2], str[3]); //t e s t

// 객체타입: 대부분 property들(이름:값 등)을 저장하는 컨테이너로서 쓰임, 해시 구조와 유사, 함수포함가능
// 객체 생성법 1. Object() 생성자 함수 2. 객체 리터럴(표기법) 3. 생성자 함수

// 1. Object() 함수
var foo = new Object();

foo.name = 'foo';
foo.age = 30;
foo.gender = 'male';

console.log(typeof foo);    // object;
console.log(foo);           // {name: "foo", age: 30, gender: "male"}

// 2. 객체 리터럴
var foo2 = {
    name: 'foo2',
    age: 40,
    gender: 'female'
};

console.log(typeof foo2);    // object;
console.log(foo2);           // {name: "foo", age: 30, gender: "male"}

// 객체가 클래스의 인스턴트로서 생성되는 방식이 아님

var foo3 = {
    name: 'foo3',
    major: 'computer science'
};

// 객체 프로퍼티 읽기
console.log(foo3.name);     //foo3
console.log(foo3['name']);  //foo3
console.log(foo3[name]);    //undefined
// => console.log(foo3[toString(name)]); name이라는 객체는 없기 떄문에 안됨
console.log(foo3.nickname); //undefined

// 객체 프로퍼티 갱신
foo3.major = 'electronics engineering'
// = foo3['major'] = 'electronics engineering'
console.log(foo3.major);    //electronics engineering
console.log(foo3['major']); //electronics engineering

// 객체 프로퍼티 동적 생성
foo.age = 30;
console.log(foo.age);       //30

// 대괄호 표기법만을 사용해야 할 경우
foo['full-name'] = 'foo3 bar';
console.log(foo['full-name']);
console.log(foo.full - name); //-는 연산자이기 때문에 대괄호로만 접근해야함
console.log(foo.full);
console.log(name);
//foo bar, NAN(정상적이지 못한 값을 나타냄), undefined, undefined

var foo4 = {
    name: "foo4",
    age: 30,
    major: 'computer science'
};

for (var prop in foo4) {     // foo4 순회
    console.log(prop, foo4[prop]);
}

// 프로퍼티 삭제
delete foo4.name;
console.log(foo4.name); //undefined

// 객체 = 참조타입

var objA = {
    val: 40
};
var objB = objA;

console.log(objA.val);  //40
console.log(objB.val);  //40

objB.val = 50;
console.log(objA.val);  //50
console.log(objB.val);  //50
//ObjA는 객체를 저장하는 것이 아니라 객체를 가리키는 참조값을 저장한다.
//포인터 느낌

//== 연산자로 객체를 비교할 때는 객체의 프로퍼티값이 아닌 참조값을 비교한다.
var a = 100;
var b = 100;

var objA = { value: 100 };
var objB = { value: 100 };
var objC = objB;

console.log(a == b);          //true
console.log(objA == objB);    //flase
console.log(objB == objC);    //true

// 참조에 의한 함수 호출
var a = 100;
var objA = { value: 100 };

function changeAtg(num, obj) {
    num = 200;
    obj.value = 200;

    console.log(num);
    console.log(obj);
}

changeAtg(a, objA);

console.log(a);     //100  <- 기본타입은 call by value
console.log(objA);  //200  <- 참조 타입은 call by reference

/*
프로토타입
모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다. 상속과 비슷
부모 객체 = 프로토타입 객체 or 프로토타입
*/

var foo5 = {
    name: 'foo5',
    age: 30
}

console.log(foo5.toString());   //foo5의 프로토타입에 toString이 정의되어 있음
console.dir(foo5);

//배열
var colorArr = ['orange', 'yellow', 'blue', 'green', 'red'];
console.log(colorArr[0]);

//동적 생성
var emptyArr = [];
console.log(emptyArr[0]);       //undefined

emptyArr[0] = 100;
emptyArr[3] = 'eight';
emptyArr[7] = true;
console.log(emptyArr);          //[100, empty × 2, "eight", empty × 3, true]
console.log(emptyArr.length);   //8 가장 큰 인덱스 +1로 계산됨

//length 프로퍼티의 특성

var arr = [0, 1, 2];
console.log(arr.length);    //3

arr.length = 5;
console.log(arr);           //[0, 1, 2, empty × 2]

arr.length = 2;             // 배열의 범위를 바꿔버림
console.log(arr);           //[0, 1]
console.log(arr[2]);        //undefined



