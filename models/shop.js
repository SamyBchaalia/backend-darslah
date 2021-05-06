class Shop {
    constructor( id,
        name,
        description,
        image,
        price,
        rate,comment) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.image=image;
            this.price = price;
            this.rate = rate;       
            this.comment=comment;    
}

}


module.exports = Shop;