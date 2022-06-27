var Particle_N = 10; //Particle Amount

var Producer1_N = 0; //Producer1 Amount
var Producer1_B = 0; //Producer1 Bought
var Producer1_P = 0; //Producer1 production

var Producer2_N = 0;
var Producer2_B = 0;
var Producer2_P = 0;

var lastClick;
var focused = true;

//Things to request once everything is ready.
$(document).ready(function() {
    window.requestAnimationFrame(ActiveTickFunction);
    Buttons();
});

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
}

//MATH
function UpdateMath(dt)
{
    //Update math
    Producer1_P = Producer1_N*Math.pow(Producer1_N, 0.05);
    Particle_N += Producer1_P*dt;

    Producer2_P = Producer2_N;
    Producer1_N += Producer2_P*dt;
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

    for(i=1;i<3;i++){
        text = "Producer[" + i + "]: " + ToText(window["Producer" + i + "_N"]) + " (" + ToText(window["Producer" + i + "_B"]) + ")";
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
    return Math.ceil(Math.pow(Math.pow(10, Math.pow(index, Math.pow(10, 1/10))), (window["Producer" + index + "_B"])/(5-index) + 1));
}