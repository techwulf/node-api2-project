const server = require('./api/server');

server.listen(4000, () => {
  console.log(
    `╔═══════════════════════════════╗\n`+
    `║  Server running on port 4000  ║\n`+
    `╚═══════════════════════════════╝`
  );
});
