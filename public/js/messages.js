const moment = require("moment");
function formatMessage(username, content)
{
    
    var return_dict = {
        sender: username,
        text: content, 
        time: moment().format("h:mm a")
    };
    return return_dict;
}
module.exports = formatMessage;