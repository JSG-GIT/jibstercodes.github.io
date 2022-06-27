var ParticleAmount = 0;
var fps = 60;
var paused = false;

$(document).ready(function() {
    ParticleAmount = 0;
    fps = 60;
    paused = false;
    window.setInterval(TickFunction, 1000)
    window.setInterval(ActiveTickFunction, 1000/fps);
});

//Focused TickFunction
function ActiveTickFunction(){
    if(paused === false){
        //Math
        UpdateMath();

        //Display
        NewText = ToText(ParticleAmount);
        UpdateVarDisplay("ParticleAmount", NewText);
    }
}

//Unfocused TickFunction
function TickFunction()
{
    if(paused === true){
        //Math
        for(i=0;i<fps;i++){
            UpdateMath();
        }

        //Display
        NewText = ToText(ParticleAmount);
        UpdateVarDisplay("ParticleAmount", NewText);
    }
}

//Updating stuff
function UpdateVarDisplay(id, text)
{
    $("#" + id).text(text);
}
function UpdateMath()
{
    //Update math
    ParticleAmount += 1/fps;
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

