// 구현 사항
// inOrderTraversal, preOrder, postOrder, levelOrder 배열반환
// insert, search => T | null, romove, 
// !! 배열로 구현 -> 크기는? 

// let arr: number[] = [];
// console.log(arr.at(1)); => undefined

// arr[1]  = 1;

// console.log(arr.at(1)); => 1
// console.log(arr.at(0)); => undefined

// 테스트 해봤는데, 크기 생각없이 접근해도 알아서 undefined 반환함
// 배열 크기 신경 않고, 노드 삭제시 undefined 할당

export class BinaryTree<T>
{
    private arrayTree: (T|undefined)[];

    constructor(){
        this.arrayTree = [];
    }

    private getLeftIndex(i:number): number
    {
        // 0 => 1, 1 => 3, 5 => 11
        return i * 2 + 1;
    }
    
    private getRightIndex(i:number): number
    {
        // 0 => 2, 1 => 4, 2 => 6, 6 => 14
        return i * 2 + 2;
    }

    public insert(t:T)
    {
        let index = 0;
        
        // 값이 같을 경우 오른쪽으로 감
        while(this.arrayTree.at(index) !== undefined)
        {
            if(t < this.arrayTree.at(index)!)
            {
                index = this.getLeftIndex(index);
            }
            else
            {
                index = this.getRightIndex(index);
            }
        }
        this.arrayTree[index] = t;
    }

    private getNodeIndex(t:T): number | null
    {
        let index = 0;
        while(this.arrayTree.at(index) !== undefined)
        {
            if(this.arrayTree.at(index) === t)
            {
                return index;
            }
            if(t < this.arrayTree.at(index)!)
            {
                index = this.getLeftIndex(index);
            }
            else
            {
                index = this.getLeftIndex(index);
            }
        }
        return null;
    }

    public remove(t:T)
    {
        let index = this.getNodeIndex(t);
        if(index === null)
        {
            return;
        }

        // remove시 오른쪽 트리의 제일 왼쪽 노드(최소값)으로 설정
        // 오른쪽 트리가 undefined일 시 왼쪽 트리의 최대값으로 설정
        let swapIndex = this.getRightIndex(index);
        if(this.arrayTree.at(swapIndex) !== undefined)
        {
            while(this.arrayTree.at(this.getLeftIndex(swapIndex)) !== undefined)
            {
                swapIndex = this.getLeftIndex(swapIndex);
            }

        }
        else
            {
                swapIndex = this.getLeftIndex(index);
                while(this.arrayTree.at(this.getRightIndex(swapIndex)) !== undefined)
                    {
                        swapIndex = this.getRightIndex(swapIndex);
                    }
            }
        this.arrayTree[index] = this.arrayTree[swapIndex];
        this.arrayTree[swapIndex] = undefined;
    }

    public search(t:T) : T | null
    {
        let ret: T | null = null;
        let index = 0;
        while(this.arrayTree.at(index) !== t)
        {
            if(this.arrayTree.at(index) === undefined)
            {
                break;
            }

            if(t < this.arrayTree.at(index)!)
            {
                index = this.getLeftIndex(index);
            }
            else
            {
                index = this.getRightIndex(index);
            }
        }

        if(this.arrayTree.at(index) === t)
        {
            ret = t;
        }
        return ret;
    }

    public inOrderTraversal(): T[]
    {
        return this.inOrder(0);
    }

    private inOrder(i:number): T[]
    {
        if(this.arrayTree.at(i) === undefined)
        {
            return [];
        }
        let ret: T[] = [];
        ret = ret.concat(this.inOrder(this.getLeftIndex(i)));
        ret.push(this.arrayTree.at(i)!);
        ret = ret.concat(this.inOrder(this.getRightIndex(i)));
        return ret;
    }   

    public postOrderTraversal(): T[]
    {
        return this.postOrder(0);
    }

    private postOrder(i:number): T[]
    {
        if(this.arrayTree.at(i) === undefined)
        {
            return [];
        }
        let ret: T[] = [];
        ret = ret.concat(this.postOrder(this.getLeftIndex(i)));
        ret = ret.concat(this.postOrder(this.getRightIndex(i)));
        ret.push(this.arrayTree.at(i)!);
        return ret;
    }   

    public preOrderTraversal(): T[]
    {
        return this.preOrder(0);
    }

    private preOrder(i:number): T[]
    {
        if(this.arrayTree.at(i) === undefined)
        {
            return [];
        }
        let ret: T[] = [];
        ret.push(this.arrayTree.at(i)!);
        ret = ret.concat(this.preOrder(this.getLeftIndex(i)));
        ret = ret.concat(this.preOrder(this.getRightIndex(i)));
        return ret;
    }   

    public levelOrderTraversal(): T[]
    {
        const filteredArr = this.arrayTree.filter((item): item is T => item !== undefined);

        return filteredArr;
    }
}