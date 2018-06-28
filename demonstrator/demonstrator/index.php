<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>RiPro - Smart Vehicle Identification Services - Demonstrator</title>
<body>
      
      <div class="fullscreen">

<style type="text/css">
.fullscreen {
    width:100%;
    height:100%;
    text-align:center;
}

#player, #canvas, #result {
    display: inline;
    position:relative;
    height:100%;
    width:60vw;
    z-index: 1;
}
#overlay {
    display: none;
    border:5px dashed white;
    vertical-align: middle;
    margin:5%;
    z-index: 10;
    position: relative; 
    width:60vw;
    height:90%;
    top: -567px; 
    margin-bottom: -500px;
}
#overlay p {
    color: white;
    height: 100%;
    text-shadow: 3px 3px #000;
    font-size: 25px;
    text-align: center;
    vertical-align: middle;
}
#result {
    font-size: 25px;
    display: none;
}
canvas, #testimg {
display: none;
}
</style>
          
<video id="player" autoplay></video>
<div id="overlay">
<p>Zentriere den Fahrzeugschein in dieses Feld...<br>Und klicke auf das Bild!</p>
</div>
<canvas id="canvas"></canvas>
<div id="result">Result</div>

<script>

  // const player = $("#player, #overlay");
  const player = document.getElementById('player');
  const overlay = document.getElementById('overlay');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
/*
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
*/

    var cw = Math.floor(canvas.width / 100);
    var ch = Math.floor(canvas.height / 100);

  const constraints = {
    video: true,
  };

  overlay.addEventListener('click', () => {
	$("#player").click();
  }); 
  player.addEventListener('click', () => {
    //context.drawImage(player, 0, 0, canvas.width, canvas.height);
    $("#overlay, #player").hide();
    $("#canvas").show();
/*
    canvas.width = cw;
    canvas.height = ch;
    console.log(canvas.clientWidth + " - " + canvas.clientHeight);
    console.log(cw + " - " + ch);
*/
    canvas.width=640;
    canvas.height=480;
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    // context.drawImage(player, 0, 0, cw, ch);
    // context.drawImage(player, 0, 0, canvas.clientWidth, canvas.clientHeight);
    //player.srcObject.getVideoTracks().forEach(track => track.stop());
    imageString = canvas.toDataURL();
    // console.log(imageString);

    imageJSON = JSON.stringify(imageString);
    callApi(imageJSON); 
  
    });

    
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      // Attach the video stream to the video element and autoplay.
      player.srcObject = stream;
    });
</script>


          
      </div>
      
      

    <script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="./require.js"></script>
<script type="text/javascript" src="./fzs.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.css" />
<link rel="stylesheet" href="./svis.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.js"></script>
<!-- <script type="text/javascript" src="./IM.min.js"></script> -->
    


</body>
</html>
