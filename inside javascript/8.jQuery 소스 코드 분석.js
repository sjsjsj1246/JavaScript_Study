//8.jQuery 소스 코드 분석

/**
 * jQurey는 웹을 개발할 때 필요한 DOM 파싱, 이벤트 처리나
 * Ajax같은 기능을 아주 쉽게 작성할 수 있게 도와주는 라이브러리이다.
 *
 */

//8.1 jQuery 1.0 소스 코드 구조

//8.1.1 jQuery 함수 객체
/**
 * jQuery 라이브러리는 jQuery함수 정의부터 시작한다.
 * 그중 주목할만한 것이 new연산자를 이용해 jQuery객체를 생성하는 
 * 가능이다.
 */

function jQuery(a, c) {

    // shortcut for document read (because $(document).each() is silly)
    if (a && a.constructor == Function && jQuery.fn.ready)
        return jQuery(document).ready(a);

    // Make sure that a selection was provided
    a = a || jQuery.context || document;

    // Watch for when a jQuery object is passed as the selector
    if (a.jQuery)
        return $(jQuery.merge(a, []));

    // Whatch for when a jQuery object is passed at the context
    if (c && c.jQuery)
        return $(c).find(a);

    // If the context is global, return a new object
    if (window == this)
        return new jQuery(a, c);

    // Handle HTML strings
    var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
    if (m) a = jQuery.clean([m[1]]);

    // Watch for when an array is passed in
    this.get(a.constructor == Array || a.length && !a.nodeType && a[0] != undefined &&
        a[0].nodeType ?
        // Assume that it is an array of DOM Elements
        jQuery.merge(a, []) :

        // Fine the matching elements and save them for later
        jQuery.find(a, c));

    // See if an extra function was provided
    var fn = arguments[arguments.length - 1];

    // If so, excute it in context
    if (fn && fn.constructor == Function)
        this.each(fn);
}

// 8.1.2 변수 $를 jQuery()함수로 매핑
0/**
 * 일반저긍로 jQuery를 사용할 때 jQuery()험수를 직접 호출하기보다는 $()와 같은
 * 형태로 jQUery의 기능을 호출하는 것이 대부분이다.
 */

var $ = jQuery;

// 8.1.3 jQuery.prototype 객체 변경

jQuery.fn = jQuery.prototype = {
    jQuery: "$Rev$",
    size: function () {
        return this.length;
    }
}

// 8.1.4 객체 확장-extend() 메서드
/**
 * jQuery 소스 코드에서는 다른 객체의 프로퍼티나 메서드 복사 등으로 객체의 기능을
 * 추가하는 데 사용 가능한 extend() 메서드를 제공한다. jQuery소스 코드에서는
 * 이 메서드로 jQuery 객체 및 jQuery.prototype객체를 확장하는 부분을 jQuery 소스
 * 코드 곳곳에서 볼 수 있다.
 */

jQuery.extend = jQuery.fn.extend = function (obj, prop) {
    if (!prop) { prop = obj; obj = this; } //1
    for (var i in prop) obj[i] = prop[i]; //2
    return obj;
};

/**
 * 1. 함수를 호출할 떄 obj인자 하나만을 넘겨서 호출하는 경우 prop 인자가 undefined값을 가지므로 !prop가
 * 참이 되면서 if문 이하가 호출된다.
 *
 * if 문 내부 코드를 살펴보면 obj 인자로 전달된 객체를 prop 매개변수에 저장한다. 그리고 obj 매개변수에는 this를
 * 저장한다. 여기서 함수 호출 패턴에 따라, 함수 호출 extend() 메서드 어디서 호출되는지에 따라서 다르게 바인딩된다.
 *
 * 2. for in 문으로 prop인자의 모든 프로퍼티를 obj 인자로 복사하는 코드다. 결국, obj 객체에 prop 객체의 프로퍼티가
 * 추가된다.
 *
 * 정리하자면 extend() 메서드는 extend라는 함수명 그대로 객체의 기능을 추가하는 것이다.
 * obj, prop 두 개의 인자를 받는 경우, 첫 번째 인자로 전달된 obj 객체에 두 번째 인자로 전달된 prop객체의 모든
 * 프로퍼티를 추가한다. 여기서 주의할 것은 이 메서드가 obj 인자 하나만으로 호출 될 경우다. 호출한 객체(this)에다
 * obj 인자로 넘긴 객체를 복사하는 결과가 된다.
 */

//extend() 메서드를 호출하는 jQUery 소스코드
jQuery.extend({
    init: function () {
        jQuery.initDone = true;
        //~~~
    },

    each: function (obj, fn, args) {
        if (obj.length == undefined)
            for (var i in obj)
                fn.apply(obj[i], args || [i, obj[i]]);
        else
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], args || [i, obj[i]]);
        return obj;
    }//,
    //~~~
})

//jQuery.fn.extend() 메서드를 호출하는 jQuery 코드.
jQuery.fn.extend({

    // We're overriding the old toggle function, so
    // remember oi for lter
    _toggle: jQuery.fn._toggle,
    tpggle: function (a, b) {
        // If two functions are passed in, we're
        // toggleing on a click
        //~~~
    }
})

