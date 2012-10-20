var maphandler = function(){

	var matrixsize = 50;
	var player_x = 0;
	var player_y = 25;

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
				var cellid = get_cell_id(x,y);
				maprow += '<span class="map-cell free-cell" id="' + cellid.substring(1) + '"/>';	
			}

			maprow += '</div>';
			$('#mapDiv').append(maprow);
		}
		
		create_walls(20);

		add_player();		
	}



	function add_player() {
		$('#mapDiv').append('<div id="player-cell" class="map-cell"></div>');
		var offset = $('#mapDiv').offset();
		$('#player-cell').offset({ top: (offset.top + player_y * 10), left: (offset.left + player_x * 10)})

		gamemap[player_y][player_y] = 'p';


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

		var cellid = get_cell_id(x,y);
		$(cellid).removeClass('free-cell');
		$(cellid).addClass('wall-cell');
		gamemap[x][y]= 'w';

	}

	function get_cell_id(x,y) {
		var cid =  "#" + x + "-" + y;
		console.log("cellid:" + cid);
		return cid;
	}

	return {
		init_map:init_map
	};

}();

$(document).ready(function(){
	maphandler.init_map();
});


	