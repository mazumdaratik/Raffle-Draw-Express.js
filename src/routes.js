const router = require('express').Router();
const { 
    sellSingleTicket,
    sellBulkTicket,
    findAll,
    findByID,
    findByUsername,
    updateById,
    updateByUsername,
    deleteByID,
    deleteByUsername,
    drawWinners
} = require('./controller')

router.route('/x/:id').get(findByID).put(updateById).delete(deleteByID);

router.route('/u/:username').get(findByUsername).put(updateByUsername).delete(deleteByUsername);

router.post('/bulk', sellBulkTicket);
router.get('/draw', drawWinners);

router.route('/').get(findAll).post(sellSingleTicket);

module.exports = router;