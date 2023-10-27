const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // This webpack plugin generates the html file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),
      // InjectManifest will inject the custom service worker from src-sw.js
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // WebpackPwaManifest will generate our manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        // This injects the manifest.json file into the html file
        inject: true,
        name: 'Text Editor',
        short_name: 'Text Editor',
        // This sets the path to our index.html file
        start_url: '/',
        // This sets the path to our assets
        publicPath: '/',
        description: 'A simple text editor application to write anything you want!',
        background_color: '#d2b48c',
        theme_color: '#d2b48c',
        // This will add the icons to the manifest.json files
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // These are the CSS loaders that will be used to load CSS files
        // Will match files that end in .css
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Will match any file that ends in .js or .mjs
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel loader will change js code to be compatible with older browsers
          use: {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
