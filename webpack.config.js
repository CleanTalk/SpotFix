const path = require('path');

module.exports = [
    // Development build
    {
        mode: 'development',
        entry: './src/index.js',
        devtool: false,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'doboard-widget-bundle.js',
            library: {
                name: 'SpotFix',
                type: 'umd',
                export: 'default'
            },
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                }
            ]
        }
    },
    // Production build
    {
        mode: 'production',
        entry: './src/index.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'doboard-widget-bundle.min.js',
            library: {
                name: 'SpotFix',
                type: 'umd',
                export: 'default'
            },
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                }
            ]
        }
    }
];
