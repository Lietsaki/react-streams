const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935, // starts on port 1935, we can stream to this port
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000, // we can then consume the stream in this port 
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();