var express = require('express')
var router = express.Router()
var request = require('request')
var createDesign = require('../libs/createDesign')
var fs = require('fs')
var path = require('path')

router.get('/', function (req, res, next) {
  if (!req.query.CampaignDesignId) {
    res.json({
      'msg': 'requrie params `CampaignDesignId`'
    }, 400)
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
      res.json({
        'msg': err
      }, 400)
      return
    }
    campaignDesign = JSON.parse(campaignDesign)
    if(!campaignDesign.objectId){
        return res.json({
            'msg': 'Not found resource'
        }, 404)
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
