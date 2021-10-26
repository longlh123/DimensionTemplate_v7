window.onload = function(){

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        console.log("is dark mode");
        //document.getElementById("idlogo").src = "https://images1.ipsosinteractive.com/ABC_VIETNAM_10072020/source/images/Logo TCB-03.png";
    }

    var elements = document.getElementsByTagName("input");
    
    for(var i = 0; i < elements.length; i++)
    {
        switch(elements[i].type)
        {
            case "submit":
                elements[i].style.removeProperty("width");
                break;
            case "text":
            case "checkbox":
            case "radio":
                elements[i].style.removeProperty("margin-left");
                break;
        }
    }

    var elements = document.getElementsByTagName("textarea");

    for(var i = 0; i < elements.length; i++)
    {
        elements[i].style.removeProperty("margin-left");
    }

    var elements = document.getElementsByTagName("select")
    
    for(var i = 0; i < elements.length; i++)
    {
        elements[i].style.removeProperty("margin-left");
    }

    var elements = document.getElementsByClassName("mrErrorText");

    for(var i = 0; i < elements.length; i++)
    {
        elements[i].style.removeProperty("color");
        elements[i].style.removeProperty("font-weight");
        elements[i].style.removeProperty("border-color");
    }

    var elements = document.getElementsByClassName("mrQuestionTable");

    for(var i = 0; i < elements.length; i++)
    {
        elements[i].style.removeProperty("display");
        elements[i].style.removeProperty("margin-left");
    }

    var elements = document.getElementsByClassName("mrMultipleText");

    for(var i = 0; i < elements.length; i++)
    {
        elements[i].style.removeProperty("text-align");
        elements[i].style.removeProperty("vertical-align");
    }
    
    var mrPrevs = document.getElementsByName("_NPrev");
    
    if(mrPrevs.length > 0){

        console.log(!mrPrevs[0].hasOwnProperty('display'));

        if(!mrPrevs[0].hasOwnProperty('display')){
            mrPrevs[0].style.visibility = "visible";
            //mrPrevs[0].style.display = "none";
        }
    }
}	

/*
jQuery(function($){

    $('.mrNext').prop('disabled', false);

    $('.content').each(function(){
        if($(this)[0].scrollHeight > $(this).innerHeight()){
            $('.mrNext').prop('disabled', true);
        }
    });

    $('.content').on('scroll', function(){

        //console.log($(this).scrollTop() + $(this).innerHeight());
        //console.log($(this)[0].scrollHeight);

        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
            $('.mrNext').prop('disabled', false);
        } else {
            $('.mrNext').prop('disabled', true);
        }
    });
});
*/
