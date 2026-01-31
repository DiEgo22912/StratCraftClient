#!/usr/bin/env node
// Run assembled Forge client for testing (offline username)
// Usage: node run-client-test.js <versionId> <username> [serverAddress]

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const crypto = require('crypto');

