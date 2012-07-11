/**
*
*Initialization
*
*
*/
var s=[]; 
var canvas, context,canvaso,contexto;
var tool=" ";
var sq=new Array;
var tq=new Array();  
function init() {
        canvaso=document.getElementById('imageview');
        contexto=canvaso.getContext('2d');
        var container=canvaso.parentNode;
        canvas=document.createElement('canvas');
  	
             
  	context = canvas.getContext('2d');                          
  	var select = document.getElementById('dtool');
        var select1= document.getElementById('dtool1');
        var select2= document.getElementById('dtool2');
        var select3= document.getElementById('dtool3');
	var select4= document.getElementById('dtool4');       
  	canvas.id ='imageTemp';
        canvas.width=canvaso.width;
        canvas.height=canvaso.height;
        container.appendChild(canvas);
       
  	canvas.addEventListener('mousedown',action,false);
  	canvas.addEventListener('mousemove',action,false);
  	canvas.addEventListener('mouseup',action,false);
        select.addEventListener('click',tchange,false);
        select1.addEventListener('click',tchange,false);
        select2.addEventListener('click',tchange,false);
        select3.addEventListener('click',tchange,false);
        select4.addEventListener('click',tchange,false);
        canvas.addEventListener('mouseout',action,false);
	alternate();
       	tchange();
        }

function action(e){
 	  e.x= e.layerX;                                                            
  	  e.y= e.layerY;
  	  var o= tool[e.type];    
  	   if(o) 
           	{
   		  o(e);
                 }
          
	}


var tools= {};              
  
function tchange(){
	var btool = this.value;
	if (typeof btool === 'undefined') {
		btool='pencil';
	}
	if(tools[btool])
        {  
           tool=new tools[btool];
           
  	}
               
}

