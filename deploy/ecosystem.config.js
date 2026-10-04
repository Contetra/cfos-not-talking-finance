// Add this entry to the PM2 ecosystem file on the VPS, then run `pm2 start ecosystem.config.js --only contetra-cfos-not-talking-finance` once.
module.exports = {
  apps: [
    {
      name: "contetra-cfos-not-talking-finance",
      script: "node_modules/.bin/next",
      args: "start -p 3003",
      cwd: "/home/deploy/apps/contetra-cfos-not-talking-finance/current",
      instances: 2,
      exec_mode: "cluster",
      node_args: "--max-old-space-size=1024",
      max_memory_restart: "1200M",
      watch: false,
      env: { NODE_ENV: "production", PORT: 3003 },
    },
  ],
};
