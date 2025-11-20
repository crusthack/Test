// 양방향 큐
// 구현 사항, push(T), top(), isEmpty(), size property(private), pop(),
// enqueue(T), dequeue(), front(), 

// js 배열 테스트

// let arr: number[] = [];
// console.log(arr.at(1)); => undefined

// arr[1]  = 1;

// console.log(arr.at(1)); => 1
// console.log(arr.at(0)); => undefined

export class Queue<T>
{
    private arr: T[];

    constructor(){
        this.arr = []
    }

    push(t: T): void{
        this.arr.push(t);
    }

    top(): T | undefined{
        if(this.arr.length == 0)
            return undefined;

        return this.arr[this.arr.length - 1];
    }

    isEmpty(): boolean{
        return this.arr.length === 0;
    }

    set size(value: number){
        throw Error;
    }

    get size(): number{
        return this.arr.length;
    }

    pop(): T | undefined{
        if(this.isEmpty())
        {
            return undefined;
        }

        let ret = this.arr[this.arr.length - 1];
        this.arr.pop();
        return ret;
    }

    enqueue(t: T): void{
        this.arr.push(t);
    }
    dequeue(): T | undefined{
        if(this.arr.length === 0)
            return undefined;

        return this.arr.shift();
    }

    front(): T | undefined{
        if(this.arr.length === 0)
            return undefined;

        return this.arr.at(0);
    }
}