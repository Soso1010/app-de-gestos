prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri +'"/>';

});
}

console.log('iml5version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ULuuWUaeI/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData2 = "E a segunda previsão é " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML=results[0].label;
        document.getElementById("resultEmotionName2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label == "beleza"){
            document.getElementById("updateEmoji").innerHTML="&#128522;";
        }
        if(results[0].label == "paz e amor"){
            document.getElementById("updateEmoji").innerHTML="&#128532;";
        }
        if(results[0].label == "rock and roll"){
            document.getElementById("updateEmoji").innerHTML="&#128548;";
        }

        if(results[1].label == "beleza"){
            document.getElementById("updateEmoji2").innerHTML="&#128522;";
        }
        if(results[1].label == "paz e amor"){
            document.getElementById("updateEmoji2").innerHTML="&#128532;";
        }
        if(results[1].label == "rock and roll"){
            document.getElementById("updateEmoji2").innerHTML="&#128548;";
        }
    }

}