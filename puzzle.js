let GOAL;
let MYCASE;
let PIECES;
let LASTDIREC;

function createTab(nbcol, nbrow, nbcolpossibility, nbrowpossibility)
{
    let container = document.getElementById("container");
    let row;
    let square;
    let button;

    for(let i = 1; i < nbrow + 1; i++)
    {
        row = document.createElement("row");
        row.style = 'display: flex; height: 100%;';
        for(let j = 1; j < nbcol + 1; j++)
        {
            square = document.createElement("canvas");
            square.id = "square_" + (nbcol * (i - 1) + j);
            row.appendChild(square);
        }
        container.appendChild(row);
    }

    container = document.getElementById("containerPossibility");    

    for(let i = 1; i < nbrowpossibility + 1; i++)
    {
        row = document.createElement("row");
        row.style = 'display: flex; height: 100%; justify-content: space-evenly; align-items: center;';
        for(let j = 1; j < nbcolpossibility + 1; j++)
        {
            button = document.createElement("button");
            button.onclick = function() { possibilityClicked(nbcolpossibility * (i - 1) + j, nbcol, nbrow); };
            button.id = "possibility_" + (nbcolpossibility * (i - 1) + j);

            row.appendChild(button);
        }
        container.appendChild(row);
    }

    console.log("done");
}

function randStartCase(nbcol, nbrow)
{
    let x = Math.floor(Math.random() * nbcol) + 1;
    let y = Math.floor(Math.random() * nbrow) + 1;
    
    let direction2 = Math.floor(Math.random() * 4) + 1;
    
    if (x === 1 && direction2 === 4)
        direction2 = 2;
    if (x === nbcol && direction2 === 2)
        direction2 = 4;
    if (y === 1 && direction2 === 1)
        direction2 = 3;
    if (y === nbrow && direction2 === 3)
        direction2 = 1;

    let item = document.getElementById("square_" + (nbcol * (y - 1) + x));

    return new Case(x, y, 0, numberToDirection(direction2), item);
}

function createStart(nbcol, nbrow)
{
    let start = randStartCase(nbcol, nbrow, true, true);
    let end;
    do {
       end = randStartCase(nbcol, nbrow, true, true);
    } while (end.x === start.x && end.y === start.y);

    MYCASE = start;
    mycaseUptade(nbcol, nbrow);

    let ctx = start.item.getContext("2d");
    //ctx.lineWidth = 6;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";
    
    // ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
    ctx.rect(start.direction2.x - 40, start.direction2.y - 20, 80, 40);
    ctx.fill();
    ctx.stroke();

 
    ctx = end.item.getContext("2d");
    //ctx.lineWidth = 6;
    ctx.strokeStyle = "#00FF00";
    ctx.fillStyle = "#00FF00";

    ctx.rect(end.direction2.x - 40, end.direction2.y - 20, 80, 40);
    ctx.fill();
    ctx.stroke();

    GOAL = {Start: start, End: end};

    start.item.style = 'background-color: rgba(158, 167, 184, 0.2);';
    end.item.style = 'background-color: rgba(158, 167, 184, 0.2);';
}

function randCase(lastdirection, casenb, piecenb)
{
    let direction1;
    if (lastdirection === direction.NO)
        direction1 = numberToDirection(Math.floor(Math.random() * 4) + 1);
    else
        direction1 = getOpposite(lastdirection);

    let direction2 = numberToDirection(Math.floor(Math.random() * 4) + 1);
    while(direction2 === direction1)
    {
        direction2 = numberToDirection(Math.floor(Math.random() * 4) + 1);
    }

    let piece = document.getElementById("possibility_" + piecenb);

    square = document.createElement("canvas");
    square.id = "possibility_" + piecenb + "_" + casenb;

    piece.appendChild(square);

    return new Case(0, 0, direction1, direction2, square);
}

function createCase(nbcases, piecenb)
{
    let cases = [];
    let lastdirection = direction.NO;

    for(let i = 0; i < nbcases; i++)
    {
        cases[i] = randCase(lastdirection, i, piecenb);
        lastdirection = cases[i].direction2;        
        //drawLine(cases[i]);
    }
    return cases;
}

function createPieces(nbpieces)
{
    let pieces = [];
    for(let i = 1; i <= nbpieces; i++)
    {
        let nbcases = 3;
        let pieceCases = createCase(nbcases, i);
        let lastdirection = pieceCases[0].direction2;

        for(let j = 1; j < nbcases; j++)
        {
            pieceCases[j].direction1 = getOpposite(lastdirection);
            lastdirection = pieceCases[j].direction2;
        }

        let item = document.getElementById("possibility_" + i);

        pieces[i - 1] = new Piece(0, 0, pieceCases, item);

        pieces[i - 1].item.style = "padding-right: " + (pieces[i- 1].posx * 50 + 47) + "px; padding-bottom: " + (pieces[i- 1].posy * 50 + 47) + "px;"; 

        drawPiece(pieces[i-1]);
    }
    return pieces;
}

