document.addEventListener('DOMContentLoaded', function(){
    fetchItems();
});

function fetchItems(){
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNDMyMDA0LCJpYXQiOjE3MDI0MzE3MDQsImp0aSI6ImQ0NDkwMTQ4ZDJmMTRhNTc4MjMwNDYyZDU3MGQwYjUzIiwidXNlcl9pZCI6Mn0.RrYFxaRTcak1U4eFu-WAzpgiTXkmuHEcSUEJPj2Pj7M';
    const token = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8000/apia/items/',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Error:', error));
}

function displayItems(items){
    const itemsContainer = document.getElementById('items');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('col-md-6');
        itemElement.innerHTML= `
            <div class="card mb-4">
                <div class = "card-body">
                    <h5 class="card-title"> ${item.name} </h5>
                    <p class="card-text"> ${item.description} </p>
                </div>
            </div>
        `;

        itemsContainer.appendChild(itemElement);
    });
}