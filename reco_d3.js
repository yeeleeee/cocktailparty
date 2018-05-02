var emt
var flv

//append an svg in container as a canvas or sth     
var svg = d3.select(".container").append("svg") 
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("z-index","300")
            .attr("viewBox", "0 0 1200 800")


//get the recommended cocktail name

var svg1 = d3.select(".clock").append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 350 350")
            .attr("z-index","300")
       

var amtPerSec = 3600;

var margin = {
	top: 20,
    right: 100,
    bottom: 0,
    left: 90
}

var radians = 0.0174532925;

//size of the clock
var r = 80;

var secR = r + 16;
var hourR = r - 40;

//length of hands
var hourHandLength = r;
var minuteHandLength = 0;
var secondHandLength = 0;

w=220
h=300


var drag = d3.behavior.drag()
	.on('dragstart', dragstart)
	.on('drag', drag)
	.on('dragend', dragend);


// define values for time
var handData = [
	{
		type:'hour',
		value:0,
		length:-hourHandLength,
		// scale:hourScale
	},
	{
		type:'minute',
		value:0,
		length:-minuteHandLength,
		// scale:minuteScale
	},
	{
		type:'second',
		value:0,
		length:-secondHandLength,
		// scale:secondScale
	}
];


// Get current time 
function updateData(){
	var t = new Date();
    handData[1].value = t.getMinutes();
	handData[2].value = t.getSeconds();
	handData[0].value = t.getHours() + t.getMinutes()/60 ;

}
 // Display current time
updateData();
var a  = new Date()
console.log(a.getHours())


var g = svg1.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var face = g.append('g')
	.attr('transform', 'translate(' + r + ',' + r + ')');


