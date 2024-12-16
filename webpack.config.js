const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const outputDir = path.resolve(__dirname, "dist");

  return {
    entry: {
      main: "./src/js/theme-script.js",
      styles: "./src/style.scss",
      "style-editor": "./src/style-editor.scss",
    },
    output: {
      filename: "[name].js",
      path: outputDir,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                api: "modern",
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new RemovePlugin({
        after: {
          include: [
            path.join(outputDir, "styles.js"),
            path.join(outputDir, "style-editor.js"),
          ],
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/js/SplitText.min.js", to: "SplitText.min.js" },
          { from: "src/js/DrawSVGPlugin.min.js", to: "DrawSVGPlugin.min.js" },
        ],
      }),
    ],
    devtool: isProduction ? false : "inline-source-map",
  };
};
