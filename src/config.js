const lhost = "http://localhost:";
const reactPort = "3000";
const reactFullPort = lhost + reactPort;
const expressPort = "3001";
const expressFullPort = lhost + expressPort;
const apiUrl = expressFullPort + "/api";

module.exports = {
    reactPort,
    expressPort,
    apiUrl,
}