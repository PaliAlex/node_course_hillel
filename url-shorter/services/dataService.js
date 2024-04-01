import DataRepository from "../repository/DataRepository.js";
import generateHash from "../../Hometask_1/utils.js";
import {getUserByName} from "./userService.js";

const repository = new DataRepository()

async function addData(data, userName){
    const code = generateHash(5);
    const userId = await getUserByName(userName).id;

    const addedData = {
        ...data,
        code,
        shortUrl: `https://bit.ly/${code}`,
        created_time: Date.now(),
        userId,
    }

    await repository.save(addedData);

    return addedData;
}

function getDataById(id){
    return repository.get(id);
}

async function getAllData(userName){
    const dataRepository = repository.getAll();
    const userId = await getUserByName(userName).id;

    const result = [];
    for (const data of dataRepository) {
        if(userId === data.userId){
            result.push(data)
        }
    }

    return result;
}


export {addData, getDataById, getAllData}


