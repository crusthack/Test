// 구현 사항
// LinkedList<T>
// 메소드
// append(T), size(), printList(배열로 반환?), delete, search, printListReverse, getFirst, getLast, 
class Node<T>{
    value: T;
    prev: Node<T> | null = null;
    next: Node<T> | null = null;

    constructor(v:T, prev: Node<T> | null= null, next: Node<T> | null = null){
        this.value = v;
        this.prev = prev;
        this.next = next;
    }

    setNext(next: Node<T> | null): void{
        this.next = next;
    }

    setPrev(prev: Node<T> | null): void{
        this.prev = prev;
    }

    getValue(): T{
        return this.value;
    }

    getNext(): Node<T> | null{
        return this.next;
    }

    getPrev(): Node<T> | null{
        return this.prev;
    }
}
export class LinkedList<T>{
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    length: number = 0;

    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(v: T): void{
        if(this.head === null){
            this.head = new Node<T>(v);
            this.tail = this.head;
            this.length = 1;
        }
        else{
            let newNode = new Node<T>(v, this.tail);
            this.tail?.setNext(newNode);
            this.tail = newNode;
            this.length += 1;
        }
    }

    size(): number{
        return this.length;
    }

    printList(): T[]{
        let arr: T[] = [];
        
        let current = this.head;

        while(current != null){
            arr.push(current.getValue());
            current = current.getNext();
        }

        return arr;
    }

    printListReverse(): T[]{
        let arr: T[] = [];
        let current = this.tail;

        while(current != null){
            arr.push(current.getValue());
            current = current.getPrev();
        }

        return arr;
    }

    delete(v: T): void{
        let current = this.head;
        while(current != null){
            if(current.getValue() === v){
                if(current === this.head){
                    this.head = current.getNext();
                }
                if(current === this.tail){
                    this.tail = current.getPrev();
                }

                if(current.getPrev() != null){
                    current.getPrev()?.setNext(current.getNext());
                }
                if(current.getNext() != null){
                    current.getNext()?.setPrev(current.getPrev());
                }
                this.length -=1;
                return;
            }

            current = current.getNext();
        }
    }

    search(v: T): number | null{
        let current = this.head;
        let index: number = 1;
        while(current != null){
            if(current.getValue() === v){
                return index;
            }
            index += 1;
            current = current.getNext();
        }

        return null;
    }

    getFirst(): T | null{
        if(this.head != null){
            return this.head.getValue();
        }
        return null;
    }

    getLast(): T | null{
        if(this.tail != null){
            return this.tail.getValue();
        }
        return null;
    }
    
}