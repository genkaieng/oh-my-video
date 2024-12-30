import http from 'node:http';
import { command } from './command';

const hostname = '127.0.0.1';

export function start(port = 8080) {
  const server = http.createServer(async (req, res) => {
    const url = req.url ? new URL(req.url, 'http://' + hostname) : undefined;

    switch(url?.pathname) {
      case '/': {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'Oh My Video!'
        }));
        break;
      }
      case '/videos': {
        const pageUrl = url.searchParams.get('url');
        if (!pageUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'GET: /videos?url=<url>',
          }));
          break;
        }
        const result = await command(pageUrl);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        break;
      }
      default: {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found'}));
        break;
      }
    }
  });

  return server.listen(port, () => {
    console.log(`Server listening on port http://${hostname}:${port}`)
  });
}
