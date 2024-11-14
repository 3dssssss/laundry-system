document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a'); // Select all the links inside navLinks

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Add event listeners to each nav link to close the navigation container when clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
});

// integration shit 
document.addEventListener('DOMContentLoaded', (event) => {
    const btnLogin = document.getElementById('form_open');
    const btnLaundryService = document.getElementById('openService');
    const login_form = document.getElementById('form_container');
    const laundry_service_form = document.getElementById('service_form');
    const closeBtn = document.getElementsByClassName("btnClose")[0];

    // Flag to track if the user is logged in
    let isLoggedIn = false;

    // Open the login form
    btnLogin.onclick = function() {
        login_form.style.display = 'block';
        laundry_service_form.style.display = 'none';
    }

    // Close the login form
    closeBtn.onclick = function() {
        login_form.style.display = "none";
    }

    // Handle the service request button when clicked
    btnLaundryService.addEventListener('click', () => {
        // Check if the user is logged in
        if (isLoggedIn) {
            // Directly show the service request form
            laundry_service_form.style.display = "block";
            login_form.style.display = "none";
        } else {
            // If not logged in, show the warning and then the choice
            laundry_service_form.style.display = 'none';

            Swal.fire({
                title: "Authorized users only have access to the service request.",
                icon: "warning",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                Swal.fire({
                    title: "Where do you want to proceed?",
                    showCancelButton: true,
                    confirmButtonText: "Service Request",
                    cancelButtonText: "Login",
                    confirmButtonColor: "#3085d6",  // Blue button for Service Request
                    cancelButtonColor: "#F4C430"    // Yellow button for Login
                }).then((choice) => {
                    if (choice.isConfirmed) {
                        // If "Service Request" is clicked, show the service request form
                        laundry_service_form.style.display = "block";
                        login_form.style.display = "none";
                    } else {
                        // If "Login" is clicked, show the login form
                        login_form.style.display = "block";
                        laundry_service_form.style.display = "none";
                    }
                });
            });
        }
    });

    // Handle login form submission
    login_form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        if (login_form) {
        const formData = new FormData(loginForm); // Create FormData from the correct form

            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // isLoggedIn = true;

                    Swal.fire({
                        title: "You have successfully logged in.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = '/laundry_system/dashboard/dashboard.php';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Login failed",
                        text: "Invalid username or password.",
                        timer: 3000
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: 'An error occurred during login. Please try again.'
                });
            });
        } else {
            console.error('Login form not found');
        }
    });
});


/* ORIGINAL CODE NI NITNISE  */
// document.addEventListener('DOMContentLoaded', (event) => {
//     const btnLogin = document.getElementById('form_open');
//     //button ito sa may service request
//     const btnLaundryService = document.getElementById('openService');

//     //para mabuksan yung form ng logi
//     const login_form = document.getElementById('form_container');
//     //button ito sa may FORM mismo
//     const laundry_service_form = document.getElementById('service_form');

//     // Flag to track if the user is logged in
//    // let isLoggedIn = false;

//     //open the login form
//     btnLogin.onclick = function() {
//         login_form.style.display = 'block';
//         laundry_service_form.style.display = 'none';
//     }

//     // handle the service request button when clicked
//     btnLaundryService.addEventListener('click', () => {
//         laundry_service_form.style.display = 'none';

//         Swal.fire({
//                 title: "Authorized users only have access to the service request.",
//                 icon: "warning",
//                 showConfirmButton: false,
//                 timer: 3000,
//         }).then(() => {
//             //laundry_service_form.style.display = 'none';
//             Swal.fire({
//                 title: "Where do you want to proceed?",
//                 showCancelButton: true,
//                 confirmButtonText: "Service Request",
//                 cancelButtonText: "Login",
//                 confirmButtonColor: "#3085d6",  // Blue button for Service Request
//                 cancelButtonColor: "#F4C430"    // Yellow button for Login
//             }).then((choice) => {
//                 if (choice.isConfirmed) {
//                 // If "Service Request" is clicked, show the service request form
//                     laundry_service_form.style.display = "block";
//                     login_form.style.display = "none";
//                 } else {
//                 // If "Login" is clicked, show the login form
//                     login_form.style.display = "block";
//                     laundry_service_form.style.display = "none";
//                 }
//             });
//         });
//     });
// }); 

