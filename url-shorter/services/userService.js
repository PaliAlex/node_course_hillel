import UserRepository from "../repository/UserRepository.js";
import {generate} from "../utils/storageGenerators.js";

const repository = new UserRepository()

function createUser(user){
    const newUser = {
        id: generate('user'),
        ...user,
    };

    repository.save(newUser);
}

async function getUser(id){
    return await repository.get(id);
}

async function getUserByName(name){
    return await repository.getByName(name);
}

async function getUsersPublicData() {
    const users = await repository.getAll();

    const result = [];
    for (const user of users) {
        result.push({
            id: user.id,
            name: user.name
        })
    }

    return result;
}

async function checkPassword(name, password) {
    if(!name || !password){
        return false;
    }

    const user = await repository.getByName(name);

    return user?.password === password;
}

export {createUser, getUser, getUserByName, getUsersPublicData, checkPassword}


