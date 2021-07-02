const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index',
        home: './src/home',
        add_colaborador: './src/add_colaborador',
        modificar_colaborador: './src/modificar_colaborador',
        //editar: './src/editar',
        //eliminar: './src/eliminar',
        //crearUsuario: './src/crear-usuario'
     },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: [/.js$|.ts$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/typescript'
                        ]
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'src/images/'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        alias: {
            //'@scss': path.resolve(__dirname, '../src/styles/scss'),
            '@img': path.resolve(__dirname, '../src/images'),
            '@': path.resolve(__dirname, '../src')
        },
        
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.ts']
    },

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home Campaignid | Conaffex',
            template: './src/home.html',
            inject: true,
            chunks: ['home'],
            filename: 'home.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Conaffex | Añadir Colaborador',
            template: './src/add_colaborador.html',
            inject: true,
            chunks: ['add_colaborador'],
            filename: 'add_colaborador.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new HtmlWebpackPlugin({
            title: 'Conaffex | Modificar Colaborador',
            template: './src/modificar_colaborador.html',
            inject: true,
            chunks: ['modificar_colaborador'],
            filename: 'modificar_colaborador.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),
        new CopyWebpackPlugin([{
            from: './src/images',
            to: 'images'
        }]),       
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
          }),
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
}