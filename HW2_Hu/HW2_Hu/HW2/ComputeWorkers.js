function getNumbers(){
		var startValue1 = document.getElementById('startValue1').value;
		var endValue1 = document.getElementById('endValue1').value;

		var startValue2 = document.getElementById('startValue2').value;
		var endValue2 = document.getElementById('endValue2').value;

		var startValue3 = document.getElementById('startValue3').value;
		var endValue3 = document.getElementById('endValue3').value;

		var startValue4 = document.getElementById('startValue4').value;
		var endValue4 = document.getElementById('endValue4').value;

		var startValue5 = document.getElementById('startValue5').value;
		var endValue5 = document.getElementById('endValue5').value;
		var data = [];

		data.push({start:startValue1,end:endValue1});
		data.push({start:startValue2,end:endValue2});
		data.push({start:startValue3,end:endValue3});
		data.push({start:startValue4,end:endValue4});
		data.push({start:startValue5,end:endValue5});

		calculate(data);
		
	}
	var result = [];
	function calculate(data){
		for(var i = 0; i < data.length; i++)
		{
			var s1 = parseInt(data[i].start);
			var e1 = parseInt(data[i].end);
			var total = 0;

			for(var j = s1; j<=e1; j++){
				total += j;
			}
			result.push({start:s1, end: e1, sum: total});

		}	
	
		document.getElementById("answer").innerHTML = JSON.stringify(result);
	}