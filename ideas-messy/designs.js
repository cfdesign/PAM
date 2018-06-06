
$( document ).ready();
// Select color input
var color = $( "#colorPicker" );

// Select size input
var heightInput = $("#input_height"),
widthInput = $("#input_width"),
gridHeight,
gridWidth,
//div spanning width of browser (with no margins)
canvasArea = $('body');

$("#sizePicker").submit(function(evt){
	evt.preventDefault();
	$( "#pixel_canvas").empty();
	$('input:checkbox').prop("checked", false);
	gridHeight = $(heightInput).val();//tr
	gridWidth = $(widthInput).val();//td
	//check available browser width (minus 20px for 10px margin either side)
	var canvasWidth = canvasArea.width() -20;
	//take submitted input values, mulitply by 20(px) grid squares 
	var submitWidth = gridWidth * 20;
	var submitHeight = gridHeight * 20;
	//If submitted input width is wider than browser canvas width, divide available browser width by 20(px) grid squares (round down by one).
	var suggestion = canvasWidth / 20 -1;
	//verify that submitted input is no wider than availiable browser canvas
	if ( (submitWidth < canvasWidth)&&(submitHeight < canvasWidth) ) {
		makeGrid();
	} else {
		//Perhaps move message to onFocus?
		//alert("Grid too Big. Please try "+suggestion.toFixed()+" x "+suggestion.toFixed()+" or less");
		$("#sizePicker").append('<div class="message">Grid too large. Please try '+suggestion.toFixed()+' x '+suggestion.toFixed()+' or less</div>');
    }
});	

//reset
//$( "#sub-reset" ).click(function() {
 	//$( "#pixel_canvas" ).empty();
	//$("#sub-reset").prop({
	//type: "submit",
	//value: "submit"
	//});
//});

// When size is submitted by the user, call makeGrid()

function makeGrid(){
	var row ="";
	for (var x = gridHeight; x > 0; x--) {
		var cells ="";
		for (var y = gridWidth; y > 0; y--) {
			cells += "<td></td>";	
		}
		row += "<tr>"+ cells +"</tr>";
	}
	$( "#pixel_canvas" ).append(row);
	$("#sub-reset").attr("value", "reset");
	$('#lines-box').css("display", "block");
		
		//alert(sizeH);
	//$( "body" ).append("<div>"+color+"</div>");
	//$( "body" ).append(sizeH);
	//alert("sdfgsdr");

		//var cells =""
	//var row ="";
	//for (var x = sizeH; x > 0; x--) {
		//row += "<tr><td>hank</td></tr>";
	//}
	//return $( "#pixel_canvas" ).append(row);
	
	//var row ="";
	//for (var x = sizeH; x > 0; x--) {
		//var cells ="";
		//for (var y = sizeW; y > 0; y--) {
			//cells += "<td>&nbsp;</td>";	
		//}
		//row += "<tr>"+ cells +"</tr>"
	//}
	//$( "#pixel_canvas" ).append(row);

} 
// Your code goes here!

//Moved submit calculation+message to input-focusout max-value updater.
$("#sizePicker").on('keydown', 'input', function(evt){
  gridHeight = $(heightInput).val();//tr
	gridWidth = $(widthInput).val();//td
	//check available browser width (minus 20px for 10px margin either side)
	var canvasWidth = canvasArea.width() -20;	
	//Divide available browser width by 20(px) grid squares (round down by one).
	var suggestion = canvasWidth / 20 -1;
		$(evt.target).attr("max", suggestion.toFixed());
});

$('input:checkbox').on('click', function() {
	if(this.checked) {
		$('#pixel_canvas tr, #pixel_canvas td').css({border: "0px" });
		$('#pixel_canvas td').css("width", "18px" );
	} else {
		$('#pixel_canvas tr, #pixel_canvas td').css({border: "1px solid #65a9c7" });
		$('#pixel_canvas td').css("width", "17px" );
	}
});

//var alt = $( "#pixel_canvas td" ).css( "background" );
//$( "td" ).click(function() {
  //var li = $( this );
  //if ( li.is( alt ) ) {
    //li.slideUp();
  //} else {
   // li.css( "background", "red" );
  //}
//});
//var alt = $("td").css( "background", "rgb(0, 0, 0)");
//$( '#pixel_canvas' ).on('click', 'td', function(evt) {
	//var td = $( evt.target );
	//if (td.is(alt)) {
   //td.removeAttr( "style" );
	//} else {
		//td.css( 'background', $(color).val() );
	//}
//});

//var style = $( "td" ).prop( "background" );  THIS WORKS
 $( "#pixel_canvas" ).on('click', 'td', function(evt) {
  var td = $( evt.target );
 
   if (td.prop('style').background === '' ){
      td.css( 'background', $(color).val() );
    } else {
      td.css('background', '');
    }
});
//$( '#pixel_canvas' ).on( 'click', 'td', function(evt) {
  //$( evt.target ).css( 'background', $(color).val() );
//});
// below caused a 'bug' on click and drag, assigning a background  colour to the whole pixel_canvas table.
//$( '#pixel_canvas' ).click( 'td', function(evt) {
  //$( evt.target ).css( 'background', $(color).val() );
//});
