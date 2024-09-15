(function($) {

    $.fn.isValid = function() {
        var value = $.trim(this.val());
        
        var placeholder = this.attr("placeholder");
        if (value == placeholder){
            value = '';
        }

        switch (this.attr('type').toLowerCase()) {
            case 'text':
                if (!value || (value === ''))
                    return false;
                break;

            case 'tel':
                // Quita los caracteres:
                //  '+', '.', ' ', '(', ')'
                var tel = value.replace(/(\()|(\))|(\-)|(\.)|(\+)|(\ )/g,'');

                if (!tel || (tel === ''))
                    return false;
                
                var filtro = /^\d+$/;
                if (filtro.test(tel) == true)
                    return true;
                else
                    return false;
                
                break;

            case 'email':
                if (!value || (value === ''))
                    return false;

                var filtro = /^[A-Za-z][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9_.]+[A-za-z]$/;
                if (filtro.test(value) == true)
                    return true;
                else
                    return false;
                break;

            default:
                return true;
        }
        return true;
    };
})(jQuery);