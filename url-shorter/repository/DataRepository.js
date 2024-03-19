const map = new Map();

export default class DataRepository {
    save(data) {
        map.set(data.code, data);
    }

    get(id) {
        return map.get(id);
    }

    getAll() {
        return map.values();
    }
}
