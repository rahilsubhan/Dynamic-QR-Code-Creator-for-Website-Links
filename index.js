import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));


var url = '';
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
    // res.sendFile(__dirname + "/styles.css");
});


app.post('/submit',(req,res)=>{
  url = req.body['urll'];
  res.sendFile(__dirname + "/index.html");
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream('qr-img.png'));

  fs.writeFile('url.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); 
});



  
app.listen(3000,()=>{
  console.log('listening at port 3000');
});

