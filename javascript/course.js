// Insere o campo da data dos modulos
var leftSide = all(".course-content >ul >li:not(#section-0) .left.side");
for (i = 0; i < leftSide.length; i++) {
  leftSide[i].innerHTML = "<p>De .../.../... a .../.../...</p>";
}

// Implementa o campo de ver/ocultar os conteudos dos módulos
var rightSide = all(".course-content >ul >li:not(#section-0) .right.side");
for (i = 0; i < rightSide.length; i++) {
  rightSide[i].innerHTML = "<p>Ver/ocultar o conteúdo</p>";
  rightSide[i].onclick = function() {
    this.parentNode.classList.toggle("visible");
  }
}

// Declara a variavel que retem o endereco do repositorio.
var school = document.location.origin + "/" + shortname,
		complement = "/moodledata-" + shortname + "/repository/",
		repository = school + complement;