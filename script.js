let headerMenuUnits = document.querySelectorAll('.header-menu__unit');

for (let unit of headerMenuUnits) {
    unit.onclick = headerSelector;
}

function headerSelector() {
    if (!event.target.className.includes('header-menu__unit_selected')) {
        document.querySelector('.header-menu__unit_selected').classList.remove('header-menu__unit_selected')
        event.target.classList.add('header-menu__unit_selected')
    }
}

let portfolioTags = document.querySelectorAll('.portfolio-tags');

for (let tag of portfolioTags) {
    tag.onclick = portfolioTagSelector;
}

function portfolioTagSelector() {
    let portfolioCardsArea = document.querySelector('.portfolio__cards');

    if (event.target.className.includes('portfolio-tags__unit_all') && !event.target.className.includes('portfolio-tags__unit_selected')) {
        let imagesAll = document.querySelectorAll('.portfolio__card');
        for (let img of imagesAll) {
            portfolioCardsArea.prepend(img);
        }
    }

    if (event.target.className.includes('portfolio-tags__unit_web-design') && !event.target.className.includes('portfolio-tags__unit_selected')) {
        let webDesignAll = document.querySelectorAll('.portfolio__card_web-design');
        for (let img of webDesignAll) {
            portfolioCardsArea.prepend(img);
        }
    }

    if (event.target.className.includes('portfolio-tags__unit_graphic-design') && !event.target.className.includes('portfolio-tags__unit_selected')) {
        let graphicDesignAll = document.querySelectorAll('.portfolio__card_graphic-design');
        for (let img of graphicDesignAll) {
            portfolioCardsArea.prepend(img);
        }
    }

    if (event.target.className.includes('portfolio-tags__unit_artwork') && !event.target.className.includes('portfolio-tags__unit_selected')) {
        let artworkAll = document.querySelectorAll('.portfolio__card_artwork');
        for (let img of artworkAll) {
            portfolioCardsArea.prepend(img);
        }
    }

    if (!event.target.className.includes('portfolio-tags__unit_selected')) {
        document.querySelector('.portfolio-tags__unit_selected').classList.remove('portfolio-tags__unit_selected')
        event.target.classList.add('portfolio-tags__unit_selected')
    }
}

let portfolioCards = document.querySelectorAll('.portfolio__card');
let cardList = [];

for (let card of portfolioCards) {
    card.onclick = portfolioCardSelector;
    cardList.push(card.classList[1]);
}

function portfolioCardSelector() {
    if (!document.querySelector('.portfolio-card_selected')) {
        event.target.classList.add('portfolio-card_selected');
    }
    if (!event.target.className.includes('portfolio-card_selected')) {
        document.querySelector('.portfolio-card_selected').classList.remove('portfolio-card_selected')
        event.target.classList.add('portfolio-card_selected')
    }
}

let submitForm = document.querySelector('.contact-us-form')
submitForm.onsubmit = showSent;

function showSent() {
    let message = document.createElement('p');

    message.textContent = `Сообщение отправлено \n`

    if (!document.getElementById('sub').value) {
        message.textContent += `Без темы \n`;
    } else {
        message.textContent += 'Тема: ' + document.getElementById('sub').value + '\n'
    }

    if (!document.getElementById('ymessage').value) {
        message.textContent += `Без описания \n`;
    } else {
        message.textContent += 'Описание: ' + document.getElementById('ymessage').value + '\n'
    }
    alert(message.textContent);
    event.preventDefault();
}

//SLIDER

//находим саму карусель

let sliderCarousel = document.querySelector('.slider__carousel');

//событие при нажатии на стрелочки
let arrowLeft = document.querySelector('.angle-left');
let arrowRight = document.querySelector('.angle-right');
arrowLeft.onclick = moveLeft;
arrowRight.onclick = moveRight;

//переменные для движения
let startingMargin = 0;
let startingPoint = 0;

//все слайды, откуда будем подхватывать их количество и адрес картинки

let slideSrc = document.querySelectorAll('.slider-slide > .slider-slide__img');
let slides = document.querySelectorAll('.slider-slide');

let slideSrcs = []; // начинаем с i = 1, чтобы не подхватывало самый первый слайд за кадром
for (let i = 0; i < slideSrc.length; i++) {
    slideSrcs.push(slideSrc[i].getAttribute('src'))
    slides[i].remove();
}

let twoSlides = false;

if (slideSrcs.length == 2) {
    twoSlides = true;
}

//создаём слайд с выключающимися телефонами

