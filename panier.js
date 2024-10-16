document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le panier depuis le localStorage ou initialiser un tableau vide
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-details'); // Assurez-vous que cet élément existe dans votre HTML

  // Afficher les articles du panier
  function displayCartItems() {
      cartItemsContainer.innerHTML = ""; // Vide l'élément avant d'afficher les nouveaux articles

      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
          document.getElementById('total-price').textContent = "Prix total : 0 DH"; // Réinitialise le prix total
          return;
      }

      cart.forEach((item, index) => {
          let itemElement = document.createElement('div');
          itemElement.className = "cart-item"; // Ajoutez une classe pour le style
          itemElement.innerHTML = `
              <h3>${item.name}</h3>
              <p>Prix: ${item.price.toFixed(2)} DH</p>
              <button class="remove-item" data-index="${index}">Supprimer</button>
          `;
          cartItemsContainer.appendChild(itemElement);

          // Ajouter l'événement de suppression
          itemElement.querySelector('.remove-item').addEventListener('click', function () {
              cart.splice(index, 1); // Retire l'article du panier
              localStorage.setItem('cart', JSON.stringify(cart)); // Met à jour le localStorage
              updateCart(); // Met à jour l'affichage
          });
      });

      updateTotalPrice(); // Met à jour le prix total
  }

  // Mettre à jour le prix total
  function updateTotalPrice() {
      let totalPriceElement = document.getElementById('total-price');
      let totalPrice = cart.reduce((total, item) => {
          return total + item.price;
      }, 0);
      totalPriceElement.textContent = `Prix total : ${totalPrice.toFixed(2)} DH`; // Met à jour le prix total affiché
  }
  

  // Vider le panier
  document.getElementById('clear-cart').addEventListener('click', function () {
    cart = []; // Vide le tableau du panier
    localStorage.setItem('cart', JSON.stringify(cart)); // Met à jour le localStorage
    displayCartItems(); // Met à jour l'affichage
    alert('Votre panier a été vidé.');
});

  // Naviguer vers la page pour ajouter plus d'articles
  document.getElementById('add-more-items').addEventListener('click', function () {
      window.location.href = 'Robe.html'; // Remplacez par le nom de votre page
  });

  // Appeler la fonction pour initialiser l'affichage du panier
  displayCartItems(); // Affiche les articles au chargement de la page
});
  
