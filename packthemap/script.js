var maphandler = function(){

	var matrixsize = 50;

	var gamemap = [50][50];


	function init_map() {
		console.log("init map");
		
		$('mapDiv').html('');

		for (y = 0; y<matrixsize;y++) {
			var maprow = "";
			maprow = '<div class="row-separator">';

			
			for (x = 0; x<matrixsize;x++) {
				var cellid = "" + x + "-" +  y;
				maprow += '<span class="map-cell free-cell" id="' + cellid + '"/>';	
			}

			maprow += '</div>';
			$('#mapDiv').append(maprow);
		}
		
		create_walls(3);
	}

	function create_walls(numberofvals) {
		
		for (i=0;i<numberofvals;i++) {
			create_wall();
		}

		

	}


	function create_wall() {
		// 0 is horizontal, 1 i vertical
		var cellid;
		var direction = Math.floor(Math.random());
		var wall_lengt = Math.floor(Math.random()* (0.3 * matrixsize));
		var wall_start = Math.floor(Math.random()*33) + 1
		var wall_other = Math.floor(Math.random()*48) + 1
		
		

		for (i=wall_start;i<wall_lengt;i++) {
			
			if (direction == 0) {
				cellid = "#" + i + "-" + wall_other;
			} else {
				cellid = "#" + wall_other + "-" + i;
			}

			
			$(cellid).removeClass('free-cell');
			$(cellid).addClass('wall-cell');
		}

	}

	return {
		init_map:init_map
	};

}();



$(document).ready(function(){

	maphandler.init_map();
});


	