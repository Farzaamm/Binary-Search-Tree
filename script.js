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
    
    const find = value => {
        if(value === root.data) return root;
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
    return {root, prettyPrint, insert, remove, find}
};



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

// f.insert(1) 
// f.prettyPrint()
// f.remove(8)
// f.prettyPrint()
f.find(5)
console.log(f.find(5))


