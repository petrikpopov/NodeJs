const url = "http://localhost:3000/products"; 

class apiProducts {
    
    constructor(url){
        this.url = url;
    }

    getMethod() {
        fetch(this.url, {
            method:"GET"
        }).then(response=>{
            if(!response.status==200){
                throw new Error (`GET request failed with status:${response.status}`);
            }
            return response.json();
        }).then(data=>console.table(data))
    }

    postMethod(){
        fetch(this.url, {
            method:"POST",
            body: JSON.stringify({
                id: "14",
                name: "Macaca",
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
        const url = `${this.url}/${id}`
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
        const url = `${this.url}/${id}`;
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

const product = new apiProducts(url);

const updataOldData = {
   name: "Cocosio",
   color: "White",
   price: 23
}

// product.putMethod(12, updataOldData)
// product.deleteMethod(13);
// product.postMethod();
product.getMethod(); 
