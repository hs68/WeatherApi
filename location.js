const fs=require("fs");
const http = require("http");
//const { chdir } = require("process");
const requests=require("requests");

const homefile=fs.readFileSync("home.html",'utf8');

const replace1=(tempdata,val)=>{
    let temperature=tempdata.replace("{%name%}",val.name);
    temperature=temperature.replace("{%temp_min%}",val.main.temp_min);
    temperature=temperature.replace("{%temp_max%}",val.main.temp_max);
    temperature=temperature.replace("{%temp%}",val.main.temp);
    return temperature;

};
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        //const file = fs.writeFile('home.html');
        requests('http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=7eef9ff479be2b4760bebd6dfe95c0ce')
            .on('data', function (chunk) {
                const objdata=JSON.parse(chunk);
                const arraydata=[objdata];
                console.log(arraydata);
                const realtime=arraydata.map((val)=>replace1(homefile,val)).join("");
                res.write(realtime);
                console.log(realtime);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                console.log('end');
            });
    }
});

server.listen(8080);
