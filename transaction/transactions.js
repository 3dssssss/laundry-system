document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector("#toggle-btn");
    hamburger.addEventListener("click", function() {
        document.querySelector("#sidebar").classList.toggle("expand");
    });

      // archive
    const archiveModal = document.getElementById('archiveModal');
    const confirmArchiveButton = document.getElementById('confirmArchiveButton');
    const cancelArchiveButton = document.getElementById('cancelArchiveButton');
    const closeArchiveModal = document.getElementById('closeArchiveModal');

    // success
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const closeSuccessButton = document.getElementById('closeSuccessButton');

    let customerIdToArchive = null;

    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            customerIdToArchive = btn.dataset.id;
            archiveModal.style.display = 'block';
        });
    });

    closeArchiveModal.addEventListener('click', () => {
        archiveModal.style.display = 'none';
    });

    cancelArchiveButton.addEventListener('click', () => {
        archiveModal.style.display = 'none';
    });

    confirmArchiveButton.addEventListener('click', () => {
        fetch('/laundry_system/archived/archive_customer_db.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send user ID as JSON
            body: JSON.stringify({ id: customerIdToArchive })  
        })

        .then(response => response.text())  
        .then(data => {
            console.log('Raw response:', data);  
    
            // Checking if response is JSON or an HTML error page
            if (data.trim().startsWith('<')) {
                console.error('Received HTML instead of JSON:', data);
                return;  
            }
    
            try {
                const jsonData = JSON.parse(data);

                if (jsonData.success) {
                    archiveModal.style.display = 'none';
                    successModal.style.display = 'block';
                } else {
                    alert('Error archiving customer: ' + jsonData.error);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error, data);
            }
        })
        
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });

    closeSuccessButton.addEventListener('click', () => {
        successModal.style.display = 'none';
        location.reload();
    });
});