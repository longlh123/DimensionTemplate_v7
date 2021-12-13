class Conjoint{
    constructor(id){
        this.html = {
            root : objHTML.get(id)[0]
        }
        this.init();
    }

    init(){
        this.render();
    }

    render(){
        let msg_error = "";

        let mrErrorTexts = this.html['root'].querySelectorAll('.mrErrorText');

        mrErrorTexts.forEach(function(item, index){
            item.style.display = "none";

            msg_error = item.textContent;
        });

        this.html.attributes = this.html['root'].querySelectorAll('.mrGridCategoryText');

        this.html.conjointMsgError = objHTML.template("<div class='error'>" + msg_error + "</div>")

        if(msg_error.length == 0){
            this.html.conjointMsgError.style.display = "none";
        } else {
            this.html.conjointMsgError.style.display = "block";

        }
        
        this.html['root'].appendChild(this.html.conjointMsgError);

        this.html.conjointWrapper = objHTML.template("<div class='conjoint-wrapper'></div>");

        this.html['root'].appendChild(this.html.conjointWrapper);

        this.html.conjointButton = objHTML.template("<div class='attr-button'><button type='button' id='btnNone'>KHÔNG CHỌN SẢN PHẨM NÀO</button></div>");

        this.html['root'].appendChild(this.html.conjointButton);

        this.renderAttributes();
    }

    renderAttributes(){
        let that = this;

        this.html.attributes.forEach(function(attr, index){
            attr.style.removeProperty('text-align');
            attr.style.removeProperty('vertical-align');

            let childHTML = objHTML.template("<div class='attr'</div>");

            let attrControlHTML = objHTML.template("<div class='attr-control'></div>");
            attrControlHTML.appendChild(attr.nextElementSibling);

            if(attrControlHTML.querySelectorAll('.mrErrorText').length > 0){
                attrControlHTML.querySelectorAll('.mrErrorText')[0].style.display = "none";
            }

            let attPriceHTML = objHTML.template("<div class='price'>Đơn giá: " + attr.querySelectorAll('.price')[0].textContent + "</div>");

            attr.querySelectorAll('.price')[0].remove();

            let attrTextHTML = objHTML.template("<div class='attr-text'></div>");
            attrTextHTML.appendChild(attr);

            childHTML.appendChild(attrTextHTML);
            childHTML.appendChild(attPriceHTML);
            childHTML.appendChild(attrControlHTML);

            that.html.conjointWrapper.appendChild(childHTML);
        }); 
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

        console.log(conjoint.sum());

        if(conjoint.sum() == 0){
            conjoint.html.conjointMsgError.textContent = "Vui lòng chọn ít nhất 1 nhãn hiệu và nhập số lượng bạn muốn mua.";
            conjoint.html.conjointMsgError.style.display = "block";
            e.preventDefault();
        } else {
            conjoint.html.conjointMsgError.textContent = "";
            conjoint.html.conjointMsgError.style.display = "none";
        }
    });
});