face.append("text")
    .attr('x',0)
    .attr('y',-1.1*r)
    .text("12 PM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',1.4*r)
    .attr('y',5)
    .text("6 PM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',0)
    .attr('y',1.2*r)
    .text("24 AM")
    .attr('text-anchor', 'middle')
    .attr('fill','white')
face.append("text")
    .attr('x',-1.35*r)
    .attr('y',5)
    .text("6 AM")
    .attr('text-anchor', 'middle')
    .attr('fill','white');

var morning = face.append("svg:image")
            .attr('x',-r)
            .attr('y',-r)
            .attr('width', r)
            .attr('height', r)
            .attr("xlink:href", "timezone/morning.png")
            .style('opacity',0.4)
var afternoon = face.append("svg:image")
                .attr('x',0)
                .attr('y',-r)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/afternoon.png")
                .style('opacity',0.4)
var evening = face.append("svg:image")
                .attr('x',0)
                .attr('y',0)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/evening.png")
                .style('opacity',0.4)
var crazytime = face.append("svg:image")
                .attr('x',-r)
                .attr('y',0)
                .attr('width', r)
                .attr('height', r)
                .attr("xlink:href", "timezone/crazytime.png")
                .style('opacity',0.4)

// initiate status
var status
var a = new Date()
crt_h = a.getHours()
crt_m = a.getMinutes()
crt_h += crt_m/60


// initial: assign to status and change opacity
if (crt_h>=0 && crt_h<=6){
    status = 'Crazytime'
    crazytime.style('opacity',1.0)
} 
if  (crt_h>6 && crt_h<=12)
{
    status = 'Morning'
    morning.style('opacity',1.0)

   
}

if (crt_h>12 && crt_h<18){
    status = 'Afternoon'
    afternoon.style('opacity',1.0)
 
}
if (crt_h>=18 && crt_h <24){
    status = 'Evening'
    evening.style('opacity',1.0)
   
}
console.log(status)
// color of the clock, just styling
face.append('circle')
	.attr({
		class: 'outline',
		r: r,
		cx: 0,
		cy: 0,
		fill: '#f7f7f7',
        opacity: 0.0
	});


var hands = face.append('g');


//define the lines of the three hands
hands.selectAll('line')
	.data(handData)
    
    .enter().append('line')
	.attr({
		class: function(d) { return d.type + '-hand'; },
		x1: 0, //starting point
		y1: 0, //ending point
		x2: function(d) {

			return -d.length * Math.cos(Math.PI*(d.value+6)/12);

		},
		y2: function(d) {

			return -d.length * Math.sin(Math.PI * (d.value+6)/12);
		}
	})
	.call(drag);


// small circle in middle to cover hands, just styling
face.append('circle')
	.attr({
		cx: 0,
		cy: 0,
		r: 10,
		fill: 'white',
		
	});

function dragstart() {
}

var rad


function daysegs(x,y){
    if (x>0 && x<100 && y>-100 && y <0)
        {
        return 'Afternoon';
        }
    if (x>0 && x<100 && y>0 && y <100)
        {
        return 'Evening';
        }
    if (x>-100 && x<0 && y>0 && y <100)
        {
        return 'Crazytime';
        }
    if (x>-100 && x<0 && y >-100 && y<0) {
        return 'Morning';
        }
    if (x == 100 && y ==0){
        return 'Evening';
    }
    if (x == 0 && y ==100){
        return 'Crazytime';
    }
    if (x == 0 && y ==-100){
        return 'Afternoon';
    }
    if (x == 100 && y ==0){
        return 'Evening';
    }
    if (x == -100 && y ==0){
        return 'Morning';
    }
}

var crt_status

function drag() {
	
	rad = Math.atan2(d3.event.y, d3.event.x);
	
	d3.select(this)
		.attr({
			x2: function(d) {
//                console.log('x:'+r * Math.cos(rad));
				return r * Math.cos(rad);
			},
			y2: function(d) {
//                console.log('y:'+r * Math.sin(rad));
				return r * Math.sin(rad);
			}
		});
    crt_status = daysegs(r * Math.cos(rad),r * Math.sin(rad))
    console.log(crt_status)
//    console.log(r * Math.cos(rad),r * Math.sin(rad))
    if (crt_status!= status){
       if (status == 'Morning'){
           morning.style('opacity',0.4)
       }
       if (status == 'Afternoon'){
           afternoon.style('opacity',0.4)
       }
       if (status == 'Evening'){
           evening.style('opacity',0.4)
       }
       if (status == 'Crazytime'){
           crazytime.style('opacity',0.4)
       }
       
       if (crt_status == 'Morning'){
           morning.style('opacity',1.0)
       }
       if (crt_status == 'Afternoon'){
           afternoon.style('opacity',1.0)
       }
       if (crt_status == 'Evening'){
           evening.style('opacity',1.0)
       }
       if (crt_status == 'Crazytime'){
           crazytime.style('opacity',1.0)
       }
       
    }
    status = crt_status
    
    
    
}

function dragend() {
}


var svgname
var explanation
var prv_cocktail = null
// just claim
var crtimg = svg.append("svg:image")
var bbox = svg.append("svg:image")
var crttext = svg.append("text")


var prv_status  = status

var ini_posimg = [100,300]
var pos_img = [100,230]
var size_img = [280,280]


var ini_postxt = [700,200]
var postxt = [600,200]


var g_exp = svg.append('g')
//            .attr('width', "100")
//            .attr('height',"100")
var crtexp = g_exp.append("text")
            .attr('width', "100")
            .attr('height',"100")
            

var ini_posexp = [700,290]
var posexp =  [610,290]

var ini_posbox = [400,200]
var posbox = [400,120]
var size_box = [350,350]

var desc = svg.append("svg:image")

var repmsg = svg.append('text')
                .attr("text","‘Meh you are too boring. Try with different combinations of mood, time and flavor!’")
                .attr('x',300)
                .attr('y',500)
             


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

    console.log(text);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
          console.log("linenumber" );
          console.log(lineNumber);
          console.log(lineHeight);
          console.log(dy);
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);

      }
    }
  });
}




function findDrink(name)
{
//    var a = location.href;
//    var b = decodeURI(a.substring(a.indexOf("?")+1));
//    window.location = "/donut.html?" + encodeURI(name);
    return "http://127.0.0.1:49253/donutchartworking/donut.html?" + encodeURI(name);
}

var linkbtn = d3.select("#linkbtn")


