document.getElementById('my_form').addEventListener('submit', function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const title = document.querySelector('input[name="title"]').value;
    const price = document.querySelector('input[name="price"]').value;

    const data = {
        title: title,
        price: parseFloat(price),
    };

    // Отправляем POST запрос на сервер для добавления продукта
    fetch('/products', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(r => {
        console.log('Product added:', r);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
