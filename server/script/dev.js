const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const {spawn} = require('child_process');

const SERVER_ROOT = path.resolve(__dirname, '..');
const DEFAULT_UPLOAD_DIR = path.join(os.homedir(), 'Documents', 'upload');

function readPort(name, fallback) {
  const rawValue = process.env[name];
  if (!rawValue) return fallback;

  const port = Number.parseInt(rawValue, 10);
  if (Number.isInteger(port) && port > 0 && port < 65536) {
    return port;
  }

  throw new Error(`${name} must be a valid port number, received: ${rawValue}`);
}

const serverPort = readPort('BABYLIFE_SERVER_PORT', 20000);
const filePort = readPort('BABYLIFE_FILE_SERVER_PORT', 11000);
const uploadDir = path.resolve(process.env.BABYLIFE_UPLOAD_DIR || DEFAULT_UPLOAD_DIR);
const fileHost = process.env.BABYLIFE_FILE_HOST || `http://127.0.0.1:${filePort}/`;

const mimeTypes = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8'
};

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(message);
}

function resolveRequestPath(req) {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const requestPath = decodeURIComponent(url.pathname);
  const resolvedPath = path.resolve(uploadDir, `.${requestPath}`);
  const uploadRoot = `${uploadDir}${path.sep}`;

  if (resolvedPath !== uploadDir && !resolvedPath.startsWith(uploadRoot)) {
    return null;
  }

  return resolvedPath;
}

function createFileServer() {
  fs.mkdirSync(uploadDir, {recursive: true});

  return http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      sendText(res, 405, 'Method Not Allowed');
      return;
    }

    let filePath;
    try {
      filePath = resolveRequestPath(req);
    } catch (err) {
      sendText(res, 400, 'Bad Request');
      return;
    }

    if (!filePath) {
      sendText(res, 403, 'Forbidden');
      return;
    }

    fs.stat(filePath, (statErr, stat) => {
      if (statErr || !stat.isFile()) {
        sendText(res, 404, 'Not Found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin': '*'
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      fs.createReadStream(filePath).pipe(res);
    });
  });
}

function startApiServer() {
  return spawn(process.execPath, ['development.js'], {
    cwd: SERVER_ROOT,
    stdio: 'inherit',
    env: {
      ...process.env,
      BABYLIFE_SERVER_PORT: String(serverPort),
      BABYLIFE_UPLOAD_DIR: uploadDir,
      BABYLIFE_FILE_HOST: fileHost
    }
  });
}

let shuttingDown = false;
let apiProcess;
let fileServer;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  if (apiProcess && !apiProcess.killed) {
    apiProcess.kill();
  }

  if (fileServer) {
    fileServer.close(() => {
      process.exit(exitCode);
    });
    return;
  }

  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

fileServer = createFileServer();
fileServer.listen(filePort, '127.0.0.1', () => {
  console.log(`File server: ${fileHost}`);
  console.log(`Upload dir:  ${uploadDir}`);
});

fileServer.on('error', err => {
  console.error('Failed to start file server:', err.message);
  shutdown(1);
});

apiProcess = startApiServer();
apiProcess.on('exit', (code, signal) => {
  if (shuttingDown) return;

  if (signal) {
    console.error(`API server exited with signal ${signal}`);
    shutdown(1);
    return;
  }

  if (code !== 0) {
    console.error(`API server exited with code ${code}`);
    shutdown(code || 1);
    return;
  }

  shutdown(0);
});
