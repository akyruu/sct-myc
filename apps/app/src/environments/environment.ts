export const environment = {
  production: false,
  assets: {
    folder: '../assets',
    icons: {
      folder: 'icons',
      svg: ['harvest', 'ore', 'pickaxe', 'ship', 'theme']
    },
    themes: {
      folder: 'themes',
      values: { 'argo-mole': 'Argo Mole', 'prospector': 'Prospector' }
    }
  },
  i18n: {
    languages: ['en', 'fr'],
    defaultLanguage: 'en'
  },
  socket: {
    config: {
      url: 'http://localhost:3333',
      options: {
        autoConnect: false, // True
        reconnectionAttempts: 5 // Infinity
      }
    }
  }
};
