import Result "mo:base/Result";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Time "mo:base/Time";
actor { 

  type History={
    id:Text;
    response:Text;
    request:Text;
  };

  type User={
    id:Principal;
    history:[History];
  };



let storage=HashMap.HashMap<Principal,User>(1,Principal.equal,Principal.hash);
public shared ({caller}) func registeruser():async Text{

  //verify tthat users is not registered

  switch(storage.get(caller)){

    case (null){
      let new_user:User={
        id=caller;
        history=[];
      };

      storage.put(caller,new_user);
      return "welcome"
    };
    case(?_found){
      return "welcome back"
    };
  };

};
//get all users history


     public query func getAllHistory():async [User]{
     
       


      return Iter.toArray(storage.vals());
     };
  

//enter serach results
public shared ({caller}) func usersearch(request:Text,response:Text):async Result.Result<Text,Text>{

      let id:Text=Int.toText(Time.now());

     
    let new_search:History={
        id;
        response;
        request;

      };
  switch (storage.get(caller)){

    case(null){
      return #err("failed")
    };
    case(?his){

      //update users history
      let historybuffer=Buffer.fromArray<History>(his.history);

      historybuffer.add(new_search);

      let updatedhistory=Buffer.toArray(historybuffer);

      let updateduser:User={
        id=caller;
        history=updatedhistory;
      };
      storage.put(caller,updateduser);
      return #ok(response)
    }
  }
};


//clear all history

public shared ({caller}) func clear_history():async Text{

  switch(storage.get(caller)){
    case (null){
      return "failed"
    };
    case(?_found){

      let newupdateduser:User={
        id=caller;
        history=[];
      };
      storage.put(caller,newupdateduser);
      return "cleared"
    }
  }

}

};