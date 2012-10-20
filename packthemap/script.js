$(document).ready(function(){

	function init_map() {
		console.log("init map");
		
		$('mapDiv').html('');

		for (y = 0; y<50;y++) {
			var maprow = "";
			maprow = '<div class="row-separator">';

			
			for (x = 0; x<50;x++) {
				var cellid = "" + x + "-" +  y;
				maprow += '<span class="map-cell" id="' + cellid + '"/>';	
			}

			maprow += '</div>';
			$('#mapDiv').append(maprow);
		}
		

	}


	init_map();
});


	