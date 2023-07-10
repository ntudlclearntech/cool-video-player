process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackConfigProd = require('react-scripts/config/webpack.config')('production');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

// optional - pushing progress-bar plugin for better feedback;
//    It can and will work without progress-bar,
//    but during build time you will not see any messages for 10-60 seconds
//    and decide that compilation is kind of hang up on you;
//    progress bar shows nice progression of webpack compilation
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const green = text => chalk.green.bold(text);
webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  }),
);

webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
