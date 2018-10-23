var i = 0,
    d = document,
    one = d.querySelector.bind(d), all = d.querySelectorAll.bind(d), // Facilita o query de elementos - ref.: https://stackoverflow.com/questions/13383886/making-a-short-alias-for-document-queryselectorall#answer-14947838
    shortname = one("[role='navigation'] h1").id,
    main = one("[role='main']"), // Região principal das páginas
    boxes = new Array(); // Array que receberá o overlay e um conjunto de elementos que se relacionam com ele

// Troca o separador dos links do breadcrumb
var arrowSep = all(".breadcrumb .arrow.sep");
for (i; i < arrowSep.length; i++) {
  arrowSep[i].innerText = ">";
}
// Exibe apenas a(s) coluna(s) que contiver(em) bloco(s)
var block = all(".block");
for (i = 0; i < block.length; i++) {
  block[i].parentNode.classList.remove("hidden");
}

// Cria o overlay
var overlay = d.createElement("div"); // Cria o elemento de overlay
overlay.classList.add("overlay"); // Define sua classe
d.body.insertBefore(overlay, one("footer[role='contentinfo']").nextSibling); // O insere no documento
boxes.push(overlay); // O faz ser parte de boxes
// Define o click no overlay
overlay.onclick = function() {
  for (i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove("visible"); // Remove a classe visible de cada parte integrante de boxes
  }
};
    
// Estrutura do .loginerros para referência de futuras implementações
// <div class="loginerrors">
//   <a id="loginerrormessage" class="accesshide" href="#">
//     Your session has timed out.  Please login again.
//   </a>
//   <span class="error">
//     <img class="icon icon-pre" alt="Error" src="https://moodle27.bhe.serpro/unisedev/theme/image.php?theme=uniserpro&amp;component=core&amp;image=i%2Fwarning">
//     Your session has timed out.  Please login again.
//   </span>
// </div>