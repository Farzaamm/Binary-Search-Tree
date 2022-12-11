const Node = (data, left = null, right = null) => {
    return {data, left, right};
};

const Tree = array => {

    const remDupsAndSort = array => {
        const mergeSort = array => {
            if(array.length <= 1) return array;
            let leftArr = array.slice(0, array.length / 2);
            let rightArr = array.slice(array.length / 2);
            return merge(mergeSort(rightArr), mergeSort(leftArr))
        
        };
        
        const merge = (leftArr, rightArr) => {
            let sorted = [];
            while(leftArr.length && rightArr.length){
                if(leftArr[0] < rightArr[0]){
                    sorted.push(leftArr.shift());
                }else{
                    sorted.push(rightArr.shift());
                }
            };
            return [...sorted, ...leftArr, ...rightArr]
        };
        return mergeSort([... new Set(array)])
    };

    array = remDupsAndSort(array);

    const buildTree = (array, start, end) => {
        if(start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let node = Node(array[mid]);
        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);
        return node;
    };
    
    const insert = value => {
        let newNode = Node(value);
        if(!root) return root = newNode;
        let pointer = root;
        while(pointer){
            if(value < pointer.data){
                if(!pointer.left) return pointer.left = newNode;
                pointer = pointer.left;
            }else{
                if(!pointer.right) return pointer.right = newNode
                pointer = pointer.right
            }
        }
        
    };

    const remove = value => {
        if(!root) return root;
        let pointer = root;
        let parent = null;
        while(pointer){
            if(value < pointer.data){
                parent = pointer;
                pointer = pointer.left
            }
            else if(value > pointer.data){
                parent = pointer;
                pointer = pointer.right;
            }else{
                if(!pointer.right && !pointer.left){
                    if(pointer === parent.left) return parent.left = null;
                    if(pointer === parent.right) return parent.right = null;
                }
                if(!pointer.left){
                    if(pointer === parent.left) return parent.left = pointer.right
                    if(pointer === parent.right) return parent.right = pointer.right
                }else if(!pointer.right){
                    if(pointer === parent.left) return parent.left = pointer.left
                    if(pointer === parent.right) return parent.right = pointer.left
                }else{
                    let replacingNode = pointer.right;
                    let replacingParent = pointer;
                    while(replacingNode.left){
                        replacingParent = replacingNode;
                        replacingNode = replacingNode.left;
                    }
                    if(pointer === root){
                        replacingNode.right = root.right;
                        replacingNode.left = root.left;
                        root = replacingNode;
                        if(replacingNode === replacingParent.left) return replacingParent.left = null;
                        if(replacingNode === replacingParent.right) return replacingParent.right = null;

                    }
                    if(pointer === parent.left){
                        if(replacingNode === pointer.left){
                            replacingNode.left = null;
                        }else{
                            replacingNode.left = pointer.left;
                        }
                        if(replacingNode === pointer.right){
                            replacingNode.right = null;
                        }else{
                            replacingNode.right = pointer.right;
                        }
                        parent.left = replacingNode;
                        if(replacingNode === replacingParent.left) return replacingParent.left = null;
                        if(replacingNode === replacingParent.right) return replacingParent.right = null;
                    } 
                    if(pointer === parent.right){
                        if(replacingNode === pointer.left){
                            replacingNode.left = null;
                        }else{
                            replacingNode.left = pointer.left;
                        }
                        if(replacingNode === pointer.right){
                            replacingNode.right = null;
                        }else{
                            replacingNode.right = pointer.right;
                        }
                        parent.right = replacingNode;  
                        if(replacingNode === replacingParent.left) return replacingParent.left = null;
                        if(replacingNode === replacingParent.right) return replacingParent.right = null;
                    } 
                }    
            }
        }
    };
    
    const find = (value, pointer = root) => {
        if(value === pointer.data) return pointer;
        if(value < pointer.data){
            if(!pointer.left) return null;
            return find(value, pointer.left);
        }
        if(value > pointer.data){
            if(!pointer.right) return null;
            return find(value, pointer.right);
        }
    }

    const levelOrder = (callback) => {
        if(!root) return [];
        let result = [];
        let queue = [root];
        while(queue.length > 0){
            let current = queue.shift();
            callback ? callback(current) : result.push(current.data)
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
        return {result, callback};
    }

    const inorder = (pointer = root, callback) => {
        if(!pointer) return [];
        const leftSide = inorder(pointer.left, callback);
        const rightSide = inorder(pointer.right, callback);
        if(callback) callback(pointer);
        return [...leftSide, pointer.data, ...rightSide]
    }

    const preorder = (pointer = root, callback) => {
        if(!pointer) return [];
        const leftSide = preorder(pointer.left, callback);
        const rightSide = preorder(pointer.right, callback);
        if(callback) callback(pointer);
        return [pointer.data, ...leftSide, ...rightSide]
    }

    const postorder = (pointer = root, callback) => {
        if(!pointer) return [];
        const leftSide = postorder(pointer.left, callback);
        const rightSide = postorder(pointer.right, callback);
        if(callback) callback(pointer);
        return [...leftSide, ...rightSide, pointer.data]
    }

    const height = (node = root) => {
        // return it's height. Height is defined as the number of edges in longest path from a given node to a leaf node.
        const heightCalculator = (foundNode = find(node)) => {
            if(!foundNode) return -1;
            return Math.max(heightCalculator(foundNode.left), heightCalculator(foundNode.right)) + 1;
        }
        return heightCalculator();
    }

    const depth = (node, pointer = root) => {
        //return it's depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
        let edge = 0;
        if(!pointer) return edge;
        while(pointer){
            if(node === pointer.data) return edge;
            if(node < pointer.data){
                edge++;
                pointer = pointer.left
            }else{
                edge++;
                pointer = pointer.right
            }
        }
    }

    const isBalanced = (pointer = root) => {
        if(!pointer) return false;
        let leftSide = isBalanced(pointer.left);
        let rightSide = isBalanced(pointer.right);
        if(!pointer.left && !pointer.right){
            return true;
        }else if(!pointer.left && pointer.right || pointer.left && !pointer.right){
            if(height(pointer.data) > 1){
                return false;
            }else{
                return true
            }
        }else{
            if(leftSide && rightSide){
                if(Math.abs(height(pointer.left.data) - height(pointer.right.data)) <= 1) return true;
            }
        }
        return leftSide && rightSide;
    }

    const rebalance = () => {
        let arrayedTree = inorder(); // returns an array of the tree nodes
        return root = buildTree(arrayedTree, 0, arrayedTree.length - 1)
    }

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if(node){
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        }else{
            console.log(node)
        }
    }
    
    
    let root = buildTree(array, 0, array.length - 1);
    return {root, prettyPrint, insert, remove, find, levelOrder, inorder, preorder, postorder, height, depth, isBalanced, rebalance}
};

const print = (node) => {
    console.log(`Node data is ${node.data}`)
}



let a = [2,4,5,3,9,7,3,8,5];
let b = [];
let f = Tree(a);
let d = Tree(b);

// d.insert(4)
// d.insert(8)
// d.insert(3)
// d.insert(9)
// d.insert(6)
// d.insert(7)
// d.prettyPrint()

f.insert(1) 
f.insert(10) 
f.insert(20) 
f.insert(30) 
f.insert(50) 
f.insert(580) 
f.insert(15) 
f.insert(1.5) 
f.insert(1.6) 
f.insert(1.7) 
// f.prettyPrint()
// f.remove(8)
// f.prettyPrint()
// console.log(f.find(57))
// console.log(f.levelOrder())
// console.log(f.levelOrder(print))
// console.log(f.postorder())
// console.log(f.depth(1))
// console.log(f.height(93))
// console.log(d.height(8))
// console.log(f.isBalanced())
// console.log(d.isBalanced())
f.rebalance()
f.prettyPrint()


