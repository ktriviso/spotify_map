// feeding this into the spotify web api node package
// link: https://github.com/thelinmichael/spotify-web-api-node

const config = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/spotify-callback/',
  scopes: [
    'user-read-currently-playing',
    'ugc-image-upload',
    'user-read-playback-state',
    'playlist-modify-public',
    'user-modify-playback-state',
    'streaming',
    'playlist-read-private',
    'user-library-read',
    'user-read-private',
    'user-top-read',
    'user-read-recently-played',
    'user-read-email',
    'playlist-read-collaborative'
  ]
}

module.exports.config = config
