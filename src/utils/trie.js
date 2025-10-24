import { useEffect, useState } from 'react';
import useWordList from './useWordList';

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    const results = [];
    this.#dfs(node, prefix, results);
    return results;
  }

  #dfs(node, prefix, results) {
    if (node.isEndOfWord) results.push(prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this.#dfs(child, prefix + char, results);
    }
  }
}

export default function useTrie() {
  const words = useWordList();
  const [trie, setTrie] = useState(null);

  useEffect(() => {
    if (words.length > 0) {
      const t = new Trie();
      for (const word of words) {
        t.insert(word.toLowerCase());
      }
      setTrie(t);
    }
  }, [words]);

  return trie;
}