// 8.1.5 jQuery 소스 코드의 기본 구성 요소
/**
 * -jQuery 함수 객체
 * -jQuery.prototrpe 겍체
 * -jQuery 객체 인스턴스
 *
 * jQuery() 함수의 가장 기본적인 역할은 new 연산자로 jQuery 객체를 생성하는 것이다.
 * 이렇게 생성된 jQUery 객체는 프로토타입 체이닝으로 jQuery.prototype 객체에 포함된
 * 프로토타입 메서드를 호출할 수 있다.
 * 또한, 여기서 주목할 점은 jQuery 함수 객체 자신이 메서드를 포함하고 있다는 것이다.
 * jQuery 함수 객체의 메서드는 각각 생성된 jQUery인스턴스 객체에 특화되지 않고
 * 범용적으로 사용되는 jQuery 코어 메서드로 구성된다.
 */


// 8.2 jQuery의 id 셀렉터 동작 분석
// jQuery의 가장 기본적인 기능은 HTML 문서에서 원하는 DOM 객체를 선택한 후,
// 해당 객체의 속성 변경이나 효과, 이벤트 등을 처리하는 것이다.

/**
 * <!DOCTYPE heml>
 * <html>
 * <head>
 *  <script src="http://code.jquery.com/jquery-lastest.js"X/script>
 * </head>
 * <body>
 *  <div id="myDiv">Hello</div>
 *  <script>alert($("#myDiv").text())</script>
 * </body>
 * </html>
 */

// 경고창이 뜨면서 dix 태그로 둘러싸인 Hello 값이 나타난다.
// 이제 jQuery가 위 코드를 어떻게 처리하는지 살펴보자

// 8.2.1 $("#myDiv") 살펴보기
/**
 * $("#myDiv") = jQuery("#myDiv") 이며 첫번째 인자 a에는 문자열 "#myDiv"가 전달되고,
 * 두번째 인자 c는 아무런 인자값이 전달되지 않으므로 undefined값이 설정된다.
 */


function jQuery(a, c) {

    if (a && a.constructor == Function && jQuery.fn.ready)
        return jQuery(document).ready(a);
    // 1. a가 함수가 아니므로 실행이 안됨

    a = a || jQuery.context || document;
    // 2. a가 값이 있으므로 a 그대로 남아있는다.

    if (a.jQuery)
        return $(jQuery.merge(a, []));
    // 3. a는 문자열이므로 jQuery프로퍼티를 가지지 않는다 따라서 실행되지 않음.
    // 해당 객체가 jQuery 객체인지 아닌지를 확인하는 것이다.

    if (c && c.jQuery)
        return $(c).find(a);
    // 4. c가 없으므로 거짓

    if (window == this)
        return new jQuery(a, c);
    /**
     * 5. jQuery 가 어떤 형태로 호출됐는지 체크한다. this가 전역 객체 window로 바인딩되는 경우는 jQuery()를
     * 함수 형태로 호출하는 경우다. $("#myDiv")는 함수 호출 형태이므로 this는 전역 객체인 window에 바인딩된다.
     * 따라서 참이므로 jQuery()함수가 new 연산자와 함께 생성자 함수 형태로 다시 호출된다.
     * 생성자 함수로 호출돼도 1~4 까지는 앞의 실행경과와 같다. 반면에 5에서 jQuery가 생성자 함수로 호출될 경우
     * this는 함수 호출 패턴에 따라 새로 생성되는 빈 객체에 바인딩되므로 window가 아니다. 이때 생성되는 객체는
     * jQuery 객체로서 jQuery.prototype 객체를 자신의 [[Prototype]] 링크로 연결한다. 따라서 이 객체는
     * 프로토타입 체이닝으로 jQuery.prototype 객체의 프로퍼티나 메서드에 접근할 수 있다. 경국 this가 window
     * 객체로 바인딩 되지 않았으므로 if문이 실행되지 않고 다음으로 넘어간다.
     */

    var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
    if (m) a = jQuery.clean([m[1]]);
    /**
     * 6. 정규표현식
     * - ^ 운자열의 시작
     * - [^<]* 빈 문자열이나 < 문자를 제외한 모든 문자열
     * - (<.+>) <>로 둘러싸인 문자나 문자열
     * - [^>] 빈 문자열이나 > 문자를 제외한 문자나 문자열
     * - $ 문자열의 끝
     * m = 빈 문자열이나 < 문자를 제외한 문자열로 시작하고, 중간에 <> 형태의 문자나 문자열이 있으며
     *  빈 문자열이나 > 문자를 제외한 문제나 문자열로 끝난다.
     * exec(a) 를 통해 a = "#myDiv" 를 인자로 넘긴다.
     * 조건이 맞지 않으므로 m은 null이 된다.
     */

    this.get(a.constructor == Array || a.length && !a.nodeType && a[0] != undefined &&
        a[0].nodeType ?
        // Assume that it is an array of DOM Elements
        jQuery.merge(a, []) :

        // Fine the matching elements and save them for later
        jQuery.find(a, c));
    /**
     * 7. a.constructor == Array -> flase
     * a.length = 6 -> true
     * !a.nodeType -> !(undefined) -> true
     * a[0] != undefined -> true
     * a[0].nodeType -> false
     * 따라서 전체는 false 그러므로 jQuery.find(a,c)문이 실행된다.
     */

    // See if an extra function was provided
    var fn = arguments[arguments.length - 1];

    // If so, excute it in context
    if (fn && fn.constructor == Function)
        this.each(fn);
}

