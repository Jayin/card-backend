var createDesign = require('./createDesign')

var mock = {
  objectId: '5680ba8260b25aa3dcd82f9c',
  designId: '2',
  inputs: [
    'Jack'
  ]
}

createDesign(mock)

createDesign({
  objectId: '5680ba8260b25aa3dcd82f9c',
  designId: '1',
  inputs: [
    'Jack1'
  ]
})
