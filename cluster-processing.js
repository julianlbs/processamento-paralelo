import cluster from 'node:cluster';
import http from 'node:http';
import {
    cpus
} from 'node:os';
import process from 'node:process';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const numCPUs = cpus().length;

// let json_file = [];


fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(json => {
    json.forEach(element => {
        // Salva cada comentário como um arquivo JSON individual.
        fs.writeFile(`./json-files/${element.id}.json`, JSON.stringify(element), function (err, result) {
            if (err) console.log('error', err);
        });
    });

    // Lê os arquivos JSON e os transforma em XML
    const jsonFiles = fs.readdirSync('./json-files').forEach(file => {
        const jsonData = fs.readFileSync(`./json-files/${file}`);
        // console.log(jsonData);
        // fs.writeFileSync(`./xml-files/${jsonData.id}`)
    })
});

// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);

//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case it is an HTTP server
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('hello world\n');
//     }).listen(8000);

//     console.log(`Worker ${process.pid} started`);
//     // process.exit(0);
// }