d3.select ("#filter_submit").on("click", function(){
    
    console.log("status: "+status)
    console.log("prv_status: " +prv_status)
    
    
    //get flavour and emotion
    flv_chosen = d3.select('input[name="seg-1"]:checked').node().value;
    emt_chosen = d3.select('input[name="seg-2"]:checked').node().value;
    flv = flv_chosen;
    emt = emt_chosen; 
    tm = status
    console.log("user input:"+flv+" "+emt+" "+status)
    

    d3.json("data/ingredient.json", function(data) {
        //data is the whole json file
        var option = []
        for (i=0;i<data.length;i++)
            {
                if (data[i].flavour.includes(flv) && data[i].emotion.includes(emt) &&  data[i].time.includes(status))
                    {
                        option.push(data[i])
                    }
                else if (data[i].flavour.includes(flv) && data[i].emotion.includes(emt))
                    {
                       option.push(data[i])
                    }
                else if (data[i].flavour.includes(flv))
                    {
                    option.push(data[i])
                    }
            }
        if (option.length > 0)
            {
                //return a randomized value from the array 
                var b = option[Math.floor(Math.random()*option.length)]
               
                //Update cocktail name here!!!!!
                crt_cocktail = b.name
                explanation = b.explanation

            }
        else
            {
                 crt_cocktail = 'nosuchcocktail'        
                 console.log("no such cocktail")
                 explanation = 'no exp'

            }

        
        easement = "elastic"
        
        linkbtn.transition()
                 .delay(100)
                 .style("opacity",0.0)
        linkbtn.on("click",function(){
                var link = findDrink(crt_cocktail)
                window.open(link)
       
                })
                 .transition()
                 .delay(1200)
                 .style("opacity",1.0)
                
        
        
        if (prv_cocktail == null){

              //crtimg appear
              crtimg.attr('x', ini_posimg[0])
                    .attr('y', ini_posimg[1])
                    .attr('width', size_img[0])
                    .attr('height', size_img[1])
                    .attr("xlink:href", "cocktails/"+ crt_cocktail+".png")
                    .style("opacity",0.0)
                    .transition() // needs a little bit more animation here
                        .ease(easement)
                        .delay(200)
                        .duration(1200)
                        .attr('x',pos_img[0])
                        .attr('y',pos_img[1]) 
                        .style("opacity",1.0)
             
            
                desc.attr('x', ini_postxt[0]-155)
                    .attr('y', ini_postxt[1])
                    .attr('width', size_img[0]*0.9)
                    .attr('height', size_img[1]*0.9)
                    .attr("xlink:href", "svg/"+ crt_cocktail+".svg")
                    .style("opacity",0.0)
                    .transition() // needs a little bit more animation here
                        .ease(easement)
                        .duration(1200)
                        .delay(800)
                        .attr('x',postxt[0]-120)
                        .attr('y',postxt[1]) 
                        .style("opacity",1.0)
       
        
        
             crttext.attr('x',ini_postxt[0])
                    .attr('y',ini_postxt[1])
                    .attr('text-anchor', 'middle')
                    .text( crt_cocktail)
                    .style("font-size","34px")
                    .style("font-family","Lobster Two")
                    .style("fill","white")
                    .style("opacity",0.0)
                    .transition()             // apply a transition
                        .style("opacity",1.0)
                        .attr('x',postxt[0])
                        .attr('y',postxt[1])
                        .delay(800)
                        .ease(easement)           // control the speed of the transition
                        .duration(1200)           // apply it over 2000 milliseconds

//            
//            //explanation appear
//             crtexp .attr('x',ini_posexp[0])
////                    .call(wrap, 200)
//                    .attr('y',ini_posexp[1])
//                    .attr('dy', 0)
//                    .attr('text-anchor', 'middle')
//                    .text( explanation)
//                    .style("font-size","18px")
//                    .style("fill","white")
//                    .style("opacity",0.0)
//     
//                   
//                    .transition()             // apply a transition
////                        .call(wrap, 200)
//                        .style("opacity",1.0)
//                        .attr('x',posexp[0])
//                        .attr('y',posexp[1])
//                        .delay(800)
//                        .ease(easement)           // control the speed of the transition
//                        .duration(1200)           // apply it over 2000 milliseconds
////                        .style("font-size","23px")
//                        
//            
            //bubble box appear    
            bbox.attr('x',ini_posbox[0])
                .attr('y',ini_posbox[1])
                .attr('text-anchor', 'middle')
                .attr('width', size_box[0])
                .attr('height', size_box[1])
                .attr("xlink:href", "svg/bubblebox.svg")
                .style("opacity",0.0)
                .transition() // needs a little bit more animation here
                    .ease(easement)
                    .attr('x',posbox[0])
                    .attr('y',posbox[1])
                    .delay(800)
                    .duration(1200)
    //                .attr('width', 300)
    //                .attr('height', 300)
                    .style("opacity",1.0)
         prv_cocktail = crt_cocktail // give value to prv_cocktail as a flag
            
        }
        
        else // if after first time
            {
                if (prv_cocktail != crt_cocktail){
                console.log("different from previous one") 

                    // crtimg disappear
                    crtimg.transition()
                           .ease("back")
                           .duration(500)
                           .attr('x',ini_posimg[0])
                           .attr('y',ini_posimg[1]) 
                           .style("opacity",0.0)

                    // crttext disappear    
                    crttext.transition()
                           .attr('x',ini_postxt[0])
                           .attr('y',ini_postxt[1])
                           .ease("back")
                           .duration(600)
                           .style("opacity",0.0)

                    // bubble box disappear
                    bbox.transition()
                        .ease("back")
                        .duration(600)
                        .attr('x', ini_posbox[0])
                        .attr('y', ini_posbox[1])
                        .style("opacity",0.0)
                    
                    desc.transition()
                        .attr('x', ini_postxt[0]-155)
                        .attr('y', ini_postxt[1])
                        .ease("back")
                        .style("opacity",0.0)
                        .delay(100)
                        .duration(600)

//                    
//                    // explanation disappear
//                    crtexp.transition()
//                          .attr('x',ini_posexp[0])
//                          .attr('y',ini_posexp[1])
//                          .ease("back")
//                          .duration(600)
//                          .style("opacity",0.0)
////                          .call(wrap, 200)
//                    
                       
 
                    // change image link
                    crtimg.transition()
                          .delay(1000)
                          .attr("xlink:href", "cocktails/"+ crt_cocktail+".png")
                    

                    // change text
                    crttext.transition()
                             .delay(1000)
//                             .duration(1000)
                             .text(crt_cocktail)
                    
                    desc.transition()
                        .delay(1000)
                        .attr("xlink:href", "svg/"+ crt_cocktail+".svg")
                    
//                    //change explanation
//                    crtexp.transition()
//                          .delay(1000)
//                          .text(explanation)
////                          .call(wrap, 200)
//                    
                         
                   // image reappear    
                    crtimg.transition()
                            .ease(easement)
                            .duration(1000)
                            .delay(1500)
                            .attr('x',pos_img[0])
                            .attr('y',pos_img[1]) 
                            .style("opacity",1.0)
                   
                    // text reappear   
                    crttext.transition()
                            .ease(easement)
                            .attr('x',postxt[0])
                            .attr('y',postxt[1])
                            .duration(1200)
                            .delay(2000)           
                            .style("opacity",1.0)
                    
                    desc.transition()                     
                            .ease(easement)
                            .duration(1000)
                            .delay(2000)
                            .attr('x',postxt[0]-120)
                            .attr('y',postxt[1]) 
                            .style("opacity",1.0)
                    
                    // bubble box reappear       
                    bbox.transition()
                         .ease(easement)
                         .delay(2000)
                         .duration(1200)
                         .attr('x', posbox[0])
                         .attr('y', posbox[1])
                         .style("opacity",1.0)
                    
//                    //explanation reappear
//                    crtexp.transition()
//                          .ease(easement)
//                          .attr('x',posexp[0])
//                          .attr('y',posexp[1])
//                          .duration(1200)
//                          .delay(2000)           
//                          .style("opacity",1.0)
////                          .call(wrap, 200)

                    
      
                          
                    prvimg = null
       
//                    var prvtext = svg.append("text")
                prv_cocktail = crt_cocktail
         
                }
            else
             {
                 repmsg.transition()
                       .style('opacity',1.0)
             }
            
            }
            
         
                });

   prv_status = status;
    

})



