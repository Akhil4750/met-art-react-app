export interface Department {
    departmentId: number;
    displayName: string;
}

export interface Artwork {
    objectID: number;
    title: string;
    primaryImage: string;
    artistDisplayName: string;
    artistNationality: string;
    objectDate: string;
    description: string;
    [key: string]: any;
}