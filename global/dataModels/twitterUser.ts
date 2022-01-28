


class UID{
    public ScreenName:any
    private RestID:number
    public UserName:any
    public getRestID=()=>{ this.RestID }                    //Return Rest ID

}

class User{
    
    relation = class{
        followers:[relativeUser]
        following:[relativeUser]
    }
    tweets=class{

    }

}
class relativeUser extends User{
    
    
}



