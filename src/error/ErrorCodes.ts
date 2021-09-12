export const ErrorCodes = {
    CarStorage: {
        General: 'com.car.storage.general',
        AlreadyExists: 'com.car.storage.alreadyExists',
        NoFound: 'com.car.storage.NoFound',
    },
    CarValidation: {
        Schema: 'com.car.validation.schema.not.valid',
        SerialUUID: 'com.car.validation.serialUUID.not.valid',
        General: 'com.car.validation.general.no.valid',
    },
    UserValidation: {
        Schema: 'com.user.validation.schema.not.valid',
        Email: 'com.user.validation.email.not.valid',
    },
    UserStorage: {
        General: 'com.user.storage.general',
        NoFound: 'com.user.storage.NoFound',
        AlreadyExists: 'com.user.storage.alreadyExists',
    },
    UserLogin: {
        InvalidPassword: 'com.user.login.password.invalid',
    },
    Authentication: {
        NoToken: 'com.auth.token.not.provided',
        TokenInvalid: 'com.auth.token.invalid',
    },
};
