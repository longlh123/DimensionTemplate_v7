(function($){
    /*
    obj = {
        placeholder : "text", //a symbol or piece of text that temporarily replaces st that is missing. 
        validation : "checkphonenumber", //the act of proving that st is true or correct
        type : "text|long|double", 
        questiontype : 
            "TOM-SPON": Using for the TOM_SPON question
            "DATE"    : Using for the DATEBASIC question with textcontentrule by DD/MM/YYYY or MM/YYYY
            "CLOSENESS-SLIDER" : Using for the CLOSENESS question with minRange:1 and maxRange:100
            "RANGE-SLIDER": Using for the RANGE SLIDER question with minRange:1 and maxRange:5|7|9|11
        sum : value
    }
    */
    $.fn.convertJSON = function(s){
        var obj = {};
        var a = s.split(',');
        $.each(a, function(k, v){
            var b = v.split(':');
            obj[b[0].toLowerCase()] = b[1];
        });

        //set the default value of type of a text field is 'text'.
        if(!obj.hasOwnProperty('type')) obj['type'] = 'text';
        //set the default value of type of a questiontype is default
        if(!obj.hasOwnProperty('questiontype')) obj['questiontype'] = 'default';
        //set the default value of step
        if(!obj.hasOwnProperty('textcontentrule')) obj['textcontentrule'] = "DD/MM/YYYY";
        //set the default value of validation is null.
        if(!obj.hasOwnProperty('validation')) obj['validation'] = null;
        
        if(obj['validation'] != null && (obj['type'] == 'long' || obj['type'] == 'double')){
            var regExp = new RegExp(/checksum\([0-9]*\)/);

            if(regExp.test(obj['validation'].toLowerCase())){
                var str = obj['validation'].toLowerCase().replace('checksum(', '');
                str = str.replace(')', '');

                obj['validation'] = "checksum";
                obj['sumcheck'] = (obj['type'] == 'long' ? parseInt(str) : parseFloat(str));
            }
        }
        //set the default value of placeholder
        if(!obj.hasOwnProperty('placeholder')) obj['placeholder'] = 'Điền câu trả lời...'
        //set the default value of step
        if(!obj.hasOwnProperty('step')) obj['step'] = 1
        return obj;
    };

    $.fn.formatNumber = function(num, lang) {
        switch(lang)
        {
            case "vi-vn":
                var n = num.toString().split(',');
                p = n[0].toString().split('.').join('');  
                return p.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.') + (n.length == 2 ? "," + n[1] : "");
                break;
            default:
                var n = num.toString().split('.');
                p = n[0].toString().split(',').join('');  
                return p.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.') + (n.length == 2 ? "." + n[1] : "");
                break;
        }
    };
    
    $.fn.convertToNumber = function(n, type, lang){

        if(n.length == 0) return 0;
        
        var x = n;
        x = x.split((lang == "vi-vn" ? "." : ",")).join('');
        return (type == "long" ? parseInt(x) : parseFloat(x));
    };

    $.fn.valCheckPhoneNumber = function(n){
        var regexPattern = new RegExp(/^[0-9]{8,10}$/);
        return regexPattern.test(n);
    };

    $.fn.valCheckCellPhoneNumber = function(n){
        var regexPattern = new RegExp(/0((3[2-9]|5[2,6,8,9]|7[0,6-9]|8[1-6,8,9]|9[0-9])|(12[0-9]|16[2-9]|18[6,8]|199))[0-9]{7}$/);
        return regexPattern.test(n);
    };

    $.fn.valCheckEmail = function(n){
        var regexPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexPattern.test(n);
    };

    $.fn.valCheckSpecialCharacters = function(str){
        var regexPattern = new RegExp(/[!#$%^&*_+\-=\[\]{};'"\\|<>\/?]+/, 'g'); ///[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        return regexPattern.test(str);
    }

    $.fn.valCheckDate = function(dt){
		
		var d = parseInt(dt.substring(0, 2));
		var m = parseInt(dt.substring(3, 5));
		var y = parseInt(dt.substring(6, 11));
		
		var result = false;
		
		switch(m)
		{
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				if(d >= 1 && d <= 31)
				{
					result = true;
				}
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				if(d >= 1 && d <= 30)
				{
					result = true;
				}
				break;
			case 2:
				if(y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0))
				{
					if(d >= 1 && d <= 29)
					{
						result = true;
					}
				}
				else
				{
					if(d >= 1 && d <= 28)
					{
						result = true;
					}
				}
		}
		
		return result;
	};

}(jQuery));