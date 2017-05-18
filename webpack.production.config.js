var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname,'');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var fs = require('fs');
var packageDetails = JSON.parse(fs.readFileSync(path.join(__dirname,'package.json')));
const ver = packageDetails.ver;


const sassLoaders = [
 'css-loader?modules&sourceMap&importLoaders=1',
 'postcss-loader?includePaths[]=' + path.resolve(assetsPath+"/src")
];
module.exports = {
    entry :  {
        bundle : assetsPath +'/src/index.js',
        vendor :['react','lodash','react-dom','react-router','redux','react-router-redux','react-redux','jquery']
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js?ver='+ver, //
        path: assetsPath+'/dist'
    },
    postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      // add your "plugins" here
      // ...
      // and if you want to compress,
      // just use css-loader option that already use cssnano under the hood
      require("cssnano")(),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /.jsx?$/,
                loaders: ['babel'],
                include: [path.resolve(assetsPath+"/src")],

           }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader',sassLoaders.join('!'))
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool : 'eval',

    plugins: [
     new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js?ver='+ver),
    new ExtractTextPlugin("style.css?ver="+ver),
    new CopyWebpackPlugin([{from:'assets'}]),
    new webpack.optimize.UglifyJsPlugin(),
  ]

};
