
class TokenHelper{
    get = (key:string) => {
        return window.localStorage.getItem(key);
    }
    create = (key:string,token:string) => {
        return window.localStorage.setItem(key,token);
    }
    delete = (key:string) => {
        return window.localStorage.removeItem(key);
    }
}

const tokenHelper = new TokenHelper();
export default tokenHelper;
