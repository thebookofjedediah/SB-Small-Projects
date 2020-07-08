const filterOutOdds = (...nums) => {
    return nums.filter((num) => {
        return num % 2 === 0;
    })
}


const findMin = (...nums) => {
    return Math.min(...nums)
}


const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})


const doubleAndReturnArgs = (arr, ...args) => {
    return [...arr, ...args.map(num => num * 2)]
}


const removeRandom = (items) => {
    let randomItem = math.floor(math.random() * items.length)
    return [...items.slice(0, randomItem), ...items.slice(randomItem + 1)]
}


const extend = (array1, array2) => {
    return [...array1, ...array2]
}


const addKeyVal = (obj, key, val) => {
    let newObj = {...obj}
    newObj[key] = val
    return newObj;
}


const removeKey = (obj, key) => {
    let newObj = {...obj}
    delete newObj[key]
    return newObj;
}

const combine = (obj1, obj2) => {
    let newObj = {...obj1, ...obj2}
    return newObj;
}

const update = (obj, key, val) => {
    let newObj = {...obj}
    newObj[key] = val
    return newObj;
}