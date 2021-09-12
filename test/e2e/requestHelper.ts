import { ICarDomain } from '../../src/storage/domain/ICarDomain';
import { ICarMetaDataDomain } from '../../src/storage/domain/ICarMetaDataDomain';

var axios = require('axios');

export const createRamdomUserEmail = (length: number): string => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${result}@email.com`;
};

export const signUp = async (email: string, password: string): Promise<string> => {
    const respose: any = await axios({
        method: 'post',
        url: 'http://localhost:3000/signup',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { email, password },
    });

    console.info(respose.data);

    return respose.data?.token as string;
};

export const login = async (email: string, password: string): Promise<string> => {
    const respose: any = await axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { email, password },
    });

    console.info(respose.data);

    return respose.data?.token as string;
};

export const createACar = async (token: string, car: ICarDomain): Promise<string> => {
    const respose: any = await axios({
        method: 'post',
        url: 'http://localhost:3000/car',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        data: car,
    });

    console.info(`Car serialUUID: ${respose.data.serialUUID}`);
    return respose.data?.serialUUID as string;
};

export const getACar = async (token: string, serialUUID: string): Promise<ICarDomain> => {
    const respose: any = await axios({
        method: 'get',
        url: `http://localhost:3000/car/${serialUUID}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    return respose.data as ICarDomain;
};

export const updateACar = async (token: string, serialUUID: string, properies: { [Key: string]: string }): Promise<ICarDomain> => {
    const respose: any = await axios({
        method: 'put',
        url: `http://localhost:3000/car/${serialUUID}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        data: properies,
    });

    return respose.data as ICarDomain;
};

export const deleteACar = async (token: string, serialUUID: string): Promise<void> => {
    await axios({
        method: 'delete',
        url: `http://localhost:3000/car/${serialUUID}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
};

export const getMetadata = async (token: string): Promise<ICarMetaDataDomain> => {
    const respose: any = await axios({
        method: 'get',
        url: `http://localhost:3000/metadata`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    return respose.data as ICarMetaDataDomain;
};
