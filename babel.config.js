module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@command": "./src/command",
          "@framework": "./src/framework",
          "@query": "./src/query",
          "@valueObjects": "./src/valueObjects",
        },
      },
    ],
  ],
};
