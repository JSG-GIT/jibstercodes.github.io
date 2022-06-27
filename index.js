var ParticleAmount = 0.00;
var truefps = 60;
var fps = truefps;
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
    if(paused){for(i=0;i<truefps;i++){UpdateMath}}
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
    fps = 1
    paused = true;
    setInterval(TickFunction, 1000/fps);
}

// Stop timer
function play()
{
    paused = false;
    fps = truefps;
    setInterval(TickFunction, 1000/fps);
}
