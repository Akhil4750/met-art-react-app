import axios from 'axios';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const fetchDepartments = async () => {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data.departments;
};

export const fetchArtworksByDepartment = async (departmentId: number) => {
    const response = await axios.get(`${BASE_URL}/objects?departmentIds=${departmentId}&isOnView=true`);
    return response.data.objectIDs;
};

export const fetchArtworkDetails = async (objectId: number) => {
    const response = await axios.get(`${BASE_URL}/objects/${objectId}`);
    return response.data;
};