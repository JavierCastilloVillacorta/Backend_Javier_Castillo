$(function(){
  //Inicializador del elemento Slider
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
  })
  setSearch()
  init()
  btbuscar()
})

function btbuscar(){
  $('#buscar').click(function(){
    if($('#checkPersonalizada')[0].checked){
      let valores = $("#rangoPrecio").val();
      valores = valores.split(";")
      let ciudad = $("#ciudad").val();
      let tipo = $("#tipo").val()
      if (ciudad == "") {
        ciudad = "todas";
      }
      if (tipo == "") {
        tipo = "todas";
      }
      var url = `http://localhost:3000/ciudad/${ciudad}/tipo/${tipo}/desde/${valores[0]}/hasta/${valores[1]}`;
    }else {
      var url = "http://localhost:3000/search";
    }

    $.ajax(
      {
        url: url,
        type: 'get',
        dataType: 'json',
        success: function(data){

          if (!data.error) {
              $('.lista').html(renderCard(data.datos));
          }
        },
        error: function(err){
          alert("Error buscar datos :" + err)
        }
      }
    )
  })
}

function renderCard(data){
  var text = '';
  data.forEach(function(key, idx)
  {
      text += `<div class="card horizontal">
              <div class="card-image">
                  <img src="http://localhost:3000/img/home.jpg">
              </div>
              <div class="card-stacked">
                  <div class="card-content">
                      <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                      <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                      <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                      <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                      <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                      <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                  </div>
              </div>
          </div>`;
  });
  return text;
}

function init(){
  $.ajax(
    {
      url: 'http://localhost:3000/filteroptions',
      type: 'get',
      dataType: 'json',
      success: function(data){
        if (!data.error) {
          ciudades = data.ciudad
          tipos = data.tipo
          $('#ciudad').append(renderSelect(ciudades));
          $('#tipo').append(renderSelect(tipos));
          $("#ciudad").material_select();
          $("#tipo").material_select();
        }
      },
      error: function(err){
        alert("Error peticion datos :" + err)
      }
    }
  )
}



function renderSelect(data){
  var out=[],
      obj={},
      text = '';

  for (var i=0;i<data.length;i++){
      obj[data[i]]=0;
  }
  for (var i in obj) {
      text += `<option value="${i}">${i}</option>`
  }

  return text;
}

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}
