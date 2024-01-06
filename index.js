const server = require("./server");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
console.log(process.env.TEST); // Logs: 123