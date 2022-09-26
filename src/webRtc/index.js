const getIPAddress = (sdp) => {
  const blocked = '0.0.0.0'
  const candidateEncoding = /((udp|tcp)\s)((\d|\w)+\s)((\d|\w|(\.|:))+)(?=\s)/gi
  const connectionLineEncoding = /(c=IN\s)(.+)\s/gi
  const connectionLineIpAddress = (
    (sdp.match(connectionLineEncoding) || [])[0] || ''
  )
    .trim()
    .split(' ')[2]
  if (connectionLineIpAddress && connectionLineIpAddress !== blocked) {
    return connectionLineIpAddress
  }
  const candidateIpAddress = (
    (sdp.match(candidateEncoding) || [])[0] || ''
  ).split(' ')[2]
  return candidateIpAddress && candidateIpAddress !== blocked
    ? candidateIpAddress
    : undefined
}

export default async function getWebRTCData() {
  return new Promise((resolve) => {
    if (!window.RTCPeerConnection) {
      resolve(null)
    }

    const config = {
      iceCandidatePoolSize: 1,
      iceServers: [
        {
          urls: [
            'stun:stun4.l.google.com:19302?transport=udp',
            'stun:stun3.l.google.com:19302?transport=udp',
          ],
        },
      ],
    }

    const connection = new RTCPeerConnection(config)
    connection.createDataChannel('')

    connection.setLocalDescription()

    const giveUpOnIPAddress = setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      connection.removeEventListener('icecandidate', computeCandidate)
      connection.close()
      return resolve(null)
    }, 2000)

    const computeCandidate = (event) => {
      const { candidate } = event.candidate || {}

      if (!candidate) {
        return null
      }

      const { sdp } = connection.localDescription || {}
      const address = getIPAddress(sdp)
      if (!address) {
        return null
      }

      connection.removeEventListener('icecandidate', computeCandidate)
      clearTimeout(giveUpOnIPAddress)
      connection.close()
      return resolve(address)
    }

    connection.addEventListener('icecandidate', computeCandidate)
  })
}
