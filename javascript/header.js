// .custom-menu
var customMenu = one(".custom-menu"),
    logininfo = one(".logininfo"),
    newLogininfo = one(".custom-menu li:last-child");
if (all(".logininfo a").length === 2) {
  one(".custom-menu li:last-child").appendChild(one(".logininfo a:first-child"));
}
one(".custom-menu li:last-child").appendChild(one(".logininfo a:last-child"));
one(".logininfo").remove();
newLogininfo.classList.add("logininfo");
logininfo = newLogininfo;

// Verifica a existência do link para o perfil do aluno
if (logininfo.children.length === 2) {
  var userprofileAnchor = logininfo.children[0],
      useruserprofileElement = ".descriptionbox",
      logininfoAnchor = logininfo.children[1],
      logininfoElement = "#notice"; // Elemento a ser utilizado após a requisição Ajax
  // Define e posiciona o userprofileBox (caixa que recebe as informações do usuário)
  var userprofileBox = d.createElement("div");
  userprofileBox.classList.add("userprofilebox");
  one("nav[role='navigation']").appendChild(userprofileBox);
  boxes.push(userprofileBox);
  // Executa a requisição do conteúdo do userprofileBox
  var userprofileRequest = new XMLHttpRequest();
  userprofileRequest.open("GET", userprofileAnchor.href, true);
  userprofileRequest.onload = function() {
    if (userprofileRequest.status >= 200 && userprofileRequest.status < 400) {
      var response = userprofileRequest.responseText,
          parser = new DOMParser(),
          doc = parser.parseFromString(response, "text/html");
      userprofileBox.innerHTML = doc.querySelector(useruserprofileElement).innerHTML;
      if (!!profilePicture) {
        profilePicture.innerHTML = doc.querySelector(profilePictureElement).innerHTML;
      }
    } else {
      alert("O servidor retornou um erro e as informações do usuário podem não ter sido carregadas corretamente.")
    }
  };
  userprofileRequest.onerror = function() {
    alert("Houve um problema na conexão com o servidor e as informações do usuário não estarão disponíveis.");
  };
  userprofileRequest.send();
  // Define a ação do clique no nome do usuário
  userprofileAnchor.onclick = function() {
    userprofileBox.classList.toggle("visible");
    if (userprofileBox.classList.contains("visible")) {
      overlay.classList.add("visible");
    } else {
      overlay.classList.remove("visible");
    }
    return false;
  };
} else {
  var logininfoAnchor = logininfo.children[0],
      logininfoElement = ".loginpanel"; // Elemento a ser utilizado após a requisição Ajax
}

// Define e posiciona o logininfoBox (caixa que recebe os campos de login/logout)
var logininfoBox = d.createElement("div");
logininfoBox.classList.add("logininfobox");
one("nav[role='navigation']").appendChild(logininfoBox);
boxes.push(logininfoBox);
// Executa a requisição do conteúdo do logininfoBox
var logininfoRequest = new XMLHttpRequest();
logininfoRequest.open("GET", logininfoAnchor.href.split("?")[0], true); // // split necessário para evitar um logout imediato
logininfoRequest.onload = function() {
  if (logininfoRequest.status >= 200 && logininfoRequest.status < 400) {
    var response = logininfoRequest.responseText,
        parser = new DOMParser(),
        doc = parser.parseFromString(response, "text/html");
    logininfoBox.innerHTML = doc.querySelector(logininfoElement).innerHTML;
    // Define os placeholders no form de login
    if (!!one(".notloggedin")) {
      var logininfoInputText = one(".loginform input[type='text']"),
          logininfoInputPassword = one(".loginform input[type='password']");
      logininfoInputText.setAttribute("placeholder", "Nome de usuário ou CPF");
      logininfoInputPassword.setAttribute("placeholder", "Senha (letras e números)");
      // Posiciona o .forgetpass próximo aos campos de preenchimento
      one("form#login").insertBefore(one(".forgetpass"), one("#loginbtn"));
      // Torna a variável logininfoInputText global para ser efeito de foco
      window.logininfoInputText = logininfoInputText;
    }
    // var loginInput = all(".loginform input"),
    //     loginLabel = all(".loginform label");
    // for (i = 0; i < loginInput.length; i++) {
    //   loginInput[i].setAttribute("placeholder", loginLabel[i].innerText);
    //   loginLabel[i].parentNode.remove();
    // }
    // Exibe o logininfoBox em caso de falha de login
    if (!!logininfoBox.querySelector(".loginerrors")) {
      logininfoAnchor.click();
    }
  } else {
    alert("O servidor retornou um erro e a opção de login/logout pode não ter sido carregada corretamente.")
  }
};
logininfoRequest.onerror = function() {
  alert("Houve um problema na conexão com o servidor e a opção de login/logout não estará disponível.");
};
logininfoRequest.send();

// // Posiciona o .forgetpass próximo aos campos de preenchimento
// window.onload = function() {
//   logininfoBox.insertBefore(one(".logininfobox #loginbtn"), one(".logininfobox .logininfobox"));
// };

// Define a ação do clique no login/logout
logininfoAnchor.onclick = function() {
  logininfoBox.classList.toggle("visible");
  if (logininfoBox.classList.contains("visible")) {
    overlay.classList.add("visible");
    window.setTimeout(function() {
      logininfoInputText.focus()
    }, 500); // Mesmo atraso da transição de opacidade, definida no CSS
  } else {
    overlay.classList.remove("visible");
  }
  return false;
};

// Aplica o FitText
// var customMenuItem = all(".custom-menu a");
// for (i = 0; i < customMenuItem.length; i++) {
//   fitText(customMenuItem[i], 1.2);
// }
