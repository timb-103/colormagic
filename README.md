[![ColorMagic banner](./.github/assets/banner.png)](https://colormagic.app)

# 🎨 [ColorMagic - Color palette generator](https://colormagic.app)

ColorMagic is a free and open-source color palette generator, with many side-tools for all things color. It's built with [nuxt](https://nuxt.com)and typescript.

Most of the tools run with the assitance of AI using [openai](https://openai.com).

The has translations for [english](https://colormagic.app), [japanese](https://colormagic.app/ja) and [italian](https://colormagic.app/it) using [nuxtjs/i18n](https://i18n.nuxtjs.org/).

## <a name="structure">🏗️ Structure</a>

ColorMagic utilize Nuxt's in-built layers system to seperate domains of the app. 

Each layer creates it's own seperate module ([example](/layers/palette/server/palette.module.ts)) which we then declare in the [setup util](/layers/setup/server/utils/setup.util.ts). The modules are then available to use globally.

## <a name="database">📦 Database</a>

ColorMagic is built with MongoDB. You can setup a local mongoDB instance by using the following docker:

```bash
docker compose up
```

For more details check out the [mongo layer](/layers/mongo/server/mongo.module.ts).

## <a name="getting-started">🚀 Getting Started</a>
Create a .env in the root of the project and add the following values:
```env
OPENAI_API_KEY=[sk_srf4s...]
SITE_URL=http://localhost.com
API_URL=http://localhost:3000/api
```

Use the following command to start it up locally
```bash
npm install
npm run dev
```

## <a name="color-tools">🔧 Color Tools</a>

- 🎨 [Color Palette Generator](https://colormagic.app/)
- ❓ [Random Color generator](https://colormagic.app/random-color)
- 🖼️ [Image Color Picker](https://colormagic.app/image-color-picker)

This is a WIP, more tools coming soon!

## <a name="api">🖥️ API</a>

ColorMagic has a public API that anyone can use free of charge. 

We use the awesome [@tanstack/vue-query](https://github.com/TanStack/query) for all API calls and [@sinclair/typebox](https://github.com/sinclairzx81/typebox) to validate on the server.

- 🎨 [Color Palette Generator](https://colormagic.app/)
- ❓ [Random Color generator](https://colormagic.app/random-color)
- 🖼️ [Image Color Picker](https://colormagic.app/image-color-picker)

This API may be removed or changed at anytime, without warning. Use at your own risk.

## <a name="contribute">❤️ Contribute</a>

Feel free to suggest fixes or help with new features!
