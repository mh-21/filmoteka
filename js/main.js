$('#collapseExample').collapse({
  toggle: false
})

$('#addvideo').on('click', function(event) {
event.preventDefault();
console.log(this);
$(this).children('i').removeClass('fa-plus-circle');
$(this).children('i').addClass('fa-times-circle');
	var hasStyle = $('.formAdd').attr('style');
	if (hasStyle == "display: block;") {
		$('.formAdd').hide();
$(this).children('i').removeClass('fa-times-circle');
$(this).children('i').addClass('fa-plus-circle');
	} 
	else {
	$('.formAdd').show();
	}


});

var $formAddFilm = $('#formAddFilm'),
$deleteBtn = $('#deleteBtn'),
$modalConfirm = $('#modalConfirm'),
$modalEdit = $('#modalEdit'),
$addComment = $('#addComment'),
$btnConfirm = $('#btnConfirm'), //delete film button
$btnConfirmEdit = $('#btnConfirmEdit'),
commentsCount = 0; //edit film button

// events
$('#sendDescrtiption').on('click', function(event) {
	event.preventDefault();
var film = {
		title: $(this).parent().find('[name=title]').val(),
		year: $(this).parent().find('[name=year]').val(),
		country: $(this).parent().find('[name=country]').val(),
		genre: $(this).parent().find('[name=genre]').val(),
		poster: $(this).parent().find('[name=poster]').val(),
		description: $(this).parent().find('[name=description]').val(),
		comments: [{}]
	};	

// if (!film.title || film.year || film.country || film.genre || film.poster) {
// 		$(this).find('[name=title]').parent().addClass('has-error');
// 		$(this).find('[name=year]').parent().addClass('has-error');
// 		$(this).find('[name=country]').parent().addClass('has-error');
// 		$(this).find('[name=genre]').parent().addClass('has-error');
// 		$(this).find('[name=poster]').parent().addClass('has-error');
// 		return;
// 	}

	var key = new Date().getTime();
//console.log(film, "FFFF = ", this, " KEY - ", key);

	localStorage.setItem(key, JSON.stringify(film));
	
	addTask(film, key);




$('.formAdd').hide();
$('.addFilm').find('i').removeClass('fa-times-circle');
$('.addFilm').find('i').addClass('fa-plus-circle');
});

function addTask(film, key) {
//if comments is empty
console.log(film);
if (film.comments == 'undefined') {
commentsCount = 0;
} 
else {
	commentsCount = film.comments.length - 1;
 }

//ADD section with film
	$('main').append(`
<section class="inner-content" data-id="${key}">
      <div class="bgimage"><img src="${film.poster}"></div>
<div class="film-description">
	<div><img src="${film.poster}"></div>
	<div class="about">
		<h2>${film.title}</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure aliquid placeat porro sequi, cum tenetur!</p>
		<div class="info">
		<table>
  <tr>
    <td>Country</td>
    <td>${film.country}</td>
  </tr>
  <tr>
    <td>Year</td>
    <td>${film.year}</td>
  </tr>
    <tr>
    <td>Genre</td>
    <td>${film.genre}</td>
  </tr>
    <tr>
    <td>Actors</td>
    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque harum expedita voluptate modi, soluta sapiente cupiditate quos assumenda ratione.</td>
  </tr>
</table>
</div>
	<div class="btn-down">
		<button class="btn btn-danger" id="deleteBtn">Delete</button>
		<button class="btn btn-primary" id="editBtn">Edit</button>
		</div>
	</div>
</div>
<div class="dropdown">
  <a class="dropdown" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Comments: ${commentsCount} <i class="fa fa-chevron-up"></i> 
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="comment-list">

  <textarea  rows="3" placeholder="Add your comment...">
  </textarea>
 <button class="btn btn-primary" id="addComment">Add</button>
  </div>
</div>
		</section>
		`);

//addin our comments to MODAL window with comments 
	if (film.comments == 'undefined') {
commentsCount = 0;
} 
else {
	for (i=1; i<film.comments.length; i++) {
		var text = film.comments[i].comment;
		$('main').find(`[data-id=${key}]`).find('#comment-list').prepend(`<p>${text}</p>`);
	}
}
	
}

