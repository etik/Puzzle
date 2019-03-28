const direction = {
    NO: -1,
    TOP: {x: 150, y: 0},
    RIGHT: {x: 300, y: 75},
    DOWN: {x: 150, y: 150},
    LEFT: {x: 0, y: 75}
};

class Piece {
    constructor(x, y, cases, item)
    {
        this.cases = cases;
        this.direction1 = cases[0].direction1;
        this.direction2 = cases[cases.length - 1].direction2;

        this.x = x;
        this.y = y;

        this.posx = 0;
        this.posy = 0;

        let posxmax = 0;
        let posymax = 0;
        let posxmin = 0;
        let posymin = 0;

        for (let i = 0; i < cases.length; i++)
        {
            if (this.posx > posxmax)
                posxmax = this.posx;
            if (this.posy > posymax)
                posymax = this.posy;
            if (this.posx < posxmin)
                posxmin = this.posx;
            if (this.posy < posymin)
                posymin = this.posy;
            
            cases[i].x = this.posx;
            cases[i].y = this.posy;
            if(cases[i].direction2 === direction.TOP)
                this.posy--;
            if(cases[i].direction2 === direction.DOWN)
                this.posy++;
            if(cases[i].direction2 === direction.LEFT)
                this.posx--;
            if(cases[i].direction2 === direction.RIGHT)
                this.posx++;        
        }

        this.posx = posxmax - posxmin;
        this.posy = posymax - posymin;

        let boxSize = 50;

        for (let i = 0; i < cases.length; i++)
        {
            cases[i].item.style = 'left: ' + (cases[i].x * boxSize + (boxSize * (0 - posxmin))) + 'px;top: ' + (cases[i].y * boxSize + (boxSize * (0 - posymin))) + 'px; position: absolute;';
        }

        this.item = item;
    }
}

class Case {
    constructor(x, y, direc1, direc2, item) {
        this.x = x;
        this.y = y;
        this.direction1 = direc1;
        this.direction2 = direc2;
        this.item = item;
    }
}