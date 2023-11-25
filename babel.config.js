// babel.config.js

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@containers": "./src/containers",
          "@modules": "./src/modules",
          "@scenes": "./src/scenes",
          "@utils": "./src/utils",
          "@screens": "./src/screens",
          "@assets": "./src/assets",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
        aloowUndefined: true,
      },
    ],
  ],
};