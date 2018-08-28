let arr = [];
let sections = $('.page');
let timeAnimation = 1000;
let isScrolling = false;

$('.page:first-child').addClass('is-active');
$('.pagination__item:first-child').addClass('is-active');

$('html, body').animate({
  scrollTop: 0 
}, timeAnimation);

for ( let i = 0; i < sections.length; i++) {
  
  arr.push(sections.eq(i).offset().top);

  sections.eq(i).attr('data-index', i);
}

function handlerScrolling(e) {
  // debugger;
  console.log($(this));
  
  let scroll;
  let currentSection = +$('.page.is-active').attr('data-index');
  let mainTimeAnimation = timeAnimation;
  let body = $('body');
  
  if (isScrolling) {
    body.off();
  }

  isScrolling = true;


  if (e.originalEvent.deltaY < 0) {
    scroll = false;
  } else if(e.originalEvent.deltaY > 0) {
    scroll = true;
  }

  scroll ? currentSection++ : currentSection--;
  console.log(currentSection);
  if(!scroll && sections.eq(0).hasClass('is-active')) {
    currentSection = 0;
  } else if(scroll && sections.eq(sections.length - 1).hasClass('is-active')) {
    currentSection = sections.length - 1;
  }
  console.log(currentSection);
  
  if (!scroll && sections.eq(0).hasClass('is-active') || scroll && sections.eq(sections.length - 1).hasClass('is-active')) {
    mainTimeAnimation = 0;
  } else {
    mainTimeAnimation = timeAnimation;
  }

  sections.removeClass('is-active');
  sections.eq(currentSection).addClass('is-active');


  $('html, body').animate({
    scrollTop: arr[currentSection] 
  }, mainTimeAnimation, function() {

    // console.log($(this));
    

    if ($(this).is('body')) {
      body.on('mousewheel', handlerScrolling);
    }
    
  });
}



$('body').on('mousewheel', handlerScrolling);






$(document).ready(function() {
  $('.pagination__item-link').on('click', function(e) {
    e.preventDefault;

    let paginatorIndex = $(this).attr('data-index') - 1; // paginator Index

    showSection($(this).attr('href'), true);
    

    sections.eq(paginatorIndex).addClass('is-active')
      .siblings().removeClass('is-active'); // добавит is-activ странице соответствующей кликнутому пагинатору
  });

  showSection(window.location.hash, false);
});

$(window).scroll(function() {
  checkSection();
});

function showSection(section, isAnimate) {
  let direction = section.replace(/#/, ''); // удалит решетку
  let reqSection = sections.filter('[data-section="' + direction + '"]');
  let reqSectionPos = reqSection.offset().top;

  if (isAnimate) {
    $('body, html').animate({scrollTop: reqSectionPos}, 500);
  } else {
    $('body, html').scrollTop(reqSectionPos);
  }
}

function checkSection() {
  sections.each(function() {
    let $this = $(this);
    let topEdge = $this.offset().top - 200; // тор "Y" страницы
    let bottomEdge = topEdge + $this.height(); // bottom "Y" страницы
    let wScroll = $(window).scrollTop(); // на сколько проскролили страницу
    console.log(wScroll);
    

    if (topEdge < wScroll && bottomEdge > wScroll) { // если края страницы в окне
      let currentId = $this.data('section'); // видимая секция
      let regLink = $('.pagination__item-link').filter(' [href="#' + currentId + '"]'); // находим кружочек соответствующий видимой секции
      regLink.closest('.pagination__item').addClass('is-active')
        .siblings().removeClass('is-active'); // подсвечиваем кружочек соответствующий видимой секции
      
      window.location.hash = currentId; // дописываем хэш соответствующий видимой секции
    }
    
  });
}
