let canvas;
let framePeriod = 30; // Number of ms to display each frame
let canvasWidth = 640;
let canvasHeight = 480;

let width = 1080; 
let height = 1620; 

let widthMToPixels = 0;
let heightMToPixels = 0;

const gravitationalAcceleration = -9.81;

let initSpeed = 0;
let initAngle = 0; 

let position_x;
let position_y;
let velocity_x;
let velocity_y;


$(document).ready(function() {
    
    canvas = document.getElementById('graph');    
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
           
        $('#animate').click(function() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            initSpeed = $('#initspeed').val();
            initAngle = $('#angle').val() * Math.PI / 180; //degrees to radians
        
            widthMToPixels = canvasWidth / width;
            heightMToPixels = canvasHeight / height;
            
            position_x = function(time) { return initSpeed * Math.cos(initAngle) * time; }
            position_y = function(time) { return (0.5 * gravitationalAcceleration * time * time) + (initSpeed * Math.sin(initAngle) * time); }
            velocity_x = initSpeed * Math.cos(initAngle); 
            velocity_y = function(time) { return (gravitationalAcceleration * time) + (initSpeed * Math.sin(initAngle)); }
            
            
            timeAtMaxHeight = -1 * initSpeed * Math.sin(initAngle) / gravitationalAcceleration;
            max_x = position_x(timeAtMaxHeight);
            max_y = position_y(timeAtMaxHeight);
            
            range = -1 * initSpeed * initSpeed * Math.sin(2 * initAngle) / gravitationalAcceleration;
         
            totalTime = -2 * initSpeed * Math.sin(initAngle) / gravitationalAcceleration;
            
            function draw(time, animate) {
                $('#time').val(time);
           
                
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                ctx.fillStyle = "#bdc3c7";
                ctx.strokeStyle = "#1abc9c";
                
                ctx.beginPath();
                ctx.moveTo(0, canvasHeight);
                ctx.quadraticCurveTo(max_x * widthMToPixels,
                                     canvasHeight - 2 * max_y * heightMToPixels,
                                     range * widthMToPixels,
                                     canvasHeight);
                ctx.stroke();
                
                x = position_x(time) * widthMToPixels;
                y = canvasHeight - (position_y(time) * heightMToPixels);
                xv = velocity_x * widthMToPixels;
                yv = velocity_y(time) * heightMToPixels;
                
                ctx.beginPath();
                ctx.moveTo(x * widthMToPixels, canvasHeight - (y * heightMToPixels));
                ctx.arc(x, y, 5, 0, Math.PI * 2, true);
                ctx.closePath;
                ctx.fill();
                
                time += framePeriod / 1000;
                
                if ((time <= totalTime + framePeriod*0.001) && animate)
                    setTimeout(function() { draw(time, true); }, framePeriod);
            }
            draw(0, true); 
        }); 


        $('#reset').click(function() {
            
            // context = canvas.getContext('2d');
            // context.clearRect(0, 0, canvas.width, canvas.height);

            $('#initspeed').attr('value', '');
            $('#angle').attr('value', '');
            
            $('#time').attr('value', '0');

            ctx.clearRect(0, 0, 0, 0);
            
            initSpeed = 0;
            initAngle = 0;
          
            
            widthMToPixels = canvasWidth / width;
            heightMToPixels = canvasHeight / height;
            
            position_x = 0
            position_y = 0
            velocity_x = 0
            velocity_y = 0
            
            max_x = 0;
            max_y = 0;
            totalTime= 0;

        }); 
    }
});