// 해시테이블 구현사항 HashTable<T1, T2>
// entries() => [], set(T1, T2), get(T1) => T2, has(T1) => Boolean, clear()

class HashNode<T1, T2>{
    public key: T1;
    public value: T2;
    public nextNode: HashNode<T1, T2> | undefined;

    public constructor(key:T1, value:T2){
        this.key = key;
        this.value = value;
    }
}

class HashLinkedList<K, V>{
    private head: HashNode<K, V> | undefined;

    public constructor(){
    }

    public insert(key: K, value: V): void {
        let current = this.head;

        while (current) {
            if (current.key === key) {
                current.value = value;   
                return;
            }
            current = current.nextNode;
        }

        let newNode = new HashNode(key, value);
        newNode.nextNode = this.head;
        this.head = newNode;
    }

    public get(key: K): V | undefined{
        let current = this.head;
        while(current){
            if(current.key === key){
                return current.value;
            }
            current = current.nextNode;
        }
        return undefined;
    }

    public print(): [K, V][]{
        let ret: [K, V][] = [];
        let current = this.head;
        while(current !== undefined){
            ret.push([current.key, current.value]);
            current = current.nextNode;
        }
        return ret;
    }

    public clear(): void{
        this.head = undefined;
    }
}

export type HashFn<T> = (key: T) => number;

function defaultHashFn<T extends string | number>(key: T):number{
    let str = String(key);

    let hash: number = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i));
    }
    return hash;
}

export class HashTable<K, V>{

    private readonly hashFn: HashFn<K>;
    private table: HashLinkedList<K, V>[];
    private tableSize: number;

    public constructor(hashFn?: HashFn<K>, size?: number){
        hashFn ? this.hashFn = hashFn : this.hashFn = defaultHashFn as HashFn<K>;

        size ? this.tableSize = size!: this.tableSize = 32;

        this.table = [];
        for(let i=0; i < this.tableSize; ++i){
            this.table[i] = new HashLinkedList<K, V>();
        }
    }

    public entries(): [K, V][]{
        let ret: [K, V][] = [];
        for(let i=0; i < this.tableSize; ++i){
            ret = ret.concat(this.table[i]!.print());
        }
        return ret;
    }

    public set(key: K, value: V): void{
        let index = this.hashFn(key) % this.tableSize;
        console.log(key, index);
        this.table[index]?.insert(key, value);
    }

    public get(key: K): V | undefined{
        let index = this.hashFn(key) % this.tableSize;
        console.log(index);
        console.log(this.table[index]);
        return this.table[index]!.get(key);;
    }

    public has(key: K): Boolean{
        return Boolean(this.get(key));
    }

    public clear(): void{
        for(let i=0; i < this.tableSize; ++i){
            this.table[i]?.clear();
        }
        return;
    }
}