if(localStorage.getItem('hi-score')==null){
    localStorage.setItem('hi-score',0)
}
let gamewin = new GameWindow()
let inverseSpeed = 7;
let gover  = false

let counter = 0;
let difTime = 2;

//Showing Intro
gamewin.intro()

setTimeout(function(){
    text_animation("🙏🙏🙏WELCOME TO VPM APPLICATIONS 🙏🙏🙏 _ Press Enter 💕💕",document.getElementById('start-message'),4,true)
},1000)


gameover = () =>{
    let goverbox = document.getElementById('gameover-card')
    goverbox.style.opacity = 100
    document.getElementById('Score').innerHTML = `Score : ${gamewin.score}`
    document.getElementById('High-Score').innerHTML = `High Score : ${gamewin.getHiScore()}`
}




//main function to start gameEngine
main = ()  => {
    counter++
    document.addEventListener('keydown',function(event){
        switch(event.key){
            case keyUp:
                moveSound.play()
                if(gamewin.snakedirection!=DOWN){
                    gamewin.snakedirection = UP
                }
                gamewin.snakeorientation = V
                break;

            case keyDown:
                moveSound.play()
                if(gamewin.snakedirection!=UP){
                    gamewin.snakedirection = DOWN
                }
                gamewin.snakeorientation = V
                break;

            case keyL:
                moveSound.play()
                if(gamewin.snakedirection!=RHT){
                    gamewin.snakedirection = LFT
                }
                gamewin.snakeorientation = H
                break;

            case keyR:
                moveSound.play()
                if(gamewin.snakedirection!=LFT){
                    gamewin.snakedirection = RHT
                }
                gamewin.snakeorientation = H
                break;
        }

    })
    if(counter%inverseSpeed==0){
        gamewin.StartGameEngine()
    }
    requestAnimationFrame(main)
}


//calling main when pressed enter
document.addEventListener('keypress',function(event){
    if(event.key==Enter){
        setInterval(function(){
            if(inverseSpeed>2){
                inverseSpeed --
                if(inverseSpeed==4){
                    inverseSpeed = 7
                }
            }
        },difTime*1000*60)
        main()
    }
})