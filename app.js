angular.module('tnTour', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: "list.html",
      controller: 'ToursController'
    })
    .when('/tours/:tour', {
      templateUrl: 'tour.html',
      controller: 'TourController'
    })
  })

  var allTours;

  if(typeof(localStorage.tours) != 'undefined') {
    allTours = JSON.parse(localStorage.tours);
  } else {
    // initial default tours for example
    allTours = [
      {
        slug: 'kariby',
        title: 'Карибы на неделю на двоих!',
        price: 54420,
        text: 'Карибы – это настоящий рай с кокосовыми пальмами, роскошными пляжами с белым и желтым песком, великолепными закатами и уникальным подводным миром. Удивительная природа сочетает в себе массивные вулканы, лазурный океан, кофейные плантации и богатый животный мир.'
      },
      {
        slug: 'gurzuf-krimea',
        title: 'Гурзуф (Крым) на месяц',
        price: 100300,
        text:  'Скалолазание в Крыму — дарит восторг и радость, переполняет эмоциями и пьянит. Вы никогда не забудете свое первое восхождение — это непередаваемое ощущение высоты, адреналин и безграничная свобода собственного тела. Вы непременно захотите испытать это чувство вновь.'
      }
    ]
  }
