export function tree2Array(result, tree, optKey, optParentKey, optChildren) {
    tree.forEach(item => {
        const children = item[optChildren]
        item[optChildren] = null
        result.push(item)
        if (children && children.length) {
            tree2Array(result, children, optChildren)
        }
    })
    return result
}

export function array2tree(arr, key, parentKey, children) {
    let tree = [],
        lookup = {};

    arr.forEach(obj => {
        lookup[obj[key]] = obj;
        obj[children] = [];
    });

    arr.forEach(obj => {
        if (obj[parentKey] != null) {
            lookup[obj[parentKey]][children].push(obj);
        } else {
            tree.push(obj);
        }
    });

    return tree
}