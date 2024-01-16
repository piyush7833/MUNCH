class TokenHelper {
    key: string;
    
    constructor() {
      this.key = "Authorization";
    }
  
    get = (): string | null => {
      return window.localStorage.getItem(this.key);
    }
  
    create = (token: string) => {
      return window.localStorage.setItem(this.key, token);
    }
  
    delete = () => {
      return window.localStorage.removeItem(this.key);
    }
  }
  
  const tokenHelperInstance= new TokenHelper();
  export default tokenHelperInstance;
  