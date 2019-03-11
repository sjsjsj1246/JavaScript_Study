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

jQuery.extand = jQuery.fn.extend = function (obj, prop) {
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

jQuery.extend({
    init: function(){
        jQuery.initDone = true;
        //~~~
    },

    each: function(obj, fn, args) {
        if(obj.length == undefined)
            for(var i in obj)
                fn.apply(obj[i], args||[i,obj[i]]);
        else
            for(var i =0;i<obj.length; i++)
                fn.apply(obj[i], args||[i,obj[i]]);
        return obj;
    }//,
    //~~~
})



