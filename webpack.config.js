const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/ClientApp/index.tsx',
    // devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', // Add this line
                ]
            },
            {
                test: /three\/examples\/js/,
                use: 'imports-loader?THREE=three'
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            'three-examples': path.join(__dirname, './node_modules/three/examples/jsm')
        },
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'Source/[name].js',
        publicPath: process.env.PUBLIC_PATH,
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/ClientApp/index.html',
            filename: 'index.html',

        }),
        new CopyPlugin({
            patterns: [
                { from: "node_modules/@mediapipe/face_mesh", to: "Source/Providers/face_mesh" },
                {
                    from: "src/Assets/*.ico",
                    to ({ context, absoluteFilename })
                    {
                        return "[name][ext]";
                    }
                },
                {
                    from: "src/Assets",
                    to: "Assets"
                },

            ],
        })
    ],
    devServer: {
        https: true,
        devMiddleware: {
            writeToDisk: true,
            mimeTypes: {
                'js': 'application/javascript',
                'wasm': 'application/wasm',
            }
        },
        static: {
            directory: path.join(__dirname, 'golden'),
        },
        client: {
            overlay: false,
        },
        historyApiFallback: {
            rewrites: [
              { from: /./, to: '/index.html' }
            ]
          },
    },
};
