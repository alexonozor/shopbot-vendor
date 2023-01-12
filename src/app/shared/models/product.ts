

export class Product
{
    _id: string;
    name: string;
    handle: string;
    description: string;
    menu: string;
    store: string;
    categories: {};
    tags: string[];
    photos: {}[];
    priceTaxExcl: number;
    price: number;
    priceTaxIncl: number;
    taxRate: number;
    comparedPrice: number;
    quantity: number;
    sku: string;
    width: string;
    height: string;
    depth: string;
    weight: string;
    extraShippingFee: number;
    active: boolean;
    options: [{
        name: string;
        mandatory: boolean,
        selectedType: string,
        options: [
         { 
           name: { type: string },
           price: { type: number } 
         }
        ]
      }];

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?:any)
    {
        product = product || {};
        this._id = product._id;
        this.name = product.name || '';
        this.menu = product.menu;
        this.store = product.store;
        this.handle = product.handle;
        this.description = product.description || '';
        this.categories = product.categories || {};
        this.tags = product.tags || [];
        this.photos = product.photos || [];
        this.priceTaxExcl = product.priceTaxExcl || 0;
        this.priceTaxIncl = product.priceTaxIncl || 0;
        this.taxRate = product.taxRate || 0;
        this.comparedPrice = product.comparedPrice || 0;
        this.price =  product.price || 0;
        this.quantity = product.quantity || 0;
        this.sku = product.sku || 0;
        this.width = product.width || 0;
        this.height = product.height || 0;
        this.depth = product.depth || 0;
        this.weight = product.weight || 0;
        this.extraShippingFee = product.extraShippingFee || 0;
        this.active = product.active || true;
        this.options = product.options || [];
    }

}