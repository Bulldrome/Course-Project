import { Component, OnInit, Input} from '@angular/core';

import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})

export class Part1Component implements OnInit {

 books: any;
 totalPrice: any;

//check localstorage
  constructor() {
    if (localStorage.Qian_cart){
      this.books = JSON.parse(localStorage.getItem('Qian_cart'));
    } else {
      	this.books = 
      		[{title:'Absolute Java', qty: 1, unitprice: 114.95},
      		 {title:'Pro HTML5', qty:1, unitprice:27.95},
      		 {title:'Head First HTML5', qty:1, unitprice:27.89}];
      }
    //compute the total price in cart
    this.totalPrice = 0;  
    for(let book of this.books){
      this.totalPrice += book.unitprice*book.qty;
    }  
  }

  gettotalPrice(event): void{
      for(let book of this.books){
      this.totalPrice += book.unitprice*book.qty;
    } 
  }

  saveBook(event): void {
  	localStorage.setItem('Qian_cart', JSON.stringify(this.books));
    //initialize the totalprice
    this.totalPrice = 0;
    alert("Saved!");
  }

  addBook(event): void {
    this.books.push({
      title:'New Book',
      qty: 1,
      unitprice: 10
    });
    //initialize the totalprice
    this.totalPrice = 0;
  }

  removeBook() {
    this.books.splice(this.books.length-1,1);
    //initialize the totalprice
    this.totalPrice = 0;
  }

  ngOnInit() {
  }

}
