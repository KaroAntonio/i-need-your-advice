var poems, poem_titles;

content = "<div>XOXOXOXOXOXOXOXOXOXOXOXOXOX<\div>"

var ctr = 0

var scrollToElement = function(scroll_e,e, ms){
    var speed = (ms) ? ms : 600;
    console.log(scroll_e.scrollTop(), scroll_e.scrollTop() + e.offset().top,e)
    scroll_e.animate({
        scrollTop: scroll_e.scrollTop() + e.offset().top
    }, speed);
}

$('#info_button').click(function(){
    if ($('#info').css('visibility') == 'hidden') {
        $('#info_button').html('-i')
        $('#info').css('visibility', 'visible')
    } else  {
        $('#info_button').html('+i')
        $('#info').css('visibility', 'hidden')
    }
})

$('#info').click(function(){
    if ($('#info').css('visibility') == 'hidden') {
        $('#info_button').html('-i')
        $('#info').css('visibility', 'visible')
    } else  {
        $('#info_button').html('+i')
        $('#info').css('visibility', 'hidden')
    }
})

//LOAD Poems
$.getJSON( "poems/poems.json", function( data ) {
    poems = data;
    poem_titles = Object.keys(poems);
    inf_scroll($('#content'),content)
 });

function inf_scroll(e,content){
    //Display content in element in infinte loop
    for (var i = 0; i < 3; i++) {
        e.append(poem_html())
    }
    
    var three_top = e.children().eq(2).offset().top
    var two_top = e.children().eq(1).offset().top
    var scroll_e = $('#container')
    scroll_e.scrollTop(two_top);
    
    var bg_1 = init_background_1($('#container'))
    var bg_2 = init_background_2($('#container'))
    var menu = init_menu(scroll_e,$('#container') )
    
    scroll_e.scroll(function() {
        //if we scroll into the bottom third of the page
        if (scroll_e.scrollTop() > three_top) {
            scroll_e.scrollTop(two_top);
        }
        if (scroll_e.scrollTop() < two_top) {
            scroll_e.scrollTop(three_top);
        }
        bg_1.css("left",((scroll_e.scrollTop()-two_top)/5)+"px") 
        bg_2.css("right",((scroll_e.scrollTop()-two_top)/2)+"px")
        render_menu(menu, scroll_e)
        
    })
}

function render_menu(menu,scroll_e) {
    children = menu.children()
    $(children[0]).css('border-left-width','2px')
    for (var i = 0; i < children.length; i++) {
        var block = $('#poem_title_'+(i+(poem_titles.length * 1)))
        var d = Math.abs( block.offset().top-scroll_e.scrollTop())/scroll_e.scrollTop()
        if (2-d < 1) $(children[i]).css('border-color','black')
        else $(children[i]).css('border-color','white')
    }
}

function init_menu(scroll_e,e) {
    var menu = $('<div id="menu"></div>')
    menu.css('top','0px')
    menu.css('height','100vh')
    e.append(menu)
    for (var i =0; i < poem_titles.length; i++){
        var item = $('<div id="item_'+i+'" class="menu_item">'+poem_titles[i][0]+'</div>')
        item.css('left','20px')
        item.css('cursor','pointer')
        item.css('top', (i * 15 + 20) + 'px')
        var clck = (function (i) {
            item.click(function() {
                var block = $('#poem_title_'+(i+(poem_titles.length * 1)))
                scrollToElement(scroll_e, block, 500)
            })
        }(i))
        
        menu.append(item)
    }
    return menu
}

function init_background_1(e) {
    var inner = $('<div class="bg_inner"></div>')
    e.append(inner)
    square = $('<div class="square"></div>')
    inner.append(square);
    
    for (var i = 0; i < 20; i++) {
        line = $('<div class="line"></div>')
        line.css('height','18px')
        line.css('width','400px')
        line.css('top',(i*20+200) + 'px')
        line.css('left','-4000px')
        line.css('background','black')
        inner.append(line);
    }
    
    for (var i = 0; i < 5; i++) {
        line = $('<div class="line"></div>')
        line.css('height','200vh')
        line.css('width','2px')
        line.css('left',((i*20)-400) + 'px')
        line.css('top','-50vh')
        line.css('background','black')
        inner.append(line);
    }
    
    return inner
}

function init_background_2(e) {
    var inner = $('<div class="bg_inner"></div>')
    e.append(inner)
    
    for (var i = 0; i < 10; i++) {
        line = $('<div class="line"></div>')
        if (i%2 == 0) line.html('XOXOXOXOXOXOXOX')
        if (i%2 == 1) line.html('OXOXOXOXOXOXOXO')
        //line.css('height','2px')
        line.css('width','400px')
        line.css('top',(i*2+60) + 'vh')
        line.css('right','-4000px')
        inner.append(line);
    }
    /*
    for (var i = 0; i < 20; i++) {
        line = $('<div class="line"></div>')
        line.css('height','400px')
        line.css('width','2px')
        line.css('left',((i*20)-500) + 'px')
        line.css('top','50px')
        line.css('background','black')
        inner.append(line);
    }
    */
    
    return inner
}

function poem_html() {
    //return html for poems
    var poem_block = $('<div id="poem_bloc_'+ctr+'"></div>')
    
    for (var i = 0; i < poem_titles.length; i++) {
        title= poem_titles[i]
        poem_block.append($("<div id='poem_title_"+(i+(poem_titles.length * ctr))+"'class='poem_title'>"+title+"</div>"))
        poem_body =  $("<div class='poem_body'></div>")
        poem_block.append(poem_body)
        for (var j = 0; j <  poems[title].length; j++) {
            line = poems[title][j]
            poem_body.append($("<div class='poem_line'>"+line+"</div>"))
        }
    }
    ctr ++
    return poem_block
}






