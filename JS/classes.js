class GameWindow{
    constructor(){
        this.score = 0
        this.element = document.getElementById('game-window')
        this.snakearray = Array()
        this.snakedirection = null;
        this.snakeorientation = null;
        //Making Head
        this.snake_head = new SnakeBlock(true,1,1)        
        this.sb = new SnakeBlock(false,2,1)        
        this.snakearray.push(this.snake_head)
        this.snakearray.push(this.sb)
        this.foodx = Math.floor((Math.random() * 25) + 1);
        this.foody = Math.floor((Math.random() * 25) + 1);

        
    }



    intro() {
        fetch('/HTML/intro.html').then(res=>res.text()).then(response=> this.element.innerHTML = response)
    }

    getHiScore(){
        return localStorage.getItem('hi-score')
    }

    setHiScore(){
        localStorage.setItem('hi-score',this.score)
    }

    restartgame(){
        document.getElementById('gameover-card').style.opacity = 0
        gover = false
        this.score = 0
        this.element = document.getElementById('game-window')
        this.snakearray = Array()
        this.snakedirection = null;
        this.snakeorientation = null;
        //Making Head
        this.snake_head = new SnakeBlock(true,1,1)        
        this.sb = new SnakeBlock(false,2,1)        
        this.snakearray.push(this.snake_head)
        this.snakearray.push(this.sb)
        this.foodx = Math.floor((Math.random() * 25) + 1);
        this.foody = Math.floor((Math.random() * 25) + 1);
        main()
    }

    StartGameEngine(){
        this.displayScore()
        this.element.innerHTML = "" 
        this.gametab = document.createElement('div')
        this.gametab.id = 'game-tab'
        this.gametab.className = 'neon-border'
        this.element.appendChild(this.gametab)

        this.displayFood(this.foodx,this.foody)

        if(this.ateFood()){
            ateSound.play()

            this.foodx = Math.floor((Math.random() * 25) + 1);
            this.foody = Math.floor((Math.random() * 25) + 1);
            this.displayFood(this.foodx,this.foody)
            this.addsnakeblock()
            if(!gover){
                this.score++
            }
            this.displayScore()
        }

        
        
        switch(this.snakedirection){
            case LFT:
                this.changeBlocksDirection(LFT)
                break;
            case RHT:
                this.changeBlocksDirection(RHT)
                break;
            case UP:
                this.changeBlocksDirection(UP)
                break;
            case DOWN:
                this.changeBlocksDirection(DOWN)
                break;
        }

        this.snakearray.forEach(function(element){
            element.appendIn(document.getElementById('game-tab'))
        })

        if(this.isBitten()){
            gameoverSound.play()
            if(this.getHiScore()<this.score){
                this.setHiScore()
            }
            gameover()
            gover = true
        }

        // #CHANGING SNAKEHEAD IMAGE DIRECTION
        this.snake_head.element.style.backgroundImage = `url(/IMAGES/snakehead${this.snakedirection}.png)`


    }

    changeBlocksDirection(direction){
        for(let snake_index = this.snakearray.length-2;snake_index>=0;snake_index--){

            let Presnakeblock = this.snakearray[snake_index+1]


            let snakeblock = this.snakearray[snake_index]

            Presnakeblock.updateRowAndColumn(snakeblock.coordinates.xdesc,snakeblock.coordinates.ydesc)
        }
        switch(direction){
            case LFT:
                this.snake_head.MoveLeft()
                break;
            case RHT:
                this.snake_head.MoveRight()
                break;
            case UP:
                this.snake_head.MoveUp()
                break;
            case DOWN:
                this.snake_head.MoveDown()
                break;
        }


    }

    displayScore(){
        let scoreElement = document.getElementById('game-score')
        scoreElement.innerHTML = `${this.score}`
    }

    addsnakeblock(){
        let x;
        let y;
        switch(this.snakeorientation){
            case H:
                y = this.snake_head.coordinates.ydesc
                switch(this.snakedirection){
                    case LFT:
                        x = this.snake_head.coordinates.xdesc+1
                        break;
                    case RHT:   
                        x = this.snake_head.coordinates.xdesc-1
                        break;
                }
                break;
            case V:
                x  =this.snake_head.coordinates.xdesc
                switch(this.snakedirection){
                    case UP:
                        y = this.snake_head.coordinates.ydesc + 1
                        break;
                    case DOWN:
                        y = this.snake_head.coordinates.ydesc - 1
                        break;
                }
                break;
        }
        let nxtsnakeblock = new SnakeBlock(false,x,y)
        this.snakearray.push(nxtsnakeblock)
    }
   

    displayFood(x,y){
        this.food = new SnakeBlock(false,x,y,true)
        this.food.updateRowAndColumn(x,y)
        this.food.appendIn(this.gametab)
    }

    ateFood(){
        let x = this.snake_head.coordinates.xdesc
        let y = this.snake_head.coordinates.ydesc
        if(x==this.food.coordinates.xdesc&&y==this.food.coordinates.ydesc){
            return true
        }
        else{
            return false
        }

    }

    isBitten(){
        let rvalue   = false
        let headx = this.snake_head.coordinates.xdesc
        let heady = this.snake_head.coordinates.ydesc
        this.snakearray.forEach(function(sblock,index){
            if(index!=0){
                if(headx===sblock.coordinates.xdesc&&heady===sblock.coordinates.ydesc){
                    rvalue = true
                }
            }
        })
        return rvalue
    }
    


}

class SnakeBlock{
    constructor(head=false,x,y,food=false){
        if(head==true){
            this.id  = 'snake-head'
        }
        if(food==true){
            this.id = 'snake-food'
        }
        this.className = "snake-block"
        this.element = document.createElement('div')
        this.element.id= this.id
        this.element.className= this.className
        this.direction  = null;
        this.orientation = null
        this.coordinates = {
            xdesc:x,
            ydesc:y
        }
    }
    appendIn(parent){
        parent.appendChild(this.element)
    }

    updateRowAndColumn(x,y){
        this.coordinates.ydesc = y
        this.coordinates.xdesc =  x
        this.element.style.gridColumnStart = x
        this.element.style.gridRowStart = y
    }


    MoveUp(){
        let row = this.coordinates.ydesc
        if(row>1){
            row --
        }
        else{
            row = TR
        }
        this.updateRowAndColumn(this.coordinates.xdesc,row)

    }

    MoveDown(){
        let row = this.coordinates.ydesc
        if(row<TR){
            row ++
        }
        else{
            row = 0
        }
        this.updateRowAndColumn(this.coordinates.xdesc,row)
    }

    MoveLeft(){
        let column = this.coordinates.xdesc
        if(column>1){
            column --
        }
        else{
            column = TC
        }
        this.updateRowAndColumn(column,this.coordinates.ydesc)
    }

    MoveRight(){
        let column = this.coordinates.xdesc
        if(column<TC){
            column ++
        }
        else{
            column = 0
        }
        this.updateRowAndColumn(column,this.coordinates.ydesc)
    }

    
}