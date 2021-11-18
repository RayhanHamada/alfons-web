// const withAntdLess = require('next-plugin-antd-less');
const withLess = require('next-with-less');

/** @type {import('next').NextConfig} */
module.exports = withLess({}, { reactStrictMode: true });
