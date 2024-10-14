// Fonctionnalité de la barre de recherche
document.querySelector('.search-bar button').addEventListener('click', function () {
  let query = document.querySelector('.search-bar input').value.toLowerCase();
  let items = document.querySelectorAll('.card');

  items.forEach(item => {
      let itemName = item.querySelector('h3').textContent.toLowerCase();
      if (itemName.includes(query)) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
});

// Recherche via la touche "Entrée"
document.querySelector('.search-bar input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
      document.querySelector('.search-bar button').click();
  }
});

// Panier et compteur de panier
let cart = [];

function updateCart() {
  let cartCount = document.querySelector('#cart-count');
  cartCount.textContent = cart.length; // Met à jour le nombre d'articles dans le panier
}

// Fonction "Ajouter au Panier"
document.querySelectorAll('.Ajoutez.au.Panier').forEach(button => {
  button.addEventListener('click', function () {
      let itemName = this.closest('.card').querySelector('h3').textContent;
      let itemPrice = this.closest('.card').querySelector('.prix').textContent;

      cart.push({ name: itemName, price: itemPrice }); // Ajoute l'article au panier
      updateCart(); // Met à jour le compteur du panier
      alert(`${itemName} a été ajouté au panier.`);
  });
});

// Voir le contenu du panier
document.querySelector('#view-cart').addEventListener('click', function () {
  if (cart.length > 0) {
      let cartList = cart.map(item => `${item.name} - ${item.price}`).join('\n');
      alert('Votre panier contient :\n' + cartList);
  } else {
      alert('Votre panier est vide.');
  }
});


