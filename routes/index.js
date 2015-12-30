var express = require('express')
var router = express.Router()
var request = require('request')
var createDesign = require('../libs/createDesign')
var fs = require('fs')
var path = require('path')
var cors = require('cors')

router.use(cors())
router.get('/', function (req, res, next) {
  if (!req.query.CampaignDesignId) {
    res.status(400).json({
      'msg': 'requrie params `CampaignDesignId`'
    })
    return
  }
  request({
    url: 'https://leancloud.cn:443/1.1/classes/CampaignDesign/' + req.query.CampaignDesignId,
    method: 'GET',
    headers: {
      'X-LC-Id': 'Q6RJwINXFrWH20wvODUvxzXE-gzGzoHsz',
      'X-LC-Key': 'jg9rHTU3IVMgXWyjpdhv4Xun'
    }
  }, function (err, responseMsg, campaignDesign) {
    if (err) {
      res.status(400).json({
        'msg': err
      })
      return
    }
    campaignDesign = JSON.parse(campaignDesign)
    if(!campaignDesign.objectId){
        return res.status(404).json({
            'msg': 'Not found resource'
        })
    }
    //检查是否已生成
    if (fs.existsSync(path.join(__dirname, '../public/designs/' + campaignDesign.objectId + '.jpg'))) {
      return res.json({
        campaignDesign: campaignDesign
      })
    }
    //没有生成就创建
    createDesign(campaignDesign, function () {
      res.json(campaignDesign)
    })
  })
})

module.exports = router
