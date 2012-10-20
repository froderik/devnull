$(document).ready(function(){

	function load_files() {
		$.get("http://localhost:4567/files",function(data) {
			$('#filesDiv').html(data);
		});
	}


	$('#uploadButton').click(function(){
		var fileList = document.getElementById('files-upload').files;

		console.log("Getting files: " + fileList);

		if (typeof fileList !== "undefined") {
			for (var i=0, l=fileList.length; i<l; i++) {

				console.log(fileList[i].name);

				var file = fileList[i];

				xhr = new XMLHttpRequest();
				xhr.open("post", "http://localhost:4567/upload", true);
				
				xhr.setRequestHeader("Content-Type", "multipart/form-data");
				xhr.setRequestHeader("X-File-Name", file.name);
				xhr.setRequestHeader("X-File-Size", file.size);
				xhr.setRequestHeader("X-File-Type", file.type);

				xhr.send(file);
			}

		}
		load_files();
	});
	load_files();
});


	