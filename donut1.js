const p = d3.json("../data/ingredient.json")
var components = [];
var textElems = [];



p.then((res)=>{
    var data = res;
    
    selected = new Object();
    var num_of_ingre;
    
    var a = location.href;
    name = decodeURI(a.substring(a.indexOf("?")+1));
    
//    console.log(b);

    for (i = 0;i<data.length;i++)
        {
        if (data[i].name == name)
            {
                selected = Object.assign(data[i]);
                num_of_ingre = selected.ingredient.length;
               
            }
        }
//     console.log(selected.ingredient[0])
//    var components = []

    for (j=0;j<num_of_ingre;j++){
//        console.log(selected.ingredient[j]);
        tmpObj = new Object();
        tmpObj.title = selected.ingredient[j].name;
        tmpObj.value = selected.ingredient[j].portion;
        tmpObj.color = selected.ingredient[j].color;
        tmpObj.label = selected.ingredient[j].label;
        tmpObj.url = selected.ingredient[j].url;
        components.push(tmpObj)
    }
    console.log(components)


// output data  
    
    listIngredient=function(){
        var ingredientList = [];
        for (var i in components){
            var item = components[i];
            var itemCopy = {};
            for (var j in item){
                itemCopy[j] = item[j];
            }
            ingredientList.push(itemCopy);
        }
        return ingredientList;
        
    }
    
            var ingredientArray = listIngredient();
    
//            $( "#ingredient-part" ).append( selected.ck_img );
            console.log('<img src="'+selected.ck_img+'"/>')
            $( "#picture-part" ).append('<img src="'+selected.ck_img+'" />');
            for(var i = 0; i < ingredientArray.length; i++){
            $("#show-ingredient").append
            ("<li><p>" + 
             
             '<img src="'+ingredientArray[i].url+'" />'
              + "       "
              + ingredientArray[i].title + "   " + ingredientArray[i].value + "%" + "</p></li>" 
            + "<br>");   
        }

    
    

    $(function(){
  $("#doughnutChart").drawDoughnutChart(components);
});
        
//    console.log("hey");
//    
//    
//    var components2 = [];
//    components2["ingredient1"] = 20;
//    components2["ingredient2"] = 20;
//    components2["ingredient3"] = 60;
//    
//    
//    var donutData = d3.pie()
//                        .sort(null)
//                        .value(function(d) {
////                            console.log(d.value);
//////                            return +d[value];
////                            return 10;
//                            console.log(d.value);
////                            return +d[value];
//                            return 1;
//                        })
//    
//    var donutPath = d3.arc()
//                        .outerRadius(50)
//                        .innerRadius(20);
//    
//    var donutArc = d3.select("#doughnutChart")
//                        .select("svg");
//    
////    console.log(donutArc);
//    
//        donutArc.selectAll(".arc")
//                .data(donutData(d3.entries(components2)))
//                .enter()
//                .append("g")
//                .attr("transform", "translate(" + 150 + ", " + 250 + ")")
//                .attr("class", "arc");
////                .attr("id", "test");
//    
////        donutArc.merge(donutArc);
//        donutArc = donutArc.enter()
//            .append("g")
//            .attr("class", "arc")
//                .merge(donutArc);
//        
//        donutArc.exit().remove();
//    
//        donutArc.append("path")
//                .attr("d", donutPath)
//                .style("fill", function(d, i) {
//            return "#FF4444";
//        })
//        .attr("id", "test");
//    
//    
//    var donutLabel = d3.arc()
//                        .outerRadius(50 +10)
//                        .innerRadius(20 +10);
//
////    var donutLabelText = d3.select("#doughnutChart")
////                        .select("svg")
////                        .append("g");
//        donutLabelText = donutArc;
//
//        donutLabelText.selectAll("text")
//                        .data((components2))
//                        .enter()
//                        .append("text")
//                        .attr("transform", function(d, i) {
//            console.log(d.value);
//                            return "translate(" + donutLabel.centroid() + ")";
//                        })
//                        .attr("dy", "0.35em")
//                        .text(function(d) {
//                            console.log("-- " + d);
//                            console.log(components);
//                            return d.label;
//                        });
//
//    donutLabelText.exit().remove();
       }
      )



