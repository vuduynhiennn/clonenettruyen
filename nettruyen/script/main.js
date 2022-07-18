var m =true
var b =true
var test = document.querySelectorAll(".setcolor")

document.getElementById("change-background").onclick = function(){
    if(b){
        document.body.style.backgroundColor="#ebebeb"
        document.getElementById("navbar").style.backgroundColor ="#e4e4e4"
        document.getElementById("home").style.color="blueviolet"
        for(i=0; i < test.length; i++){
            test[i].setAttribute('class','setcolor changecolor')
        }
        b=false

    }else{
        document.body.style.backgroundColor="rgb(27, 27, 27)"
        document.getElementById("navbar").style.backgroundColor ="black"
        document.getElementById("home").style.color="orange"
        for(i=0; i < test.length; i++){
            test[i].setAttribute('class','setcolor')
        }
        b=true
    }
}

document.getElementById("show-notification").onclick = function() {
    if(m){
        document.getElementById("drop-notification").style.display='block'
        m=false
        
    }else{
        document.getElementById("drop-notification").style.display='none'
        m=true
    }

}


function animation(i){
    document.getElementById("main__topcomic").style.transform = '`transform: translate3d(${i}px, 0px, 0px)`'
}
var cout=0
function settime(cout){
        switch(cout){
            case 200:
                document.getElementById("main__topcomic").style.transform = 'translate3d(-200px, 0px, 0px)';
                break;
            case 400:
                document.getElementById("main__topcomic").style.transform = 'translate3d(-400px, 0px, 0px)';
                break ;   
            case 600:
                document.getElementById("main__topcomic").style.transform = 'translate3d(-600px, 0px, 0px)';
                break ;
            case 800:
                document.getElementById("main__topcomic").style.transform = 'translate3d(-800px, 0px, 0px)';
                break ;
            case 1000:
                document.getElementById("main__topcomic").style.transform = 'translate3d(-1000px, 0px, 0px)';
                break ;  
            default: 
                document.getElementById("main__topcomic").style.transform = 'translate3d(0px, 0px, 0px)';
            ;    
        }
}

// setInterval(() => {
//     if(cout==0){
//         setTimeout(() => {
//             settime(cout);
//             cout = cout +200
//             console.log(cout)
//             if(cout>1000){
//                 cout=0;
//             }
            
//         }, 5000);
//     }
//     else{
//         settime(cout);
//         cout = cout +200
//         console.log(cout)
//         if(cout>1000){
//             cout=0;
//         }
//     }
    
// }, 2000);

setInterval(() => {
    settime(cout);
    cout = cout +200
    console.log(cout)
    if(cout>1000){
        cout=0;
    }
    
}, 5000);




