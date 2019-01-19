module.exports = class Trie {

    constructor(){
        this.children = {};
        this.isWord = false;
    }

    insert(word) {
        let current_node = this;
        for (let i = 0; i < word.length; i++) {
            let char = word[i]
            //if character is not in the trie already, add it
            if (!(char in current_node.children)) {
                current_node.children[char] = new Trie();
            }
            //update current_node
            current_node = current_node.children[char];
        };

        //after adding all the chars of the word,
        //you are at the end of a word
        current_node.isWord = true;
    }

    getNode(word) {
        //start at the root
        let current_node = this;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            //if the word's character isn't a child of the current_node,
            //the word isn't in the trie
            if (!(char in current_node.children)) {
                return;
            }
            //move down the trie, update current_node
            current_node = current_node.children[char];
        };
        return current_node;
    }

    search(word) {
        const fork = (n, w) => {
            const child = c => {
                return fork(n.children[c], w + c);
            }

            n.isWord && words.push(w);
            return Object.keys(n.children).some(child);
        }

        const words = [],
            current_node = this.getNode(word);

        if (current_node) {
            fork(current_node, word);
            return words;
        }
    }
}