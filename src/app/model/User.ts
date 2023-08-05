export class User{
    constructor(
        public email: string,
        public password: string,
        public _token: string = '',
        public _expirationdate: Date = new Date()
    ){}

    public getEmail(){
        return this.email;
    }
    public setEmail(email: string){
        this.email = this.email
    }

    public getPassword(){
        return this.password;
    }
    public setPassword(password: string){
        this.email = this.password
    }

    public get_Token(){
        return this._token;
    }
    public set_Token(_token: string){
        this._token = _token
    }

    public get_Expirationdate(){
        return this._expirationdate;
    }
    public set_Expirationdate(_expirationdate: Date){
        this._expirationdate = _expirationdate
    }
}