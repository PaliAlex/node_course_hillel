let countStorage = 0;

function addCount(){
    countStorage = countStorage + 1;
}

function getCount() {
    return countStorage;
}

export {addCount, getCount}
