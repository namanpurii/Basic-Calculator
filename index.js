var arr = [];
//Adding event listener to all the buttons
for(var i=0; i<document.querySelectorAll("button").length; i++)
{
    document.querySelectorAll("button")[i].addEventListener("click", getExpression);
}   

function getExpression(event)
{
    var buttonClicked = event.target;
    var symbol = buttonClicked.textContent;
    var eval;
    if(symbol!="del" && symbol!="clear" && symbol!="Enter")
    {
        arr.push(symbol);
        document.querySelector(".res").textContent+=symbol;
    }
    
    else if(symbol=="clear"){
        arr=[];
        document.querySelector(".res").textContent="";
    }

    else if(symbol=="del"){
        //if symbol is "del"
        var currentText = document.querySelector(".res").textContent;
        var modifiedText = currentText.substring(0, currentText.length - 1);
        document.querySelector(".res").textContent = modifiedText;
        arr.pop();
    }

    else if(symbol=="Enter" && arr.length>0){
        eval =  calculateExpressionString();
        document.querySelector(".res").textContent = eval;
        if(eval=="Invalid expression" || eval=="Error evaluating expression")
        {
            setTimeout(function() {
                document.querySelector(".res").textContent = "";
              }, 1000);
        }
    }
}

function calculateExpressionString(){   
    var str = getExpressionString();
    var result;
    try {
        result = eval(str);
        if (Number.isFinite(result)) {
            document.querySelector(".expr").textContent = getExpressionString()+"=";
            arr=[result];
          return result;
        } else {
            arr=[];
          return "Invalid expression";
        }
      } catch (error) {
        arr=[];
        return "Error evaluating expression";
      }
}

function getExpressionString()
{
    var str="";
    for(var i=0;i<arr.length; i++)
    {
        str+=arr[i];
    }

    if(str=="")
        return "NaN";

    return str;
}