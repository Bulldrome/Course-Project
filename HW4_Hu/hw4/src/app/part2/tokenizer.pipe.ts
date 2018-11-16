import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tokenizer'
})
export class TokenizerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	if (typeof value == "string") {
  		let result: string = value;

  		if (args) {
  			result = this.pad(result, args, '0');
  		} else{
	  		for(var i = 0; i<value.length -1;i++){
	  			result += value[i];
	  			result += ',';
			}	
  			result += value[value.length -1];
  		}
  		return result;
  	}
  }

  private pad(value:any, size:any , fill:string){
  	let result:string;
	for(var i = 0; i<value.length -1;i++){
		result += value[i];
		result += size;
	}
	result += value[value.length -1];

  	return result;
    }

}
