import webpack from 'webpack';
import config from './';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const URI = `http://${HOST}:${PORT}`;

export default (app) => {
  config.entry.main.unshift('webpack-hot-middleware/client?reload=true');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  const devServer = {
    hot: true,
    publicPath: `${URI}${config.output.publicPath}`,
    noInfo: true,
    stats: {
      colors: true,
    },
  };

  app.use(webpackDevMiddleware(compiler, devServer));
  app.use(webpackHotMiddleware(compiler));
};
