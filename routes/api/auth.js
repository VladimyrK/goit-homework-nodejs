const express = require('express')

const { basedir } = global

const ctrl = require(`${basedir}/controllers/auth`)

const { ctrlWrapper } = require(`${basedir}/helpers`)

const { auth, upload } = require(`${basedir}/middlewares`)

const router = express.Router()

// signup
router.post('/signup', ctrlWrapper(ctrl.register))

// signin
router.post('/login', ctrlWrapper(ctrl.login))

router.patch('/subscription', auth, ctrlWrapper(ctrl.updateSubscription))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar))

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

module.exports = router
