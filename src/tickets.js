const Ticket = require('./Ticket');
const {readFile, writeFile} = require('./utils');

const tickets = Symbol('tickets');
class TicketCollection {
    constructor(){
        this[tickets] = [];
    }

    create(username, price){
        const ticket = new Ticket(username, price);
        this[tickets].push(ticket)
        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @return {Ticket[]}
     */

    createBulk(username, price, quantity){
        const result = [];
        for(let i = 0; i < quantity; i++){
            const ticket = this.create(username, price);
            result.push(ticket);
        }
        return result;
    }
    /**
     * 
     * return all ricket from db
     */
    find(){
        return this[tickets];
    }

    /**
     * 
     * @param {string} id 
     * @returns {Ticket}
     */
    findById(id){
        const ticket = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === id
        );
        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @returns {Ticket[]}
     */
    findByUsername(username){
        const tickets = this[tickets].filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username === username
        );
        return tickets;
    }

    /**
     * 
     * @param {string} ticketId 
     * @param {{username: string, price: number}} ticketBody 
     */
    updateById(ticketId, ticketBody){
        const ticket = this.findById(ticketId);
        if(ticket){
            ticket.username = ticketBody.username ?? ticket.username;
            ticket.price = ticketBody.price ?? ticket.price;
        } 

        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @param {{username: string, price: number}} ticketBody 
     * @return {Ticket[]}
     */

    updateBulk(username, ticketBody){
        const userTickets = this.findByUsername(username);
        const updatedTickets = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.updateById(ticket.id, ticketBody)
        );
        return updatedTickets;
    }

    deleteById (ticketId){
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        )

        if (index === -1){
            return false;
        } else {
            this[tickets].splice(index, 1);
            return true;
        }
    }

    /**
     * 
     * @param {string} username
     * @return {boolean[]} 
     */
    deleteBulk(username){
        const userTickets = this.findByUsername(username)
        const deletedResult = userTickets.map(
            /**
             * @param {Ticket} ticket
             * 
             */
            (ticket) => this.deleteById(ticket.id)
        )
        return deletedResult;
    }
    /**
     * find winner
     * @param {number} WinnerCount 
     * @return {Ticket[]}
     */
    draw(WinnerCount){
        const winnerIndexes = new Array(WinnerCount);
        let winnerIndex = 0;
        while(winnerIndex < WinnerCount){
            let ticketIndex = Math.floor(Math.random() * this[tickets].length);
            if(!winnerIndexes.includes(ticketIndex)){
            winnerIndexes[winnerIndex++] = ticketIndex;
            continue;
            }
        }

        const winners = winnerIndexes.map(
            /**
             * @param {number} index
             */
            (index) => this[tickets][index]
        );
        return winners;
    }
}

const ticketcollection = new TicketCollection();
module.exports = ticketcollection;
