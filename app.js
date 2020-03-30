getHistory=()=>{
    return document.getElementById("history-value").innerText;
}
printHistory=(num)=>{
     document.getElementById("history-value").innerText=num;
}
getCurrent=()=>{
    return document.getElementById("current-value").innerText;
}
printCurrent=(num)=>{
    if(num==""){
		document.getElementById("current-value").innerText=num;//beacause en-IN formatting makes empty to 0
	}
	else{
		document.getElementById("current-value").innerText=addComma(num);
	}	
}
//FUNTIONS FOR NUMBER FORMATTING
addComma=(num)=>{
	if(num=="-"){
		return "";
	}
	return Number(num).toLocaleString("en-IN");
}
removeComma=(num)=>{
	return Number(num.replace(/,/g,''));// "/,/g" is a regular expression to sellect al the commas in the expression
}

//FUNCTING FOR THE BUTTONS
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printCurrent("");
		}
		else if(this.id=="delete"){
			var output=removeComma(getCurrent()).toString();//As removeComma makes a Number so again makes it a string
			if(output){//if output has a value
				output= output.substr(0,output.length-1);//Make the whole string into a substring which has last character removed
				printCurrent(output);
			}
		}
		else if(this.id=="squre"){
			var output=removeComma(getCurrent());
			output=output*output;
			printCurrent(output);
			printHistory("");

		}
		else if(this.id=="root"){
			var output=removeComma(getCurrent());
			output=Math.sqrt(output);
			printCurrent(output);
			printHistory("");

		}
		else{//all operator except delete amd clear
			var output=getCurrent();
			var history=getHistory();

			if(output!=""){
				output=removeComma(output);
				history=history+output;
				if(this.id=="="){//if the oprator is =
					var result=eval(history);//If the argument is an expression, eval() evaluates the expression
					printCurrent(result);
					printHistory("");
				}
				else{//if operator is other than =
					history=history+this.id;
					printHistory(history);
					printCurrent("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=removeComma(getCurrent());
		if(output!=NaN){ //if output is a number
			output=output+this.id;//Concatination with Number and id string
			printCurrent(output);
		}
	});
}