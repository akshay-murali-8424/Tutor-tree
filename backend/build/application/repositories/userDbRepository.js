"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const getUserByEmail = (email) => repository.getUserByEmail(email);
    const addUser = (user) => repository.addUser(user);
    const getUserById = (id) => repository.getUserById(id);
    return {
        getUserByEmail,
        addUser,
        getUserById
    };
};
exports.userDbRepository = userDbRepository;
