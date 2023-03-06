"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheRepositoryInterface = void 0;
const cacheRepositoryInterface = (repository) => {
    const setCache = (cachingOptions) => repository.setCache(cachingOptions);
    return {
        setCache
    };
};
exports.cacheRepositoryInterface = cacheRepositoryInterface;
