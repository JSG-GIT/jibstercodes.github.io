var ParticleAmount = 0.00;
var fps = 60;
var show = 0;
//Function definitions

$(document).ready(function()
{
    setInterval(TickFunction, 1000/fps);
    $("#video").hide();
});

function TickFunction()
{
    //Update math
    ParticleAmount += 1/fps;

    //Update visuals
    NewText = ToText(ParticleAmount)
    UpdateVarDisplay("ParticleAmount", NewText);

    if(ParticleAmount > 10 && show == 0){show = 1; $("#video").show(); $("#video").play()}
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