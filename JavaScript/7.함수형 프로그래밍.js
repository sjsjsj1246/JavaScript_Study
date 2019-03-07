//7. 함수형 프로그래밍

//7.1 함수형 프로그래밍의 개념
/**
 * 함수형 프로그래밍은 함수의 조합으로 작업을 수행함을 의미한다.
 * 순수 함수 : 외부변수에 아무런 영향을 미치지 않는 함수
 * 고계 함수 : 함수를 하나의 값으로 간주하여 함수의 인자 혹은 반환값으로 사용할 수 있는 함수
 * 
 * 내부 데이터 및 상태는 그대로 둔 채 제어할 함수를 변경 및 조합함으로써 원하는 결과를
 * 얻어내는 것이 함수형 프로그래밍의 중요한 특성이다.
 * 이 특성은 높은 수분의 모듈화가 가능하다는 장점이 있다.
 * 
 * c언어의 printf는 반환값이 있지만 이는 함수의 동작을 보조하는 역할. 즉 함수의 동작이 더 중요
 * 하다는 것이다.(절자(procedure)지향프로그래밍, procedure == 함수)
 * 함수형 프로그래밍에서 순수함수는 외부에 아무런 영향을 주지 않는 선에서 자신의 로직을
 * 처리해서 결과를 반환하는 것
 */

//7.2 자바스크립트에서의 함수형 프로그래밍
/**
 * 자바스크립트가 함수형 프로그래밍이 가능한 이유
 * 1. 일급 객체로서의 함수
 * 2. 클로저
 *  */

var f1 = function (input) {
    var result;
    /* 암호화 작업 수행 */
    result = 1;
    return result;
}

var f2 = function (input) {
    var result;
    /* 암호화 작업 수행 */
    result = 2;
    return result;
}

var f3 = function (input) {
    var result;
    /* 암호화 작업 수행 */
    result = 3;
    return result;
}

var get_encrypted = function (func) {
    var str = 'zzoon';

    return function () {
        return func.call(null, str);
    }
    //str에 영향이 가지 않게클로저로 구현 익명함수를 반환하고 외부에선 str에 접근 불가
}

var encrypted_vlaue = get_encrypted(f1)();
console.log(encrypted_vlaue);
var encrypted_vlaue = get_encrypted(f2)();
console.log(encrypted_vlaue);
var encrypted_vlaue = get_encrypted(f3)();
console.log(encrypted_vlaue);

//7.2.1 배열의 각 원소 총합 구하기

//명령형 방법으로 구현해보자.
function sum(arr) {
    var len = arr.length;
    var i = 0, sum = 0;

    for (; i < len; i++) {
        sum += arr[i];
    }

    return sum;
}

var arr = [1, 2, 3, 4];
console.log(sum(arr));

// 원소를 모두 곱한 값을 구하고 싶어졌다

function multiply(arr) {
    var len = arr.length;
    var i = 0, result = 1;

    for (; i < len; i++) {
        result *= arr[i];
    }

    return result;
}

var arr = [1, 2, 3, 4];
console.log(multiply(arr));

//문제 하나하나를 각각의 함수를 구현하여 문제를 풀고 있다. 배열의 각 원소를 또 다른 방식으로 산술하여
//결과값을 얻으려면 새로운 함수를 다시 구현해야 한다.

function reduce(func, arr, memo) {
    var len = arr.length,
        i = 0,
        accum = memo;

    for (; i < len; i++) {
        accum = func(accum, arr[i]);
    }
    return accum;
}

/**
 * reduce()함수는 함수와 배열을 인자로 넘겨받고 루프를 돌면서 함수를 실행시킨다
 * 함수를 실행시킨 후 얻은 결과값은 변수 accum에 계속해서 저장한다. 함수만 넣어주면 됨
 */

var arr = [1, 2, 3, 4];
var sum = function (x, y) {
    return x + y;
};
var multiply = function (x, y) {
    return x * y;
};

