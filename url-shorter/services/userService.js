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

function getUser(id){
    return repository.get(id);
}

function getUserByName(name){
    return repository.getByName(name);
}

function getUsersPublicData() {
    const users = repository.getAll();

    const result = [];
    for (const user of users) {
        result.push({
            id: user.id,
            name: user.name
        })
    }

    return result;
}

export {createUser, getUser, getUserByName, getUsersPublicData}


