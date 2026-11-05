const introVideo = document.querySelector(".intro-video");

if (introVideo instanceof HTMLVideoElement) {
  const tryPlayingVideo = () => {
    if (!introVideo.paused) {
      return;
    }

    introVideo.play().then(
      () => {
        delete introVideo.dataset.autoplayBlocked;
        document.removeEventListener("pointerdown", tryPlayingVideo);
        document.removeEventListener("keydown", tryPlayingVideo);
      },
      () => {
        introVideo.dataset.autoplayBlocked = "true";
      },
    );
  };

  tryPlayingVideo();
  document.addEventListener("pointerdown", tryPlayingVideo);
  document.addEventListener("keydown", tryPlayingVideo);
}
