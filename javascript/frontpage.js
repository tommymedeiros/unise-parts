// Script com definições específicas da página inicial da escola

if (!!one("#page-site-index")) { // Inicia o script verificando o id da página

  // Define o placeholder na busca de cursos
  var coursesearch = one("#coursesearch"), // Mapeia o coursesearch
      coursesearchInput = one("#coursesearch input"), // Mapeia o input do coursesearch
      coursesearchLabel = one("#coursesearch label"); // Mapeia o label do coursesearch
  coursesearchInput.setAttribute("placeholder", coursesearchLabel.innerText.split(":")[0]); // Utiliza o texto do label como placeholder do input
  coursesearchLabel.remove(); // Remove o label

  // Remove o texto do botão de busca de cursos
  // coursesearchInput.nextSibling.setAttribute("value", "");

  if (!!one("#page-site-index:not(.notloggedin)")) { // Verifica se é a página pós-login

    // Reposiciona a busca de cursos
    main.appendChild(coursesearch.parentNode);

    // Define a mensagem de boas vindas
    var firstName = userprofileAnchor.innerText.split(" ")[0]; // Grava o primeiro nome do usuário numa variável
        welcomeMessage = d.createElement("div"), // Cria a div que receberá a mensagem
        welcomeMessageContent = "<p>Olá, " + firstName + "! Esta é a sua página pessoal. Aqui você poderá ver os cursos nos quais está inscrito, editar informações do seu perfil, visualizar as badges conquistadas e compartilhar suas conquistas em seus círculos sociais! A UniSerpro disponibiliza um <a href='#!'>guia rápido de navegação</a>, para que você possa entender como funciona nossa escola. É super fácil! Recomendamos que, antes de iniciar seu curso, visualize o guia - assim, você aproveitará ao máximo sua experiência. Bons cursos!</p>"; // Grava a mensagem numa variável
    welcomeMessage.classList.add("welcome-message"); // Atribui uma classe a essa div
    welcomeMessage.innerHTML = welcomeMessageContent; // Insere a mensagem na div
    main.insertBefore(welcomeMessage, main.querySelector("a.skip-block")); // Insere e posiciona a div no DOM

    // Implementa a imagem do usuário
    var profilePictureElement = ".profilepicture", // Define a classe do elemento que será utilizado no retorno da requisição Ajax
        profilePicture = d.createElement("div"); // Cria div que receberá a imagem
    profilePicture.classList.add("profilepicture"); // Atribui uma classe a essa div
    main.insertBefore(profilePicture, welcomeMessage); // Insere e posiciona a div no DOM
    profilePicture.previousSibling.remove(); // Remove um <br>

    // Implementa o posicionamento vertical da imagem do usuário
    function setProfilePictureTop() {
      profilePicture.style.top = 135 - window.scrollY + "px";
    }
    setProfilePictureTop();
    window.onscroll = setProfilePictureTop;

    // Implementa a navegação básica do usuário
    var basicNavigation = d.createElement("ul");
    basicNavigation.id = "basic-navigation";
    main.insertBefore(basicNavigation, welcomeMessage);
    var editProfile = one(".block_settings #usersettings").nextSibling.querySelector("li").cloneNode(true);
    // Insere os botões de navegação básica
    basicNavigation.appendChild(editProfile);
    // Implementa a navegação pelos cursos do usuário
    var coursesNavigation = d.createElement("ul"); // Define a lista de botões
    coursesNavigation.id = "courses-navigation"; // Define o id dessa lista
    main.insertBefore(coursesNavigation, one("#frontpage-course-list")); // Insere a lista no DOM
    // Mapeia os meus cursos
    var myCourses = one(".block_navigation #expandable_branch_0_mycourses").parentNode.cloneNode(true);
    // Insere os botões de navegação pelos cursos
    coursesNavigation.appendChild(myCourses);
    // Cria o hamburger menu
    var hamburgerMenu = d.createElement("div");
    hamburgerMenu.classList.add("hamburger-menu");
    one("aside").appendChild(hamburgerMenu);
    hamburgerMenu.onclick = function() {
      one("[id='block-region-side-pre']").classList.toggle("visible");
    }
  } else {
    // Modifica o sistema de notícias da página de entrada da escola
    var forumpost = all(".notloggedin #site-news-forum .forumpost"),
        forumpostHeader = all(".notloggedin #site-news-forum .forumpost .row.header"),
        forumpostImage = all(".notloggedin #site-news-forum .forumpost .attachedimages img"),
        fullPost;
    for (i = 0; i < forumpost.length; i++) {
      fullPost = forumpost[i].querySelector(".posting.fullpost");
      forumpost[i].innerHTML = fullPost.innerHTML;
    }
    // Adiciona a seção sobre o funcionamento dos cursos da UniSERPRO
    var coursesInfo = one("#courses-info");
    main.insertBefore(coursesInfo, main.querySelector("a[href='#skipcategories']"));
    coursesInfo.previousSibling.remove(); // Remove um <br>
    // Chama a caixa de login
    var anchorTologininfo = one(".anchorto-logininfo"),
        scrollTologininfo = function() {
          if (i > 0) {
            window.scrollTo(0, i);
            i = i - 2;
            window.setTimeout(scrollTologininfo, 1);
          } else {
            window.setTimeout(function() {
              logininfoAnchor.click();
            }, 200);
          }
        };
    anchorTologininfo.onclick = function() {
      i = window.scrollY;
      window.setTimeout(scrollTologininfo, 100);
    };

    // Adiciona uma introdução à listagem de categorias
    var categoryNames = one("#frontpage-category-names"),
        categoryIntro = d.createElement("p");
    categoryIntro.classList.add("category-intro");
    categoryIntro.innerText = "Os cursos da UniSerpro estão divididos em categorias, o que torna mais fácil encontrá-los de acordo com o seu interesse. Há ainda uma categoria para os cursos que não se encaixam nas demais. Você também pode optar por ver todos os cursos ou fazer uma busca por palavra-chave.";
    categoryNames.insertBefore(categoryIntro, categoryNames.querySelector(".course_category_tree"));

    // Executa a requisição do conteúdo de cada categoria
    i = 0;
    var categoryLink = all(".categoryname a"),
        categoryContent = all(".category.loaded .content"),
        categoryDescription = ".box.info .no-overflow",
        categoryCourses = ".courses.category-browse";
    function categoryContentLoop() {
      if (i < categoryLink.length) {
        window["categoryContentRequest" + i] = new XMLHttpRequest();
        window["categoryContentRequest" + i]["open"]("GET", categoryLink[i].href, true);
      } else return;
      window["categoryContentRequest" + i]["onload"] = function() {
        if (window["categoryContentRequest" + i]["status"] >= 200 && window["categoryContentRequest" + i]["status"] < 400) {
          var response = window["categoryContentRequest" + i]["responseText"],
              parser = new DOMParser(),
              doc = parser.parseFromString(response, "text/html");
          categoryContent[i].appendChild(doc.querySelector(categoryDescription)).appendChild(doc.querySelector(categoryCourses)); // categoryContent[i].innerHTML = doc.querySelector(categoryCourses).innerHTML;
        } else {
          alert("O servidor retornou um erro e os conteúdos das categorias de cursos podem não ter sido carregadas corretamente.")
        }
        i++;
        categoryContentLoop();
      };
      window["categoryContentRequest" + i]["onerror"] = function() {
        alert("Houve um problema na conexão com o servidor e as informações das categorias de cursos não estarão disponíveis.");
      };
      window["categoryContentRequest" + i]["send"]();
    }
    // Carrega os conteúdos das categorias
    window.onload = categoryContentLoop;
    // Insere o botão 'Ver todos os cursos'
    var allCourses = one(".custom-menu .courses").cloneNode(true);
    allCourses.innerText = "Ver todos os cursos";
    one("[role='main'] .box").insertBefore(allCourses, coursesearch);
  }
}
