document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('items');
    let deleteItemId = null; // ID item yang akan dihapus

    // Event listener untuk tombol hapus
    itemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            deleteItemId = e.target.getAttribute('data-id');
            $('#deleteConfirmModal').modal('show');
        }
    });

    // Event listener untuk konfirmasi hapus
    document.getElementById('confirmDelete').addEventListener('click', function() {
        if (deleteItemId) {
            fetch(`http://127.0.0.1:8000/apia/items/${deleteItemId}`, {
                method: 'DELETE', // Metode DELETE
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal menghapus item');
                }
                // Cek apakah respons memiliki konten
				if (response.status !== 204) { // 204 No Content
					return response.json();
				}
            })
            .then(() => {
                console.log('Item dihapus');
                $('#deleteConfirmModal').modal('hide');
                // Opsional: Hapus elemen item dari UI atau refresh halaman
				window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        }
    });
});