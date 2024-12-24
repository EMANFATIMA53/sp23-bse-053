document.addEventListener("DOMContentLoaded", () => {
    const wishlistButtons = document.querySelectorAll(".add-to-wishlist");
  
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const productId = button.dataset.productId; // Assuming a data attribute for product ID
        const csrfToken = button.dataset.csrf; // Assuming a data attribute for CSRF token
  
        try {
          const response = await fetch(`/wishlist/${productId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "CSRF-Token": csrfToken,
            },
          });
  
          if (response.ok) {
            alert("Product added to wishlist!");
          } else {
            const result = await response.json();
            alert(result.message || "Failed to add to wishlist. Please try again.");
          }
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      });
    });
  });
  