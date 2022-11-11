"use strict";
var witsC = {
	
};
document.title = "Simple Calculator App";
	function get_id(x){
		return document.getElementById(x);
	}
	//function to get index(es) of occurence of an element in a string or an array
	function string_occur(arg, n){
		var arr_index = [];
		var str_arg = "";
		if((arg.constructor != Array) && (arg.constructor != String))
			return false;
		else if(arg.constructor === Array){
			for (var i = 0; i <= arg.length-1; i++) {
				str_arg += arg[i];
			}
		}
		else str_arg = arg;

		if(str_arg.indexOf(n) == -1)
			return false;
		for (var i = 0; i <= str_arg.length - 1; i++) {
			if(str_arg[i] == n){
				var new_arg = str_arg.substring(0, i);
				arr_index.push(new_arg.length);
			}
		}
		return arr_index;
	}
	function calculate(num_val, op_sig){
		var k, result;
		var p = 1;
		var op_order = ['^', 'x', '/', '+', '-', 'e-'];// remember to add square root algorithm

		for (var i = 0; i<= op_order.length-1; i++) {
			for (var j = 0; j <= op_sig.length-1; j++) {

				if((op_sig[j] == op_order[i]) && (op_sig[j] == "^")){
					k = string_occur(op_sig, "^");
					for (var x = 0; x <= k.length-1; x++) {
						j = k[x];
						if(x > 0){
							j = k[x]-p;
							p++;
						}
						result = Math.pow(parseFloat(num_val[j]), parseFloat(num_val[j+1]));
						num_val.splice(j, 1);
						op_sig.splice(j, 1);
						num_val[j] = result;
					}
					p = 1;
				}
				else if((op_sig[j] == op_order[i]) && (op_sig[j] == "x")){
					k = string_occur(op_sig, "x");
					for (var x = 0; x <= k.length-1; x++) {
						j = k[x];
						if(x > 0){
							j = k[x]-p;
							p++;
						}
						result = parseFloat(num_val[j]) * parseFloat(num_val[j+1]);
						num_val.splice(j, 1);
						op_sig.splice(j, 1);
						num_val[j] = result;
					}
					p = 1;
				}
				else if((op_sig[j] == op_order[i]) && (op_sig[j] == "/")){
					k = string_occur(op_sig, "/");
					for (var x = 0; x <= k.length-1; x++) {
						j = k[x];
						if(x > 0){
							j = k[x]-p;
							p++;
						}
						result = parseFloat(num_val[j]) / parseFloat(num_val[j+1]);
						num_val.splice(j, 1);
						op_sig.splice(j, 1);
						num_val[j] = result;
					}
					p = 1;
				}
				else if((op_sig[j] == op_order[i]) && (op_sig[j] == "+")){
					k = string_occur(op_sig, "+");
					for (var x = 0; x <= k.length-1; x++) {
						j = k[x];
						if(x > 0){
							j = k[x]-p;
							p++;
						}
						result = parseFloat(num_val[j]) + parseFloat(num_val[j+1]);
						num_val.splice(j, 1);
						op_sig.splice(j, 1);
						num_val[j] = result;
					}
					p = 1;
				}
				else if((op_sig[j] == op_order[i]) && (op_sig[j] == "-")){
					k = string_occur(op_sig, "-");
					for (var x = 0; x <= k.length-1; x++) {
						j = k[x];
						if(x > 0){
							j = k[x]-p;
							p++;
						}
						result = parseFloat(num_val[j]) - parseFloat(num_val[j+1]);
						num_val.splice(j, 1);
						op_sig.splice(j, 1);
						num_val[j] = result;
					}
					p = 1;
				}
			}
		}
		return result;		
	}

	function solve(strg_char){
		var num = "", answer;
		var op_array = [], num_array = [];
		for (var y = 0; y <= strg_char.length-1; y++) {
			if((isNaN(strg_char[y])) && (strg_char[y] != ".")){
				num_array.push(num);
				op_array.push(strg_char[y]);
				num = "";
			}
			else{
				num += strg_char[y];
				if(y == strg_char.length-1)
				num_array.push(num); 
			}
		}
		if(num_array.length == 1 && op_array.length == 0)
			answer = num_array[0];
		else
			answer = calculate(num_array, op_array);
		return answer;
	}


	function digit(get_num){
		witsC.inVal = get_id("inputDisp");
		witsC.outVal = get_id("outputDisp");

		if(witsC.outVal.value != ""){
			witsC.outVal.value = "";
			witsC.inVal.value = get_num;
		}
		else
			witsC.inVal.value += get_num;
	}

	function uni_char(read_char){
		witsC.inVal = get_id("inputDisp");
		witsC.outVal = get_id("outputDisp");
		var char_prfx, char_val;
		if(witsC.outVal.value != ""){
			witsC.inVal.value = witsC.outVal.value + read_char;
			witsC.outVal.value = "";
		}
		else
			witsC.inVal.value += read_char;
		
		//use case
		if(read_char == "%"){
			if(witsC.inVal.value.length == 1)
				witsC.outVal.value = "Error";
			else{
			char_prfx = witsC.inVal.value.slice(0, witsC.inVal.value.length-1);
			char_val = parseFloat(char_prfx)/100;
			witsC.outVal.value = char_val.toString();
			}
		}
		
	}

	function operator(op_sign){
		witsC.inVal = get_id("inputDisp");
		witsC.outVal = get_id("outputDisp");
		if(witsC.inVal.value == "" && witsC.outVal.value == ""){
			witsC.outVal.value = "Invalid Input";
		}
		else if(witsC.outVal.value != ""){
			witsC.inVal.value = witsC.outVal.value;
			witsC.outVal.value = "";
		}
		switch(op_sign){
			case "+":
				witsC.inVal.value += "+" ;
				break;
			case "-":
				witsC.inVal.value += "-" ;
				break;
			case "x":
				witsC.inVal.value += "x" ;
				break;
			case "/":
				witsC.inVal.value += "/" ;
				break;
		}
	}

	function equals(){
		witsC.inVal = get_id("inputDisp");
		witsC.outVal = get_id("outputDisp");
		let outputfix = "";
		var equals = solve(witsC.inVal.value);
		/*var check_decimal = string_occur(equals.toString(), ".");
		if (check_decimal.length > 0){
			let new_result = equals.split(".");
			if (new_result[1][0] == 0){
				//result less than 1
				let count = 1;
				for (let i = 0; i < new_result[1].length; i++) {
					if(parseFloat(new_result[1][i]) == 0){
						count += 1;
					}
					else{
						outputfix += new_result[1][i];
					}
				}
				count += outputfix.length - 1;
				outputfix = outputfix[0] + '.' + parseFloat(outputfix[1,-1]);
				//if(outputfix.length)
				equals = outputfix + "E-" + count;
			}
		}*/

		if(isNaN(equals))
			witsC.outVal.value = "Invalid Input";
		else
			witsC.outVal.value = equals;	
	}

	function math_pow(pow_str){
		witsC.inVal = get_id("inputDisp");
		witsC.outVal = get_id("outputDisp");
		switch(pow_str){
			case 'sqr':
				witsC.inVal.value += "^2";
				break;
			case 'cube':
				witsC.inVal.value += "^3";
				break;
			case 'sqrt':
				witsC.outVal.value += Math.sqrt(witsC.inVal.value);
				break;
		 }
	}
