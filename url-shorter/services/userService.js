const storage = new Map();

function addUser(name, payload){
    storage.set(name, payload);
}

function getUser(name){
    return storage.get(name);
}

export {addUser, getUser}
