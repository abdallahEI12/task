"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidationSchema = void 0;
exports.createUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage: "Username must be at least 5 characters with max length of 32 characters"
        },
        notEmpty: {
            errorMessage: "you must provide a username"
        },
        isString: {
            errorMessage: "username must be a string"
        },
    },
    password: {
        isLength: {
            options: {
                min: 6,
                max: 64
            },
            errorMessage: "password length must be between 6 and 64 characters"
        },
        notEmpty: {
            errorMessage: "missing password field"
        },
        isString: {
            errorMessage: "password must be a string"
        }
    }
};
