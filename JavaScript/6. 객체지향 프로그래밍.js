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

    this.getName = function () {
        return this.name;
    }

    this.setName = function (value) {
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
//수정
function Person(arg) {
    this.name = arg;

    Person.prototype.getName = function () {
        return this.name;
    }

    Person.prototype.setName = function (value) {
        this.name = value;
    }
}


//메서드를 추가하는 함수
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
}

function Person(arg) {
    this.name = arg;
}

Person.method("setName", function (value) {
    this.name = value;
})

Person.method("getName", function () {
    return this.name;
})

var me = new Person("me");
var you = new Person("you");
console.log(me.getName());
console.log(you.getName());

//6.2 상속

//프로토타입을 이요한 상속
function create_object(o) {
    function F() { }
    F.prototype = o;
    return new F(); //객체F의 부모에 인자객체를 넣고 F를 반환 즉 반환되는 객체는 자식
}

var person = {
    name: 'zzoon',
    getName: function () {
        return this.name;
    },
    setName: function (arg) {
        this.name = arg;
    }
};

var student = create_object(person);

student.setName("me");
console.log(student.getName());
// 자식 객체를 더 손쉽게 수정하는 방법으로 extended 함수 구현하기

function extended(obj, prop) {
    if (!prop) { prop = obj; obj = this; }
    for (var i in prop) obj[i] = prop[i];
    return obj;
}

function create_object(o) {
    function F() { }
    F.prototype = o;
    return new F(); //객체F의 부모에 인자객체를 넣고 F를 반환 즉 반환되는 객체는 자식
}

var person = {
    name: 'zzoon',
    getName: function () {
        return this.name;
    },
    setName: function (arg) {
        this.name = arg;
    }
};

var student = create_object(person);
var added = {
    setAge: function (age) {
        this.age = age;
    },
    getAge: function () {
        return this.age;
    }
};

extended(student, added);

student.setAge(25);
console.log(student.getAge());

//클래스 기반의 상속
function Person(arg) {
    this.name;
}
Person.prototype.setName = function (value) {
    this.name = value;
};

Person.prototype.getName = function () {
    return this.name;
};

function Student(arg) {
    Person.apply(this, arguments)
}

var you = new Person("i am joo");
Student.prototype = you;

var me = new Student("zzoon");
me.setName("zzoon");
console.log(me.getName());
//자식 클래스의 prototype이 부모인 구조이다
//하지만 이대로는 자식 클래스의 protoype에 메서드를 추가하고자 할 때 문제가 생긴다.
//중개자를 통해 해결
function Person(arg) {
    this.name = arg;
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
}

Person.method("setName", function (value) {
    this.name = value;
});

Person.method("getName", function (value) {
    return this.name;
});

function Student(arg) { }

function F() { };
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = student;
student.super = Person.prototype;
var me = new Student();
me.setName("zzoon");
console.log(me.getName());
//F라는 임시 객체를 Person.prototype과 student 사이에 두었다.

//최적화 기법 클로저 활용
var inherit = function (parent, child) {
    var F = function () { };
    return function (parent, chlid) {
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.super = parent.prototype;
    };
}();

//6.3 캡슐화

var Person = function (arg) {
    var name = arg ? arg : "zzoon";
    //this로 변수를 선언해주면 외부에서 접근할 수 있지만 var로 선언하면 외부에서 접근 불가
    this.getName = function () {
        return name;
    }
    this.setName = function (arg) {
        name = arg;
    }
};

var me = new Person;
console.log(me.getName());
me.setName("iamhjoo");
console.log(me.getName());
console.log(me.name);

//좀더 다듬은 코드

var Person = function (arg) {
    var name = arg ? arg : "zzoon";

    return {
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    };
}

var me = Person();
console.log(me.getName());
//객체를 반환할 때는 참조값을 반환하므로 조심해야함
//Person 객체의 프로토타입에는 접근할 수 없기 때문에 좋지 않음

var Person = function (arg) {
    var name = arg ? arg : "zzoon";

    var Func = function () { }
    Func.prototype = {
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    };
    return Func;
}();
//name은 private로 하고 클로저 Func를 반환하여 name에 간접적으로 접근 가능
var me = new Person();
console.log(me.getName());

//6.4 객체지향 프로그래밍 응용 예제

//6.4.1 클래스 기능을 가진 subClass 함수 만들기
//함수의 프로토타입 체인, extend함수, 인스턴스를 생성할 때 생성자 호출
//subClass는 상속받을 클래스에 넣을 변수 빛 메서드가 담긴 객체를 인자로 받아 부모 함수를 상속받는 자식 클래스를 만든다.
var SuperClass = subClass(obj);
var SubClass = SuperClass.subClass(obj);

function subClass(obj) {
    // 1. 자식 클래스 (함수객체) 생성
    // 2. 생성자 호출
    // 3. 프로토타입 체인을 활용한 상속 구현
    // 4. obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가
    // 5. 자식 함수 객체 반환
}

function subClass(obj) {
    var parent = this === window ? Function : this;
    var F = function () { };

    var child = function () {
        var _parent = child.parent;

        if (_parent && _parent !== Function) {
            _parent.apply(this, arguments);
        }

        if (child.prototype._init) {
            child.prototype._init.apply(this, arguments);
        }
    };

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent;
    child.subClass = arguments.callee;

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            child.prototype[i] = obj[i];
        }
    }

    return child;
}

//활용 예제
var person_obj = {
    _init: function () {
        console.log("person init");
    },
    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    }
};

var student_obj = {
    _init: function () {
        console.log("student init");
    },
    getName: function () {
        return "Student Name: " + this._name;
    }
};

var Person = subClass(person_obj);
var person = new Person();
person.setName("zzoon");
console.log(person.getName());

var Student = Person.subClass(student_obj);
var student = new Student();
student.setName("iamhjoo");
console.log(student.getName());

console.log(Person.toString());