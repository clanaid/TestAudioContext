console.log("hello");
// const w1 = new Worker("./worker1.js");
// const w2 = new Worker("./worker2.js");

// w1.onmessage = (e) => {
//   if (e.data === "init") {
//     w2.postMessage("conn", [e.ports[0]]);
//   }
// };

// w1.postMessage("init");

// zzfxR - global sample rate
const zzfxR = 44100;
// zzfxV - global volume
const zzfxV = 0.3;

/** 播放和设置音频
 *  @param {Array}   音频数据
 *  @param {Number}  [volume=1] - 音量
 *  @param {Number}  [rate=1] - 播放速度
 *  @param {Number}  [pan=0] - 立体音频播放使用数
 *  @param {Boolean} [loop=0] - 循环
 *  @return {AudioBufferSourceNode} - 音频节点
 *  @memberof Audio */
function playSamples(
  volume = 1,
  rate = 1,
  pan = 0,
  loop = 0,
  ...sampleChannels
) {
  // 创建音频上下文
  const audioContext = new (window.AudioContext || webkitAudioContext)();

  // 创建一个缓存和一个数据源
  const buffer = audioContext.createBuffer(
      sampleChannels.length,
      sampleChannels[0].length,
      zzfxR
    ),
    source = audioContext.createBufferSource();

  // 将数据源复制到缓存，放到数据源里，并设置数据源
  sampleChannels.forEach((c, i) => buffer.getChannelData(i).set(c));
  source.buffer = buffer;
  source.playbackRate.value = rate;
  source.loop = loop;

  // 创建音频相关节点
  source
    // .connect(new StereoPannerNode(audioContext, {'pan':clamp(pan, 1, -1)}))
    // .connect(new GainNode(audioContext, {'gain':soundVolume*volume}))
    .connect(audioContext.destination);

  source.start();

  return source;
}
// 摘抄zzfxM源码的解析函数
const zzfxG = (
  q = 1,
  k = 0.05,
  c = 220,
  e = 0,
  t = 0,
  u = 0.1,
  r = 0,
  F = 1,
  v = 0,
  z = 0,
  w = 0,
  A = 0,
  l = 0,
  B = 0,
  x = 0,
  G = 0,
  d = 0,
  y = 1,
  m = 0,
  C = 0
) => {
  let b = 2 * Math.PI,
    H = (v *= (500 * b) / zzfxR ** 2),
    I = ((0 < x ? 1 : -1) * b) / 4,
    D = (c *= ((1 + 2 * k * Math.random() - k) * b) / zzfxR),
    Z = [],
    g = 0,
    E = 0,
    a = 0,
    n = 1,
    J = 0,
    K = 0,
    f = 0,
    p,
    h;
  e = 99 + zzfxR * e;
  m *= zzfxR;
  t *= zzfxR;
  u *= zzfxR;
  d *= zzfxR;
  z *= (500 * b) / zzfxR ** 3;
  x *= b / zzfxR;
  w *= b / zzfxR;
  A *= zzfxR;
  l = (zzfxR * l) | 0;
  for (h = (e + m + t + u + d) | 0; a < h; Z[a++] = f)
    ++K % ((100 * G) | 0) ||
      ((f = r
        ? 1 < r
          ? 2 < r
            ? 3 < r
              ? Math.sin((g % b) ** 3)
              : Math.max(Math.min(Math.tan(g), 1), -1)
            : 1 - (((((2 * g) / b) % 2) + 2) % 2)
          : 1 - 4 * Math.abs(Math.round(g / b) - g / b)
        : Math.sin(g)),
      (f =
        (l ? 1 - C + C * Math.sin((2 * Math.PI * a) / l) : 1) *
        (0 < f ? 1 : -1) *
        Math.abs(f) ** F *
        q *
        zzfxV *
        (a < e
          ? a / e
          : a < e + m
          ? 1 - ((a - e) / m) * (1 - y)
          : a < e + m + t
          ? y
          : a < h - d
          ? ((h - a - d) / u) * y
          : 0)),
      (f = d
        ? f / 2 +
          (d > a ? 0 : ((a < h - d ? 1 : (h - a) / d) * Z[(a - d) | 0]) / 2)
        : f)),
      (p = (c += v += z) * Math.sin(E * x - I)),
      (g += p - p * B * (1 - ((1e9 * (Math.sin(a) + 1)) % 2))),
      (E += p - p * B * (1 - ((1e9 * (Math.sin(a) ** 2 + 1)) % 2))),
      n && ++n > A && ((c += w), (D += w), (n = 0)),
      !l || ++J % l || ((c = D), (v = H), (n = n || 1));
  return Z;
};
// 示例的打击声音
const music = zzfxG(...[, , 333, 0.01, 0, 0.9, 4, 1.9, , , , , , 0.5, , 0.6]);
window.play = function () {
  playSamples(1, 1, 0, 0, music);
  print("第一次播放");
  setTimeout(() => {
    playSamples(1, 1, 0, 0, music);
    print("第二次播放");
  }, 2000);
};

function print(msg) {
  const d = document.getElementById("log");
  d.innerText += msg + "\n";
}