;(function($, undefined) {
  
  $.fn.drawDoughnutChart = function(data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        segmentShowStroke : true,
        segmentStrokeColor : "#0C1013",
        segmentStrokeWidth : 1,
        baseColor: "rgba(0,0,0,0.5)",
        baseOffset: 4,
        edgeOffset : 10,//offset from edge of $this
        percentageInnerCutout : 75,
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        animateRotate : true,
        tipOffsetX: -8,
        tipOffsetY: -45,
        tipClass: "doughnutTip",
        summaryClass: "doughnutSummary",
        summaryTitle: name,
        summaryTitleClass: "doughnutSummaryTitle",
        summaryNumberClass: "doughnutSummaryNumber",
        beforeDraw: function() {  },
        afterDrawed : function() {  },
        onPathEnter : function(e,data) {  },
        onPathLeave : function(e,data) {  }
      }, options),
      animationOptions = {
        linear : function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },
      requestAnimFrame = function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    settings.beforeDraw.call($this);

    var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
        $paths = [],
        easingFunction = animationOptions[settings.animationEasing],
        doughnutRadius = Min([H / 2,W / 2]) - settings.edgeOffset,
        cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
        segmentTotal = 0;

    //Draw base doughnut
    var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
        baseCutoutRadius = cutoutRadius - settings.baseOffset;
    $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
      .attr({
        "d": getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
        "fill": settings.baseColor
      })
      .appendTo($svg);

    //Set up pie segments wrapper
    var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
    $pathGroup.attr({opacity: 0}).appendTo($svg);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
        tipW = $tip.width(),
        tipH = $tip.height();

    //Set up center text area
    var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
        $summary = $('<div class="' + settings.summaryClass + '" />')
                   .appendTo($this)
                   .css({ 
                     width: summarySize + "px",
                     height: summarySize + "px",
                     "margin-left": -(summarySize / 2) + "px",
                     "margin-top": -(summarySize / 2) + "px"
                   });
    var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">' + settings.summaryTitle + '</p>').appendTo($summary);
    var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});

    for (var i = 0, len = data.length; i < len; i++) {
      segmentTotal += data[i].value;
      $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({
          "stroke-width": settings.segmentStrokeWidth,
          "stroke": settings.segmentStrokeColor,
          "fill": data[i].color,
          "data-order": i
        })
        .appendTo($pathGroup)
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove);
        
//        textElems[i] = document.createElement('text')
//        .attr({
////          "stroke-width": settings.segmentStrokeWidth,
////          "stroke": settings.segmentStrokeColor,
////          "fill": data[i].color,
//          "data-order": i
//        })
//        .appendTo($pathGroup)
//        .on("mouseenter", pathMouseEnter)
//        .on("mouseleave", pathMouseLeave)
//        .on("mousemove", pathMouseMove);
    }

    //Animation start
    animationLoop(drawPieSegments);

    //Functions
    function getHollowCirclePath(doughnutRadius, cutoutRadius) {
        
        //Calculate values for the path.
        //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
        var startRadius = -1.570,// -Math.PI/2
            segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
            endRadius = 4.7131,// startRadius + segmentAngle
            startX = centerX + cos(startRadius) * doughnutRadius ,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          'M', startX, startY,
          'A', doughnutRadius, doughnutRadius, 0, 1, 1, endX, endY,//Draw outer circle
          'Z',//Close path
          'M', startX2, startY2,//Move pointer
          'A', cutoutRadius, cutoutRadius, 0, 1, 0, endX2, endY2,//Draw inner circle
          'Z'
        ];
        cmd = cmd.join(' ');
        return cmd;
    };
    function pathMouseEnter(e) {
      var order = $(this).data().order;
      $tip.text(data[order].title + ": " + data[order].value)
          .fadeIn(200);
      settings.onPathEnter.apply($(this),[e,data]);
    }
    function pathMouseLeave(e) {
      $tip.hide();
      settings.onPathLeave.apply($(this),[e,data]);
    }
    function pathMouseMove(e) {
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }
    function drawPieSegments (animationDecimal) {
        
      var startRadius = -PI / 2,//-90 degree
          rotateAnimation = 1;
      if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1

      drawDoughnutText(animationDecimal, segmentTotal);

      $pathGroup.attr("opacity", animationDecimal);

      //If data have only one value, we draw hollow circle(#1).
      if (data.length === 1 && (4.7122 < (rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) + startRadius))) {
        $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
//        textElems[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
        return;
      }
      for (var i = 0, len = data.length; i < len; i++) {
          
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
            
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
          'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
          'Z'//Cloth path
        ];
        $paths[i].attr("d", cmd.join(' '));
          
        startRadius += segmentAngle;
      }
            
       
    }
      
      
    function drawDoughnutText(animationDecimal, segmentTotal) {
      $summaryNumber
        .css({opacity: animationDecimal})
        .text((segmentTotal * animationDecimal).toFixed(1));
    }
    function animateFrame(cnt, drawData) {

      var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
      drawData(easeAdjustedAnimationPercent);
    }
      
    function animationLoop(drawData) {
      var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
          cnt =(settings.animation)? 0 : 1;
      requestAnimFrame(function() {
          cnt += animFrameAmount;
          animateFrame(cnt, drawData);
          if (cnt <= 1) {
            requestAnimFrame(arguments.callee);
          } else {
            settings.afterDrawed.call($this);
          }
      });
    }
      
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
      if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
      if (isNumber(minValue) && valueToCap < minValue) return minValue;
      return valueToCap;
    }
    return $this;
  };
})(jQuery);