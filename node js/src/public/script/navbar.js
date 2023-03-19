var cout=0
function settime(cout){
        switch(cout){
            case 200:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *1), 0px, 0px)' ;
                break;
            case 400:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *2), 0px, 0px)' ;
                break ;   
            case 600:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *3), 0px, 0px)' ;
                break ;
            case 800:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *4), 0px, 0px)' ;
                break ;
            case 1000:
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *5), 0px, 0px)' ;
                break ;  
            default: 
                document.getElementById("main__topcomic").style.transform =  'translate3d(-webkit-calc(var(--animation-comic) *0), 0px, 0px)' ;  
        }
}

function dashright(){
    settime(cout)
    cout=cout+200
}

function dashleft(){
    cout=cout-200
    if(cout>=200){
        cout=cout-200
        settime(cout)
        cout=cout+200
    }
}

setInterval(() => {
    settime(cout);
    cout = cout +200
    if(cout>1000){
        cout=0;
    }
    
}, 3000);


