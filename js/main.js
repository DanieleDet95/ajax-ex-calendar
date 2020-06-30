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

  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',

    data:{
      year: day.year(),
      month: day.month()
    },

    success: function(data){
      // data: {
      //   year: "2018",
      //   month: "0"
      // }
      // Mese da visualizzare di defaut
      meseDaVisualizzare = 'January';
      inserimentoGiorni(data , meseDaVisualizzare);

      // Data del mese visualizzato
      // Serve per ricavare i mesi successivi e precedenti
      var day = inserimentoGiorni(data);

      // Al click di precedente
      $(document).on('click','#prew',function(){
        var meseDaVisualizzare = mesePrecedente(day);
        inserimentoGiorni(data, meseDaVisualizzare);
      });

      // Al click di successivo
      $(document).on('click','#next',function(){
        var meseDaVisualizzare = meseSuccessivo(day);
        inserimentoGiorni(data, meseDaVisualizzare);
      });

    },

    error: function(){
      alert('Documento API non caricato correttamente');
    }
  });

});

// Prendi mese successivo
function meseSuccessivo(day){
  var addMonths = day.add(1, 'months');
  var meseSuccessivo = addMonths.format('MMMM')
  return meseSuccessivo;
}

// Prendi mese precedente
function mesePrecedente(day){
  var subMonths = day.subtract(1, 'months');
  var mesePrecedente = subMonths.format('MMMM')
  return mesePrecedente;
}

// Stampa a schermo i giorni del mese selezionato con le festivitá
function inserimentoGiorni(data, meseDaVisualizzare){

  // Reset del calendario
  $('.calendar').text('');

  // Implementazione Handlebars
  var source = document.getElementById("day-template").innerHTML;
  var template = Handlebars.compile(source);

  // Creazione variabile con le festivitá
  var festivita = data.response;

  // Creazione variabile data col mese giusto
  var day = moment('01 January 2018');
  day.month(meseDaVisualizzare);

  // Inserimento mese corrente in una variabile con stampa a schermo
  var mese = day.format('MMMM');
  $('.mese').text(meseDaVisualizzare);

  // Conteggio giorni nel mese
  var giorniMese = day.daysInMonth();

  // Stampa di tutti i giorni del mese
  // Ciclo per tutti i giorni del mese meno le festivita
  for (var i = 0; i < giorniMese; i++) {

    // Ciclo per tutte le festivita del mese
    for (var j = 0; j < festivita.length; j++) {

      // Se il giorno corrente ha una festivita
      if(day.format('YYYY-MM-DD') == festivita[j].date){

        // Stampa il giorno con la festivita
        var context = {
          colore: "red",
          giorno: day.format('DD MMMM  ') + festivita[j].name,
          settimana: day.format('ddd')
        };
        var html = template(context);
        $('.calendar').append(html);

        // Incremento del giorno
        day.add(1, 'days');
        i++;
      }
    }

    // Se nel giorno successivo comprende il mese corrente stampa
    if(day.format('MMMM') == mese){
      // Stampa il giorno
      // Stampa il giorno con la festivita
      var context = {
        giorno: day.format('DD MMMM'),
        settimana: day.format('ddd')
      };
      var html = template(context);
      $('.calendar').append(html);

      // Incremento del giorno
      day.add(1, 'days');
    }
  }
  day.subtract(1, 'months');
  return day;
}
