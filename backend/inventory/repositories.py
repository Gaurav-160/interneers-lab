from .models import Product, ProductCategory
from bson import ObjectId
from datetime import datetime



class ProductCategoryRepository:

    @staticmethod
    def get_all_categories():
        return ProductCategory.objects()

    @staticmethod
    def get_category_by_id(id):
        try:
            return ProductCategory.objects.get(id=ObjectId(id)) 
        except ProductCategory.DoesNotExist:
            return None
        
    @staticmethod
    def get_category_by_name(name):
        try:
            return ProductCategory.objects.get(title=name) 
        except ProductCategory.DoesNotExist:
            return None

    @staticmethod
    def create_category(category_data):
        category = ProductCategory(
            title=category_data['title'],
            description=category_data['description'], 
        )
        category.save()
        return category

    @staticmethod
    def update_category(category, category_data):
        for key, value in category_data.items():
            if hasattr(category, key): 
                setattr(category, key, value)
        category.save()
        return category

    @staticmethod
    def delete_category(category):
        category.delete()


    @staticmethod
    def remove_product(product):
        print(f"%%%%%%%%%%%%%%%%%%% PRODUCT %%%%%%%%%%%%%%%%%%%")
        print(type(product))
        product["category"] = None
        product.save()
        return product


class ProductRepository:

    @staticmethod
    def get_all_products(filters):
        return Product.objects(**filters)
    

    @staticmethod
    def get_products_with_category(category):
        return Product.objects(category=ProductCategory.objects.get(title=category))
        

    @staticmethod
    def get_product_by_id(id):
        try:
            return Product.objects.get(id=ObjectId(id)) 
        except Product.DoesNotExist:
            return None
        
    
    @staticmethod
    def get_product_by_name(name):
        try:
            return Product.objects.get(name=name) 
        except Product.DoesNotExist:
            return None


    @staticmethod
    def create_product(product_data):
        category = ProductCategory.objects.get(title=product_data['category'])
        product = Product(
            name=product_data['name'],
            description=product_data['description'], 
            category = category,
            price=product_data['price'], 
            brand=product_data['brand'],
            quantity=product_data['quantity'],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        product.save()
        return product


    @staticmethod
    def update_product(product, product_data):
        for key, value in product_data.items():
            print(f"key : {key} value : {value}")
            if key == "category":
                if product.category == None or product_data["category"] != product.category.title:
                    cat = ProductCategory.objects.get(title=product_data["category"])
                    product['category'] = cat
            elif hasattr(product, key): 
                setattr(product, key, value)
        product['updated_at'] = datetime.now()
        product.save()
        return product


    @staticmethod
    def delete_product(product):
        product.delete()