//scrolling effect
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    const scaleValue = 0.5 + (scroll * 0.5); // Scale from 0.5 to 1 based on scroll position
    document.body.style.setProperty('--scale', scaleValue);
}, false);

/*original code ni denise at tin*/
//POP-UP LOGIN FORM 
// document.addEventListener('DOMContentLoaded', (event) => {
//     const login_form = document.getElementById("form_container");
//     const openLogin = document.getElementById("form_open");
//     const closeBtn = document.getElementsByClassName("btnClose")[0];
//     //const service_form = document.getElementById('service_form'); // Added this assuming `service_form` exists

//     //open the login form
//     openLogin.onclick = function() {
//         login_form.style.display = "block";
//         //dagdag ko lang
//         service_form.style.display = 'none';
//     }

//     //close the login form
//     closeBtn.onclick = function() {
//         login_form.style.display = "none";
//     }

//     // Show SweetAlert and open login form when Service Request button is clicked
//     /*openService.addEventListener('click', () => {
//         Swal.fire({
//             title: "Authorized users only have access to the service request.",
//             icon: "warning",
//             showConfirmButton: false,
//             timer: 3500,
//         }).then(() => {
//             login_form.style.display = "block";
//             service_form.style.display = 'none';
//         });
//     });  */

//     // Handle login form submission
//     login_form.addEventListener('submit', function (e) {
//         e.preventDefault(); // Prevent the form from submitting the traditional way

//         const formData = new FormData(login_form);

//         fetch('login.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 // Show success message without triggering the "Where do you want to proceed?" SweetAlert
//                 Swal.fire({
//                     title: "You have successfully logged in.",
//                     icon: "success",
//                     timer: 2000,
//                     showConfirmButton: false
//                 }).then(() => {
//                     // Redirect or open the dashboard after successful login
//                     window.location.href = '/laundry_system/dashboard/dashboard.php';
//                 });
//             } else {
//                 // Show error message if credentials are incorrect
//                 Swal.fire({
//                     icon: 'error',
//                     title: "Login failed",
//                     text: "Invalid username or password.",
//                     timer: 3000
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Login Error',
//                 text: 'An error occurred during login. Please try again.'
//             });
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', (event) => {
    const service_form = document.getElementById("service_form");
    const login_form = document.getElementById("form_container");
    const openLogin = document.getElementById("form_open");
    const openService = document.getElementById("openService");

    //open the login form
    openLogin.onclick = function() {
        login_form.style.display = "block";
        service_form.style.display = 'none';
    }

    //open the service form
    openService.onclick = function() {
        service_form.style.display = "block";
        login_form.style.display = 'none';
    }

});

//pop up for laundry service form
document.addEventListener('DOMContentLoaded', (event) => {
    const service_form = document.getElementById("service_form");
    const openBtn = document.getElementById("openService");
    const closeBtn = document.getElementsByClassName("btnClose")[1];

    //open the service form
    openBtn.onclick = function() {
        service_form.style.display = "block";
    }

    //close the service form
    closeBtn.onclick = function() {
        service_form.style.display = "none";
    }

});

//OVERVIEW PANEL
document.addEventListener('DOMContentLoaded', (event) => {
    const service_overview = document.getElementById("service_overview");
    const service_form = document.getElementById('service_form');
    const closeBtn = document.getElementsByClassName("btnClose")[2];
    const btnBack = document.getElementById('btnBack');

    //close the service overview
    closeBtn.onclick = function() {
        service_overview.style.display = "none";
    }
});

//LAUNNDRY SERVICE DETAILS
document.addEventListener('DOMContentLoaded', (event) => {
    const service_details = document.getElementById('service_details');
    const closeBtn = document.getElementsByClassName("btnClose")[3];

    //close the service overview
    closeBtn.onclick = function() {
        service_details.style.display = "none";
    }

});

function validateContactNumber(input) {
        const regex = /^09[0-9]{9}$/; 
        if (!regex.test(input.value)) {
            if (!input.value.startsWith("09")) {
                input.setCustomValidity("Use 09 as number format");
            } else {
                input.setCustomValidity("Please enter an 11-digit number");
            }
        } else {
            input.setCustomValidity("");
        }
}