console.log(reduce(sum, arr, 0));
console.log(reduce(multiply, arr, 1));
//높은 수준의 모듈화 가능

//7.2.2 팩토리얼
function fact(num) {
    if (num == 0) return 1;
    else return num * fact(num - 1);
}
console.log(fact(10));
console.log(fact(20));
//중복계산 발생, 메모이제이션ㄱ 좀 특이함
function Calculate(key, input, func) {
    Calculate.data = Calculate.data || {};
    //data프로퍼티에 자신이 원하는 값을 원하는 키로 저장해 놓는다. 일종의 캐시 역할을 한다.
    if (!Calculate.data[key]) {
        var result;
        result = func(input);
        Calculate.data[key] = result;
    }

    return Calculate.data[key];
}

var result = Calculate(1, 5, function (input) {
    return input * input;
});

console.log(result);

result = Calculate(2, 5, function (input) {
    return input * input / 4;
})

console.log(result);
console.log(Calculate(1));
console.log(Calculate(2));

//보다 범용적으로 사용하는 법
Function.prototype.memoization = function (key) {
    var arg = Array.prototype.slice.call(arguments, 1);
    this.data = this.data || {};

    return this.data[key] !== undefined ?
        this.data[key] : this.data[key] = this.apply(this, arg);
}

function myCalculate1(input) {
    return input * input;
}

function myCalculate2(input) {
    return input * input / 4;
}

myCalculate1.memoization(1, 5);
myCalculate1.memoization(2, 4);
myCalculate2.memoization(1, 6);
myCalculate2.memoization(2, 7);

console.log(myCalculate1.memoization(1));
console.log(myCalculate1.memoization(2));
console.log(myCalculate2.memoization(1));
console.log(myCalculate2.memoization(2));

//7.2.3 피보나치 수열

var fibo = function () {
    var cache = { '0': 0, '1': 1 };

    var func = function (n) {
        if (typeof (cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n - 1) + func(n - 2);
        }

        return result;
    }

    return func;
}();
//cache에 키로 값을 저장함
console.log(fibo(10));

//다른 방식
var cacher = function (cache, func) {
    var calculate = function (n) {
        if (typeof (cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(calculate, n);
        }

        return result;
    }

    return calculate;
};

var fact = cacher({ '0': 1 }, function (func, n) {
    return n * func(n - 1);
});

var fibo = cacher({ '0': 0, '1': 1 }, function (func, n) {
    return func(n - 2) + func(n - 1);
});

console.log(fact(10));
console.log(fibo(10));

//7.3 자바스크립트에서의 함수형 프로그래밍을 활용한 주요 함수

//7.3.1 함수 적용
/**
 * 앞서 4장에서 Function.prototype.apply 함수로 함수 호출을 수행할 수 있음을 배웠다.
 * 그런데 왜 이름이 apply일까 함수를 호출할 때 call이라는 용어만을 주로 사용해온
 * 개발자에겐 다소 생소하게 느껴질 수 있다. 함수 적용은 함수형 프로그래밍에서 사용되는 용어이다.
 * 함수형 프로그래밍에서는 특정 데이터를 여러가지 함수를 적용시키는 방식으로 작업을 수행한다.
 * 여기서 함수는 단순히 입력을 넣고 출력을 받는 기능을 수행하는 것뿐만 아니라, 인자 혹은
 * 반환값으로 전달된 함수를 특정 데이터에 적용시키는 개념으로 이해해야 한다.
 * 따라서 func.apply(Obj, args)와 같은 함수 호출을 func함수를 Obj 객체와 Args인자 배열에 적용
 * 시킨다 라고 표현할 수 있다.
 */

//7.2 커링
/**
 * 커링이란 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 나머지를 인자로 받는 새로운
 * 함수를 만드는 것을 의미한다.
 */

function calculate(a, b, c) {
    return a * b + c;
}

function curry(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

var new_func1 = curry(calculate, 1);
console.log(new_func1(2, 3));
var new_func1 = curry(calculate, 1, 3);
console.log(new_func1(3));

//범용적인 방법
Function.prototype.curry = function () {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function () {
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
};

func = calculate.curry(2, 3);
console.log(func(4)); //10

//calculate의 첫번째 인자와 세번째 인자만 고정하는법
function curry2(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        var arg_idx = 0;
        for (var i = 0; i < args.length && arg_idx < arguments.length; i++)
            if (args[i] === undefined)
                args[i] = arguments[arg_idx++];
        return func.apply(null, args);
    }
}

var new_func = curry2(calculate, 1, undefined, 4);
console.log(new_func(3)); //7

//7.3.3 bind
//curry 기법을 활용한 함수이다. js에 curry가 없는 이유가 bind함수로 충분히 대체가 가능하기 때문

//기본적인 구현
Function.prototype.bind = function (thisArg) {
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function () {
        return fn.apply(thisArg, args.concat(slice.call(arguments)));
    };
}

var print_all = function (arg) {
    for (var i in this) console.log(i + " : " + this[i]);
    for (var i in arguments) console.log(i + " : " + arguments[i]);
}

var myobj = { name: "zzoon" };

var myfunc = print_all.bind(myobj);
myfunc();

var myfunc1 = print_all.bind(myobj, "iamhjoo", "others");
myfunc1("insidejs");

//7.3.4 래퍼
//특정 함수를 자신의 함수로 덮어쓰는 것을 말한다. 오버라이드와 비슷

function wrap(object, method, wrapper) {
    var fn = object[method];
    return object[method] = function () {
        return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)));
    };
}

