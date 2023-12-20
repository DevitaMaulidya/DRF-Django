document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemDes = document.getElementById('itemDes').value;
    const token = localStorage.getItem('accessToken');

    fetch('http://127.0.0.1:8000/apia/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearee ${token}`
        },
        body: JSON.stringify({
            name: itemName,
            description: itemDes
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(data => {
        console.log('Success:', data);
        //Tutup modal
        $('#addItemModal').modal('hide');
        //Refresh daftar item
        fetchItems();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});