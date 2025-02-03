function calculate(a,b,operator){
    a=parseFloat(a);
    b=parseFloat(b);
    switch(operator){
        case '+':return a+b;
        case '-':return a-b;
        case '%':return a/b;
        case '*':return a*b;
    }
}
function letOperationResolve(){
    if(operation.secondValue=='0' && operation.operator=='%'){
        return 'Error: zero apocalisis';
    }
    return calculate(operation.firstValue, operation.secondValue,operation.operator);
}
function resetOperation(){
    operation.firstValue='';
    operation.secondValue='';
    operation.operator='';
}
function isOperationSet(num){

    switch(num){
        case 1:
            return operation.firstValue==''? false : true;
        case 2:
            return operation.secondValue==''? false : true;
        case 3:
            return operation.operator==''? false : true;

    }
}
function fillDisplay(e, flags){
    logic= e.target.id!='float' || !flags.floatHappened;

    if(logic){
        numberDisplay.textContent+=e.target.textContent;
    }
    if(e.target.id=='float'){
        flags.floatHappened=true;
    }
}

let numberDisplay= document.querySelector('#display');
let numbers=document.querySelector('#numbers');
let operators=document.querySelector('#operators');
let flags= {floatHappened: false, resetPending:false};
let operation= {firstValue: '', secondValue: '', operator: ''};


//event listener to operate the number display on the calculator
//logic checks if the element has become a float
numbers.addEventListener('click',function(e){
    if(e.target.tagName=='BUTTON' ){
        if(flags.resetPending){
            numberDisplay.textContent='';
            flags.floatHappened=false;
            flags.resetPending=false;
        }
        fillDisplay(e,flags);
        
    }
})

//event listener to operate the operators and do math with the calculator
operators.addEventListener('click', function(e){
    if(e.target.id=='CE'){
        resetOperation();
        flags.floatHappened=false;
        flags.resetPending=false;
        
        numberDisplay.textContent='';
    }
    else if(e.target.id=='equal'){
        if(numberDisplay.textContent!=''){
            operation.secondValue=numberDisplay.textContent
            numberDisplay.textContent=letOperationResolve();
            flags.resetPending=true;
            resetOperation();
        }

    }
    else{
        if(numberDisplay.textContent!='' && operation.firstValue==''){
            operation.firstValue=numberDisplay.textContent
            operation.operator=e.target.textContent
            flags.resetPending=true;
            console.log(operation)
        }
        else{
            operation.secondValue=numberDisplay.textContent
            numberDisplay.textContent=letOperationResolve();
            operation.firstValue=letOperationResolve();
            operation.secondValue=''
            operation.operator=e.target.textContent;
            flags.resetPending=true;
        }
    }
    
})