// modal window DELETE click
$('main').on('click', '#deleteBtn', function() {
	$modalConfirm.modal('show');
	let key2 = $(this).parents('section').data('id');
	$modalConfirm.attr('data-key', key2);
});


//on modal window delete confirm
$btnConfirm.on('click', function() {
	var $modal = $(this).parents('.modal');
	var key = $modal.attr('data-key');
	localStorage.removeItem(key);
	$('main').find(`[data-id=${key}]`).remove();
	$modal.modal('hide');
});


// modal window EDIT
$('main').on('click', '#editBtn', function() {
	let key = $(this).parents('section').data('id');
	var obj = JSON.parse(localStorage.getItem(key));
	$modalEdit.find('[name=title]').val(obj.title);
	$modalEdit.find('[name=year]').val(obj.year);
	$modalEdit.find('[name=country]').val(obj.country);
	$modalEdit.find('[name=genre]').val(obj.genre);
	$modalEdit.find('[name=poster]').val(obj.poster);
	$modalEdit.find('[name=description]').val(obj.description);
	$modalEdit.modal('show');
		
	$modalEdit.attr('data-key', key);
	$modalEdit.find('[name=title]').val(obj.title);
});

//on modal window EDIT confirm
$btnConfirmEdit.on('click', function() {
	var $modal = $(this).parents('#modalEdit');
	var key = $modal.attr('data-key');
	var obj = JSON.parse(localStorage.getItem(key));
	var commentsObj = obj.comments;
var film2 = {
		title: $("#formEdit").closest("form").find('[name=title]').val(),
		year: $("#formEdit").closest("form").find('[name=year]').val(),
		country: $("#formEdit").closest("form").find('[name=country]').val(),
		genre: $("#formEdit").closest("form").find('[name=genre]').val(),
		poster: $("#formEdit").closest("form").find('[name=poster]').val(),
		description: $("#formEdit").closest("form").find('[name=description]').val(),
		comments: commentsObj
	};

	localStorage.setItem(key, JSON.stringify(film2));

	//$('main').find(`[data-id=${key}]`).remove().replaceWith(addTask(film2, key));
	var nextsection = $('main').find(`[data-id=${key}]`).next('section').attr('data-id');
	console.log(nextsection);
	 $('main').find(`[data-id=${key}]`).remove();
	 addTask(film2, key) ;
	var clon = $('main').find(`[data-id=${nextsection}]`);
	var filmNew = $('main').find(`[data-id=${key}]`);
	$(filmNew).insertBefore(clon);
	$modal.modal('hide');
});


// button Add comment
$('main').on('click', '#addComment', function(event) {
	event.preventDefault();

	var modal = $(this).parents('section');
	var comment = $(this).siblings('textarea').val();
	var key = modal.attr('data-id');
	let date = Date.now();
	let backToDate = new Date(date);
	let film2 = JSON.parse(localStorage.getItem(key));
	film2.comments.push({date, comment});
	localStorage.setItem(key, JSON.stringify(film2));
	$(this).siblings('textarea').val('');
	//$(this).siblings('p').html('f');

	var nextsection = $('main').find(`[data-id=${key}]`).next('section').attr('data-id');
	console.log(nextsection);
	 $('main').find(`[data-id=${key}]`).remove();
	 addTask(film2, key) ;
	var clon = $('main').find(`[data-id=${nextsection}]`);
	var filmNew = $('main').find(`[data-id=${key}]`);
	$(filmNew).insertBefore(clon);

	//c.before()

	//$('main').find(`[data-id=${key}]`).remove().replaceWith(addTask(film2, key));

		// var text = film2.comments[i].comment;
		// $('main').find(`[data-id=${key}]`).find('#comment-list').prepend(`<p>${text}</p>`);
	
});


$('main').on('click', '#dropdownMenuLink', function(event) {
	event.preventDefault();

});



for (let key in localStorage) {
	if (localStorage.hasOwnProperty(key)) {
		let film = JSON.parse(localStorage.getItem(key));
	    addTask(film, key);
	}
}