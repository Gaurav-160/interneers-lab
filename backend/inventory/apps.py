from django.apps import AppConfig
from .models import ProductCategory

class InventoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'inventory'

    def ready(self):
        try:
            categories = [
                {"title": "Food", "description": "All food items"},
                {"title": "Electronics", "description": "Gadgets and devices"},
            ]

            for category in categories:
                if not ProductCategory.objects(title=category["title"]).first():
                    ProductCategory(**category).save()

            print("Product Categories Seeded Successfully!")
        
        except Exception as e:
            print(f"Error while Seeding Product Categories: {e}")
