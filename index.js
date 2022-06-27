var Particle_N = 10; //Particle Amount

var Producer1_N = 0; //Producer1 Amount
var Producer1_B = 0; //Producer1 Bought
var Producer1_P = 0; //Producer1 production

var Producer2_N = 0;
var Producer2_B = 0;
var Producer2_P = 0;

var Producer3_N = 0;
var Producer3_B = 0;
var Producer3_P = 0;

var upg1 = false;
var upg2 = false;

var lastClick;
var focused = true;

//Things to request once everything is ready.
$(document).ready(function() {
    window.requestAnimationFrame(ActiveTickFunction);
    Buttons();
    $("#prodrow3").hide();
});


//MATH
function UpdateMath(dt)
{
    //Update math
    if(upg1){
        Producer1_P = Producer1_N*Math.pow(1.15, Producer1_B);
        Producer2_P = Producer2_N*Math.pow(1.2, Producer2_B);
        Producer3_P = Producer3_N*Math.pow(1.25, Producer3_B);
    }
    else{
        Producer1_P = Producer1_N*Math.pow(Producer1_B, 0.15);
        Producer2_P = Producer2_N*Math.pow(Producer2_B, 0.2);
        Producer3_P = Producer3_N*Math.pow(Producer3_B, 0.25);
    }
    if(upg2){
        Producer1_P = Producer1_P*(1+Math.log10(Producer1_N+1));
        Producer2_P = Producer2_P*(1+Math.log10(Producer2_N+1));
        Producer3_P = Producer3_P*(1+Math.log10(Producer3_N+1));
    }
    Particle_N += Producer1_P*dt;
    Producer1_N += Producer2_P*dt;
    Producer2_N += Producer3_P*dt;
}

function Buttons(){
    $(".prodbtn").click(function(){
        producer = this.id;
        cost = getProducerCost(producer);
        if(Particle_N >= cost){
            Particle_N -= cost;
            window["Producer" + (producer) + "_B"] += 1;
            window["Producer" + (producer) + "_N"] += 1;
        }
    });
    $(".upgbtn").click(function(){
        if((this.id==="1") && (Particle_N >= 500)){Particle_N-=500; upg1 = true;}
        if((this.id==="2") && (Particle_N >= Math.pow(10,6))){Particle_N-=Math.pow(10,6); upg2 = true;}
    });
}

//Updating the screen
function UpdateHTML(id, text)
{
    $("#" + id).text(text);
}

//Focused state of the window
window.addEventListener('focus', play)
function play(){focused = true;}
window.addEventListener('blur', pause)
function pause(){focused = false;}

//Active Tick Function
var oldstamp = 0;
var ms;
function ActiveTickFunction(timestamp){
    if(!focused){window.requestAnimationFrame(ActiveTickFunction); return;}
    ms = (timestamp - oldstamp)/1000;

    //Math
    UpdateMath(ms);

    //Display
    UpdateDisplay();

    //Request next tick
    oldstamp = timestamp
    window.requestAnimationFrame(ActiveTickFunction);
}

//Turning variables to displayable text
function ToText(variable)
{
    if(typeof variable === "number")
    {
        if(variable < 10000){return variable.toFixed(2).toString();}
        var exponent = Math.floor(Math.log10(variable));
        var value = (Math.pow(10, -exponent) * variable).toFixed(2);
        return text = value + "e" + exponent;
    }
    return variable;
}

//Display in HTML
function UpdateDisplay(){
    NewText = ToText(Particle_N);
    UpdateHTML("Particle_N", NewText);
    if(Particle_N > Math.pow(10,5)){$("#prodrow3").show();}
    for(i=1;i<4;i++){
        text = "Producer[" + i + "]: " + ToText(window["Producer" + i + "_N"]) + " (" + Math.floor(window["Producer" + i + "_B"]) + ")";
        id = "Prod" + i + "_N";
        UpdateHTML(id, text);
        if(i === 1){
            text = ToText(window["Producer" + i + "_P"]) + " particles/s";
            id = "Prod" + i + "_P";
            UpdateHTML(id, text);
        }
        else{
            text = ToText(window["Producer" + i + "_P"]) + " producer[" + (i-1) +  "]/s";
            id = "Prod" + i + "_P";
            UpdateHTML(id, text);
        }

        id = i;
        text = "Buy 1: " + ToText(getProducerCost(i));
        UpdateHTML(id, text);
    }
}

function getProducerCost(index){
    return Math.ceil(Math.pow(Math.pow(10, Math.pow(index, Math.pow(10, index/10))), (window["Producer" + index + "_B"])/(5-index) + 1));
}