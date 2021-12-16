const getWebRTC = (setWebRTCData) => {
  console.log('1');
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;

  // compatibility for firefox and chrome
  let RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;

  // bypass naive webrtc blocking using an iframe
  if (!RTCPeerConnection) {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    frame.style.display = 'none';
    const win = frame.contentWindow;
    RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
  }
  console.log('2');

  // minimal requirements for data connection
  const mediaConstraints = {
    optional: [{ RtpDataChannels: true }]
  };

  const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  // construct a new RTCPeerConnection
  const pc = new RTCPeerConnection(servers, mediaConstraints);

  const ips = [];

  // listen for candidate events
  pc.onicecandidate = (ice) => {
    // skip non-candidate events
    if (ice.candidate) {
      const ip = ipRegex.exec(ice.candidate.candidate);
      if (ip !== null && ip.length > 1) {
        ips.push(ip[1]);
      }
    }
  };

  // create a bogus data channel
  pc.createDataChannel('');

  // create an offer sdp
  pc.createOffer((result) => {
    // trigger the stun server request
    pc.setLocalDescription(result, () => {}, () => {});
  }, () => {});

  const waitForElement = () => {
    if (pc.localDescription) {
      const lines = pc.localDescription.sdp.split('\n');
      lines.forEach((line) => {
        if (line.indexOf('a=candidate:') === 0) {
          const ip = ipRegex.exec(line);
          if (ip !== null && ip.length > 1) {
            ips.push(ip[1]);
            console.log(ips);
            formatWebRTC(setWebRTCData, [...new Set(ips)]);
          }
        }
      });
    } else {
      setTimeout(waitForElement, 100);
    }
  };

  waitForElement();
};

const formatWebRTC = (setWebRTCData, ips) => {
  console.log('3');

  console.log(ips);
  let localIP, ipv6IP, publicIP;
  for (let i = 0; i < ips.length; i++) {
    if (ips[i].match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
      localIP = ips[i];
      console.log(ips[i]);
    } else if (ips[i].match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
      ipv6IP = ips[i];
    } else {
      publicIP = ips[i];
    }
  }
  console.log(localIP);
  setWebRTCData([getItem('localIP', localIP), getItem('publicIP', publicIP), getItem('ipv6IP', ipv6IP)]);
};

const getItem = (name, value) => ({
  key: name,
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

export default getWebRTC;