// Check if case direction2 is opposite to piece direction1
function testDirection(p)
{
    if (LASTDIREC === getOpposite(p.direction1))
        return 1;
    if (LASTDIREC === getOpposite(p.direction2))
        return 2;
    return 0;
}

function testWall(p, nbcol, nbrow, test)
{
    x = MYCASE.x;
    y = MYCASE.y;
    dir = MYCASE.direction2;

    let nbcases = p.cases.length;
    if (test === 1)
    {
        for (let i = 0; i < nbcases; i++)
        {
            dir = p.cases[i].direction2;
            if (dir === direction.TOP)
                y--;
            if (dir === direction.RIGHT)
                x++;
            if (dir === direction.DOWN)
                y++;
            if (dir === direction.LEFT)
                x--;
            if (x < 1 || x > nbcol || y < 1 || y > nbrow)
                return false;
            dir = p.cases[i].direction2;
        }
    }
    if (test === 2)
    {
        for (let i = nbcases - 1; i >= 0; i--)
        {
            dir = p.cases[i].direction1;
            if (dir === direction.TOP)
                y--;
            if (dir === direction.RIGHT)
                x++;
            if (dir === direction.DOWN)
                y++;
            if (dir === direction.LEFT)
                x--;
            if (x < 1 || x > nbcol || y < 1 || y > nbrow)
                return false;
            dir = p.cases[i].direction2;
        }
    }

    return true;
}

function checkWin(c, end)
{
    if (c.x === end.x && c.y === end.y && end.direction2 === getOpposite(LASTDIREC))
        return true;

    //if (Math.abs(c.x - end.x) + Math.abs(c.y - end.y) === 1)
    //{
    //    console.log("Goal reached !");
    //    if (((c.x - end.x === -1) && (LASTDIREC === direction.RIGHT && end.direction2 === direction.LEFT))
    //     || ((c.x - end.x === 1) && (LASTDIREC === direction.LEFT && end.direction2 === direction.RIGHT))
    //     || ((c.y - end.y === -1) && (LASTDIREC === direction.DOWN && end.direction2 === direction.TOP))
    //     || ((c.y - end.y === 1) && (LASTDIREC === direction.TOP && end.direction2 === direction.DOWN)))
    //     return true;
    //} 
}

function mycaseUptade(nbcol, nbrow)
{
    MYCASE.item.style = 'background-color: rgba(200, 200, 200);';
    drawLine(MYCASE);

    LASTDIREC = MYCASE.direction2;

    //constructor(x, y, direc1, direc2, item)
    let newCase = new Case(MYCASE.x, MYCASE.y, null, null, null);

    if (MYCASE.direction2 === direction.TOP)
        newCase.y--;
    if (MYCASE.direction2 === direction.RIGHT)
        newCase.x++;
    if (MYCASE.direction2 === direction.DOWN)
        newCase.y++;
    if (MYCASE.direction2 === direction.LEFT)
        newCase.x--;

    newCase.item = document.getElementById("square_" + (nbcol * (newCase.y - 1) + newCase.x))

    MYCASE = newCase;
    MYCASE.item.style = 'background-color: rgba(255, 230, 230);';
}

function possibilityClicked(piecenb, nbcol, nbrow)
{
    let p = PIECES[piecenb - 1];
    let test = testDirection(p);

    if (test !== 0 && testWall(p, nbcol, nbrow, test))
    {
        //let newCase = new Case(MYCASE.x,  MYCASE.y, null, null, null);
        let nbcases = p.cases.length;
        if (test === 1)
        {
            for (let i = 0; i < nbcases; i++)
            {
                MYCASE.direction1 = p.cases[i].direction1;
                MYCASE.direction2 = p.cases[i].direction2;
                mycaseUptade(nbcol, nbrow);
            }
        }
        if (test === 2)
        {
            for (let i = nbcases - 1; i >= 0; i--)
            {
                MYCASE.direction1 = p.cases[i].direction2;
                MYCASE.direction2 = p.cases[i].direction1;
                mycaseUptade(nbcol, nbrow);
            }
        }
   
        if (checkWin(MYCASE, GOAL.End))
            alert("YOU WIN !")
    }
    else
        console.log("bad case !");
}

function main(nbcol, nbrow, nbcolpossibility, nbrowpossibility)
{
    createTab(nbcol, nbrow, nbcolpossibility, nbrowpossibility);
    createStart(nbcol, nbrow);
    //CASES = createCase(nbcolpossibility * nbrowpossibility);
    PIECES = hardInitPieces();
    //PIECES = createPieces(nbcolpossibility * nbrowpossibility);

}

main(10, 8, 4, 3);



//function clickFunc()
//{
//    console.log("clicked");
//}

/*
<!-->div class="row">
    <div class="square">

    </div>                
    <div class="square">
        
    </div>
    <div class="square">
    </div>
</div>
<div class="row">
    <div class="square">
        
    </div>
    <div class="square">
        
    </div>
    <div class="square">
        
    </div>
</div>
<div class="row">
    <div class="square">

    </div>
    <div class="square">

    </div>
    <div class="square">

    </div>
</div-->
*/