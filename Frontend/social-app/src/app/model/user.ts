export class User {

    _id : String;
    username : String;
    email : String;
    password : String;
    role : String;

    constructor(){
        this._id = '',
        this.username = '',
        this.email = '',
        this.password = '',
        this.role = 'User'
    }

}
