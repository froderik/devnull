var maphandler = function(){

	var numbeofpills = 4;
	var numberofmonsters = 4;
	var pillsadded = 0;
	var monstersadded = 0;

	var matrixsize = 30;
	var player_x = 0;
	var player_y = matrixsize/2;
	var player_mode = 'n';
	var hulkmodeinterval = 0;

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
		pillsadded = 0;
		monstersadded = 0;

		$('#mapDiv').html('');

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

		create_walls(10);

		add_player();

		add_pills();
		add_monsters();

	}


	function add_pills() {
		while(pillsadded < numbeofpills) {
			var px = get_random_of_matrix();
			var py = get_random_of_matrix();
			console.log('pill pos: ' + px + ":" + py);

			if (gamemap[px][py] == 'f') {
				pillsadded++;
				var offset = get_offset_for_cell(px,py);
				var pillid = 'pill' + pillsadded;
				gamemap[px][py] = pillid;
				$('#mapDiv').append('<div id="'+pillid+ '" class="map-cell pill-cell"></div>');
				move_block("#" + pillid,offset);
			}

		}
	}

	function get_random_of_matrix() {
		return Math.floor(Math.random()*matrixsize);
	}

	function add_monsters() {
		
	}

	function add_player() {
		$('#mapDiv').append('<div id="player-cell" class="player-normal map-cell"></div>');
		var offset = get_offset_for_cell(player_x,player_y);
		$('#player-cell').offset({ top: (offset.top), left: (offset.left)})

		gamemap[player_x][player_y] = 'p';


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
		var wall_start = Math.floor(Math.random()*(matrixsize*0.6)) + 1
		var wall_other = Math.floor(Math.random()*(matrixsize - 2)) + 1
		var wall_end = wall_start + wall_length;
		if (wall_end > matrixsize - 1) {
			wall_end = matrixsize - 2;
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

	function get_offset_for_cell(x,y) {
		return $(get_cell_id(x,y)).offset();
	}

	function get_cell_id(x,y) {
		var cid =  "#" + x + "-" + y;
		//console.log("cellid:" + cid);
		return cid;
	}

	function init_keys(){
		$(document).keydown(function(e){
			//e.preventDefault();
			var left = 37;
			var up = 38;
			var right = 39;
			var down = 40;
			if (e.keyCode == left) {
				move_player( -1, 0 )
			}
			if (e.keyCode == up) {
				move_player( 0, -1 )
			}
			if (e.keyCode == right) {
				move_player( 1, 0 )
			}
			if (e.keyCode == down) {
				move_player( 0, 1 )
			}
		});
	}

	function new_position_in_map(x,y) {
		return (x >= 0 && x < matrixsize) && (y >= 0 && y < matrixsize) && gamemap[x][y] == 'f';
	}

	function move_player(dx, dy){
		var player_x_new = player_x + dx;
		var player_y_new = player_y + dy;

		console.log('player current position: ' + player_x + ":" + player_y + "cell: " + gamemap[player_x][player_y]);

		if (gamemap[player_x_new][player_y_new].match('pill')) {
			var pillid = gamemap[player_x_new][player_y_new];
			$("#"+pillid).fadeOut(500);
			gamemap[player_x_new][player_y_new] = 'f';
			// TODO: player in turbo!!!!
			if (player_mode == 'h') {
				window.clearInterval(hulkmodeinterval);
			} else {
				player_mode = 'h';
				$('#player-cell').removeClass('player-normal');
				$('#player-cell').addClass('player-hulk');
			}

			hulkmodeinterval = setInterval(player_normal_mode,5000);
		}

		if (new_position_in_map(player_x_new, player_y_new)) {

			console.log('new position: ' + player_x_new + ":" + player_y_new + "cell: " + gamemap[player_x_new][player_y_new]);

			gamemap[player_x][player_y] = 'f';

			player_x = player_x_new;
			player_y = player_y_new;
			gamemap[player_x][player_y] = 'p';

			var offset = get_offset_for_cell(player_x,player_y);
			console.log("offset: " + offset.left + " : " + offset.top);

			move_block('#player-cell',offset);
		}

	}

	function player_normal_mode() {
		player_mode = 'n';
		$('#player-cell').removeClass('player-hulk');
		$('#player-cell').addClass('player-normal');
	}

	function move_block(id,offset) {
		$(id).animate({ top: offset.top,left: offset.left}, 250);
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


