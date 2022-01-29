


class UID{
    public ScreenName:any
    private RestID:number
    public UserName:any
    public getRestID=()=>{ this.RestID }                    //Return Rest ID

}

class User{
    _id : UID
    relation = class{
        followers:[relativeUser]
        following:[relativeUser]
    }
    tweets=class{

    }
    Mutual = class extends this.relation{
        
    }

}
class relativeUser extends User{
    
    
}