function img_update () {
	contexto.drawImage(canvas, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
  	}



/**
*
*
*   Pencil Draw
*
*
*
*
*
*/
  
function pencildraw(){
	var tool=this;
        this.start= false;
        
		this.mousedown = function(e){
 		context.beginPath();
 		context.moveTo(e.x,e.y);
 		tool.start= true;
		 
                
               
		               
		};


		this.mousemove = function(e){t=new Date();
 		if(tool.start)
 		 {
  		   context.lineTo(e.x,e.y);
                   context.stroke();
		  
                   var tq=[];
		   tq['type']="pencil_draw";
                   tq['coord0']=e.x;
                   tq['coord1']=e.y;
                   tq['time']=t.getTime();
		  
                   sq.push(tq);
                  
                  }
		};

    
		this.mouseup = function(e){
 		if(tool.start)
 		{
  		 tool.mousemove(e);
  		 tool.start= false;
                 img_update(); 
                
                
                 
                  s.push(sq.concat());
		  sq=null;
		  sq=[];
 
                 		
		}
		};
	}  
  

/*
*
*
*
*     
*     Line Draw
*
*
*
*
*/


function linedraw(){  
	var tool = this;
    	this.start= false;
        
    		this.mousedown = function (e) {
                
      		tool.start= true;
      		tool.x0 = e.x;
      		tool.y0 = e.y;
		
    		};

    		this.mousemove = function (e) {
      		if(!tool.start){
                return;
                }
                context.clearRect(0,0,canvas.width,canvas.height);
      		context.beginPath();
      		context.moveTo(tool.x0,tool.y0);
      		context.lineTo(e.x,e.y);
      		context.stroke();
      		context.closePath();
		
    		};

    		this.mouseup = function (e) {
                if(tool.start)
                {
                 tool.mousemove(e);
                 tool.start=false;
                 img_update();
                 var sq=[];
                 t=new Date();
		 sq['type']="line";
		 sq['coord0']=tool.x0;
                 sq['coord1']=tool.y0;
                 sq['coord2']=e.x;
		 sq['coord3']=e.y;
                 sq['time']=t.getTime();
                 s.push(sq);
              
      		}
                };
 	}

  
/*
*
*
*
* Alternate Between Pencil and 
* Line Draw.
*
*
*
*
*
*/

       
function alternate(){
 
		if(!tools.pencil){
		tools.pencil=pencildraw;
		}
		else if(tools.pencil==pencildraw){
		tools.pencil=linedraw;
		}
		else{
		tools.pencil=pencildraw;
		}
	}



/**
*
*
*
*
*  Eraser
*
*
*
*
*/

tools.eraser=function(){
	     var tool=this;
             this.start=false;

			this.mousedown = function(e){
 		        context.beginPath();
 			context.moveTo(e.x,e.y);
 			tool.start= true;
		        };


			this.mousemove = function(e){
 			if(tool.start)
 		 	{
  		         context.lineTo(e.x,e.y);
                   	 context.strokeStyle="white";
                   	 context.stroke();
		   
                  	 }
			};

    
			this.mouseup = function(e){
 			if(tool.start)
 			{
  		 	 tool.mousemove(e);
  		 	 tool.start= false;
                 	 img_update();
                         }
		       };
	  
  	}


/**
*
*
*
*
*    Rectangle
*
*
*
*
*/
 
tools.rectangle=function rec(){
                var tool = this;
                this.start = false;

    			this.mousedown = function (e) {
      			tool.start = true;
      			tool.x0 = e.x;
      			tool.y0 = e.y; 
    			};

    			
			this.mousemove = function (e) {
      			if (!tool.start) {
        		  return;
      			 }

      			x = Math.min(e.x,  tool.x0),
          		y = Math.min(e.y,  tool.y0),
          		w = Math.abs(e.x - tool.x0),
          		h = Math.abs(e.y - tool.y0);

      			context.clearRect(0, 0, canvas.width, canvas.height);
     
      			if (!w || !h) {
        		  return;
      			 }

      			context.strokeRect(x, y, w, h);
      
    			};

    
			
			this.mouseup = function (e) {
			t = new Date();
      			if (tool.start) {
        		 tool.mousemove(e);
        		 tool.start= false;
        		 img_update();
       			 
                         var sq=[];
			 sq['type']="rectangle";
      	 		 sq['coord0'] = Math.min(e.x,  tool.x0),
          		 sq['coord1'] = Math.min(e.y,  tool.y0),
          		 sq['coord2'] = Math.abs(e.x - tool.x0),
          		 sq['coord3'] = Math.abs(e.y - tool.y0);
	  		 sq['time'] = t.getTime();
                         s.push(sq);        
      			}
    
    		      };

	}



/**
*
*
*
*
*
*   Animate
*
*
*
*
*/

tools.anim=function() {
	   	init();
         	contexto.clearRect(0,0,canvas.width,canvas.height);
                var i=s.length;
	        var arr=0;
                var diff = 0;
		var sq=[];
		var tq=[]; 
                var oldtime;
		var newtime;
		
		while(i>0){  
		
	         sq = s.shift();
                  
		  if(sq['type']=="rectangle"||sq['type']=="line"){
                  
                  newtime = sq['time'];
                
		  if(oldtime != undefined){
			diff = newtime-oldtime+diff;
                   }

	          
                  setTimeout(play,diff,sq);
              
                  oldtime = sq['time'];
                  }
                  
                  else{
                  
		  arr++;
		  var first = 0;
	          
		  for(k=sq.length;k>0;k--){
                  newtime =sq[0]['time'];
                  
		  if(oldtime != undefined){
			diff = newtime-oldtime+diff;
                  }
	          
                   
		  setTimeout(play1,diff,tq);
              	
                  oldtime = sq[0]['time'];
		
		  tq=sq.shift();
		  if (first == 0 && arr > 1) {
               
		  tq['coord2']='start';
		
		  first = 1;
		  }
                         
                 }
                }
		  i--;
	        }
	
    
               function play(sq) {
	        if(sq['type']=="rectangle")
		{
		context.strokeRect(sq['coord0'],sq['coord1'],sq['coord2'],sq['coord3']);
   	        }
                else if(sq['type']=="line")
		{		
		 context.moveTo(sq['coord0'],sq['coord1']);
                 context.lineTo(sq['coord2'],sq['coord3']);
                 context.stroke();
                 init();
		}
                else{alert("hi");}
                
	       }
		function play1(tq) {

		
			if (tq['coord2'] == 'start') {
				context.moveTo(tq['coord0'],tq['coord1']);
			} else {
				
               			 context.lineTo(tq['coord0'],tq['coord1']);
               			 context.stroke();}
			}
       	
}

