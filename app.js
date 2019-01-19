const Trie = require('./Util/Trie');
const trie = new Trie();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const readFile = require('./Util/loadData');

const PORT = process.env.PORT || 5000;

(read = async () => {
    try{
        let data = await readFile();
        data = data.replace(/\n|\r/g, ',');
        data = data.split(',');
        data.forEach(fc => {
            trie.insert(fc);
        });
    } catch(err){
        console.log(err);
    }
})()

app.get('/:name', (req, res) => {
    const name = req.params.name;
    let resData = [];
    if(name.length >= 3){
        resData = trie.search(name);
    }
    res.json({data: resData});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));