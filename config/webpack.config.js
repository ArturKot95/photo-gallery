import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  entry: path.resolve(__dirname, '..', 'client', 'index.js'),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
  },
  devServer: {
    port: process.env.CLIENT_PORT || 3000,
  },
  resolve: {
    alias: {
      client: path.resolve(__dirname, '..', 'client'),
      components: path.resolve(__dirname, '..', 'client', 'components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  tailwindcss('./config/tailwind.config.cjs'),
                  autoprefixer,
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'Photo Gallery for Workate',
        template: 'client/index_template.html',
      },
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: 'styles.css',
      })
    ),
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_PORT: process.env.SERVER_PORT,
      },
    }),
  ],
};
