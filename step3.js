const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
    
        catWrite(data, out)
    })
}


async function webCat(path, out) { 
    try {
        const { data } = await axios.get(path)
        catWrite(data, out)
    } catch(err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}


function catWrite(data, out) {
    if (out) {
        fs.writeFile(out, data, "utf8", function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`)
            }
        })
    } else {
        console.log(data)
    }
 }

 let path;
 let out;

if (process.argv[2] == '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2]
}

if (path.slice(0,4) == 'http') {
    webCat(path, out)
} else {
    cat(path, out)
}