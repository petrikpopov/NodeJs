fetch('/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${product.id}, Title: ${product.title}, Price: ${product.price}`;
            productList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));

document.getElementById('update-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;

    fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, price })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = 'Product updated successfully!';
        console.log('Success:', data);
    })
    .catch(error => console.error('Error:', error));
});
