var maphandler = function(){

	var matrixsize = 50;

	var gamemap = [];

	function init_game_map() {

		for (var k = 0; k < matrixsize; k++) {
			gamemap[k] = [];
			for (var l = 0 ; l < matrixsize  ; l++) {
				gamemap[k][l] = 'f';
			};
		};
	}


	function init_map() {

		var x,y;
		console.log("init map");

		$('mapDiv').html('');

		init_game_map();

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

		create_walls(30);


	}

	function create_walls(numberofwalls) {
		var i = 0;
		for(i=0;i<=numberofwalls;i++) {
			create_wall();
		}
	}

	function create_wall() {
		// 0 is horizontal, 1 i vertical
		var x,y;
		var direction = Math.floor(Math.random()*10);
		var wall_length = Math.floor(Math.random()* (0.3 * matrixsize)) + 5 ;
		var wall_start = Math.floor(Math.random()*33) + 1
		var wall_other = Math.floor(Math.random()*48) + 1
		var wall_end = wall_start + wall_length;
		if (wall_end > 49) {
			wall_end = 48;
		}

		for (i=wall_start;i<wall_end;i++) {

			if ((direction % 2) == 0) {
				x=i;
				y=wall_other;
			} else {
				x=wall_other;
				y=i;
			}
			//console.log("marking cell: (x/y)" + x + ":" + y);
			mark_cell_wall(x,y);
		}

	}

	function mark_cell_wall(x,y) {

		var cellid = "#" + x + "-" + y;
		$(cellid).removeClass('free-cell');
		$(cellid).addClass('wall-cell');
		gamemap[x][y]= 'w';

	}

	function init_keys(){
		$(document).keydown(function(e){
			var left = 37;
			var up = 38;
			var right = 39;
			var down = 40;
			if (e.keyCode == left) {
				slide_image( -1, 0 )
			}
			if (e.keyCode == up) {
				slide_image( 0, 1 )
			}
			if (e.keyCode == right) {
				slide_image( 1, 0 )
			}
			if (e.keyCode == down) {
				slide_image( 0, -1 )
			}
		});
	}

	function slide_image(dx, dy){
		alert("Sliding")
	}

	return {
		init_map:init_map,
		init_keys:init_keys
	};

}();

$(document).ready(function(){
	maphandler.init_map();
	maphandler.init_keys();
});


