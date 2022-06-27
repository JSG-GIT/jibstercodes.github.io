var ParticleAmount = 0;
var paused = false;

$(document).ready(function() {
    window.requestAnimationFrame(ActiveTickFunction);
});

//Active Tick Function
var oldstamp = 0;
var ms;
function ActiveTickFunction(timestamp){
    if(paused){window.requestAnimationFrame(ActiveTickFunction); return;}
    ms = (timestamp - oldstamp)/1000;

    //Math
    UpdateMath(ms);

    //Display
    NewText = ToText(ParticleAmount);
    UpdateVarDisplay("ParticleAmount", NewText);

    //Request next tick
    oldstamp = timestamp
    window.requestAnimationFrame(ActiveTickFunction);
}

//Updating stuff
function UpdateVarDisplay(id, text)
{
    $("#" + id).text(text);
}
function UpdateMath(dt)
{
    //Update math
    ParticleAmount += 1*dt;
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
    return variable.toString();
}

window.addEventListener('focus', play)
function play(){paused = false;}
window.addEventListener('blur', pause)
function pause(){paused = true;}

