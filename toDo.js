//swal search with different types of search

// Swal.fire({
//   title: 'Search',
//   html:
//     '<input type="text" id="search-input" class="swal2-input" placeholder="Enter your search query">' +
//     '<div id="search-options" class="swal2-radio">' +
//     '<label for="option1"><input type="radio" id="option1" name="search-option" value="option1"> Option 1</label><br>' +
//     '<label for="option2"><input type="radio" id="option2" name="search-option" value="option2"> Option 2</label><br>' +
//     '<label for="option3"><input type="radio" id="option3" name="search-option" value="option3"> Option 3</label>' +
//     '</div>',
//   focusConfirm: false,
//   preConfirm: () => {
//     const searchQuery = document.getElementById('search-input').value;
//     const selectedOption = document.querySelector('input[name="search-option"]:checked').value;
//     return { searchQuery, selectedOption };
//   },
//   showCancelButton: true,
//   cancelButtonText: 'Cancel',
//   confirmButtonText: 'Search',
// }).then((result) => {
//   if (result.isConfirmed) {
//     const searchQuery = result.value.searchQuery;
//     const selectedOption = result.value.selectedOption;
    
//     // Perform the search based on the selected option and search query
//     // ...
//   }
// });
