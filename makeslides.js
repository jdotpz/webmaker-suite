/**
 * Extremely simple slide deck builder
 */
(function() {
  var deckCount = 0, slideCount = 0;

  var decks = document.querySelectorAll(".deck-container");
  decks = Array.prototype.slice.call(decks);
  decks.forEach(function(deck) {
    deckCount++;
    deck.parentNode.querySelector("h2").id = "deck" + deckCount;

    var slides = deck.querySelectorAll(".slide");
    deck.slides = slides = Array.prototype.slice.call(slides);
    slideCount = 0;

    var slideText = document.createElement("p");
    slideText.setAttribute("class", "slideText");
    deck.insertBefore(slideText, slides[0]);

    var button = document.createElement("button");
    button.setAttribute("class", "previous");
    button.innerHTML = "previous step";
    button.onclick = function() { deck.currentSlide.previous(); };
    deck.insertBefore(button, slides[0]);

    button = document.createElement("button");
    button.setAttribute("class", "next");
    button.innerHTML = "next step";
    button.onclick = function() { deck.currentSlide.next(); };
    deck.appendChild(button);

    deck.setCurrentSlide = function(slide) {
      deck.currentSlide = slide;
      slideText.innerHTML = slide.alt;
    }

    for(var i=0, last=slides.length; i<last; i++) {
      var slide = slides[i];
      slide.slideCount = slideCount++;

      (function bindSlide(deck, deckCount, slide, slideCount, i) {

        // slide relations
        slide.prevSlide = i>0 ?      slides[i-1] : false; //slides[last-1];
        slide.nextSlide = i<last-1 ? slides[i+1] : false; //slides[0];
        // toggle functions
        slide.show = function(history) {
          slide.style.display = "inline-block";
          deck.setCurrentSlide(slide);
          if(history !== false) {
            var fragment = "#deck"+deckCount; //+"-slide"+slide.slideCount;
            window.history.pushState(fragment, "Deck "+deckCount+", slide "+slideCount, fragment);
          }
        };
        slide.hide = function() { slide.style.display = "none"; };
        slide.next     = function() { if (slide.nextSlide) { slide.hide(); slide.nextSlide.show(); }};
        slide.previous = function() { if (slide.prevSlide) { slide.hide(); slide.prevSlide.show(); }};
        // onclick behaviour
        slide.onclick = slide.next;
        slide.title = "step "+(i+1);
        // start of hidden
        slide.hide();
      }(deck, deckCount, slide, slideCount, i));
    }
    slides[0].show(false);
  });
}());
