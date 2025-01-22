const router = require('express').Router();
const { 
    sellSingleTicket,
    sellBulkTicket,
    findAll,
    findByID,
    findByUsername,
} = require('./controller')

router.route('t/:id').get(findByID).put().delete();

router.route('/u/:username').get(findByUsername).put.delete();

router.post('/bulk', sellBulkTicket);
router.get('/draw');

router.route('/').get(findAll).post(sellSingleTicket);

module.exports = router;