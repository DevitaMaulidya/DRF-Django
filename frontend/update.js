document.getElementById('updateItemForm').addEventListener('submit', function(e) {
    e.preventDefault(); //Mencegah form mengirimkan secara tradisional

    const itemId = document.getElementById('updateItemId').value;
    const itemName = document.getElementById('updateItemName').value;
    const itemDescription = document.getElementById('updateItemDescription').value;

    //pastikan semua field telah terisi
    if (!itemName || !itemDescription) {
        alert('Silahkan isi semua field.');
        return;
    }

    const data= {
        name: itemName,
        description : itemDescription
    };

    const token = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:8000/apia/items/${itemId}/`, {
        method: 'PUT', //atau 'POST', tergantung pada API anda
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(updateItem => {
        console.log('Item updated:', updateItem);
        $('#updateItemModal').modal('hide'); //Tutup modal jika sukses
        //Anda mungkin juga ingin memperbarui UI atau daftar item disini
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memperbarui item');
    })
})