"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDbRepository = void 0;
const adminDbRepository = (repository) => {
    const getAdminByEmail = (email) => repository.getAdminByEmail(email);
    return {
        getAdminByEmail
    };
};
exports.adminDbRepository = adminDbRepository;
