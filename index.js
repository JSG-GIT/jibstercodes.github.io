window.onload = function(){
    var ParticleAmount = 0;
    var DisplayParticleAmount = "0.00"
    document.getElementById('output').innerHTML = lengthOfName;
};

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
    DisplayParticleAmount = parseFloat(ParticleAmount).toFixed(2);
}