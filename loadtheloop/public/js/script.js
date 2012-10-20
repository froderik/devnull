$(document).ready(function(){

	//var filesInput = $('#files-upload');

	
	$('#uploadButton').click(function(){


		var fileList = document.getElementById('files-upload').files;

		console.log("Getting files: " + fileList);


		if (typeof fileList !== "undefined") {
			for (var i=0, l=fileList.length; i<l; i++) {

				console.log(fileList[i].name);

				
				$.ajax({
      					type: "POST",
      					url: 'http://localhost:4567/upload', 
						enctype: 'multipart/form-data',
      					data: {file: fileList[i].name},
      					success: function () {
        					console.log("Data Uploaded: ");
      					}
      				});
				
			}

		}

		
	});


});


	