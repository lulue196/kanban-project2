# Ubuntu VM deployment guide

Use a VM with public IP (AWS EC2, DigitalOcean Droplet, Azure VM, Oracle VM, etc.). A cloud account may require payment or a verified card. Do **not** use Vercel or GitHub Pages for the final app.

1. Provision Ubuntu 24.04 VM; allow SSH (22) only from your IP and HTTP (80) from the public internet.
2. Install Node.js 22 LTS, npm, MongoDB Community Server, nginx, and git according to the official documentation for your Ubuntu release. MongoDB must be bound to localhost only, not public port 27017.
3. Clone **your own new Project 2 repository** to the VM and `cd` into it.
4. `npm ci` if lockfile is committed; otherwise `npm install`.
5. `cp .env.example .env.local` and configure local MongoDB URI and DB name.
6. `npm run build`
7. Run the app under a process manager such as systemd or pm2: `npm run start` on port 3000.
8. Configure nginx to reverse proxy port 80 to `http://127.0.0.1:3000`.
9. Test all three entities' CRUD from the public URL and refresh to verify MongoDB persistence.
10. Capture screenshots and the 5-minute demo, then submit GitHub + working deployment + unlisted YouTube URL.

### Example nginx site
```
server {
  listen 80;
  server_name _;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Security note
This starter has no login protection. Do not expose personal data or production secrets. Restrict access and implement authentication and validation before wider deployment. If using a public domain, enable HTTPS.
