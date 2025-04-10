from .repositories import ProductRepository, ProductCategoryRepository


class ProductService:
    @staticmethod
    def get_all_products(filters):
        products = ProductRepository.get_all_products(filters)
        return [{
            "id" : str(p.id),
            "name":p.name, 
            "category":p.category.title if p.category != None else None, 
            "price":p.price, 
            "quantity":p.quantity, 
            "created_at":p.created_at, 
            "updated_at":p.updated_at
        } for p in products]


    @staticmethod
    def get_product_by_id(id):
        product = ProductRepository.get_product_by_id(id)
        if product: 
            return {
                "id" : str(product.id), 
                "name":product.name, 
                "category":product.category.title if product.category != None else None, 
                "price":product.price, 
                "quantity":product.quantity, 
                "created_at":product.created_at, 
                "updated_at":product.updated_at
            }
        return None

    @staticmethod
    def get_product_by_name(name):
        product = ProductRepository.get_product_by_name(name)
        if product: 
            return product
        return None
    

    @staticmethod
    def get_products_with_category(category):
        products = ProductRepository.get_products_with_category(category)
        return [{
            "id" : str(p.id), 
            "name":p.name, 
            "category":p.category.title if p.category != None else None, 
            "price":p.price, 
            "quantity":p.quantity, 
            "created_at":p.created_at, 
            "updated_at":p.updated_at
        } for p in products]


    @staticmethod
    def create_new_product(product_data):
        if ProductRepository.get_all_products().filter(name=product_data['name']).count() > 0:
            return {"error" : "Product already exists. Kindly update the product instead of trying to create new product."}
        
        product = ProductRepository.create_product(product_data)
        category = ProductCategoryRepository.get_category_by_id(product.category.id)
        return {
            "id":str(product.id), 
            "name":product.name, 
            "category":category.title if product.category != None else None, 
            "price":product.price, 
            "quantity":product.quantity, 
            "created_at":product.created_at, 
            "updated_at":product.updated_at
        }
    

    def update_product(id, product_data):
        product = ProductRepository.get_product_by_id(id)
        if not product:
            return {"error" : "Product not found. Kindly create new one."}
        product = ProductRepository.update_product(product, product_data)
        return {
            "id":str(product.id), 
            "name":product.name, 
            "category":product.category.title if product.category != None else None, 
            "price":product.price, 
            "quantity":product.quantity, 
            "created_at":product.created_at, 
            "updated_at":product.updated_at
        }
    

    def delete_product(id):
        product = ProductRepository.get_product_by_id(id)
        if not product: 
            return {"error": "Product not found."}
        ProductRepository.delete_product(product)
        return {"success": "Product deleted."}
    

class ProductCategoryService:

    @staticmethod
    def get_all_categories():
        categories = ProductCategoryRepository.get_all_categories()
        return [{
            "id" : str(pc.id), 
            "title":pc.title, 
            "description":pc.description
        } for pc in categories]

    @staticmethod
    def get_category_by_id(id):
        category = ProductCategoryRepository.get_category_by_id(id)
        if category: 
            return {"id" : str(category.id), "title":category.title if category != None else None, "price":category.description}
        return None
    
    @staticmethod
    def get_category_by_name(name):
        category = ProductCategoryRepository.get_category_by_name(name)
        if category:
            return {"id" : str(category.id), "title":category.title if category != None else None, "price":category.description}
        return None
    
    @staticmethod
    def create_new_category(category_data):
        if ProductCategoryRepository.get_all_categories().filter(title=category_data['title']).count() > 0:
            return {"error" : "This category already exists. Kindly update the category instead of trying to create new category."}  
        category = ProductCategoryRepository.create_category(category_data)
        return {
            "id" : str(category.id), 
            "title":category.title if category != None else None, 
            "price":category.description
        }
    
    def update_category(id, category_data):
        category = ProductCategoryRepository.get_category_by_id(id)
        if not category:
            return {"error" : "Product not found. Kindly create new one."}
        category = ProductCategoryRepository.update_category(category, category_data)
        return {
            "id" : str(category.id), 
            "title":category.title if category != None else None, 
            "price":category.description
        }
    
    def delete_category(id):
        category = ProductCategoryRepository.get_category_by_id(id)
        if not category: 
            return {"error": "Category not found."}
        ProductCategoryRepository.delete_category(category)
        return {"success": "Category deleted."}
    

    def add_product(product_data, category):
        # check if its an existing product
        product = ProductService.get_product_by_name(product_data["name"])
        product_data["category"] = category
        if product == None:
            if product_data["brand"] != None:
                response = ProductService.create_new_product(product_data)
                return response 
            else:
                return {"Validation error": "Brand name is a required field to add product"}
        else:
            if product.brand != None:
                response = ProductService.update_product(id=product.id, product_data=product_data)
                return response
            else:
                return {"Validation error": "Brand name is a required field to add product"}
      

    def remove_product(product_data):
        product = ProductService.get_product_by_name(product_data["name"])
        if product == None:
            return {"error" : "Product not found"}
        else:
            product = ProductCategoryRepository.remove_product(product)
            return {
                    "id":str(product.id), 
                    "name":product.name, 
                    "category":product.category.title if product.category != None else None, 
                    "price":product.price, 
                    "quantity":product.quantity, 
                    "created_at":product.created_at, 
                    "updated_at":product.updated_at
                }

    


