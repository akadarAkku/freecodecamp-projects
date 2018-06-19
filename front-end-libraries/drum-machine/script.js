function playAudio(e) {
  const element = e.target;
  const audio = element.querySelector("audio");
  setDisplay(element.getAttribute("id"));
  audio.play();
}

function setDisplay(text) {
  const display = document.querySelector(".drum__display");
  display.innerText = text;
}

function playAudioKey(id) {
  const audio = document.querySelector(`#${id}`);
  const element = audio.parentNode;
  setDisplay(element.getAttribute("id"));
  audio.play();
}

document.querySelectorAll(".drum__pad").forEach(item => {
  item.addEventListener("click", playAudio);
});

document.addEventListener("keypress", e => {
  switch (e.key.toLowerCase()) {
    case "q":
      playAudioKey("Q");
      break;
    case "w":
      playAudioKey("W");
      break;
    case "e":
      playAudioKey("E");
      break;
    case "a":
      playAudioKey("A");
      break;
    case "s":
      playAudioKey("S");
      break;
    case "d":
      playAudioKey("D");
      break;
    case "z":
      playAudioKey("Z");
      break;
    case "x":
      playAudioKey("X");
      break;
    case "c":
      playAudioKey("C");
      break;
    default:
      break;
  }
});