// 8.2.1.1 jQuery.find(a, c) 살펴보기
/**
 * 위 코드에서 jQuery.find(a, c));를 보자
 * jQuery().find()는 jQuery함수 객체 내에 포함된 메서드로서 jQuery의 셀렉터 기능을 처리하는 중요한 함수다.
 * jQuery.find('#myDiv')의 형태로 호출되는 과정을 살펴보자
 */

jQuery.find = function (t, context) {
    // Wake sure that the context is a DOM Element
    if (context && context.nodeType == undefined)
        context = null;
    // 1. 두 번째 인자인 context가 undefined값이므로 if 문 이하는 실행되지 않는다.

    // Set the correct context (if node is provided)
    context = context || jQuery.context || document
    /**
     * 2. context인자의 기본값을 할당하는 문장이다. 즉 context 인자가 undefined이면 jQuery.context값을
     * context인자에 재할당한다. 이 또한 false면 document를 context변수에 저장한다. 여기서 document는 
     * DOM 객체의 일종으로 HEML 문서의 모든 구성 요소를 포함한다(DOM 관련한 자세함 내용은 인터넷이나 
     * 다른 책을 참소하자.)
     */

    if (t.constructor != String) return [t];
    // 3. 첫번째 인자 t는 문자열 '#mtDiv' 이므로 t.constructor 같은 'String'이다. 따라서 if문은 false다

    if (!t.indexof("//")) {
        context = context.documentElement;
        t = t.substr(2, t.length)
    } else if (!t.indexOf("/")) {
        context = context.documentElement;
        t = t.substr(1, t.length);
        // FIX Assume the root element is right :(
        if (t.indexOf("/") >= 1)
            t = t.substr(t.indexOf("/"), t.length);
    }
    /**
     * 4. t는 '//'나 '/'를 포함하지 않은 '#myDiv' 문자열이므로 t.indexOf("//")과 t,indexOf("/") 모두 -1이
     * 반환된다. 그러므로 if문 이하는 모두 실행되지 않는다.
     */

    var ret = [context];
    var dome = [];
    var lest = null;

    while (t.length > 0 && last != t) {
        // 5. 이제 while문을 실행한다. t.length > 0 이고 t는 last 변수에 저장된 null 값과 같지 않으므로
        // while 문 내부가 실행된다.
        var r = [];
        last = t;

        t = jQuery.trim(t).replace(/^\/\//i, "");
        /**
         * 6. jQuery.trim(t) 메서드 호출로 t 문자열의 양 끝 공백 문자들을 제거한 다음, 문자열의 replace()
         * 메서드를 연속해서 호출한다. replace() 메서드의 첫 번째 인자는 검색할 문자열을 나타내는 정규표현식
         * 리터럴 /^\/\//i가 정달됐다. 이 정규표현식은 문자열이 //로 시작하는지를 체크한다. 예제의 경우에는
         * 그대로 #myDiv가 t에 저장된다.
         */

        var foundToken = false;

        for (var i = 0; i < jQuery.token.length; i += 2) {
            if (foundToken) continue;

            var re = new RegExp("^(" + jQuery.token[i] + ")");
            // 7. 
            var m = re.exec(t);
            // 8. 

            if(m) {
                r = ret = jQuery.map(ret, jQuery.token[i+1]);
                t = jQuery.trim(t.replace(re,""));
                foundToken = true;
            }
        }

        if (!foundToken) {
            if(!t.indexOf(",")||!t.indexOf("|")) {
                // 8. 
                if(ret[0] == context) ret.shift();
                done = jQuery.merge(done, ret);
                r = ret = [context];
                t = " "+t.substr(1,t.length);
            } else {
                var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
                var m = re2.exec(t);
                /**
                 * 10. 
                 */

                if (m[i] == "#") {
                    // 11. 
                    // Umm, should make this work in all XML docs
                    var old = document.getElementById(m[2]);
                    // 12. 
                    r = ret = ole?[old]:[];
                    // 13. 
                    t = t.replace(re2,"");
                    // 14. 
                } else {
                    if(!m[2]||m[1]==".") m[2] = "*";

                    for(var i = 0;i<ret.length;i++)
                        r = jQuery.merge(r,
                            m[2] == "*" ?
                                jQuery.getAll(ret[i]) :
                                ret[i].getElementByTagName(m[2])
                                );
                }
            }
        }

        if(t) {
            /**
             * 15. 
             */
            var val = jQuery.filter(t,r);
            ret = r = val.r;
            t = jQuery.trim(val, t);
        }
    }
    if(ret && ret[0] == context) ret.shift();
    // 16. 
    done = jQuery.merge(done, ret);

    return done;
    /**
     * 17. 
     */
};