/*********************LOGIN FORM************************/
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const formData = new FormData(this); 

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.success) {
            // Display the "Where do you want to proceed?" SweetAlert on successful login
            Swal.fire({
                title: "Where do you want to proceed?",
                showCancelButton: true,
                confirmButtonText: "Service Request",
                cancelButtonText: "Login",
                confirmButtonColor: "#3085d6",  // Blue button
                cancelButtonColor: "#F4C430"       // Yellow button
            }).then((choice) => {
                if (choice.isConfirmed) {
                    // If "Service Request" is clicked, show the service request form
                    document.getElementById("service_form").style.display = "block";
                    document.getElementById("form_container").style.display = "none";
                } else {
                    // If "Login" is clicked, redirect to the dashboard
                    Swal.fire("You have successfully succeeded.", "", "success").then(() => {
                        window.location.href = '/laundry_system/dashboard/dashboard.php';
                    });
                }
            });
        } else {
            // Show error message if credentials are incorrect
            Swal.fire({
                icon: 'error',
                title: data.title || "Login failed", 
                text: data.message || "Invalid username or password.",
                timer: 3000
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An error occured during login. Please try again.'
        });
    });
});


/***************************LAUNDRY SERVICE REQUEST****************************/
//fetch laundry service
function fetchServices() {
    fetch('/laundry_system/homepage/fetch_laundry_service.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            let dropdown = document.getElementById('service');
            dropdown.innerHTML = '<option selected disabled>--Select Service--</option>'; // Clear existing options

            // Populate
            data.forEach(service => {
                let option = document.createElement('option');
                option.value = service.service_id;
                option.textContent = service.laundry_service_option;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching services:', error));
}
document.addEventListener('DOMContentLoaded', fetchServices);

//fetch laundry category
function fetchCategories() {
    fetch('/laundry_system/homepage/fetchLaundryCateg.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            let dropdown = document.getElementById('category');

            // Populate
            dropdown.innerHTML = '<option selected disabled>--Select Category--</option>'; 
            data.forEach(category => {
                let option = document.createElement('option');
                option.value = category.category_id;
                option.textContent = category.laundry_category_option;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}
//fetch categories when the page loads
document.addEventListener('DOMContentLoaded', fetchCategories);

//fetch price based on the selected laundry service and category
$('#service, #category').change(function() {
    const serviceId = $('#service').val();
    const categoryId = $('#category').val();
  
    if (serviceId && categoryId) {
      $.ajax({
        type: 'GET',
        url: '/laundry_system/homepage/getPrice.php',
        data: { service_id: serviceId, category_id: categoryId },
        dataType: 'json'
      })
     .done(function(data) {
        console.log('Received data:', data);
        if (data.error === 0) {
          console.log('Setting price to:', data.price);
          $('#price').val(parseFloat(data.price).toFixed(2));
        } else {
          console.log('Error:', data.message);
        }
      })
     .fail(function(xhr, status, error) {
        console.log('Ajax error:', error);
      });
    } else {
      $('#price').val('');
    }
});

//fetch service option (rush/delivery/pick-up)
function fetchServiceOptions() {
    fetch('/laundry_system/homepage/fetch_service_option.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let dropdown = document.getElementById('service_option');
            dropdown.innerHTML = '<option selected>--Select Option--</option>'; //clear existing options
            data.forEach(service_option => {
                let option = document.createElement('option');
                option.value = service_option.option_id;
                option.textContent = service_option.option_name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching service options:', error));
}
//fetch categories when the page loads
document.addEventListener('DOMContentLoaded', fetchServiceOptions);

//GLOBAL VARIBALE FOR TOTAL IN OVERVIEW PAGE
var totalPrice = 0;

// Function to update the total amount
function updateTotalAmount() {
    var deliveryFee = parseFloat($('#delivery_fee').val()) || 0;
    var rushFee = parseFloat($('#rush_fee').val()) || 0;
    
    var finalTotalAmount = totalPrice + deliveryFee + rushFee;
    $('#total_amount').val(finalTotalAmount.toFixed(2));
}

//fetch service options price
$('#service_option').change(function() {
    const serviceOptionId = $(this).val();
    const selectedOptionText = $(this).find('option:selected').text();
  
    if (selectedOptionText === 'Customer Pick-Up') {
        $('#delivery_fee').val('');  
        updateTotalAmount(); 
     }
     else if (selectedOptionText === 'Delivery') {
        $('#delivery_fee').val(''); 
        updateTotalAmount();
    } else {
        $('#delivery_fee').val(''); 
        updateTotalAmount();
    }
});


//FETCH RUSH PRICE
$('#rush').change(function() {
    if ($(this).is(':checked')) {
        $.ajax({
            type: 'GET',
            url: '/laundry_system/homepage/getRushFee.php',
            data: {rush: 'Rush'},
            dataType: 'json'
        })
        .done(function(data) {
            console.log('Received data:', data);
            if (data.error === 0) {
                console.log('Setting rush fee to:', data.price);
                $('#rush_fee').val(parseFloat(data.price).toFixed(2));
                updateTotalAmount();
            } else {
                console.log('Error:', data.message);
            }
        })
        .fail(function(xhr, status, error) {
            console.error('Ajax error:', status, error);
            console.error('Response text:', xhr.responseText);
        });
    } else {
        $('#rush_fee').val('');
        updateTotalAmount();
    }
});

var timeoutId;
$('#amount_tendered').on('input', function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
        var finalTotalAmount = parseFloat($('#total_amount').val()) || 0;
        var amountTendered = parseFloat($('#amount_tendered').val()) || 0;
        var change = amountTendered - finalTotalAmount;

        console.log('Amount tendered:', amountTendered);
        console.log('Final total amount:', finalTotalAmount);
        console.log('Change:', change);

        $('#change').val(change.toFixed(2));

        if (amountTendered < finalTotalAmount) {
            Swal.fire("Insufficient Amount!", "The amount tendered is less than the total amount.", "warning");
        }
    }, 700); 
});

$(document).ready(function() {
    var orders = []; // Array to store orders

    //to update customer details in overview section
    function updateCustomerDetails(customerId, customerName, contactNumber) {
        $('#customer_id_display').text(customerId); 
        $('#customer_name_display').text(customerName);
        $('#contact_number_display').text(contactNumber);
    }
    
    function addOrderToOverview(quantity, service, category, weight, price) {
        //computation
        var total = weight * price;  
        totalPrice += total; 

        var orderDetails = '<tr>' +
            '<td>' + quantity + '</td>' +
            '<td>' + service + '</td>' +
            '<td>' + category + '</td>' +
            '<td>' + weight + '</td>' +
            '<td>' + price + '</td>' +
            '<td>' + total.toFixed(2) + '</td>' +
            '</tr>';

        $('#service_overview tbody').append(orderDetails);
        
        updateTotalRow();
    }

    function updateTotalRow() {
        $('#total_row').remove();

        var totalRow = '<tr id="total_row">' +
            '<td colspan="5" style="text-align: right;"><b>Total:</b></td>' +
            '<td>' + totalPrice.toFixed(2) + '</td>' +
            '</tr>';

        $('#service_overview tbody').append(totalRow);
    }

    function resetOrder() {
        totalPrice = 0;
        $('#service_overview tbody').empty();
        updateTotalRow();
    }

    //to show service form and hide overview
    function showServiceForm() {
        $('#service_form').show();
        $('#service_overview').hide();
    }

    function showServiceOverview() {
        $('#service_form').hide();
        $('#service_overview').show();
    }

    // Form submission handling
    $('#form_id').submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/laundry_system/homepage/weight_limits.php',
            success: function(response) {
                if (response.status === 'success') {
                    var minWeight = parseFloat(response.minWeight);
                    var maxWeight = parseFloat(response.maxWeight);
                    processForm(minWeight, maxWeight);
                } else {
                    swal.fire({ title: "Error", text: "Could not fetch weight limits. Using default values.", icon: "error" });
                }
                
            },
            error: function(xhr, status, error) {
                console.error("Error fetching weight limits: " + error);
                swal.fire({ title: "Error", text: "An error occurred while fetching weight limits. Using default values.", icon: "error" });
            }
        });
    
        function processForm(minWeight, maxWeight) {
            var customerName = $('#customer_name').val();
            var contactNumber = $('#contact_number').val();
            var quantity = $('select[name="quantity"]').val();
            var serviceId = $('select[name="service"]').val();
            var serviceOption = $('select[name="service"] option:selected').text();
            var categoryId = $('select[name="category"]').val();
            var categoryOption = $('select[name="category"] option:selected').text();
            var weight = $('#weight').val();
            var price = $('#price').val();
    
            if (!customerName || !contactNumber || !serviceId || !categoryId || !weight || !price) {
                swal.fire({ title: "Oops..", text: "Please fill in all the required fields.", icon: "error" });
                return;
            }
    
            function validateAndSubmitOrder(weightToSubmit) {
                // Validate if the customer name or contact number already exists
                $.ajax({
                    type: 'POST',
                    url: '/laundry_system/homepage/validate_customer.php',
                    data: {
                        customer_name: customerName,
                        contact_number: contactNumber
                    },
                    success: function(response) {
                        console.log("Response from server:", response);
                        if (response.status === 'error') {
                            swal.fire({ title: "Oops...", text: response.message, icon: "error" });
                        } else {
                            // If customer name and contact number is available, add order to orders array
                            var order = {
                                customerName: customerName,
                                contactNumber: contactNumber,
                                quantity: quantity,
                                serviceId: serviceId,
                                serviceOption: serviceOption,
                                categoryId: categoryId,
                                categoryOption: categoryOption,
                                weight: weightToSubmit,
                                price: price
                            };
                            orders.push(order);
    
                            // Update customer details in overview section
                            updateCustomerDetails(response.customer_id, customerName, contactNumber);
    
                            // Add order details to the overview table
                            addOrderToOverview(quantity, serviceOption, categoryOption, weightToSubmit, price);
    
                            swal.fire({
                                title: "Order added to list!",
                                text: "You can proceed or add more orders.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            }).then(() => {
                                    // Clear form inputs except customer name and contact number
                                    $('#form_id').find('input[type="text"], input[type="number"], select').not('#customer_name, #contact_number').val('');
                                    $('#service_form').hide();
                                    $('#service_overview').show();
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("Validation Error: " + error);
                        swal.fire({
                            title: "Validation failed!",
                            text: "An error occurred while validating the customer name. Please try again.",
                            icon: "error"
                        });
                    }
                });
            }
    
            var weightValue = parseFloat(weight);
    
            if (weightValue < minWeight) {
                swal.fire({
                    title: "Minimum Weight!",
                    text: `The minimum weight for laundry is ${minWeight} kilos. Do you want to proceed with a ${minWeight} kilo order?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {   
                    if (result.isConfirmed) {
                        validateAndSubmitOrder(minWeight);
                    } else {
                        $('#form_id').find('input[type="text"], input[type="number"], input[type="tel"], select').val('');
                    }
                });
            } else if (weightValue > maxWeight) {
                swal.fire({
                    title: "Maximum Weight Exceeded!",
                    text: `The maximum weight for laundry is ${maxWeight} kilos. Please reduce the weight.`,
                    icon: "error"
                });
            } else {
                validateAndSubmitOrder(weight);
            }
        }
    });
    
    //cancel button in service req form
    document.getElementById('btnCancel').addEventListener('click', function(event) {
        event.preventDefault();
        Swal.fire({
            title: 'Cancel Service Request',
            text: 'Are you sure you want to cancel your service request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                const service_form = document.getElementById('form_id');
                const service_form_con = document.getElementById('service_form');

                service_form.reset();
                service_form_con.style.display = 'none';  
            }
        });
    });

    // "Done" button click on service form
    $('#doneButton').click(function() {
        showServiceOverview();
    });

    // "Back" button click on overview page
    $('#btnBack').click(function() {
        showServiceForm();
    });

    // "Proceed" button click on overview page
    $('#btnProceed').click(function() {
        console.log("btnProceed clicked");
        if (orders.length === 0) {
            swal.fire("No Orders to Proceed!", "Please add at least one order before proceeding.", "warning");
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'laundryService_config.php',
            data: { orders: JSON.stringify(orders),
                    isNewTransaction: 'true'
                },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    swal.fire("Orders saved successfully!", response.message, "success")
                        .then(() => {

                            //Store orders in session storage
                            sessionStorage.setItem('orders', JSON.stringify(orders));
                            
                            orders = [];
                            // resetOrder();
                            $('#service_overview tbody').empty();
                            $('#customer_name_display').empty();
                            $('#contact_number_display').empty();
                            $('#customer_id_display').empty();

                           //pass these order info in service details form
                            $('#customer_id_hidden').val(response.customer_id);
                            $('#service_request_id_hidden').val(response.service_request_id);
                            $('#customer_name_hidden').val(response.customer_name);
                            $('#contact_number_hidden').val(response.contact_number);
                          
                            // Show service form after saving
                            $('#service_details').show();
                            $('#service_overview').hide();

                        });
                } else {
                    swal.fire("Orders not saved!", response.message, "error");
                }
            },
            error: function(xhr, status, error) {
                console.error("Save Orders Error: " + error);
                swal.fire("Orders not saved!", "An error occurred while saving your orders. Please try again.", "error");
            }
        });
    });
    
    $('#btnDone_service').click(function() {
        console.log("btnDone_service clicked");
        
        var customerId = $('#customer_id_hidden').val();
        var serviceId = $('select[name="service_option"]').val();
        var serviceOption = $('select[name="service_option"] option:selected').text();
        var isRush = $('#rush').is(':checked') ? 'Rush' : 'Standard';
        var province = $('#province').val();
        var city = $('#city').val();
        var address = $('#address').val();
        var brgy = $('#barangaySelect').val();
        var pickupDate = $('#pickup_date').val();
        var deliveryFee = parseFloat($('#delivery_fee').val()) || 0;
        var rushFee = parseFloat($('#rush_fee').val()) || 0;
        var amountTendered = parseFloat($('#amount_tendered').val()) || 0;
        var customerName = $('#customer_name_hidden').val();
        var contactNumber = $('#contact_number_hidden').val();
    
        var finalTotalAmount = totalPrice + deliveryFee + (isRush === 'Rush' ? rushFee : 0);
        var change = amountTendered - finalTotalAmount;
    
        console.log('finalTotalAmount:', finalTotalAmount);
        console.log('change:', change);
        $('#total_amount').val(finalTotalAmount.toFixed(2));
        $('#change').val(change.toFixed(2));
    
        if (!serviceOption || !pickupDate) {
            console.log("Validation failed: Missing serviceOption or pickupDate");
            Swal.fire("Oops!", "Please fill in all the required fields.", "error");
            return;
        } else {
            console.log("Validation passed: serviceOption and pickupDate are present");
        }
    
        var serviceDetails = {
            customer_id: customerId,
            serviceId: serviceId,
            service_option: serviceOption,
            is_rush: isRush,
            province: province,
            city: city,
            address: address,
            brgy: brgy,
            pickup_date: pickupDate,
            total_amount: finalTotalAmount.toFixed(2),
            delivery_fee: deliveryFee,
            rush_fee: rushFee,
            amount_tendered: amountTendered.toFixed(2),
            change: change.toFixed(2),
            customer_name: customerName,
            contact_number: contactNumber
        };
    
        $.ajax({
            type: 'POST',
            url: 'saveServiceDetails.php',
            data: serviceDetails,
            dataType: 'json', // Expecting JSON response
            success: function(response) {
                if (response.status === 'success') {
                    // Trigger reload in other tabs by setting dataUpdated to true
                    localStorage.setItem('dataUpdated', 'true');
                    console.log("Data update triggered, dataUpdated set to:", localStorage.getItem('dataUpdated'));

                    Swal.fire({
                        title: "Great! Service details saved successfully.",
                        text: response.message,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        // Additional actions upon success (if needed)
                    });
                } else {
                    Swal.fire("Service details not saved!", response.message, "error");
                }
            },
            error: function(xhr, status, error) {
                console.error("Save Service Details Error: " + error);
                Swal.fire("Service details not saved!", "An error occurred while saving the service details. Please try again.", "error");
            }
        });        
    });
    
    /*function printInvoice() {
        var printButton = document.getElementById('print_invoice_btn');
        printButton.style.display = 'none';
        
        var printContents = document.querySelector('.print_invoice').outerHTML; 
        
        // Use a new window for printing
        var newWindow = window.open('', '', 'height=600,width=800');
        
        // Write HTML and styles to the new window
        newWindow.document.write('<html><head><title>Invoice</title>');
        newWindow.document.write('<style>' +
            '@media print {' +
                '@page {' +
                    'size: 58mm;' + //size of thermal paper
                    'margin: 0;' +
                '}' +
                
                '.print_invoice {' +
                    'display: block;' +
                    'position: static;' +
                    'background-color: transparent;' +
                    'padding: 10px;' + 
                    'width: 100%;' +
                    'max-width: 58mm;' +  
                '}' + 

                'hr{' + 
                'border: 1px solid; margin: 5px 0}' +

                '.logo_header, h3{' + 
                'font-size: 14px;}' +
                
                '.text-center{' +
                    'text-align: center;' +
                    'font-size: 12px;' +
                '}' +
                
                '#services-table {' +
                    'width: 50mm;' + 
                    'border-collapse: collapse;' +
                    'margin: 0 auto;' + 
                '}' +
                
                'th, td {' +
                    'border: 1px solid black;' +
                    'padding: 2px;' + 
                    'text-align: left;' +
                    'font-size: 8px;' + 
                '}' +
        
                'body {' +
                    'margin: 0;' + 
                    'padding: 0;' +
                    'font-size: 12px;' + 
                '}' +
            '}' +
        '</style>');   
        
        newWindow.document.write('</head><body>');
        newWindow.document.write(printContents);
        newWindow.document.write('</body></html>');
        
        newWindow.document.close(); // Close the document to apply styles
        newWindow.print(); // Trigger the print dialog
        
        // Reset UI elements
        printButton.style.display = 'block';
        $('#print_invoice tbody').empty();
        $('#print_invoice').hide();
        $('#service_details').hide();
    }
    
    
    $('#print_invoice_btn').click(printInvoice); */
    
    $('#btnCancel_service_details').click(function() {
        swal.fire({
            title: 'Cancel Service Request',
            text: 'Are you sure you want to cancel your service request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                var serviceRequestId = $('#service_request_id_hidden').val();
                var customerId = $('#customer_id_hidden').val();
                console.log('Service Request ID:', serviceRequestId);
                console.log('Customer ID:', customerId);

                $.ajax({
                    type: 'POST',
                    url: 'cancel_service_details.php',
                    data: { 
                        service_request_id: serviceRequestId, 
                        customer_id: customerId
                    },
                    dataType: 'json'
                })
            .done((response) => {
                    console.log('Response:', response);
                    if (response.status === 'success') {
                        swal.fire("Service request canceled successfully!", response.message, "success")
                    .then((result) => {
                            if (result.isConfirmed) { 
                                resetOrder();
                                $('#form-service input, #form-service select, #form-service textarea').val('');
                                $('#form_id')[0].reset();
                                $('#service_details').hide();
                                $('#service_form').show();
                            }
                        });
                    } else {
                        swal.fire("Service request cancellation failed!", response.message, "error");
                    }
                })
            .fail((xhr, status, error) => {
                    console.error("Cancel Service Request Error:", error);
                    swal.fire("Service request cancellation failed!", "An error occurred while canceling your service request. Please try again.", "error");
                });
            }
        });
    }); 

    //Cancel service request button click on overview page
    $('#btnCancel_service').click(function() {
        swal.fire({
            title: 'Cancel Service Request',
            text: 'Are you sure you want to cancel your service request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                resetOrder();
                $('#customer_id_display').empty();
                $('#service_overview tbody').empty();
                $('#customer_name_display').empty();
                $('#contact_number_display').empty();
                $('#form_id')[0].reset();
                showServiceForm();
            }
        });
    });

    /**************FORGOT PASSWORD***************/
    $('#forgotPasswordModal').on('shown.bs.modal', function () {
        //remove any existing listeners to prevent duplicates
        $('#reset_pass_username').off('input');
        $('#submitForgotPassword').off('click');

        //get the security question when they type their username
        document.querySelector("#reset_pass_username").addEventListener("input", (e) => {
            const username = e.target.value.trim();
            clearTimeout(timeoutId)
            timeoutId = setTimeout(function(){
                if (username) {
                fetchSecurityQuestion(username).then(fetchedQuestion => {
                    document.querySelector("#question").value = fetchedQuestion || 'No question found';
                });
                } else {
                    document.querySelector("#question").value = '';
                }
            }, 1000)

        });

        // Handle the form submission when the submit button is clicked
        document.querySelector("#submitForgotPassword").addEventListener("click", () => {
            const username = document.querySelector("#reset_pass_username").value.trim();
            const answer = document.querySelector("#answer").value.trim();

            console.log("Username: ", username);
            console.log("Answer: ", answer);

            if (!username) {
                console.log("No username provided.");
                Swal.fire({
                    icon: 'warning',
                    title: 'Input Required',
                    text: 'Username is required.',
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }

            if (!answer) {
                console.log("No answer provided.");
                Swal.fire({
                    icon: 'warning',
                    title: 'Input Required',
                    showConfirmButton: false,
                    text: 'Answer is required.',
                    timer: 2000,
                });
                return;
            }

            //send `username` and `answer` to the server
            fetch('/laundry_system/homepage/forgot_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reset_pass_username: username, answer })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                    modal.hide();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Answer Verified! ' + data.message,
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {
                        window.location.href = '/laundry_system/homepage/reset_password.php';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        timer: 2000,
                        showConfirmButton: false,
                        text: data.message,
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    timer: 2000,
                    showConfirmButton: false,
                    text: 'An error occurred. Please try again later.',
                });
            });
        });
    });

    //to retrieve security question
    function fetchSecurityQuestion(username) {
        return fetch('/laundry_system/homepage/get_security_question.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return data.question;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    timer: 2000,
                    showConfirmButton: false,
                    text: data.message || 'Failed to retrieve security question.',
                });
                return '';
            }
        })
        .catch(error => {
            console.error('Error fetching security question:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                timer: 2000,
                showConfirmButton: false,
                text: 'An error occurred. Please try again.',
            });
            return '';
        });
    }

    // Barangay names
    const brgys = [
        "Ciudad Real", "Dulong Bayan", "Francisco Homes - Guijo", "Francisco Homes - Mulawin", "Francisco Homes - Narra", 
        "Francisco Homes - Yakal", "Gaya-gaya", "Graceville", "Gumaoc East", "Gumaoc Central", "Gumaoc West", "Kaybanban", 
        "Kaypian", "Maharlika", "Muzon South", "Muzon Proper", "Muzon East", "Muzon West", "Paradise 3", "Poblacion", 
        "Poblacion 1", "San Isidro", "San Manuel", "San Roque", "Sto. Cristo", "Tungkong Mangga"
    ];

    const barangaySelect = document.getElementById("barangaySelect");
    const deliveryFeeInput = document.getElementById("delivery_fee");

    brgys.forEach(brgy => {
        const option = document.createElement("option");
        option.value = brgy;       
        option.textContent = brgy;    
        barangaySelect.appendChild(option);  
    });

    function fetchDeliveryFee(serviceOptionId) {
        $.ajax({
            type: 'GET',
            url: '/laundry_system/homepage/getServiceOptionRate.php',
            data: { option_id: serviceOptionId },
            dataType: 'json'
        })
        .done(function(data) {
            if (data.error === 0) {
                deliveryFeeInput.value = parseFloat(data.price).toFixed(2);
                updateTotalAmount();
            } else {
                console.log('Error:', data.message);
            }
        })
        .fail(function(xhr, status, error) {
            console.log('Ajax error:', error);
        });
    }
    
    $('#barangaySelect').change(function() {
        const selectedBarangay = $(this).find('option:selected').text();
    
        // Set delivery fee based on barangay selection dynamically
        const deliveryServiceOptionId = (selectedBarangay === "Gaya-gaya") ? 4 : 1; // ID "Gaya-gaya" || other barangays
        fetchDeliveryFee(deliveryServiceOptionId);
    });
    
    // Event listener for service selection
    serviceOptionSelect.change(function() {
        const selectedOptionText = $(this).find('option:selected').text();
    
        if (selectedOptionText === 'Delivery') {
            deliveryFeeInput.value = "";
        } else {
            // Trigger the barangay selection change to apply the correct delivery fee on charge section
            $('#barangaySelect').trigger('change');
        }
    });

});