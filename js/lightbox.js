'use strict'

$(document).ready (function() {

	let jquery = {
		
	};
	jquery.modules = {};


	jquery.modules.lightbox = (function () {

		let html=[];

		let create = function (id, titre) {

			html.push('<div class="modal-content">');
            	html.push("<img class='modal' src='"+id+"'>");
            	html.push("<h1>"+titre+"</h1>");
            	html.push("<button class='button'>X</button>");
            	html.push("<button class='prec'><<</button>");
            	html.push("<button class='suiv'>>></button>");
            	html.push("<div class='commentaires'><button class='com'>Ajouter com</button><button class='vider'>Vider</button><div class='liste-com'></div></div>");
            html.push('</div>');
			
		}

		let listener = function(eventimg) {
			console.log(eventimg);
			$(".button").on('click', (event) => { hide(); } );
			$(".prec").on('click', (event) => { prec(eventimg); } );
			$(".suiv").on('click', (event) => { suiv(eventimg); } );

			$(document).keydown(function(e){
			   switch (e.which){
			     case 37: // fleche gauche
			       prec(eventimg);
			     case 39: // fleche droite
			       suiv(eventimg);
			   }
			});

			$(".com").on('click', (event) => { recupCom(eventimg); } );
			$(".vider").on('click', (event) => { viderCom(eventimg); } );
		}

		let show = function() {
			$(html.join('')).appendTo('body');
		}

		let hide = function () {
			$(".modal-content").remove();
			html=[];
		}

		let prec = function(eventimg) {
			let id = $(eventimg.target).parent().prev().children().data('img');
			let titre = $(eventimg.target).parent().prev().children().next().text();

			if(typeof id !== 'undefined')
			{
				hide();
				create(id, titre);
				show();
				var obj = new Object();
				obj.target = $(eventimg.target).parent().prev().children();
				listener(obj);
				afficheCom(obj);
			}
		}

		let suiv = function(eventimg) {
			let id = $(eventimg.target).parent().next().children().data('img');
			let titre = $(eventimg.target).parent().next().children().next().text();

			if(typeof id !== 'undefined')
			{
				hide();
				create(id, titre);
				show();
				var obj = new Object();
				obj.target = $(eventimg.target).parent().next().children();
				listener(obj);
				afficheCom(obj);
			}
		}

		let recupCom = function(eventimg) {
			let id = $(eventimg.target).data('img');
			let com = prompt("Votre commentaire");
			com = "<span>"+com+"</span> "+localStorage.getItem(id)
			localStorage.setItem(id, com);
			afficheCom(eventimg);

		}

		let afficheCom = function(eventimg) {
			let id = $(eventimg.target).data('img');
			$('.liste-com').text('');
			$(localStorage.getItem(id)).appendTo('.liste-com');
		}

		let viderCom = function(eventimg) {
			let id = $(eventimg.target).data('img');
			localStorage.setItem(id, '');
			afficheCom(eventimg);
		}

		let start = function () {
			$("img").on('click', (event) => {


				let id = $(event.target).data('img');
				let titre = $(event.target).next().text();
				create(id, titre);
				show();
				listener(event);
				afficheCom(event);
			});
			
		}

		return {
			start
		};

	}) ();


	jquery.modules.lightbox.start();
});