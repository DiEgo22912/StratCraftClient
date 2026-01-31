#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const workspace = __dirname;
const dist = path.join(workspace, 'dist');
const version = process.argv[2];
const repo = process.env.GITHUB_REPOSITORY || 'OWNER/StratCraftClient';

if (!version) {
    console.error('Usage: node fix-manifest.js <version>');
    process.exit(2);
}

if (!fs.existsSync(dist)) {
    console.error('dist/ directory not found');
    process.exit(1);
}

const files = fs.readdirSync(dist);
const zipName = files.find(f => f.toLowerCase().endsWith('.zip'));
if (!zipName) {
    console.error('No zip file found in dist/');
    process.exit(1);
}
const zipPath = path.join(dist, zipName);
const data = fs.readFileSync(zipPath);
const sha512 = crypto.createHash('sha512').update(data).digest('base64');
const size = data.length;

let manifest = {};
const manifestPath = path.join(dist, 'client-manifest.json');
const examplePath = path.join(workspace, 'manifest.example.json');
if (fs.existsSync(manifestPath)) manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
else if (fs.existsSync(examplePath)) manifest = JSON.parse(fs.readFileSync(examplePath, 'utf8'));
else manifest = {};

manifest.version = version;
manifest.type = 'archive';
manifest.archive = {
    url: `https://github.com/${repo}/releases/download/${version}/${zipName}`,
    sha512: sha512,
    size: size
};
manifest.published = new Date().toISOString();

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Wrote', manifestPath);
console.log(`zip: ${zipName}  size: ${size}  sha512: ${sha512}`);
