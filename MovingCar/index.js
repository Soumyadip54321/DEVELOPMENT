var audio = new Audio('sound.mp3');
audio.play().catch(()=>console.log('cannot play audio'));