//change the const apiUrl in ./src/service/api_calls.js from localhost to the IP address of the server from process.env.PUBLIC_IP
import { readFileSync, writeFileSync } from "fs";
(() => {
    const publicIp = process.env.PUBLIC_IP;
    const filePath = "./src/service/api_calls.js";
    const file = readFileSync(filePath, "utf-8");
    //replace the line with const public_ip = "" with public_ip = publicIp var from here
    const newFile = file.replace(
        /const public_ip = "";/,
        `const public_ip = "${publicIp}";`
    );
    writeFileSync(filePath, newFile);
})();
