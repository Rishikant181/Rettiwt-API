


class UID{
    public ScreenName:any
    private RestID:number= 0
    public UserName:any
    public getRestID=()=>{ this.RestID }                    //Return Rest ID

}

class User{
    _id : UID =new UID;
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



