module.exports = () => {
    
    const publicChatHistory = []
    
    function getPublicChatRecords() {
        return publicChatHistory
    }
    
    function setPublicChatRecord(data) {
        publicChatHistory.unshift(data)
    }
    
    return {
        setPublicChatRecord,
        getPublicChatRecords,
    }
}