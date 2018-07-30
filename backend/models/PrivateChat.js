module.exports = () => {
    
    const privateChatHistory = []
    
    function getPrivateChatRecordsByRoomId(roomid) {
        return privateChatHistory.filter( item => { return item.roomid === roomid })
    }
    
    function setPrivateChatRecord(data) {
        privateChatHistory.unshift(data)
    }
    
    return {
        setPrivateChatRecord,
        getPrivateChatRecordsByRoomId,
    }
}