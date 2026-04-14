/**
 * --------------------------------------------------------------------
 * B.Muthukumaraswamy for 2adpro
 * Copyright (c) 2012  Oct
 * Modified in Nov
 * --------------------------------------------------------------------
**/

(function($){

    $.fn.ad2profxnz = function(settings) {

        var defaults = {
            questions: null,
            weightageMessage: null,
            weightageImage : null,
            competitionForm: false,
            socialStatus: 'I scored {score}% on this awesome test! Check it out!',
            endText: 'Finished!',
            splashImage: 'img/splash.jpg',
            twitterImage: 'img/twitter.png',
            googleImage: 'img/google.png',
            facebookImage: 'img/facebook.png',
            shortURL: null,
            addTwitter: true,
            addFacebook: true,
            sendResultsURL: null,
            resultComments :
            {
                perfect: 'Food Fanatic',
                excellent: 'Nature Warrior',
                good: 'Eco-Luxe',
                average: 'Adventure Auditor',
                bad: 'Coastal Cruiser!'
            }

        };


        var config = $.extend(defaults, settings);

        if (config.questions === null)
        {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
            return;
        }

        var superContainer = $(this),
        answers = [],
        introFob = '<div class="intro-container slide-container" id="intro"><a class="nav-start" href="#"><img src="'+config.splashImage+'" /></a></div>	',
        resultFob = '<div class="results-container slide-container" id="showResult" data-background=""><div class="question-number">'+config.endText+'</div><div class="result-keeper"></div><div class="footer"></div></div>',
        exitFob = '<div class="slide-container" style="border-radius:10px; border-bottom:20px solid #3DAEE3;" data-background=""><div class="question">Involve Your Social Circle!</div><div class="competition-form">\n\
                    <div class="headerText">Click on the social media icons below to get your friends and family involved and find out their travel personality. The message below will be posted into your choosen social stream(s).</div>\n\
                    <div class="social-share"><img src="img/quote.png" class="quote" alt=""/><p>I just took the Travel Personality Quiz and am now in the running to win a $10,000 holiday. Take the quiz, discover you inner travel persona and be into a win too !</p>' + '<div class="social-icon" id="shareButton">&nbsp;</div></div><div class="button-list"><a href="#" class="button_continue">&nbsp;</a><a href="#" class="button_skip">&nbsp;</a></div></div><div class="nav-container"></div><div class="progress-keeper"></div>\n\
                   </div></div><div class="notice">Please select an option</div><div class="progress-keeper" ><div class="progress"></div></div>';

        contentFob = '';
        superContainer.addClass('main-quiz-holder');



        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            background = (typeof config.questions[questionsIteratorIndex].background === "undefined") ? "" : config.questions[questionsIteratorIndex].background;
            contentFob += '<div class="slide-container" data-background="'+background+'"><div id="qimg"><img src="img/Question.png"></div><div class="question">' + config.questions[questionsIteratorIndex].question +'</div>';

            $answerLength = config.questions[questionsIteratorIndex].answers.length;
            if(typeof config.questions[questionsIteratorIndex].answers_image === 'undefined' || config.questions[questionsIteratorIndex].answers_image == false){
                contentFob += "<ul class=\"answers\">";
                for (answersIteratorIndex = 0; answersIteratorIndex < $answerLength; answersIteratorIndex++) {
                    lastAnswerClass = ((answersIteratorIndex+1) == $answerLength) ? 'ansimg_lastans' : 'ansimg';
                    contentFob += '<li><div class="'+lastAnswerClass+'"><img src="img/answer.png"></div>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
                }
                contentFob += '</ul>';
            }else{
                contentFob += "<div class=\"img_answers\"><ul class=\"img_answers_list answers\">";
                for (answersIteratorIndex = 0; answersIteratorIndex < $answerLength; answersIteratorIndex++) {
                    contentFob += '<li class="img_answer"><div class="ansimg_image"><img src="img/answer1.png"></div><img src="' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '" alt=""/></li>';
                }
                contentFob += '</ul></div>';
            }

            contentFob += '<div class="nav-container">';

            if (questionsIteratorIndex !== 0) {
                contentFob += '<div class="prev"><a class="nav-previous" href="#">Prev</a></div>';
            }

            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#">Next</a></div>';
            }
            else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#">Finish</a></div>';
            }

            contentFob += '</div>';
            contentFob += '<div class="question-number">' + 'Question  ' + (questionsIteratorIndex + 1) + ' of ' + config.questions.length + '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }

        showCompetitionForm = (config.competitionForm.length > 0) ? true : false;
        competitionForm = '';
        if(showCompetitionForm){
            competitionForm = '<div class="slide-container" style="border-radius: 10px;" data-background=""><div class="question">$10,000 Australian Holiday Competition</div><div class="competition-form">\n\
                                <div class="headerText">Fill the details below to enter the draw and be into win an amazing</div>\n\
                                <form name="competitionForm" id="competitionForm" action="'+config.competitionForm+'"><table width="100%"  cellpadding="5" cellspacing="6" border="0"><tr><td style="width:60%" valign="top">\n\
                                    <div class="fieldset">\n\
                                    <table width="100%" border="0" cellpadding="0" cellspacing="10">\n\
                                        <tr><td width="1%" nowrap="">Name:</td><td align="right"><input type="text" id="competitionName"/></td></tr>\n\
                                        <tr><td width="1%" nowrap="">Email:</td><td align="right"><input type="text" id="competitionEmail"/></td></tr>\n\
                                        <tr><td width="1%" nowrap="">Phone:</td><td align="right"><input type="text" id="competitionPhone"/></td></tr>\n\
                                        <tr><td width="1%" nowrap="">Street:</td><td align="right"><input type="text" id="competitionStreet"/></td></tr>\n\
                                        <tr><td width="1%" nowrap="">Suburb:</td><td align="right"><input type="text" id="competitionSuburb"/></td></tr>\n\
                                        <tr><td width="1%" nowrap="">City:</td><td align="right"><input type="text" id="competitionCity"/></td></tr>\n\
                                        <tr><td colspan="2">Sunday Star Times Promo Code:<input type="text" id="competitionPromocode"/></td></tr>\n\
                                        <tr><td colspan="2" style="padding-top:20px;"><a href="javascript:;;" class="ajax-load" id="ajax-loader" style="display: none"><img src="img/ajax-loader.gif" alt="loading"></a><a href="javascript:;;" id="competitionEnter" class="button">Enter</a><a class="button" href="javascript:;;" id="competitionSkip">Skip</a></td></tr>\n\
                                    </table></div>\n\
                                </td><td valign="top">\n\
                                    <table border="0">\n\
                                        <tr><td>\n\
                                            <div class="fieldset box"><input type="checkbox" value="1" id="competitionTerm"> I accept the terms and conditions of this competition.<br>\n\
                                            <small><a href="#">Click here</a> to view the terms and conditions.</small></div>\n\</td></tr>\n\
                                        <tr><td>\n\
                                            <div class="fieldset box">I would like to receive additional information from ...\n\
                                            <p><input type="checkbox" value="1" id="competitionInformation1"> Tourism Australia</p>\n\
                                            <p><input type="checkbox" value="1" id="competitionInformation2"> Stuff.co.nz</p>\n\
                                            <p><input type="checkbox" value="1" id="competitionInformation3"> Qantas</p></div>\n\
                                        </td></tr>\n\
                                    </table>\n\
                                </td></tr></table></form>\n\
                               </div></div>';
        }


        superContainer.html(introFob + contentFob + resultFob + competitionForm + exitFob);
        /*
        * Make intro no box style
        */
        $('#intro').parent().css({
            'border':'0px',
            'box-shadow':'none',
            'background':'none'
        });



        var progress = superContainer.find('.progress'),
        progressKeeper = superContainer.find('.progress-keeper'),
        notice = superContainer.find('.notice'),
        progressWidth = progressKeeper.width() - 200,
        userAnswers = [],
        questionLength = config.questions.length,
        slidesList = superContainer.find('.slide-container');


        /*
         *  function styling image list
         */
        function styling_image_answers($obj){
            /**
            * first gives us the position of the album on the left
            * positions are the left positions for each of the 5 albums displayed at a time
            */
           var positions 	= {
               '0'	: 10,
               '1' 	: 170,
               '2' 	: 330,
               '3' 	: 490,
               '4' 	: 650
           }

           //$obj.css({'min-height':'440px;'});
           notice.css({'bottom':'85px'});
           $img_answers_list = $obj.find('.img_answers_list');
           /**
            * number of albums available
            */
           var elems = $img_answers_list.children().length;

           /**
            * let's position all the albums on the right side of the window
            */
           var hiddenRight 	= $(window).width() - $img_answers_list.offset().left;
           $img_answers_list.children('ul').css('left',hiddenRight + 'px');

           /**
            * move the first 5 albums to the viewport
            */
           $img_answers_list.children('li:lt(5)').each(
           function(i){
               var $elem = $(this);
               $elem.animate({'left': positions[i] + 'px','opacity':1},800,function(){});
           });
        }

        function checkAnswers() {
            var resultArr = [],
            flag = false;
            for (i = 0; i < answers.length; i++) {

                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }

        function roundReloaded(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        function changeBackground($obj){
            if($obj.attr('data-background') == "" || $obj.attr('data-background') === 'undefined'){
                superContainer.removeAttr('style');
            }else{
                $background = 'url('+$obj.attr('data-background')+')';
                superContainer.css('background-image', $background);
            }
        }

        progressKeeper.hide();
        notice.hide();
        slidesList.hide().first().fadeIn(500);

        superContainer.find('li').click(function() {
            var thisLi = $(this);

            thisLi.parents('.answers').children('li').find('.ansimg_image, .ansimg, .ansimg_lastans').hide();

            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.find('.ansimg_image, .ansimg, .ansimg_lastans').show();
                thisLi.addClass('selected');
            }
        });


        superContainer.find('.nav-start').click(function() {

            superContainer.attr('style', '');

            $(this).parents('.slide-container').fadeOut(500, function() {
                changeBackground($(this).next());
                $(this).next().fadeIn(500);
                progressKeeper.fadeIn(500);
            });

            if($(this).parents('.slide-container').next().find('.img_answers_list').length > 0 ){
                styling_image_answers($(this).parents('.slide-container').next());
            }else{
                notice.attr('style', 'display:none');
            }

            return false;

        });

        superContainer.find('.next').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }

            notice.hide();
            $(this).parents('.slide-container').fadeOut(500, function() {
                changeBackground($(this).next());
                $(this).next().fadeIn(500);
            });
            progress.animate({
                width: progress.width() + Math.round(progressWidth / questionLength)
            }, 500);


            if($(this).parents('.slide-container').next().find('.img_answers_list').length > 0 ){
                styling_image_answers($(this).parents('.slide-container').next());
            }else{
                notice.attr('style', 'display:none');
            }

            return false;
        });

        superContainer.find('.prev').click(function() {

            notice.hide();
            $(this).parents('.slide-container').fadeOut(500, function() {
                changeBackground($(this).prev());

                $(this).prev().fadeIn(500);
            });

            progress.animate({
                width: progress.width() - Math.round(progressWidth / questionLength)
            }, 500);

            if($(this).parents('.slide-container').prev().find('.img_answers_list').length > 0 ){
                styling_image_answers($(this).parents('.slide-container').next());
            }else{
                notice.attr('style', 'display:none');
            }

            return false;
        });

        var shareButton = '';
        superContainer.find('.final').click(function() {

            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }

            superContainer.find('li.selected').each(function(index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });

            if (config.sendResultsURL !== null)
            {
                console.log("OH HAI");
                var collate =[];
                for (r=0;r<userAnswers.length;r++)
                {
                    collate.push('{questionNumber:"'+parseInt(r+1)+'", UserAnswer:"'+userAnswers[r]+'"}');
                }
                $.ajax({
                    type: 'POST',
                    url: config.sendResultsURL,
                    data: '[' + collate.join(",") + ']',
                    complete: function () {
                        console.log("OH HAI");
                    }
                });
            }

            progressKeeper.hide();
            superContainer.find('.question-number').hide();
            var results = checkAnswers(),
            resultSet = '',
            trueCount = 0,
            score,
            url,
            $theWeightage = Array();
            $finalWeightageArray = Array();


            // Function to get the Max value in Array
            Array.max = function( array ){
                return Math.max.apply( Math, array );
            };
            /**
             * Get max length of weightage array
             */
            var $listWeightageLength = Array();
            for (var i = 0, toLoopTill = results.length; i < toLoopTill; i++) {
                $weightageLength = config.questions[i].Weightage.length;
                $listWeightageLength[i] = $weightageLength;
            }
            var $maxWeightageLength = Array.max($listWeightageLength);

            //Function to get String Weightage Message
            var indexWeightageWinner = 0;
            var Weightage = {
                msg : function(maxValue, listData){
                    var str = 'Weightage';
                    for($i=0; $i<listData.length; $i++){
                        if(listData[$i] == maxValue){

                            if(config.weightage_message === 'undefined' || config.weightage_message === null){
                                $idx = $i+1;
                                str += ' '+($idx);
                            }else{
                                str = config.weightageMessage[$i];
                                indexWeightageWinner = $i;
                            }
                            break;
                        }
                    }
                    return str;
                },
                list: function(listData){
                    str = '<div class="weightage-list"><ul>';

                    var $firstObj = [];

                    for($i=0; $i<$maxWeightageLength; $i++){
                        $firstObj.push(0);
                    }
                    $firstObj = $M([
                        $firstObj
                        ]);

                    var $totalMatrix = $firstObj;
                    for($i=0; $i<listData.length; $i++){
                        $nextObj = [];
                        for($z=0; $z<listData[$i].length; $z++){
                            $nextObj.push(listData[$i][$z]);
                        }

                        m = $M([
                            $nextObj
                            ]);

                        $totalMatrix = m.add($totalMatrix);
                    }

                    $totalMatrix = $totalMatrix.elements;
                    for($i=0; $i<$totalMatrix.length; $i++){
                        $theMatrix = $totalMatrix[$i];
                        for($x=0; $x<$theMatrix.length; $x++){
                            $idx = $x+1;
                            str += '<li>Weightage '+($idx)+': '+$theMatrix[$x]+'</li>';
                            $finalWeightageArray[$x] = $theMatrix[$x];
                        }
                    }

                    str += '</ul></div>';
                    return str;
                }
            }

            if (config.shortURL === null)  {
                config.shortURL = window.location
            };


            for (var i = 0, toLoopTill = results.length; i < toLoopTill; i++) {
                if (results[i] === true) {
                    trueCount++;
                    isCorrect = true;
                }
                /* resultSet += '<div class="result-row"> Question #' + (i + 1) + (results[i] === true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Incorrect</span></div>");*/
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";

                $theWeightage[i] = new Array($maxWeightageLength);
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }

                    $wVal = 0;
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                        $wVal = (typeof( config.questions[i].Weightage[answersIteratorIndex] ) === 'undefined') ? 0 : config.questions[i].Weightage[answersIteratorIndex];
                        $theWeightage[i][answersIteratorIndex] = $wVal;
                    }

                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                    //calculate selected weightage
                    $theWeightage[i][answersIteratorIndex] = $wVal;
                }
                resultSet += '</ul></div></div>';

            }

            $listWeightage  = Weightage.list($theWeightage);
            $judgeWeightage = Weightage.msg(Array.max($finalWeightageArray), $finalWeightageArray);
            score = roundReloaded(trueCount / questionLength * 100, 2);

            if (config.addTwitter !== false)
            {
                shareButton += '<a href="http://twitter.com/?status='+'I just took the Travel Personality Quiz and am now in the running to win a $10,000 holiday. Take the quiz,discover you inner travel persona and be into a win too!'+' @ '+config.shortURL+'" class="share-button-twitter" target="_blank" ><img src="'+config.twitterImage+'" /></a>';
                shareButton += '<a href="https://m.google.com/app/plus/x/?v=compose&'+'I just took the Travel Personality Quiz and am now in the running to win a $10,000 holiday. Take the quiz, discover you inner travel persona and be into a win too!'+' @ '+config.shortURL+'" class="share-button-twitter" target="_blank" ><img src="'+config.googleImage+'" /></a>';

            }

            if (config.addFacebook !== false)
            {
                shareButton += '<a href="http://www.facebook.com/sharer/sharer.php?s=100&p[title]='+'I just took the Travel Personality Quiz and am now in the running to win a $10,000 holiday. Take the quiz, discover you inner travel persona and be into a win too!'+'&p[url]= '+config.shortURL+' &p[summary]=yoursummary&p[images][0]=yourimage" class="share-button-fb" target="_blank" ><img src="'+config.facebookImage+'" /></a><div class="ad2profxnz-clear"></div>';
            }

            $judgeWeightageImg = config.weightageImage[indexWeightageWinner];
            otherWeightageImage = '';
            for($i=0; $i<config.weightageImage.length; $i++){
                if($i === indexWeightageWinner){
                    continue;
                }
                //otherWeightageImage +=  '<span><img src="'+config.weightageImage[$i]+'" alt=""/></span>';
				/*otherWeightageImage +=  '<span><img src="'+config.weightageImage[$i-2]+'" alt="test"/></span>';
				if (config.weightageImage[$i-1] ==1){
					alert('this test');
					}*/
					
            }
			//var element = $('#skill_list').val().split(",");
			for(l = 0; l < otherWeightageImage.length; ++l) {
				alert('this test');
				/*$($('#skill_list').val().split(",")).each(function(index, value) {
					alert('this test');
					})*/;

}
            resultSet = '<h2 class="qTitle">Welcome '+$judgeWeightage+' </h2><div class="resultpage"><div id="your_weightage"><img src="'+$judgeWeightageImg+'" alt=""/></div><div id="weightageMessage"><p>'+$judgeWeightage+'</p>Sample text sample text Sample text<a href="javascript:;;" class="button_continue" id="resultContinueBtn">&nbsp;</a></div></div>\n\
                        <div class="other_skill"><h3>No quite the experience you were looking for?</h3>\n\
                        <h3>Are you one of the following:</h3>\n\
                        <div class="skill_list">'+otherWeightageImage+'</div></div></div>';

            superContainer.find('.result-keeper').html(resultSet).show(500);
            superContainer.find('.resultsview-qhover').hide();

            superContainer.find('.result-row').hover(function() {
                $(this).find('.resultsview-qhover').show();
            }, function() {
                $(this).find('.resultsview-qhover').hide();
            });

