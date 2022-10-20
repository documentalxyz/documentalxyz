
// INIT

var all_layers = []
var map_blocks = {}
var active_block = ''

let body = $('body')
let burger = $('#burger')

// SCROLL TO

function scrollTo(id, t, d) {
	setTimeout(() => {
		$('html, body').animate({scrollTop: $(id).offset().top}, t)
	}, d)
}

// MENU LOOP chapters

let chapters = document.querySelectorAll('section.cover')
let chapters_ul = $('#menu ul')

chapters.forEach((el,i) => {
	let title = $(`#${el.id}`).find('.cover-block-chapter-intro h2').text()
	chapters_ul.append(`<li><a href="#${el.id}" class="nav-item">${title}</a></li>`)
	//console.log(title,el.id)
})

// HEADER

// burger click
    
burger.click(function(){
	if(body.hasClass('show-overlay')) {
		overlayClose()
	} else {
		overlayOpen()
	}
})

function overlayOpen(video) {
	body.addClass('show-overlay')
}

function overlayClose() {
	body.removeClass('show-overlay')
}

$('#menu li a:not(.accordion-trigger)').on('click', (e) => {
	e.preventDefault()
	overlayClose()
	scrollTo($(e.currentTarget).attr('href'), 0, 0)
})


// LOOP ALL GALLERIES

$('.image-gallery').each(function(i, el){
	var $el = $(el)
	$el.find('a').attr('rel','gallery-' + i)
})

// VIDEO GALLERY

$('.video-gallery-wrapper').each(function(i, el){

	var $el = $(el)

	$el.find('a').mouseover(function(e){
		$el.addClass('is-hover')
	}).mouseleave(function(e){
		$el.removeClass('is-hover')
	})

})


// LOOP ALL MAP-BLOCKS

$('.map-blocks article').each(function(i, el){

	var $el = $(el)

	// add unique ID

	var id = 'block-' + $el.parent().data('index') + '-mapblock-' + $el.data('index')

	$el.attr('id', id)

	// parse layers JSON

	var data_layers = $('.data-layers', $el).text()
	var layers = JSON.parse(data_layers || "[]")

	// feed all_layers array

	layers.map(function(el, i){
		all_layers = _.union(all_layers, [el.layer])
	})

	// register chapter

	map_blocks[id] = {
		duration: $el.data('duration'),
        bearing: $el.data('bearing'),
        zoom: $el.data('zoom'),
        center: [$el.data('lat'), $el.data('lng')],
        pitch: $el.data('pitch'),
        layers: layers
	}

})


// MAPBOX INITIALIZATION

mapboxgl.accessToken = MPBX_TOKEN

var map = new mapboxgl.Map({
	container: 'map',
	style: MPBX_STYLE + '?fresh=true',
	center: [MPBX_S_LAT, MPBX_S_LNG],
	zoom: MPBX_SZOOM
})

map.on('load', function () {

	all_layers.map(function(el, i){
		map.setLayoutProperty(el, 'visibility', 'none')
	})

	window.onscroll = function() {
		const blocks = Object.keys(map_blocks)
		for (let i = 0; i < blocks.length; i++) {
			const block_name = blocks[i]
			if (isElementOnScreen(block_name)) {
				setActiveBlock(block_name)
				console.log('activate', block_name)
				break
			}
		}
	}

})

// MAP_BLOCKS ENGINE

function isElementOnScreen(id) {
	const element = document.getElementById(id)
	const bounds = element.getBoundingClientRect()
	return bounds.top < window.innerHeight && bounds.bottom > (window.innerHeight / 4)
}

function setActiveBlock(block_name) {

    // If same, do nothing
    if (block_name === active_block) return

    //manageLayers(chapterName)
    map.flyTo(map_blocks[block_name])
    document.getElementById(block_name).classList.add('active')
    
    if(document.getElementById(active_block)){
        document.getElementById(active_block).classList.remove('active')
        //hideLayers(active_block)
    }

    showLayers(block_name)

    active_block = block_name

}

function showLayers(block_name) {

	// get block layers
	
	var layers = map_blocks[block_name].layers

	// flat version / only names
	
	var layers_flat = layers.map(function(el, i){
		return el.layer
	})

	// filter layers to hide

	var layers_to_hide = _.difference(all_layers, layers_flat)

	layers_to_hide.map(function(el, i){
		map.setLayoutProperty(el, 'visibility', 'none')
	})

	// make block layers visible

	layers_flat.map(function(el, i){
		map.setLayoutProperty(el, 'visibility', 'visible')
	})

	// apply or remove filtering

	layers.map(function(el, i){
		if(el.filter_key){
			map.setFilter(el.layer, [el.filter_comparison, el.filter_key, el.filter_value])
		} else {
			if(map.getFilter(el.layer)){
				map.setFilter(el.layer, null)
			}
		}
	})

}


// JUXTAPOSE


// Fix juxtapose.js responsive behavior
// https://github.com/NUKnightLab/juxtapose/issues/105
var $juxtapose = $('.juxtapose')

$juxtapose.each(function(index, element) {

	var $juxtaposeContainer = $juxtapose.parent()
	var juxtaposeRatio

	$(window).on('load', function (event) {
		juxtaposeRatio = $(element).outerHeight() / $(element).outerWidth()
	})

	$(window).on('resize', function (event) {
		var newWidth = $juxtaposeContainer.outerWidth()
		var newHeight = newWidth * juxtaposeRatio
		$(element).css({width: newWidth, height: newHeight})
	})

})