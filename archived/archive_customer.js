document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector("#toggle-btn");

    hamburger.addEventListener("click",function() {
    document.querySelector("#sidebar").classList.toggle("expand");
    });

    /* search */
    $("#filter_customer").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#archive_customer_table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    /* pagination */
      const rowsPerPage = 15;
      const tableBody = document.querySelector('table tbody');
      const rows = tableBody.querySelectorAll('tr');
      const paginationContainer  = document.getElementById('pagination');

      let totalRows = rows.length;
      let totalPages = Math.ceil(totalRows / rowsPerPage);
      let currentPage = 0;

      function displayRows(startIndex) {
        rows.forEach(row => row.style.display = 'none');

        let endIndex = startIndex + rowsPerPage;
        for (let i = startIndex; i < endIndex && i < totalRows; i++) {
            rows[i].style.display = '';
        }
      }

      function setupPagination() {
        paginationContainer.innerHTML = '';

        // previous arrow
        let prevPageLink = document.createElement('li');
        prevPageLink.classList.add('page-item');
        prevPageLink.innerHTML = `<a class="page-link" href="#"><<</a>`;
        prevPageLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage > 0) {
                currentPage--;
                displayRows(currentPage * rowsPerPage);
                setActivePage(currentPage);
            }
        });

        paginationContainer.appendChild(prevPageLink);

        // numbered page links
        for (let i = 0; i < totalPages; i++) {
            let pageLink = document.createElement('li');
            pageLink.classList.add('page-item');
            pageLink.innerHTML = `<a class="page-link" href="#">${i + 1}</a>`;

            pageLink.addEventListener('click', function (e) {
                e.preventDefault();
                displayRows(i * rowsPerPage);
                setActivePage(i);
            });

            paginationContainer.appendChild(pageLink);
        }

        // next arrow
        let nextPageLink = document.createElement('li');
        nextPageLink.classList.add('page-item');
        nextPageLink.innerHTML = `<a class="page-link" href="#">>></a>`;
        nextPageLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage < totalPages - 1) {
                currentPage++;
                displayRows(currentPage * rowsPerPage);
                setActivePage(currentPage);
            }
        });
        paginationContainer.appendChild(nextPageLink);
    }

    function setActivePage(pageIndex) {
        const pageLinks = paginationContainer.querySelectorAll('.page-item');
        pageLinks.forEach(link => link.classList.remove('active'));
        pageLinks[pageIndex].classList.add('active');
    }

    // Initialize table with first page and pagination links
    displayRows(0);
    setupPagination();
    setActivePage(0);

    // **NEW CODE FOR ARCHIVE BUTTON 1/11/24**
    const archiveButtons = document.querySelectorAll('.archive-btn');
    archiveButtons.forEach(confirmArchiveButton => {
        confirmArchiveButton.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id'); // Get the ID from data attribute
            console.log("Archiving customer with ID:", customerIdToArchive); // Log the ID being sent

            fetch('archive_customer_db.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: customerIdToArchive })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                } else {
                    console.error("Archive failed:", data.error);
                }
            })
            .catch(error => {
                console.error("Error parsing JSON:", error);
            });
        });
    });

    // for logout
    const logoutModal = document.getElementById("logoutModal");
    const closeBtn = logoutModal.querySelector(".close");
    const noBtn = logoutModal.querySelector(".btn-no");

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
