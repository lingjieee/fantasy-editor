#!/usr/bin/env node

/* eslint-disable */
const signale = require('signale');
const rimraf = require('rimraf');
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const babel = require('rollup-plugin-babel');
const { exec } = require('child_process');
const { dependencies = {}, peerDependencies = {} } = require('../package.json');
const svgr = require('@svgr/rollup').default;
const url = require('@rollup/plugin-url');
const postcss = require('rollup-plugin-postcss');
const less = require('less');

/* eslint-enable */
const makeExternalPredicate = externalArray => {
    if (!externalArray.length) {
        return () => false;
    }

    const pattern = new RegExp(`^(${externalArray.join('|')})($|/)`);

    return id => pattern.test(id);
};

const processLess = function(context, payload) {
    return new Promise(( resolve, reject ) => {
        less.render({
            file: context
        }, function(err, result) {
            if( !err ) {
                resolve(result);
            } else {
                reject(err);
            }
        });

        less.render(context, {})
            .then(function(output) {
                    // output.css = string of css
                    // output.map = string of sourcemap
                    // output.imports = array of string filenames of the imports referenced
                    if( output && output.css ) {
                        resolve(output.css);
                    } else {
                        reject({})
                    }
                },
                function(err) {
                    reject(err)
                });

    })
}

async function build() {
    // Clean
    rimraf.sync('lib');
    rimraf.sync('es');

    signale.success('Clean success');

    // Build cjs
    try {
        const cjsBundle = await rollup.rollup({
            input: 'src/index.tsx',
            plugins: [
                resolve({
                    browser: true,
                }),
                commonjs({
                    include: 'node_modules/**',
                    namedExports: {
                        'node_modules/react/index.js': [
                            'cloneElement',
                            'createContext',
                            'Component',
                            'createElement',
                        ],
                        'node_modules/react-dom/index.js': ['render', 'hydrate'],
                        'node_modules/react-is/index.js': [
                            'isElement',
                            'isValidElementType',
                            'ForwardRef',
                        ],
                    },
                }),
                typescript({
                    objectHashIgnoreUnknownHack: true,
                }),
                url(),
                svgr(),
                postcss({
                    extract: true,
                    minimize: true,
                    process: processLess,
                }),
                babel({
                    exclude: 'node_modules/**',
                    extensions: ['.ts', '.tsx'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                                targets: {
                                    node: 'current',
                                },
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-proposal-nullish-coalescing-operator',
                        'babel-plugin-dynamic-import-node',
                        ['inline-json-import', {}],
                    ],
                    runtimeHelpers: true,
                }),
            ],
            external: makeExternalPredicate([...Object.keys(dependencies), ...Object.keys(peerDependencies)]),
        });

        await cjsBundle.write({
            file: 'lib/index.js',
            format: 'cjs',
            exports: 'named',
        });
        signale.success('Build cjs success');
    } catch (error) {
        signale.error(error);
    }

    // Build esm
    try {
        const esmBundle = await rollup.rollup({
            input: 'src/index.tsx',
            plugins: [
                resolve({
                    browser: true,
                }),
                commonjs({
                    include: 'node_modules/**',
                    namedExports: {
                        'node_modules/react/index.js': [
                            'cloneElement',
                            'createContext',
                            'Component',
                            'createElement',
                        ],
                        'node_modules/react-dom/index.js': ['render', 'hydrate'],
                        'node_modules/react-is/index.js': [
                            'isElement',
                            'isValidElementType',
                            'ForwardRef',
                        ],
                    },
                }),
                url(),
                svgr(),
                postcss({
                    extract: true,
                    minimize: true,
                    process: processLess,
                }),
                typescript({
                    tsconfigOverride: {
                        compilerOptions: {
                            declaration: false,
                        },
                    },
                    objectHashIgnoreUnknownHack: true,
                }),
                babel({
                    exclude: 'node_modules/**',
                    extensions: ['.ts', '.tsx'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                                targets: {
                                    node: 'current',
                                },
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-proposal-nullish-coalescing-operator',
                        'babel-plugin-dynamic-import-node',
                        ['inline-json-import', {}],
                    ],
                    runtimeHelpers: true,
                }),
            ],
            external: makeExternalPredicate([...Object.keys(dependencies), ...Object.keys(peerDependencies)]),
        });

        await esmBundle.write({
            file: 'es/index.js',
            format: 'esm',
        });

        signale.success('Build esm success');
    } catch (error) {
        signale.error(error);
    }

    // Replace absolute paths to relative paths
    exec(`tscpaths -p ./tsconfig.cjs.json -s ./lib`, error => {
        if (error) {
            signale.error(error);
        }
    });
}

build();