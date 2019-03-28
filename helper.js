function getOpposite(d)
{
    if (d === direction.TOP)
        return direction.DOWN;
    if (d === direction.DOWN)
        return direction.TOP;
    if (d === direction.RIGHT)
        return direction.LEFT;
    if (d === direction.LEFT)
        return direction.RIGHT;
    throw "Bad value given to getOpposite";    
}

function numberToDirection(nb)
{
    if(nb === 0)
        return direction.NO
    if(nb === 1)
        return direction.TOP
    if(nb === 2)
        return direction.RIGHT
    if(nb === 3)
        return direction.DOWN
    if(nb === 4)
        return direction.LEFT
    throw "Bad value given to numberToDirection";  
}

function drawLine(c)
{
    ctx = c.item.getContext("2d");
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FF0000";

    ctx.beginPath();
    ctx.moveTo(c.direction1.x, c.direction1.y);
    ctx.lineTo(c.direction2.x, c.direction2.y);
    ctx.stroke();
}

function drawPiece(p)
{
    for (let i = 0; i < p.cases.length; i++)
    {
        drawLine(p.cases[i]);
    }

    /*
    ctx = p.item.getContext("2d");
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#FF0000";
    
    let x = 110;
    let y = 60;

    ctx.moveTo(x, y);

    
    ctx.beginPath();

    //ctx.lineTo(c.direction2.x / 6, c.direction2.y / 3);
    
    for( let i = 0; i < p.cases.length; i++)
    {
        c = p.cases[i];
        ctx.strokeStyle = "#0000FF";
        ctx.rect(x, y, 50, 50);
        ctx.stroke();

        ctx.strokeStyle = "#FF0000";
        ctx.moveTo(x + c.direction1.x / 6, y + c.direction1.y / 3);
        ctx.lineTo(x + c.direction2.x / 6, y + c.direction2.y / 3);
        ctx.stroke();

        x += (c.x) * 50;
        y += (c.y) * 50;
        
        //ctx.strokeStyle = "#FF0000";

        
        
    }
    ctx.stroke();
    */


    //ctx.lineTo(c.direction2.x / 10, c.direction2.y / 5);
    //ctx.moveTo(x, y)
    //ctx.rect(20, 20, 150, 100);
    //ctx.moveTo(c.direction1.x, c.direction1.y);
    //ctx.lineTo(c.direction2.x, c.direction2.y);
    //ctx.stroke();
}

function hardInitCase()
{
    let cases = [];
    cases[1] = new Case(0, 0, 1, 2, document.getElementById("possibility_" + 1));
    cases[2] = new Case(0, 0, 2, 3, document.getElementById("possibility_" + 2));
    cases[3] = new Case(0, 0, 3, 4, document.getElementById("possibility_" + 3));

    cases[4] = new Case(0, 0, 4, 1, document.getElementById("possibility_" + 4));
    cases[5] = new Case(0, 0, 1, 3, document.getElementById("possibility_" + 5));
    cases[6] = new Case(0, 0, 2, 4, document.getElementById("possibility_" + 6));

    for(let i = 1; i < 7; i++)
        drawLine(cases[i]);
    return cases;
}