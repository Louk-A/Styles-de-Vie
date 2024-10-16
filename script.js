document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le panier depuis le localStorage ou initialiser un tableau vide
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Affichage dans la console pour vérifier le contenu du panier
    console.log("Panier chargé depuis localStorage:", cart);

    function updateCart() {
        let cartCount = document.querySelector('#cart-count');
        cartCount.textContent = cart.length; // Met à jour le nombre d'articles dans le panier
        localStorage.setItem('cart', JSON.stringify(cart)); // Sauvegarde le panier dans le localStorage
    }

    // Fonction "Ajouter au Panier"
    document.querySelectorAll('.Ajoutez-au-Panier').forEach(button => {
        button.addEventListener('click', function () {
            let itemCard = this.closest('.card');
            let itemName = itemCard.querySelector('h3').textContent;
            let itemPriceText = itemCard.querySelector('.prix').textContent;

            // Enlève " DH" et essaie de convertir en nombre
            let itemPrice = parseFloat(itemPriceText.replace(' DH', '').trim());

            if (itemName && !isNaN(itemPrice)) {
                cart.push({ name: itemName, price: itemPrice });
                updateCart(); // Met à jour le compteur du panier
                alert(`${itemName} a été ajouté au panier.`);
            } else {
                alert('Erreur : informations du produit manquantes.');
            }
        });
    });

    // Voir le contenu du panier
    document.querySelector('#view-cart').addEventListener('click', function () {
        console.log("Panier actuel avant affichage:", cart); // Log pour voir le panier avant d'afficher

        if (cart.length > 0) {
            let cartList = cart.map(item => {
                return `${item.name} - ${item.price.toFixed(2)} DH`;
            }).join('\n');

            let totalPrice = cart.reduce((total, item) => total + item.price, 0);

            alert(`Votre panier contient ${cart.length} article(s) :\n\n` + cartList + `\n\nPrix total : ${totalPrice.toFixed(2)} DH`);
        } else {
            alert('Votre panier est vide.');
        }
    });

    updateCart(); // Met à jour le compteur lors du chargement de la page

    // Fonctionnalité de la barre de recherche
    document.querySelector('.search-bar button').addEventListener('click', function () {
        let query = document.querySelector('.search-bar input').value.toLowerCase();
        let items = document.querySelectorAll('.card');

        items.forEach(item => {
            let itemName = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = itemName.includes(query) ? 'block' : 'none';
        });
    });
    

    // Recherche via la touche "Entrée"
    document.querySelector('.search-bar input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            document.querySelector('.search-bar button').click();
        }
    });
});

