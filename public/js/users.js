const usersList = [];

//add a user to a room
function userJoin(id, username, room)
{
    var user = {id, username, room};
    usersList.push(user);
    return user;
}

//get a user on the basis of an id
function getUser(idSupplied)
{
    return usersList.find(x => x.id === idSupplied);
}

//when a user leaves the chat
function userLeft(idSupplied)
{
    var idx = usersList.findIndex(x => x.id === idSupplied);
    if(idx !== -1)
    {return usersList.splice(idx, 1)[0];}
}

//get the users present in a room
function getUsersOfRoom(roomSupplied)
{
    return usersList.filter(x=>x.room === roomSupplied);
}


module.exports =
{
    userJoin,
    getUser,
    userLeft,
    getUsersOfRoom
};