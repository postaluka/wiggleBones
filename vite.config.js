import Inspect from 'vite-plugin-inspect'
import path from 'path'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    plugins: [
        Inspect()
    ],
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            }
        },
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}