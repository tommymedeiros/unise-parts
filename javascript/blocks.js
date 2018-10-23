// Verifica a existência de blocos na página
if (block.length) {
  var blockTitle = all(".block .title h2");
  // Faz os cliques nos títulos dos blocos escondê-los/mostrá-los
  for (i = 0; i < blockTitle.length; i++) {
    blockTitle[i].onclick = function() {
      if (this.closest(".block").classList.contains("hidden")) {
        this.previousSibling.children[1].click();
      } else {
        this.previousSibling.children[0].click();
      }
    };
  }
}