function createFirstPage() {
    let phoneSlide = document.createElement('div');
    phoneSlide.setAttribute('class', 'slider-slide');

    let phoneImage = document.createElement('img')
    phoneImage.setAttribute('src', 'assets/slider/slide1.png');
    phoneImage.setAttribute('class', 'slider-slide__img');

    let phoneImageBlack1 = document.createElement('div');
    phoneImageBlack1.setAttribute('class', 'slider-slide__img_black1');
    let phoneImageBlack2 = document.createElement('div');
    phoneImageBlack2.setAttribute('class', 'slider-slide__img_black2');

    phoneImageBlack1.onclick = blackscreenSwitcher;
    phoneImageBlack2.onclick = blackscreenSwitcher;
    function blackscreenSwitcher() {
        if (event.target.style.backgroundColor == 'black') {
            event.target.style.backgroundColor = ''
        } else {
            event.target.style.backgroundColor = 'black'
        }
    }

    phoneSlide.append(phoneImage);
    phoneSlide.append(phoneImageBlack1);
    phoneSlide.append(phoneImageBlack2);
    phoneSlide.setAttribute('margin-left', '0px')
    return phoneSlide
}

//отрисовываем кал

function drawSlide(slideNum) {
    let newSlide = document.createElement('div');
    let newImage = document.createElement('img');
    newSlide.setAttribute('class', 'slider-slide');
    newImage.setAttribute('src', slideNum);
    newSlide.append(newImage)
    return newSlide
}

//вставляем кал

if (twoSlides) {
    slideSrcs = slideSrcs.concat(slideSrcs);
    sliderCarousel.append(drawSlide(slideSrcs[0]));
    sliderCarousel.append(createFirstPage());
    sliderCarousel.append(drawSlide(slideSrcs[0]));
    sliderCarousel.append(createFirstPage());
} else {
    for (let i = 0; i < slideSrcs.length; i++) {
        if (i == 1) {
            sliderCarousel.append(createFirstPage());
        } else {
            sliderCarousel.append(drawSlide(slideSrcs[i]));
        }
    }
}



//функция, с помощью которой едем вправо

function moveRight() {
    //первый слайд, который будем двигать
    let firstSlide = document.querySelector('.slider-slide');

    //создаём слайд для вставки за кадром

    let newSlide = drawSlide(slideSrcs[startingPoint]);

    //прокручиваем, находим когда слайдер кончается

    startingPoint++;
    if (startingPoint > slideSrcs.length - 1) startingPoint = 0;
    console.log(startingPoint, firstSlide);

    if (startingPoint % 2 !== 0) {
        document.querySelector('.slider').style.backgroundColor = '#648BF0';
        document.querySelector('.slider').style.borderColor = '#6664f0';
    } else {
        document.querySelector('.slider').style.backgroundColor = '#f06c64'
        document.querySelector('.slider').style.borderColor = '#ea676b';
    }

    startingMargin -= 1020;
    firstSlide.style.left = startingMargin + 'px';

    //удаляем первый слайд, вставляем слайд в конце в зависимости от номера
    startingMargin = 0;
    firstSlide.remove();

    if (twoSlides) {
        if (slideSrcs[startingPoint + 1] == "assets/slider/slide1.png") {
            sliderCarousel.append(createFirstPage());
        } else {
            sliderCarousel.append(newSlide);
        }
    } else {
        if (slideSrcs[startingPoint - 1] == "assets/slider/slide1.png") {
            sliderCarousel.append(createFirstPage());
        } else {
            sliderCarousel.append(newSlide);
        }
    }
}

//едем влево

function moveLeft() {
    //первый слайд, который будем двигать, и последний, который будем удалять
    let lastSlide = document.querySelectorAll('.slider-slide')[slideSrcs.length - 1];

    //прокручиваем, находим, когда слайдер кончается
    console.log(startingPoint, slideSrcs[startingPoint])

    startingPoint--;

    if (startingPoint < 0) {
        startingPoint = slideSrcs.length - 1;
    }

    if (startingPoint % 2 !== 0) {
        document.querySelector('.slider').style.backgroundColor = '#648BF0';
        document.querySelector('.slider').style.borderColor = '#6664f0';
    } else {
        document.querySelector('.slider').style.backgroundColor = '#f06c64'
        document.querySelector('.slider').style.borderColor = '#ea676b';
    }

    console.log(startingPoint, slideSrcs[startingPoint]);

    //создаём слайд для вставки за кадром

    let newSlide = drawSlide(slideSrcs[startingPoint]);

    //удаляем первый слайд, вставляем слайд в конце в зависимости от номера

    // sliderCarousel.prepend(newSlide);
    startingMargin = 0;
    lastSlide.remove();

    if (slideSrcs[startingPoint] == "assets/slider/slide1.png") {
        sliderCarousel.prepend(createFirstPage());
    } else {
        sliderCarousel.prepend(newSlide);
    }
}