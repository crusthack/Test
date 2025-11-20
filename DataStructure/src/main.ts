import { HashTable } from "./hashTable.ts";

    const hashTable = new HashTable<string, number>();
    hashTable.set('apple', 1);
    hashTable.set('banana', 2);
    hashTable.set('cherry', 3);
    console.log(hashTable.entries());