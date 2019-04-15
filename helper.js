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

function hardInitPieces()
{
    //constructor(x, y, cases, item)
    let pieces = [];

    for (let i = 1; i < 7; i++)
    {
        let square = document.createElement("canvas");
        square.id = "possibility_" + i + "_0";
        let piece = document.getElementById("possibility_" + i);    
        piece.appendChild(square);
    }
    
    pieces[0] = new Piece(0, 0, [new Case(0, 0, direction.TOP, direction.RIGHT, document.getElementById("possibility_1_0"))], document.getElementById("possibility_1"));
    pieces[0].item.style = "padding-right: " + (pieces[0].posx * 50 + 47) + "px; padding-bottom: " + (pieces[0].posy * 50 + 47) + "px;"; 

    pieces[1] = new Piece(0, 0, [new Case(0, 0, direction.RIGHT, direction.DOWN, document.getElementById("possibility_2_0"))], document.getElementById("possibility_2"));
    pieces[1].item.style = "padding-right: " + (pieces[1].posx * 50 + 47) + "px; padding-bottom: " + (pieces[1].posy * 50 + 47) + "px;"; 

    pieces[2] = new Piece(0, 0, [new Case(0, 0, direction.DOWN, direction.LEFT, document.getElementById("possibility_3_0"))], document.getElementById("possibility_3"));
    pieces[2].item.style = "padding-right: " + (pieces[2].posx * 50 + 47) + "px; padding-bottom: " + (pieces[2].posy * 50 + 47) + "px;"; 

    pieces[3] = new Piece(0, 0, [new Case(0, 0, direction.LEFT, direction.TOP, document.getElementById("possibility_4_0"))], document.getElementById("possibility_4"));
    pieces[3].item.style = "padding-right: " + (pieces[3].posx * 50 + 47) + "px; padding-bottom: " + (pieces[3].posy * 50 + 47) + "px;"; 

    pieces[4] = new Piece(0, 0, [new Case(0, 0, direction.TOP, direction.DOWN, document.getElementById("possibility_5_0"))], document.getElementById("possibility_5"));
    pieces[4].item.style = "padding-right: " + (pieces[4].posx * 50 + 47) + "px; padding-bottom: " + (pieces[4].posy * 50 + 47) + "px;"; 

    pieces[5] = new Piece(0, 0, [new Case(0, 0, direction.LEFT, direction.RIGHT, document.getElementById("possibility_6_0"))], document.getElementById("possibility_6"));
    pieces[5].item.style = "padding-right: " + (pieces[5].posx * 50 + 47) + "px; padding-bottom: " + (pieces[5].posy * 50 + 47) + "px;"; 

    for(let i = 0; i < 6; i++)
        drawPiece(pieces[i]);
    return pieces;
}