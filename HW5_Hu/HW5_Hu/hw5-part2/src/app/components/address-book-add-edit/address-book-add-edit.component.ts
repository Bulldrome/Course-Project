import { Component, OnInit, OnChanges} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from 
          '../../model/address-provider.service';

@Component({
  selector: 'app-address-book-add-edit',
  templateUrl: './address-book-add-edit.component.html',
  styleUrls: ['./address-book-add-edit.component.css']
})
export class AddressBookAddEditComponent implements OnInit{

	friend: Contact;
	title:  string;
  save: number = 0;

  constructor(private route: ActivatedRoute,
  		private provider: AddressProviderService) { }

  saveBtn(event, id:number):void{
    this.save = 1;
  }

  ngOnInit() {
  	let savestatus = this.save;
    console.log('当前的save值是' +savestatus);
  	let id = this.route.snapshot.params['id'];
    if (id) {
        this.title = 'Edit Contact';
        this.friend = this.provider.getFriend(id);
    } else{
          this.title = "Add Contact";
          this.friend = this.provider.addFriend(savestatus);
		}
		console.log(this.friend);
  }

}
