$(function() {
    var waterfall = null;
    $(window).on('load resize', function(e) {
        waterfall = new Waterfall({
            el: '.pin',
            hGap: 20
        });
    });
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','../../../../../files/images/mooc/waterfall/' + $( value).attr( 'src') ).appendTo($oBox);
            });
            waterfall.refresh();
        }
    };
    function checkscrollside(){
        return $(window).height() + $(window).scrollTop() + 100 > $(document).height();
    }
});