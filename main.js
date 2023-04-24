function aud() {
  var audioCtx = new AudioContext();
  audioCtx.onstatechange = (e) => {
    console.log(e, audioCtx.state);
    print("开始播放");
  };
  // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
  var oscillator = audioCtx.createOscillator();
  // 把音量，音调和终节点进行关联
  oscillator.connect(audioCtx.destination);
  // 指定音调的类型，其他还有square|triangle|sawtooth
  oscillator.type = "sine";
  // 设置当前播放声音的频率，也就是最终播放声音的调调
  oscillator.frequency.value = 987.77;
  // 音调从当前时间开始播放
  oscillator.start();
  oscillator.addEventListener("ended", (e) => {
    console.log(e);
    print("播放结束");
  });
  // 1秒后完全停止声音
  oscillator.stop(audioCtx.currentTime + 1);
}

window.play = function () {
  print("第一次播放");
  aud();
  setTimeout(() => {
    // playSamples(1, 1, 0, 0, music);
    aud();
    print("第二次播放 5s");
  }, 5000);
};

function print(msg) {
  const d = document.getElementById("log");
  d.innerText += msg + "\n";
}
