$(document).ready(function(){
  // Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018
  // dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa
  // ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a
  // dicembre 2018 (unici dati disponibili sull’API).

  // Ogni volta che cambio mese dovrò:
  // Controllare se il mese è valido (per ovviare al problema che l’API non carichi
  // holiday non del 2018)
  // Controllare quanti giorni ha il mese scelto formando così una lista
  // Chiedere all’api quali sono le festività per il mese scelto
  // Evidenziare le festività nella lista

  // Mese da visualizzare di defaut
  var day = moment({
    day: 1,
    month: 0,
    year: 2018
  });

  // Stampa i giorni e le festivitá del mese di defaut
  inserimentoGiorni(day);
  inserisciFestivita(day);


  // Al click di precedente
  $(document).on('click','#prew',function(){

    // Prendi il valore del mese attuale
    var meseAttuale = $('#meseDaVisualizzare').attr('data-mese');
    momentMeseAttuale = moment(meseAttuale);

    // Sottrai un mese
    var mesePrew = momentMeseAttuale.subtract(1,'month');

    // Se il mese precedente é del 2018 stampa i giorni e le festivitá
    if(mesePrew.year() == 2018){
      inserimentoGiorni(mesePrew);
      inserisciFestivita(mesePrew);
    }
  });

  // Al click di successivo
  $(document).on('click','#next',function(){

    // Prendi il valore del mese attuale
    var meseAttuale = $('#meseDaVisualizzare').attr('data-mese');
    momentMeseAttuale = moment(meseAttuale);

    // Aggiungi un mese
    var meseSucc = momentMeseAttuale.add(1,'month');

    // Se il mese successivo é del 2018 stampa i giorni e le festivitá
    if(meseSucc.year() == 2018){
      inserimentoGiorni(meseSucc);
      inserisciFestivita(meseSucc);
    }
  });

});

function inserisciFestivita(day){

  // Chiamata ajax
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',

    // Prendi i valore del mese attuale
    data:{
      year: day.year(),
      month: day.month()
    },

    success: function(data){

      // Creazione variabile con le festivitá
      var festivita = data.response;

      // Ciclo per tutte le festivita del mese
      for (var i = 0; i < festivita.length; i++) {

        var giornoFestivo = $('.day p[data-day= "' + festivita[i].date + '"]');
        giornoFestivo.parent('div').addClass('red');
        giornoFestivo.append(festivita[i].name);

      }
    },

    error: function(){
      alert('Documento API non caricato correttamente');
    }

  });

}

// Stampa a schermo i giorni del mese selezionato
function inserimentoGiorni(day){

  // Reset del calendario
  $('.calendar').text('');

  // Imposta il sottotitolo con il mese attuale
  $('#meseDaVisualizzare').text(day.format('MMMM YYYY'));
  $('#meseDaVisualizzare').attr('data-mese', day.format('YYYY MM DD'));

  // Implementazione Handlebars
  var source = document.getElementById("day-template").innerHTML;
  var template = Handlebars.compile(source);

  // Inserimento mese corrente in una variabile con stampa a schermo
  var mese = day.format('MMMM');
  $('.mese').text(mese);

  // Conteggio giorni nel mese
  var giorniMese = day.daysInMonth();

  // Stampa di tutti i giorni del mese
  for (var i = 0; i < giorniMese; i++) {

    // Se nel giorno comprende il mese corrente stampa
    if(day.format('MMMM') == mese){

      // Stampa il giorno
      var context = {
        giorno: day.format('D MMMM'),
        attr: day.format('YYYY-MM-DD'),
        settimana: day.format('ddd')
      };

      var html = template(context);
      $('.calendar').append(html);

      // Incremento del giorno
      day.add(1, 'days');
    }
  }
  // Ritorno al mese attuale
  day.subtract(1, 'months');
}
