import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {
	inputText: string;
	delimiter: string;

  constructor() {
  	this.inputText = 'Angular is awesome';
  	this.delimiter = '#';
  }

  ngOnInit() {
  }

}
