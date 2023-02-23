magic = "";
wavin = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songplaying = "";

function preload(){
    magic = loadSound("MagicInTheAir.mp3");
    wavin = loadSound("WavinFlag.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    songplaying = magic.isPlaying();
    console.log(songplaying);
    if(scoreLeftWrist > 0.1){
        circle(leftWristX, leftWristY, 20);
        wavin.stop();
        if(songplaying = 'false'){
            magic.play();
            document.getElementById("song").innerHTML = "Now Playing Magic In The Air";
    }
}
}

function modelLoaded(){
    console.log("Posenet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);

    }
}