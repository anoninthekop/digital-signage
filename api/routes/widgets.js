const express = require('express')
const Widget = require('../models/Widget')
const Display = require('../models/Display')
const router = express.Router()
//const WidgetHelper = require('../helpers/widget_helper')
const CommonHelper = require('../helpers/common_helper')

// Route: /api/v1/widgets
router
  .get('/:id', (req, res, next) =>
  {
    const { id } = req.params
    return Widget.findById(id)
      .then(widget => {
        if (!widget) return next(new Error('Widget not found'))
        return res.json(widget)
      })
  })

  //TODO : déporter dans widget_helper
  .post('/', (req, res, next) => {

    const widget = new Widget(req.body)

    return widget.save()
      .then( widget => {
        Display.findById(widget.display)
          .then(display => {
            if (!display) return next(new Error('Display not found'))
            display.widgets.push(widget._id)
            display.save()
            return CommonHelper.broadcastUpdate(res.io).then(() => res.json(widget))
          })
      })
      .catch(err => next(err))
  })

  //Update
  .put('/:id', (req, res, next) => {
    const { id } = req.params
    return Widget.findById(id)
      .then( widget => {
        if (!widget) return next(new Error('Widget not found'))
        const data = req.body
        if(!data.data){
          widget.x = data.x
          widget.y = data.y
          widget.w = data.w
          widget.h = data.h
        } else {
          widget.data = data.data
        }
        widget.save()
        .then(() => CommonHelper.broadcastUpdate(res.io))
        .then(() => {
          return res.json({ success: true })
      })
    })
      .catch(err => next(err))
  })


  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Widget.findByIdAndDelete(id)
      .then(widget => {
        if (!widget) return next('Widget not found')
        //TODO : Ajouter suppression de l'objectID dans Display
          Display.findById(widget.display)
            .then(display => {
              if (!display) return next(new Error('Display not found'))
              display.widgets.pull(widget._id)
              display.save()
              .then(() => CommonHelper.broadcastUpdate(res.io))
              .then(() => {
                return res.json({ success: true })
            })
          //return res.json({ success: true })
        })
      })
      .catch(err => next(err))
  })

module.exports = router
