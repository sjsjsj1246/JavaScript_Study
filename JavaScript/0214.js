/*
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
var num = 5/2

console.log(num); // 2.5
console.log(Math.floor(num)); // 2

// 문자열은 수정 불가(상수)
var str = 'test';
console.log(str[0],str[1],str[2],str[3]); //test

str[0]='T';
console.log(str[0],str[1],str[2],str[3]); //test