Function.prototype.original = function (value) {
    this.value = value;
    console.log("value : " + this.value);
}

var mywrap = wrap(Function.prototype, "original", function (orig_func, value) {
    this.value = 20;
    orig_func(value);
    console.log("wrapper value : " + this.value);
});

var obj = new mywrap("zzoon");

//7.3.5 반복 함수

//7.3.5.1 each
/**
 * 배열의 각 요소 혹은 객체의 각 프로퍼티를 하나씩 꺼내서 차례대로 특정 함수에
 * 인자로 넣어 실행시키는 역할을 한다.
 */

function each(obj, fn, args) {
    if (obj.length == undefined)
        for (var i in obj)
            fn.apply(obj[i], args || [i, obj[i]]);
    else
        for (var i = 0; i < obj.length; i++)
            fn.apply(obj[i], args || [i, obj[i]]);
    return obj;
}

each([1, 2, 3], function (idx, num) {
    console.log(idx + ": " + num);
});

var zzoon = {
    name: "zzoon",
    age: 30,
    sex: "Male"
};

each(zzoon, function (idx, value) {
    console.log(idx + ": " + value);
});

//7.3.5.2 map
/**
 * 배열에서 많이 사용되는 함수이다. 배열의 각 요소를 꺼내서 사용자 정의 함수를 적용시켜
 * 새로운 값을 얻은 후, 새로운 배열에 넣는다.
 */

Array.prototype.map = function (callback) {
    /* this가 null인지, 배열인지 체크 */
    /* callback이 함수이닞 체크 */

    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }

    return A;
}

var arr = [1, 2, 3];
var new_arr = arr.map(function (value) {
    return value * value;
});

console.log(new_arr);

//7.3.5.3 reduce
/**
 * reduce()는 배열의 각 요소를 하나씩 꺼내서 사용자의 함수를 적용시킨 뒤, 그 값을 계속해서
 * 누적시키는 함수이다.
 */

Array.prototype.reduce = function (callback, memo) {
    // this가 null인지, 배열인지 체크
    // callback이 함수인지 체크

    var obj = this;
    var value, accumulated_value = 0;

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        accumulated_value = callback.call(null, accumulated_value, value);
    }

    return accumulated_value;
};

var arr = [1, 2, 3];
var accumulated_value = arr.reduce(function (a, b) {
    return a + b * b;
});

console.log(accumulated_value); //1*1+2*2+3*3 = 14