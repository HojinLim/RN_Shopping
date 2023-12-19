// babel.config.js

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
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
          "@": "./",
          "@components": "./components",
          "@containers": "./containers",
          "@modules": "./modules",
          "@scenes": "./scenes",
          "@utils": "./utils",
          "@screens": "./screens",
          "@assets": "./assets",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env.local",
        safe: false,
        aloowUndefined: true,
      },
    ],
  ],
};
