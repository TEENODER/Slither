//This File Contains Small Utility Functions
function text_animation(text,parent,speed,blink=false){
    // Use ' _ ' To Show Sentence End
    let index = 0 
    let lastindex = text.length 
    setInterval(function(){
        if(index==lastindex){
            if(blink==true){
                parent.className = "blinking-text"
            }
            clearInterval(1)
        }
        else{
            let char = text[index]
            if(char=='_'){
                parent.innerText = ""
                index++
                char = text[index]
            }
            parent.innerText = parent.innerText + char
            index++
        }
    },(speed**-1)*1000,1)
}



