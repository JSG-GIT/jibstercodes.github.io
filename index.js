var ParticleAmount = 0.00;
var fps = 60;
var show = 0;
var paused = false;
//Function definitions

$(document).ready(function()
{
    setInterval(TickFunction, 1000/fps);
});

function TickFunction()
{
    //Update the math
    if(paused){for(i=0;i<fps;i++){UpdateMath}}
    else{UpdateMath();}

    //Update visuals
    NewText = ToText(ParticleAmount);
    UpdateVarDisplay("ParticleAmount", NewText);

}

function ToText(variable)
{
    if(typeof variable === "number")
    {
        if(variable < 10000){return variable.toFixed(2).toString();}
        var exponent = Math.floor(Math.log10(variable));
        var value = (Math.pow(10, -exponent) * variable).toFixed(2);
        return text = value + "e" + exponent;
    }
    return variable.toString();
}

function UpdateVarDisplay(id, text)
{
    $("#" + id).text(text);
    console.log("#" + id)
}

function PlayVideo(){
        // Creates arbitrary global 'player' variable to be defined later

}

function UpdateMath()
{
    //Update math
    ParticleAmount += 1/fps;
}

//Offscreen Timer

var myInterval;

// Active
window.addEventListener('focus', play);

// Inactive
window.addEventListener('blur', pause);

function timerHandler() {
    count++;
}

// Start timer
function pause() {
    paused = true;
    setInterval(TickFunction, 1000);
}

// Stop timer
function play()
{
    paused = false;
    setInterval(TickFunction, 1000/fps);
}
