type updateForm={
    name:string,
    email?:string,
    phone?:string,
    image?:string,
    address?:string,
}
type shopOwnerForm={
    panCard:string,
    bankAccount:string,
    GSTIN:string,
    aadhar:string,
    IFSC:string,
}
type shopOwnerEditForm={
    panCard?:string,
    bankAccount?:string,
    GSTIN?:string,
    aadhar?:string,
    IFSC?:string,
    verified?:boolean,
    notVerified?:string
    id:string
}