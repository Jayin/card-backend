'use strict'
let Resource = {
    "1": require('./1'),
    "2": require('./2'),
    "3": require('./3'),
    "4": require('./4'),
    "5": require('./5'),
    "6": require('./6'),
    "7": require('./7'),
    "water_mark": require('./water_mark'),
}

let allImages = []
for(let key in Resource){
    allImages.push(Resource[key]['url'])
    if(Resource[key]['preview']){
        allImages.push(Resource[key]['preview'])
    }
}

module.exports = {
    Resource: Resource,
    allImages: allImages
}
