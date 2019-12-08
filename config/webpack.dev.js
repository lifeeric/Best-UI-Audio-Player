const path = require('path');

module.exports = {
    entry: ["./src/main.js"],
    mode: "development",
    output: {
        filename: '[name]-bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, '../dist')
    },

    // Development Server

    devServer: {
        overlay: true,
        contentBase: 'dist'
    },


    // For Loader of CSS, HTML, FILE
    module: {
        rules: [

            // for SASS, SCSS, CSS,
            {
                test: /\.s(as|cs)s$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },

            // For HTML
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },

            // For Images

            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },

            // for js file

            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },

            // for audio

            {
                test: /\.(mp3|wav)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'sounds/[name].[ext]',
                        }
                    }
                ]
            },

            // for fonts

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ]
    }
}