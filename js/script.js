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
    url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
    method: 'GET',

    success: function(data){
      var festivita = data.response;

      // Creazione variabile data
      var day = moment('01 January 2018');

      // Al click di precedente
      $(document).on('click','#prew',function(){
        alert('prew');
      });

      // Al click di successivo
      $(document).on('click','#next',function(){
        alert('next');
      });


      // Inserimento mese corrente in una variabile con stampa a schermo
      var mese = day.format('MMMM');
      $('.mese').text(mese);

      // Conteggio giorni nel mese
      var giorniMese = day.daysInMonth();

      // Stampa di tutti i giorni del mese
      // Ciclo per tutti i giorni del mese meno le festivita
      for (var i = 1; i <= giorniMese - festivita.length; i++) {

        // Ciclo per tutte le festivita del mese
        for (var j = 0; j < festivita.length; j++) {

          // Se il giorno corrente ha una festivita
          if(day.format('YYYY-MM-DD') == festivita[j].date){

            // Stampa il giorno con la festivita
            $('.calendar').append('<li class="red">'+day.format('DD MMMM - ') + festivita[j].name + '</li>');

            // Incremento del giorno
            day.add(1, 'days');
          }
        }

        // Stampa il giorno
        $('.calendar').append('<li>' + day.format('DD MMMM ') + '</li>');

        // Incremento del giorno
        day.add(1, 'days');
      }
    },

    error: function(){
      alert('Documento API non caricato correttamente');
    }
  });

});

// function stampaGiorni(){
//
// }
