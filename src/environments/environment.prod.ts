export const environment = {
  production: true,
  spotify: {
    auth: {
      clientId: '09b24f2eda9e45d3a815f95d88a129e1',
      authorizeUrl: 'https://accounts.spotify.com/authorize',
      callbackUrl: 'https://visionplayer.danielzamorano.pro/auth'
    }
  },
  unsplash: {
    baseUrl: 'https://photo.danielzamorano.pro',
    endpoints: {
      collection: '/collection'
    }
  }
};
