const { use } = require('./routes');
const ticketcollection = require('./tickets')

//ticket selling controllers

exports.sellSingleTicket = (req, res) => {
   const {username, price} = req.body;
   const ticket = ticketcollection.create(username, price);
   res.status(201).json({
    message: 'Ticket created Successfully', ticket,
   });
};

exports.sellBulkTicket = (req, res) => {
    const {username, price, quantity} = req.body
    const tickets = ticketcollection.createBulk(username, price, quantity);
    res.status(201).json({
        message: 'Ticket created successfully', tickets,
    });
};

exports.findAll = (req, res) => {
    const tickets = ticketcollection.find();
    res.status(200).json({items: tickets, total: tickets.length});
};

exports.findByID = (req, res) => {
    const id = req.params.id;
    const ticket = ticketcollection.findById(id)
    if(!ticket){
        return res.status(404).json({message: '404 not found'})
    }
    res.status(200).json(ticket);
};

exports.findByUsername = (req, res) => {
    const username = req.params.username
    const tickets = ticketcollection.findByUsername(username)
    res.status(200).json({items: tickets, total: tickets.length});
}