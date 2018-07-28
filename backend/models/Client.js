module.exports = () => {
    
    const clients = new Map()
    
    function removeClient(id) {
        clients.delete(id)
    }
    
    function getClients() {
        return Array.from(clients, ([key, value]) => {
            return {id: key, name: value}
        })
    }
    
    function getClientById(id) {
        return clients.get(id)
    }
    
    function setClient(id, client) {
        clients.set(id, client)
    }
    
    return {
        setClient,
        getClients,
        removeClient,
        getClientById
    }
}