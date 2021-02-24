$(document).ready(function(){

    // Muestra el formulario para agregar el usuario

    var dialogo = $('#agregar').dialog({
        autoOpen:false,
        modal: true,
        title: "Agregar Usuario",
        buttons:{
            "Crear usuario": function(){
                //ajax
                var datos = $('#formulario').serialize();

                $.ajax({
                    url:'agregar.php',
                    type:'POST',
                    data: datos
                }).done(function(){
                    window.location.replace('index.php');
                });


            },
            Cancel: function(){
                $('#formulario')[0].reset();
                $(this).dialog("close");
            }
        }
    });

    // Muestra el formulario para editar el usuario

    var actualizar = $('#editar').dialog({
        autoOpen:false,
        modal: true,
        title: "Editar Usuario",
        buttons:{
            "Editar usuario": function(){
                //ajax
                var datos = $('#formulario2').serializeArray();
                var id = $('#user').val();
                datos.push({name: 'id', value: id})

                $.ajax({
                    url:'actualizar.php',
                    type:'POST',
                    data: datos
                }).done(function(){
                    window.location.replace('index.php');
                });
            },
            Cancel: function(){
                $('#formulario2')[0].reset();
                $(this).dialog("close");
            }
        }
    });

    // Muestra el mensaje de confirmacion para eliminar

    var confirmar = $('#dialogo-confirm').dialog({
        autoOpen:false,
        modal: true,
        resizable: false,
        title: "Eliminar Usuario",
        buttons:{
            "Eliminar usuario": function(){
                //ajax
                var id = $('#user').val();

                $.ajax({
                    url:'eliminar.php',
                    type:'POST',
                    data:{'id': id}
                }).done(function(){
                    window.location.replace('index.php');
                });
            },
            Cancel: function(){
                $(this).dialog("close");
            }
        }
    });

    // Evento click muestra el dialogo para agregar usuario

    $('#nuevo').button().on("click", function(){

        dialogo.dialog("open");
    });

    // Evento click muestra dialogo de confirmacion para eliminar

    $('.eliminar').click(function(e) {
        $('#user').val($(this).attr("id"));
        confirmar.dialog("open");
    });

    // Evento click muestra dialogo con formulario para editar usuario

    $('.editar').click(function(e) {

        var id = $(this).attr("id");
        $('#user').val(id);

        $.ajax({
            url:'editar.php',
            type:'POST',
            dataType:'json',
            data:{'id':id}
        }).done(function(data){
            $('#usuario').val(data[0].usuario);
            $('#nombre').val(data[0].nombre);
            $('#apellido').val(data[0].apellido);
            $('#telefono').val(data[0].telefono);
            $('#email').val(data[0].email);

            actualizar.dialog("open");
        });

    });

});