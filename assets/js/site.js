$(document).ready(function() {
  preloadImage('/images/cardBack.png');
  animating = false;
  spinnerOpts = {top: '50%'};
});

$('#startQuizBtn').click(function() {
  //Animate Fade
  animating = true;
  quizSetup = $('#quizSetup');
  quizSetup.removeClass('fadeIn').addClass('fadeOut');
  quizSetup.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', setAnimateToFalse);
  //Load Spinner
  mainWell = document.getElementById('mainWell');
  loadingSpinner = new Spinner(spinnerOpts).spin(mainWell);

  //Load Values
  var qClass = $('#classSelect').val();
  var qType = $('#typeSelect').val();
  var qSet = $('#setSelect').val();

  postData = {qClass : qClass, qType : qType, qSet : qSet};

  console.log(postData);

  io.socket.post('/customQuiz', postData, function (data, jwres) {
    console.log(data);
    //Shuffle Quiz
    //Output Is Same Per Quiz Settings If You Shuffle Once
    var rn = Math.floor(Math.random() * (1 - 100) + 1);
    quizDeck = _.shuffle(data);
    for (i = 0; i < rn; i++) {
      quizDeck = _.shuffle(quizDeck);
    }
    //Load Card Name / Back / QuizSetup / Card Count
    mainCardName = $('#mainCardName');
    mainImage = $('#mainImage');
    cardsCount = $('#cardsCount');
    cardsTotal = $('#cardsTotal');
    console.log(quizDeck);
    //Hide Setup
    if (animating == false) {
      initialDataLoad();
    }
    else {
      setTimeout(function() {initialDataLoad();}, 1250);
    }

  });
});

$('#mainImage').click(function() {
  if (animating == false) {
    if (mainImage.attr('side') == 'back') {
      animating = true;
      mainCardName.removeClass('initialAnimation');
      mainImage.removeClass('initialAnimation').removeClass('fadeIn').addClass('fadeOut');
      mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', loadNewCard);
    }
    else {
      animating = true;
      cardsCount.removeClass('fadeIn').addClass('fadeOut');
      mainImage.removeClass('fadeIn').addClass('fadeOut');
      mainCardName.removeClass('fadeIn').addClass('fadeOut');
      mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', loadCardBack);
    }
  }
});

function initialDataLoad() {
  $('#quizSetup').removeClass('initialAnimation');
  $('#quizSetup').hide();
  //Preload First 3 Images
  for (i = 0; i < 3; i++) {
    preloadImage(quizDeck[i].imageLink);
  }
  //Load Card Total
  cardsTotal.text(quizDeck.length);
  //Load Card Back
  loadCardBack();
  //Stop Spinner
  loadingSpinner.stop();
  //Make Sure First 3 Cards Are Cached
  var cached = false;
  while (cached == false) {
    cached = setInterval(is_cached(quizDeck[2].imageLink), 200);
  }
  //Display Card Quiz
  $('#cardCount').removeClass('fadeOut').addClass('fadeIn');
  $('#instructionText').removeClass('fadeOut').addClass('fadeIn');
  mainCardName.addClass('initialAnimation');
  mainImage.addClass('initialAnimation');
  $('#cardQuiz').removeClass('hidden');
  $('#quizSetup').removeClass('fadeIn');
}

function preloadImage(url) {
  var image = $('<img />').attr('src', url);
}

function is_cached(url) {
  var image = new Image();
  image.src = url;

  return image.complete;
}

function loadNewCard() {
  if (typeof quizDeck[3] !== 'undefined') {
    preloadImage(quizDeck[3].imageLink);
  }
  var currentCard = quizDeck.shift();
  var cached = false;
  var spinning = false;
  cached = is_cached(currentCard.imageLink);
  while (cached == false) {
    loadingSpinner.spin(mainWell);
    spinning = true;
    cached = setInterval(is_cached(currentCard.imageLink), 1000);
  }
  if (spinning == true) {
    loadingSpinner.stop();
  }
  mainImage.removeClass('fadeOut').addClass('fadeIn').css('background-image', 'url('+currentCard.imageLink+')');
  mainImage.attr('side', 'front');
  mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', setAnimateToFalse);
}

function loadCardBack() {
  if (typeof quizDeck[0] !== 'undefined') {
    cardsCount.removeClass('fadeOut').addClass('fadeIn').text(parseInt(cardsCount.text()) + 1);
    mainCardName.removeClass('fadeOut').addClass('fadeIn').text(quizDeck[0].name);
    mainImage.removeClass('fadeOut').addClass('fadeIn').css('background-image', 'url(/images/cardBack.png)');
    mainImage.attr('side', 'back');
    mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', setAnimateToFalse);
  }
  else {
    var cardCount = $('#cardCount');
    $('#instructionText').removeClass('fadeIn').addClass('fadeOut');
    cardCount.removeClass('fadeIn').addClass('fadeOut');
    cardCount.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', showRegularQuiz);
  }
}

function setAnimateToFalse() {
  animating = false;
}

function showRegularQuiz() {
  cardsCount.text(0);
  $('#cardQuiz').addClass('hidden');
  quizSetup.removeClass('fadeOut').addClass('fadeIn').show();
}
