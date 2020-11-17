export interface Project {
    id: string,
    user: string,
    name: string,
    isPublic: boolean,
    description?: string,
    projectJson?: string,
    lastModified: Date
}

export interface Update {
    title: string,
    contents: string,
    date: Date
}