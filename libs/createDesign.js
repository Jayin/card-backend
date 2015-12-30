var Canvas = require('canvas'),
  Image = Canvas.Image,
  canvas = new Canvas(522, 370),
  context = canvas.getContext('2d'),
  DESIGN = require('./design'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash')

// 加载字体
var msyh = new Canvas.Font('msyh', path.join(__dirname, '/font/msyh.ttf'))
context.addFont(msyh)

// draw img
var renderComponentInput = function (canvas, context, inputs, scale) {
  if (inputs) {
    inputs.forEach(function (input) {
      context.save()
      context.font = parseInt(input.fontSize) * scale + 'px msyh'
      context.fillStyle = input.fillStyle
      context.fillText(input.value, parseInt(input.x) * scale, parseInt(input.y) * scale)
      context.restore()
    })
  }
}
/**
 * 渲染背景图
 */
var renderDesign = function (canvas, context, component) {
  var image = component.image
  var scale = canvas.width / image.width

  context.drawImage(image, 0, 0, image.width, image.height, component.x || 0, component.y || 0, canvas.width, canvas.height)
  if (component.inputs && component.inputs.length > 0) {
    // 有文字则显示
    renderComponentInput(canvas, context, component.inputs, scale)
  }
}
/**
 * 渲染一些部件
 */
var renderComonent = function (canvas, context, component) {
  var image = component.image
  var scale = canvas.width / 1044
  //注意这里额外增加了放缩比例
  context.drawImage(image, 0, 0, image.width, image.height, (component.x || 0) * scale, (component.y || 0) * scale, image.width * (scale+0.3), image.height * (scale+0.3))
}
/**
 * 填充campaignDesign的数据到Resource
 */
var fillResource = function (campaignDesign, resource) {
  var tmpItem = resource[campaignDesign['designId']]
  tmpItem.inputs.forEach(function (element, index) {
    tmpItem.inputs[index].value = campaignDesign.inputs[index]
  })

  return resource
}

//
var Resource = {}
// load the images
for (var key in DESIGN.Resource) {
  Resource[key] = DESIGN.Resource[key]
  var imageFile = path.join(__dirname, '../designTpl/' + key + '.jpg')
  if (!fs.existsSync(imageFile)) {
    imageFile = path.join(__dirname, '../designTpl/' + key + '.png')
  }
  Resource[key].image = new Image()
  Resource[key].image.src = fs.readFileSync(imageFile)
}

/**
 * design是Resource 里面的一个元素
 */
module.exports = function (campaignDesign, callback) {
  var mergeResource = fillResource(campaignDesign, _.cloneDeep(Resource))

  renderDesign(canvas, context, mergeResource[campaignDesign.designId])
  renderComonent(canvas, context, mergeResource['water_mark'])

  var out = fs.createWriteStream(path.join(__dirname , '../public/designs', campaignDesign.objectId + '.jpg'))
  var stream = canvas.jpegStream({
    bufsize: 4096, quality: 75, progressive: false
  })

  stream.on('data', function (chunk) {
    out.write(chunk)
  })
  stream.on('end', function () {
    if (callback) {
      callback()
    }
  })
}
