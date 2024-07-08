//checks to see if page has finished loading.
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    //if page is not done loading then run ready function no matter what.
    ready()
}

function ready() {
    //place code for buttons. if user has modified the objects or completed purchase choices it keeps this data.
    const removeCartItemButtons = document.getElementsByClassName("btn-cart")
    for (var = i; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)  //click button and then it removes the item.
    }
    const quanityInputs = document.getElementsByClassName("cart-quanity-input")
    for (var = i; i < quanityInputs.length; i++) {
        const input = quanityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    const addToCartButtons = document.getElementsByClassName("shop-item-button")
    for (var = i; i < addToCartButtons.length; i++) {
        const button =  addToCartButtons[i]
        button.addEventListener("click", addToCartClicked )
    }

    document.getElementsByClassName("btn-purchase") [0].addEventListener("click", purchaseItemsClick)
}

//removes item
function removeCartItem(e) {
    const buttonClicked = e.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal
}

//updates quanity
function quantityChanged(e) {
    const input = e.target\
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//updates items added to cart
function addToCartClicked(e) {
    const button = e.target
    const shopItem = button.parentElement.parentElement
    const title =  shopItem.getElementsByClassName("shop-item-title") [0].innerText
    const price = shopItem.getElementsByClassName("shop-item-price") [0].innerText
    const imageSrc = shopItem.getElementsByClassName("shop-item-image") [0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

//adds item to cart
function addItemToCart(title, price, imageSrc) {
    //creates a new element row.
    const cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    const cartItems = document.getElementsByClassName("cart-items") [0]
    const cartItemNames = cartItems.getElementsByClassName("cart-item-title")
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title ) {
                alert("This item is already added to the cart.")
                //ends function 
                return
            }
        }
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}"
            width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quanity-input cart-column">
            <input class="cart-quanity-input" type="number" value="1">
            <button class="btn btn-cart"
                type="button">Remove Item</button> 
        </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName(bnt-cart) [0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input") [0].addEventListener("change", quantityChanged)
}

//purchase button 
function purchaseItemsClick() {
    alert("Thank you for your purchase!!")
    const cartItems = document.getElementsByClassName("cart-items") [0]
    //continues to loop through cartItems rows one item at a time until empty
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    //updates the total to be set back at zero.
    updateCartTotal()
}

//updates cart total
function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName("cart-items") [0]
    const cartRows = cartItemContainer.getElementsByClassName("cart-row")
    const total = 0

    for(var = i; i < cartRows[i]) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName("cart-price") [0]
        const quantityElement = cartRow.getElementsByClassName("cart-quanity-input") [0]
        const price = parseFloat(priceElement.innerText.replace("$", ""))
        total = total + (price * quantity)        
    }
    //rounds our total value of merchandise to 2 numbers.
    total = Math.round(total * 100) / 100

    document.getElementsByClassName("cart-total-price") [0].innerText = "$" + total
}
