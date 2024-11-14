document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const hamburger = document.querySelector("#toggle-btn");
    hamburger.addEventListener("click", function() {
        document.querySelector("#sidebar").classList.toggle("expand");
    });

    // Open update form
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            const price = this.getAttribute("data-price");
            const categoryOption = this.getAttribute("data-option");
            const serviceId = this.getAttribute("data-id");
            const categoryId = this.getAttribute("data-category-id");

            document.getElementById("price").value = price; 
            document.getElementById("laundry_category_option").value = categoryOption;
            document.getElementById("service_id").value = serviceId;
            document.getElementById("category_id").value = categoryId;

            // Show the edit form
            document.getElementById("editForm").style.display = "flex";
            document.body.classList.add('modal-open');
        });
    });

    // Close the form
    const closeFormButton = document.querySelector('.form-popup .close');
    closeFormButton.addEventListener('click', closeForm);
    
    // For cancel button
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', closeForm);

    function closeForm() {
        document.getElementById("editForm").style.display = 'none';
        document.body.classList.remove('modal-open'); 
        document.getElementById("editForm").reset();
    }

    // Additional validation for price input
    const submitButton = document.querySelector('.btn-success');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); //to prevent form submission

        const serviceId = document.getElementById("service_id").value;
        const categoryId = document.getElementById("category_id").value; 
        const priceInput = document.getElementById("price").value;

        if (priceInput.trim() === '' ||isNaN(priceInput) || priceInput < 0) {
            event.preventDefault(); 
            Swal.fire({
                icon: 'error',
                title: 'Invalid price!',
                text: 'Please enter a valid price.',
            });
            return;
        }

        // AJAX request to update.php
        fetch('update.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `price=${priceInput}&service_id=${serviceId}&category_id=${categoryId}`
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Update Successful!',
                text: data.message,
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                /* history.pushState(null, '', 'edit1.php');
                location.reload(); */
                //window.location.replace('edit1.php');
                // Instead of reloading, update the table row directly with the new price
            //   document.querySelector(`#price-cell-${id}`).innerText = priceInput;
              $('#editForm').hide();
              location.reload();
              
            });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an issue updating the data. Please try again.',
            });
        });
    });

    //creating a new state
    //this pushes the current url in history stack without changing the page.
    history.pushState(null, '', location.href); 

    //detects when the user navigates back in history. 
    //popstate event detects when user pressed the back button.
    window.addEventListener('popstate', function() { //
        window.location.href = "categ2.php"; 
    });

    // for logout
    const logoutModal = document.getElementById('logoutModal');
    const closeBtn = logoutModal.querySelector('.close');
    const noBtn = logoutModal.querySelector('.btn-no');

    $("#btn_logout").click(function() {
        $('#logoutModal').show();
    });

    // Close the modal when clicking the close button (×)
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            logoutModal.style.display = "none"; 
        });
    }

    // Close the modal when clicking the 'No' button
    if (noBtn) {
        noBtn.addEventListener("click", function() {
            logoutModal.style.display = "none"; 
        });
    }

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === logoutModal) {
            logoutModal.style.display = "none";
        }
    });
});