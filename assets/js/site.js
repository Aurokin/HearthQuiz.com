$(document).ready(function() {
  preloadImage('/images/cardBack.png');
  animating = false;
});

$('#startQuizBtn').click(function() {
  var qClass = $('#classSelect').val();
  var qType = $('#typeSelect').val();
  var qSet = $('#setSelect').val();

  $('#quizSetup').removeClass('initialAnimation');

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
    quizSetup = $('#quizSetup');
    cardsCount = $('#cardsCount');
    cardsTotal = $('#cardsTotal');
    console.log(quizDeck);
    //Hide Setup
    quizSetup.removeClass('fadeIn').addClass('fadeOut');
    quizSetup.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', initialDataLoad);

  });
});

$('#mainImage').click(function() {
  if (animating == false) {
    if (mainImage.attr('side') == 'back') {
      animating = true;
      mainImage.removeClass('fadeIn').addClass('fadeOut');
      mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', loadNewCard);
    }
    else {
      animating = true;
      cardsCount.removeClass('fadeIn').addClass('fadeOut');
      mainImage.removeClass('firstAnimation').removeClass('fadeIn').addClass('fadeOut');
      mainCardName.removeClass('firstAnimation').removeClass('fadeIn').addClass('fadeOut');
      mainImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', loadCardBack);
    }
  }
});

function initialDataLoad() {
  $('#quizSetup').hide();
  //Display Load
  site = document.getElementById('site');
  loadingSpinner = new Spinner().spin(site);
  //Preload First 3 Images
  for (i = 0; i < 3; i++) {
    preloadImage(quizDeck[i].imageLink);
  }
  //Load Card Total
  cardsTotal.text(quizDeck.length);
  //Load Card Back
  $('#cardCount').addClass('fadeIn');
  loadCardBack();
  //Stop Spinner
  loadingSpinner.stop();
  //Display Card Quiz
  mainCardName.addClass('firstAnimation');
  mainImage.addClass('firstAnimation');
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
  var once = false;
  var spinning = false;
  while (cached == false) {
    if (once == true) {
      loadingSpinner.spin(site);
      spinning = true;
    }
    cached = setInterval(is_cached(currentCard.imageLink), 1000);
    once = true;
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
    cardsCount.text(0);
    $('#cardQuiz').addClass('hidden');
    quizSetup.removeClass('fadeOut').addClass('fadeIn').show();
  }
}

function setAnimateToFalse() {
  animating = false;
}
