const url = "http://localhost:3000/products"; 

class apiProducts {
    
    getMethod(url) {
        fetch(url, {
            method:"GET"
        }).then(response=>{
            if(!response.status==200){
                throw new Error (`GET request failed with status:${response.status}`);
            }
            return response.json();
        }).then(data=>console.table(data))
    }

    postMethod(url){
        fetch(url, {
            method:"POST",
            body: JSON.stringify({
                id: "13",
                name: "Cocos",
                color: "White",
                price: 14
            })
        }).then(response=>{
            if(!response.status==200){
                throw new Error (`POST request failed with status:${response.status}`)
            }
            return response.json();
        }).then(data=>console.table(data))
    }

    deleteMethod(id) {
        const url = `http://localhost:3000/products/${id}`;
        fetch(url, {
            method:"DELETE"
        }).then(response=>{
            if(!response.status==200){
                throw new Error (`DELETE request failed with status:${response.status}`);
            }
            return response.json();
        }).then(data=>console.table(data))
    }
    
    putMethod(id, updateData){
        const url = `http://localhost:3000/products/${id}`;
        fetch(url, {
            method:"PUT",
            body:JSON.stringify(updateData)
        }).then(response=>{
            if(!response.status==200){
                throw new Error (`PUT request failed with status:${response.status}`);
            }
            return response.json();
        }).then(data=>console.table(data));
    }
}

const product = new apiProducts();

const updataOldData = {
   name: "Cocosio",
   color: "White",
   price: 23
}

product.putMethod(13, updataOldData)
product.deleteMethod(13);
product.postMethod(url)
product.getMethod(url); 
