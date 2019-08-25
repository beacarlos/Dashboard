$(document).ready(function () {
    $(".openbtn").on("click", function () {
        $(".ui.sidebar").toggleClass("very thin icon");
        $(".asd").toggleClass("marginlefting");
        $(".sidebar z").toggleClass("displaynone");
        $(".ui.accordion").toggleClass("displaynone");
        $(".ui.dropdown.item").toggleClass("displayblock");
        $(".logo").find('img').toggle();
    });

    $(".ui.dropdown").dropdown({
        on: "hover"
    });

    $('.ui.accordion').accordion({
        selector: {

        }
    });
    // Lógica para itens sem  content
    $(".ui.accordion .item.notContent").click(function () {
        var valorId = $(this).attr('id');
        var content = $(this).parent().attr("id");
        eachRemoveClass('.ui.accordion .content#' + content + ' .title.item', 'auxActive');
        eachRemoveClass('.ui.accordion .content#' + content + ' .title.item', 'active');
        eachRemoveClass('.ui.accordion .content#' + content + " .content", 'active');
        eachRemoveClass('.ui.accordion .content#' + content + " .content", 'auxActive');
        eachRemoveClass('.ui.accordion .item.notContent', 'active');
        eachRemoveClass('.ui.accordion .item.aLoadContainer', 'activeA');
        eachRemoveClass('.ui.accordion .content:not(#' + content + ')', 'active');
        eachRemoveClass('.ui.accordion .content:not(#' + content + ')', 'auxActive');
        eachRemoveClass('.ui.accordion .title:not(#' + content + ')', 'active');
        eachRemoveClass('#iconesSidebarMenor i', 'active');
        var rota = "";
        if (content != undefined) {
            rota = content + "/" + valorId;
            $(".ui.accordion .title#" + content).removeClass('auxActive');
            $("#iconesSidebarMenor i#" + content).addClass('active');
        } else {
            rota = valorId;
            $("#iconesSidebarMenor i#" + valorId).addClass('active');
        }
        $(".ui.accordion .item.notContent#" + valorId).addClass('active');
        // Chama função para carregar container de acordo com a rota
        ajaxToLoadContainer(rota);
    });

    // Lógica para tag a carregar container
    $(".ui.accordion .aLoadContainer").click(function () {
        var valorId = $(this).attr('id');
        var content = $(this).parent().attr("id");
        var parentContent = $(this).parent().parent().parent().attr("id");
        eachRemoveClass('.ui.accordion .content:not(#' + parentContent + ') .content', 'active');
        eachRemoveClass('.ui.accordion .content:not(#' + parentContent + ') .content', 'auxActive');
        eachRemoveClass('.ui.accordion .content:not(#' + parentContent + ') .title.item', 'active');
        eachRemoveClass('.ui.accordion .content:not(#' + parentContent + ') .title.item', 'auxActive');
        eachRemoveClass('.ui.accordion .item.aLoadContainer', 'activeA');
        eachRemoveClass('.ui.accordion .item.notContent', 'active');
        $(".ui.accordion .item.aLoadContainer#" + valorId).addClass('activeA');
        $(".ui.accordion .title#" + content).addClass('auxActive');
        var rota = content + "/" + valorId;
        ajaxToLoadContainer(rota);
    });

    $("#iconesSidebarMenor i").click(function () {
        var valorId = $(this).attr("id");
        eachRemoveClass('#iconesSidebarMenor i', 'active');
        var lengthMenu = $("#iconesSidebarMenor .menu." + valorId).length;

        if (lengthMenu != 0) {

        } else {
            $(this).addClass('active');
        }
    });


    openPopup('#system', '#popUpSystem');
    openPopup('#notifications', '#popUpNotifications');
    openPopup('#informationsUser', '#popUpInformationUser');
});

function ajaxToLoadContainer(rota) {
    $.ajax({
        url: rota,
        type: 'POST',
        beforeSend: function (xhr) {

        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {

        }, success: function (data, textStatus, jqXHR) {
            $("#containerToInformations").html(data);
        }, complete: function (jqXHR, textStatus) {

        }
    });
}

function openPopup(atributo, popup) {
    $(atributo).popup({
        inline: true,
        hoverable: true,
        position: 'bottom center',
        delay: {
            show: 100,
            hide: 200
        },
        popup: popup
    });
}

function eachRemoveClass(elemento, valorClass) {
    $(elemento).each(function () {
        $(this).removeClass(valorClass);
    });
}

function eachAddClass(elemento, valorClass) {
    $(elemento).each(function () {
        $(this).addClass(valorClass);
    });
}
