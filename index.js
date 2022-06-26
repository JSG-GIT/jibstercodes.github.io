var ParticleAmount = 0;

//Function definitions

$(function()
{
    setInterval(TickFunction, 20);
});

function TickFunction()
{
    //Update math
    ParticleAmount += 1;

    //Update visuals
    UpdateVarDisplay(ParticleAmount, true);
}

function UpdateVarDisplay(variable, IsNumber)
{
    if(IsNumber)
    {
        var exponent = Math.floor(Math.log10(variable));
        var value = parseFloat(Math.pow(variable, -exponent)).toFixed(2);
        var text = value + "e" + exponent;
    }
    else
    {
        var text = variable.toString();
    }

    document.getElementById(variable.toString()).innerHTML = text;
}