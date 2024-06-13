import DPlayer from 'dplayer';
import Hls from 'hls.js';


// const dp = new DPlayer({
//     container: document.getElementById('dplayer'),
//     video: {
//         // url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
//     },
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const dp = new DPlayer({
//         container: document.getElementById('dplayer'),
//         video: {
//             url: 'https://super.ffzy-online6.com/20230812/16585_18320fa7/index.m3u8',
//             type: 'customHls'
//         },
//         pluginOptions: {
//             customHls: function (video, player) {
//                 if (Hls.isSupported()) {
//                     const hls = new Hls();
//                     hls.loadSource(video.src);
//                     hls.attachMedia(video);
//                 } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//                     video.src = video.src;
//                 }
//             }
//         }
//     });
// });

const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'https://super.ffzy-online6.com/20230812/16585_18320fa7/index.m3u8',
        type: 'customHls',
        customType: {
            customHls: function (video, player) {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
            },
        },
    },
});