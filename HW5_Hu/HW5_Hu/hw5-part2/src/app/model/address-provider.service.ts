import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable()
export class AddressProviderService {

  constructor() { }

  getFriends(): Contact[] {
  	return CONTACTS;
  }

  getFriend(id: number): Contact {
  	let friends:Contact[] = this.getFriends();
    let friend: Contact = friends.find(
    		f => {return (f.id == id)});
    return friend;
  }

  addFriend(save: number): Contact {
  	let friends:Contact[] = this.getFriends();
  	let maxId: number;
  	
  	if (friends && friends.length > 0) {
  		maxId = friends[friends.length - 1].id;	
  	} else {
  		maxId = 0;
  	}

  	let friend: Contact = new Contact();
  	friend.id = maxId + 1;
    if(save ==0){
  	friends.push(friend);
    }
  	return friend;
  }

  deleteFriend(id:number): Contact {
    let friends:Contact[] = this.getFriends();
    let friend = this.getFriend(id);
    let maxId: number;
    if (friends && friends.length > 0) {
      maxId = friends[friends.length - 1].id;  
    } else {
      maxId = 0;
    }
    if(id === maxId){
      friends.splice(friends.length-1,1);
    } else{
      friends.splice(id-1,1);
    }  
    return friend;
  }


}
