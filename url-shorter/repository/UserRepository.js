const map = new Map();

export default class UserRepository {
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
