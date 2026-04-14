var contact = {
    isValidEmailAddress : function(emailAddress){
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    },
    validate : function(){
        var error = 1;
        var hasError = false;
		/*
        $('#competitionForm').find(':input:not(button)').each(function(){
            var $this 		= $(this);

            if($this.hasClass('required') && !$this.is(':disabled')){
                var valueLength = jQuery.trim($this.val()).length;

                if(valueLength == ''){
                    $this.css('background-color','#FFEDEF');
                    $this.focus();
                    hasError = true;
                }else{
                    $this.css('background-color','#FFFFFF');
                }
            }
        });
		*/

        if(contact.isValidEmailAddress($('#competitionEmail').val()) == false){
            $('#competitionEmail').css('background-color','#FFEDEF');
            $('#competitionEmail').focus();
            hasError = true;
        }

        if(hasError){
            error = -1;
        }
        return error;
    }
}

$(function(){
    var btn = $('#competitionEnter').click(function () {
	    $this = $(this);		
		$ajaxLoader = $('#ajax-loader');
		
		$ajaxLoader.show();
		$this.hide();
		
        noError = contact.validate();
        if(noError == 1){
            var params = {
                'name': $('#competitionName').val(),
                'email': $('#competitionEmail').val(),
                'phone': $('#competitionPhone').val(),
                'street': $('#competitionStreet').val(),
                'suburb': $('#competitionSuburb').val(),
                'city': $('#competitionCity').val(),
                'promocode': $('#competitionPromocode').val(),
                'term_agreement': $('#competitionTerm').val(),
                'information1': $('#competitionInformation1').val(),
                'information2': $('#competitionInformation2').val(),
                'information3': $('#competitionInformation3').val()
            };
            var str = jQuery.param(params);
            url = $('#competitionForm').attr('action');
            thanks_message = ($this.attr('data-thanks-message') === 'undefined') ? '' : $this.attr('data-thanks-message');
            error_message = ($this.attr('data-error-message') === 'undefined') ? '' : $this.attr('data-error-message');
            
            $.post(url, str, function(response){
                if(response == 1){				
					$ajaxLoader.hide();
					$this.show();					
                }else{
					$ajaxLoader.hide();
					$this.show();					
                }
            });
        }else{
			$ajaxLoader.hide();
			$this.show();		
		}       
    });
});