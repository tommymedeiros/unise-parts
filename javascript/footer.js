var footer = one("footer[role='contentinfo']"),
    customMenuFooter = customMenu.cloneNode(true);
footer.insertBefore(customMenuFooter, footer.children[0]);
