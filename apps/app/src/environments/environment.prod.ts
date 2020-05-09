export const environment = {
  production: true,
  i18n: {
    languages: ['en', 'fr'],
    defaultLanguage: 'en'
  },
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
  }
};
