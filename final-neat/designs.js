$(document).ready();
// Select color input
const color = $('#colorPicker');

// Select size input
const heightInput = $('#input_height'),
widthInput = $('#input_width'),
canvasArea = $('body');
let gridHeight,
gridWidth,
canvasWidth,
suggestion;

// When size is submitted by the user, call makeGrid()
$('#sizePicker').submit(function(evt){
	evt.preventDefault();
	$( '#pixel_canvas').empty();
	$( '#sizePicker div' ).empty();
	$('input:checkbox').prop('checked', false);
	gridHeight = $(heightInput).val();//tr
	gridWidth = $(widthInput).val();//td
	validation();
	//Verify that submitted grid input is less than browser width (fallback for browsers non-compliant with HTML5 form validation)
	if ( (gridWidth <= suggestion)&&(gridHeight <= suggestion) ) {
		makeGrid();
	} else {
		$('#sizePicker').append('<div class="message"><p>Grid too large. Please try '+suggestion+' x '+suggestion+' or less</p></div>');
  }
});	

function makeGrid(){
	let row ='';
	for (let x = gridHeight; x > 0; x--) {
		let cells ='';
		for (let y = gridWidth; y > 0; y--) {
			cells += '<td></td>';	
		}
		row += '<tr>'+ cells +'</tr>';
	}
	$('#pixel_canvas').append(row);
	$('#sub-reset').attr('value', 'reset');
	$('#lines-box').css('display', 'block');
} 

// Your code goes here!

//Dynamic HTML5 input validation for maximum grid size.
$('#sizePicker').on('keydown', 'input', function(evt){
		validation();
		$(evt.target).attr('max', suggestion);
});

//validation for maximum grid size, based on browser (body) width.
function validation(){
		//Available browser px width (minus 40px for a minimum left-right margin of 20px)
		canvasWidth = canvasArea.width() -40,
		//Divide browser width by 20(px grid squares) to find maximum grid value. Round down decimal (Adds up to 9px to left-right margin).
		suggestion = Math.floor(canvasWidth / 20);
}

//When a square is clicked change the background colour using the current value of the colour picker.
//When a square is clicked with a background colour, remove it.
$( '#pixel_canvas' ).on('click', 'td', function(evt) {
const td = $( evt.target );
 if (td.prop('style').background === '' ){
		td.css( 'background', $(color).val() );
	} else {
		td.css('background', '');
  }
});

//Grid lines (borders) CSS checkbox 'toggle'
$('input:checkbox').on('click', function() {
		$('tr, td').toggleClass('border-less');
});