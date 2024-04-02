import DataRepository from "../repository/DataRepository.js";
import generateHash from "../../Hometask_1/utils.js";
import {getUserByName} from "./userService.js";

const repository = new DataRepository()

async function addData(data, userName){
    const code = generateHash(5);
    const users = await getUserByName(userName);

    const addedData = {
        ...data,
        code,
        shortUrl: `https://bit.ly/${code}`,
        created_time: Date.now(),
        userId: users[0].id,
    }

    console.log(addedData, 'addedData')
    await repository.save(addedData);

    return addedData;
}

function getDataById(id){
    return repository.get(id);
}

async function getAllData(userName){
    const dataRepository = await repository.getAll();
    const userId = await getUserByName(userName).id;

    const result = [];
    for (const data of dataRepository) {
        console.log(data, 'datadata')
        if(userId === data.userId){
            result.push(data)
        }
    }

    console.log(result, 'resultresult')
    return result;
}


export {addData, getDataById, getAllData}