//            $(this).parents('.slide-container').fadeOut(500, function() {
//                $(this).next().fadeIn(500);
//            });

            superContainer.find('#resultContinueBtn').click(function() {
                $('#showResult').fadeOut(500, function() {
                    if(showCompetitionForm){
                        $(this).next().next().find('#shareButton').html(shareButton);
                    }else{
                        $(this).next().find('#shareButton').html(shareButton);
                    }
                    $(this).next().fadeIn(500);
                });
                return false;
            });

            return false;
        });

        /**
         * Competition Function
         */

        superContainer.find('#competitionSkip').click(function() {

            $(this).parents('.slide-container').fadeOut(500, function() {
                $(this).next().fadeIn(500);
            });

            return false;

        });


		var competition0 = {isValiteName: function (name){
				var nameRegex = new RegExp(/^[a-zA-Z]+$/);
				 return nameRegex.test(name);
				}
			}
		var competition1 = {
			isChecked: function (check){
				//<input type="checkbox" value="1" id="competitionTerm">
				//$('input:radio[name=sex]:nth(0)').attr('checked',true);
			/*	if (check.is(':checked'))
				return 1;
				return 0;*/
				//var nameRegex = new RegExp(/^[a-z0-9-]+$/);
				var nameRegex = new RegExp($('#competitionTerm:checked').checked = false);
				 return nameRegex.test(check=true);
				//$('#competitionTerm:checked');
				 //return isChecked(check);
				}
			}
        var competition = {
            isValidEmailAddress : function(emailAddress){
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            },
            validate : function(){
                var error = 1;
                var hasError = false;
				//var statusNum=competition1($("#competitionTerm"));
				
				if(competition.isValidEmailAddress($('#competitionEmail').val()) == false){
                    $('#competitionEmail').css('background-color','#FFEDEF');
                    $('#competitionEmail').focus();
                    hasError = true;
                }
				if (competition0.isValiteName($('#competitionName').val()) == false){
					 $('#competitionName').css('background-color','#FFEDEF');
                    $('#competitionName').focus();
					hasError = true;
				}
				if (competition1.isChecked($('#competitionTerm').val()) == false) {	 
					$('#competitionTerm').css('background-color','#FFEDEF');
					 $('#competitionTerm').focus();
					hasError = true;
				}

                if(hasError){
                    error = false;
                }
                return error;
            }
        }

        superContainer.find('#competitionEnter').click(function() {
            $this = $(this);
            $ajaxLoader = $('#ajax-loader');

            $ajaxLoader.show();
            $this.hide();

            noError = competition.validate();
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
                    $ajaxLoader.hide();
                    $this.show();
                    $this.parents('.slide-container').fadeOut(500, function() {
                        $(this).next().fadeIn(500);
                    });
                });
            }else{
                $ajaxLoader.hide();
                $this.show();
            }

        });

    };

})(jQuery);