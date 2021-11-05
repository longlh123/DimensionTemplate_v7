/*
obj = {
    placeholder : "text", //a symbol or piece of text that temporarily replaces st that is missing. 
    validation : "checkphonenumber", //the act of proving that st is true or correct
    type : "text|long|double", 
    questiontype : "TOM-SPON", //TOM-SPON: Using for the TOM_SPON question
    videoid : "string", //Ma video tu Youtube
    sum : value
}
*/
function convertJSON(s){
    var obj = {};
    
    var a = s.split(',');

    for(var i in a){
        var b = a[i].split(':');
        obj[b[0].toLowerCase()] = b[1];
    }

    //set the default value of type of a text field is 'text'.
    if(!obj.hasOwnProperty('type')) obj['type'] = 'text';
    //set the default value of type of a questiontype is default
    if(!obj.hasOwnProperty('questiontype')) obj['questiontype'] = 'default';
    //set the default value of validation is null.
    if(!obj.hasOwnProperty('validation')) obj['validation'] = null;
    //set the default value of placeholder
    if(!obj.hasOwnProperty('placeholder')) obj['placeholder'] = 'Điền câu trả lời...'
    //set the default value of step
    if(!obj.hasOwnProperty('step')) obj['step'] = 1

    return obj;
}