const map = new Map();

map.set("0", {id: 0, name: "John", password: "qwerty", created_time: "John"});


export default class  {
    save(user) {
        map.set(user.id, user);
    }

    get(userId) {
        return map.get(userId);
    }

    getAll() {
        return map.values();
    }

    getByName(name) {
        for (let user of map.values()) {
            if (user.name === name) {
                return user;
            }
        }

        return null;
    }
}
