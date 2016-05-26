var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '');
var CopyWebpackPlugin = require("copy-webpack-plugin");
var autoprefixer = require('autoprefixer');
var fs = require('fs');
var packageDetails = JSON.parse(fs.readFileSync(path.join(__dirname,'package.json')));
const ver = packageDetails.ver;

const sassLoaders = [
  'style-loader',
  'css-loader?modules&importLoaders=1',
  'postcss-loader?includePaths[]=' + path.resolve(assetsPath+"/src")
];
module.exports = {
    entry :  {
        bundle :  ['webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
           path.resolve(assetsPath,'./src/index.js')],
        vendor :['react','lodash','react-dom','react-router','redux','react-router-redux','react-redux','jquery']
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js?ver='+ver, //
        path: path.join(__dirname, assetsPath ,"dist/js/"),
        publicPath: 'http://localhost:8080/assets/'
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
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /.jsx?$/,
                loaders: ['react-hot','babel'],
                include: [path.resolve(assetsPath+'/src')]
                
           }, {
                test: /\.scss$/,
                loader: sassLoaders.join("!")
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool : 'source-map',
    
    plugins: [
     new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js?ver='+ver)
    ]

};