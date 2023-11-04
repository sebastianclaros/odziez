# Proyecto de Ecommerce para el Colegio Labarden 

## Requirements

- Node.js and npm

## Localmente


```
npm install
```

Levantar el servicio local

```
npm run dev
```

Abrir http://localhost:3000 


```
.
├── _products         # Catalogo
├── public            # Static files
│   ├── assets
│   │   └── images
│   │       └── products # Imagenes
└── src
    ├── pages         # Next.js pages
    ├── styles        # CSS files
    └── templates     # templates
```

## Deploy a produccion

Localmente

```
$ npm run build
$ npm run start
```

Deploy optimizado:

```
npm run build-prod
```
### License

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.
