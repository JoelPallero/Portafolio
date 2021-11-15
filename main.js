//Acá agregue una constante para instanciar Muuri(librería de animaciones y grillas)
//y la inicializamos.
//La clase "grid" es la que va a utilizar la librería
//los elementos y el valor roundin para indicar cómo medir cada elemento.
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

//Voy haciendo que js espere cada evento, cosa que haga algo cuando suceda y no
//Que sea llamada desde un control del frontend


window.addEventListener('load', () => {
	/*Cuando cargue la ventana, refresca toda la grid*/
	grid.refreshItems().layout();
	/*Y con esto muestra las imágenes*/
	document.getElementById('grid').classList.add('imagenes-cargadas'); 

	//Acá accedo a los enlaces con el id "categoría" (a = enlaces)
	const enlaces = document.querySelectorAll('#categorias a');
	//hago una iteración para que traiga todos los elementos
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			//le quito el comportamiento por defecto del navegador de utilizar el # en la url
			evento.preventDefault();
			//acá accedo al enlace que no se haya clickeado (el resto)
			//y quitarle el active
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			//acá puedo saber qué enlace fue clickeado (web, desktop o todos)
			evento.target.classList.add('activo');
			
			//Accedo al código html que tengo en cada en enlace
			//desktop, web o cualquier categoría que pueda agregar obvio.
			const categoria = evento.target.innerHTML.toLowerCase();
			//Acá utilizo el filtro que provee Muuri para filtrar los elementos
			//que tienen la categoría que seleccionaos antes
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
			//en vez de utilizar un if, solo usamos un operador ternario que compara identidad e igualdad.
		});
	});

	//Agrego el listener para acceder al texto que se escribe
	//Esto se ejecuta cada vez que se presiona un caracter
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		//creo una variable y le asigno cada letra que voy presionando
		const busqueda = evento.target.value;
		//Y aca utilizo nuevamente el código grid.filter de Muuri
		//para ir filtrando, comparando con las etiquetas que ya están
		//registradas en html.
		grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
	});


	//Acá ya es la parte de la ventana modal
	//incluyendo su propio botón para cerrar la ventana
	const overlay = document.getElementById('overlay'); //accedo al id overlay

	//Acá quiero acceder a los elementos grid, que sean item y que sean img
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		//y al hacer click..
		elemento.addEventListener('click', () => {
			//obtengo la ruta de carpeta del elemento clickeado
			const ruta = elemento.getAttribute('src');
			console.log(ruta)

			//acá accedo a la descripción de ese elemento
			//accedo al padre del padre del elemento, luego a los dataset
			//y accedo a la descripción de los data
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			//Acá le asigno la clase activo al overlay
			overlay.classList.add('activo');

			//Acá teniendo la ruta de la imagen clickeada
			//se la asigno al overlay, al igual que la descripción
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	//Acá básicamente, lo que hago es quitarle la clase "activo" al overlay
	//para que se oculte, cuando clickeo en la X
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	//acá lo que hago es cerrarlo de otra forma
	//haciendo click en el overlay
	//pero hago que solo se cierre cuando sea dado un click
	//en el overlay y no en la imagen o la descripción
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});