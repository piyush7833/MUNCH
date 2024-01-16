export type registerType={
    name:string,
    userName:string,
    email?:string,
    phone?:string,
    password:string,
    image?:string
}

export type signinType={
    userName?:string,
    email?:string,
    phone?:string,
    password:string
}

export type getUserType={
    userName?:string,
    email?:string,
    phone?:string
}