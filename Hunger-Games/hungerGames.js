

var game = {};
var battlenum = 0;

var goodguys = [
  { 
    "name" : "katniss",
    "bio": "images/bio/katniss.jpg",
    "stand": "images/stand/katniss.jpg" 
  },
  { 
    "name" : "peeta",
    "bio": "images/bio/peeta.jpg",
    "stand": "images/stand/peeta.jpg" 
  },
  { 
    "name" : "rue",
    "bio": "images/bio/rue.jpg",
    "stand": "images/stand/rue.jpg" 
  },
  { 
    "name" : "thresh",
    "bio": "images/bio/thresh.jpg",
    "stand": "images/stand/thresh.jpg" 
  }
];

var badguys = [
  { 
    "name" : "cato",
    "stand": "images/stand/cato.jpg" 
  },
  { 
    "name" : "glimmer",
    "stand": "images/stand/glimmer.jpg" 
  },
  { 
    "name" : "clove",
    "stand": "images/stand/clove.jpg" 
  },
  { 
    "name" : "marvel",
    "stand": "images/stand/marvel.jpg" 
  },
  { 
    "name" : "snow",
    "stand": "images/stand/snow.jpg" 
  },
  { 
    "name" : "seneca",
    "stand": "images/stand/seneca.jpg" 
  },
  { 
    "name" : "caesar",
    "stand": "images/stand/caesar.jpg" 
  }
];

jQuery(function($){
  
  // characters
  
  enemy = $('<img />', { "src": badguys[0].stand, "class": "enemy" });
  goodguy = $('<img />', { "class": "goodguy" });
  
  // setup arena
  arena = $("#arena")
  
  .append(enemy)
  .append(goodguy)
  .droppable({
    accept: ".bio",
    drop: function(e, ui){
      guy = $.grep(goodguys, function(guy){
        return guy.name == $(ui.draggable).attr('alt');
      })[0];
      goodguy.attr('src', guy.stand);
      $("#actions").show();
    }
  });
  
  // setup chooser
  bios = $("#chooser img")
  .draggable({
    helper: function(e, ui){
      guy = $.grep(goodguys, function(guy){
        return guy.name == $(e.target).attr('alt');
      })[0];
      return $('<img />', { "src": guy.stand });
    },
    cursorAt: { "right": 5, "top": 0 }
  });
  
  $("#actions button").button();
  
  $("#actions .action-attack").click(function(){
    if (game.action) return;
    game.action = true;
    
    goodguy
      .animate({ left: 100 }, 700)
      .effect('shake', { times: 3 }, 150, function(){
        $(this).animate({ left: 20 }, 300);
        badguydie();
      });
  });
      
  function badguydie(){
    ++battlenum;
    enemy.hide('explode', {}, 500);
    enemy.queue(function(){
      if (badguys[battlenum] == undefined) return gameend();
      
      $(this)
      .css('right', 0)
      .attr('src', badguys[battlenum].stand)
      .delay(800)
      .fadeIn('fast').animate({ right: 45 }, 300)
      .queue(function(){
        game.action = false;
        $(this).dequeue();
      });
      $(this).dequeue();
    });
  }
  
  function gameend(){
    
    setTimeout(function(){
      ( {
        title: "Win!",
       
    }, 1000);
  }
  
});