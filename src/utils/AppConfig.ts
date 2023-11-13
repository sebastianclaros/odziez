require('dotenv').config();

export const AppConfig = {
  site_name: 'Starter',
  title: 'Odziez',
  description: 'Tienda Odziez',
  url: 'https://www.odziez.ar',
  locale: 'es',
  categories: ['Deportivo', 'Futurista'],
  author: 'Colegio Labarden',
  whatsapp: '+5491124058894',
  pagination_size: 5,
  mapKey: process.env.MAP_KEY
};
