class Conjoint{
    constructor(id){
        this.allowNext = false;
        
        this.html = {
            root : objHTML.get(id)[0]
        }
        this.init();
    }

    init(){
        this.render();
    }

    render(){
        this.html.attributes = this.html['root'].querySelectorAll('.mrGridCategoryText');

        this.html.conjointMsgError = objHTML.template("<div class='error'></div>")
        this.html.conjointWrapper = objHTML.template("<div class='conjoint-wrapper'></div>");
        this.html.conjointButton = objHTML.template("<div class='attr-button'><button type='button' id='btnNone'>KHÔNG CHỌN SẢN PHẨM NÀO</button></div>");

        this.html['root'].appendChild(this.html.conjointMsgError);
        this.html['root'].appendChild(this.html.conjointWrapper);
        this.html['root'].appendChild(this.html.conjointButton);

        this.hideErrorTexts();
        this.renderAttributes();
        
        let that = this;
        
        this.html.conjointButton.querySelector('#btnNone').addEventListener('click', function(e){
            that.setValue(0);
            this.setAttribute('disabled', "");
        });
    }

    setValue(v){
        let inputs = this.html.conjointWrapper.querySelectorAll('input[type=text]');

        inputs.forEach(function(input, index){

            input.value = v;
        });

        this.allowNext = true;
    }

    renderAttributes(){
        let that = this;

        let count = 0;

        this.html.attributes.forEach(function(attr, index){
            that.clearProperty(attr);
            
            let childHTML = objHTML.template("<div class='attr'</div>");

            let attrControlHTML = objHTML.template("<div class='attr-control'></div>");
            attrControlHTML.appendChild(attr.nextElementSibling);

            let attPriceHTML = objHTML.template("<div class='price'>Đơn giá: " + attr.querySelectorAll('.price')[0].textContent + "</div>");
            attr.querySelectorAll('.price')[0].remove();
            
            let attDiscountHTML = objHTML.template("<div class='discount'>GIẢM " + attr.querySelectorAll('.discount')[0].textContent + " %</div>");
            attr.querySelectorAll('.discount')[0].remove();

            let attrTextHTML = objHTML.template("<div class='attr-text'></div>");
            attrTextHTML.appendChild(attr);

            let input = attrControlHTML.querySelector('input[type=text]');

            if(input.value.length == 0){
                count++;
            }

            input.addEventListener('change', function(e){

                if(e.target.value.length > 0){
                    if(e.target.value > 0){
                        let btn = that.html.conjointButton.querySelector('#btnNone');
                        
                        if(btn.hasAttribute('disabled')){
                            btn.removeAttribute('disabled');
                        }
                    }
                }
            });

            childHTML.appendChild(attrTextHTML);
            childHTML.appendChild(attDiscountHTML);
            childHTML.appendChild(attPriceHTML);
            childHTML.appendChild(attrControlHTML);

            that.html.conjointWrapper.appendChild(childHTML);
        }); 

        this.allowNext = !(this.count() == count);
    }

    clearProperty(attr){
        attr.style.removeProperty('text-align');
        attr.style.removeProperty('vertical-align');
    }

    hideErrorTexts(){
        let msg_error = "";

        let mrErrorTexts = this.html['root'].querySelectorAll('.mrErrorText');

        if(mrErrorTexts.length > 0){
            mrErrorTexts.forEach(function(item, index){
                item.style.display = "none";
                msg_error = item.textContent;
            });
        }

        if(msg_error.length == 0){
            this.html.conjointMsgError.style.display = "none";
        } else {
            this.html.conjointMsgError.style.display = "block";
        }

        this.html.conjointMsgError.textContent = msg_error;
    }

    count(){
        return this.html['root'].querySelectorAll('.mrGridCategoryText').length;
    }

    sum(){
        let s = 0;

        this.html.conjointWrapper.childNodes.forEach(function(attr, index){

            let txt = attr.querySelectorAll('input')[0];
            s += (txt.value.length == 0 ? 0 : parseInt(txt.value));
        });

        return s;
    }
}

document.addEventListener("DOMContentLoaded", function(){

    let conjoint = new Conjoint('.conjoint-container');

    let btnSubmit = document.getElementsByName('_NNext')[0];

    btnSubmit.addEventListener('click', function(e){

        if(conjoint.allowNext){
            conjoint.html.conjointMsgError.textContent = "";
            conjoint.html.conjointMsgError.style.display = "none";
        } else {
            if(conjoint.sum() == 0){
                conjoint.html.conjointMsgError.textContent = "Vui lòng chọn ít nhất 1 nhãn hiệu và nhập số lượng bạn muốn mua.";
                conjoint.html.conjointMsgError.style.display = "block";
                e.preventDefault();
            }
        }
    });
});