from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse, JsonResponse
from . import views, controllers


urlpatterns = [
    # path('products', views.get_all_products, name = "getall-products"),
    # path('products/page/<int:page_no>', views.get_products, name = "products_page"),
    # path('products/create', views.create_product, name = "create-product"),
    # path('products/<int:id>', views.update_product, name="update-product"),
    
    path('products', controllers.get_all_products, name = "getall-products"),
    path('products/create', controllers.create_product, name = "create-product"),
    path('products/<str:id>', controllers.get_product_by_id, name="get_product_by_id"),
    path('products/<str:id>/update', controllers.update_product, name="update-product"),
    path('products/<str:id>/delete', controllers.delete_product, name="delete-product"),

    path('categories', controllers.get_all_categories, name = "getall-categories"),
    path('categories/create', controllers.create_category, name = "create-category"),
    path('categories/<str:id>', controllers.get_category_by_id, name="get_category_by_id"),
    path('categories/<str:id>/update', controllers.update_category, name="update-category"),
    path('categories/<str:id>/delete', controllers.delete_category, name="delete-category"),
    path('categories/<str:category>/add-product', controllers.add_product, name="add-product"),
    path('categories/<str:category>/remove-product', controllers.remove_product, name="remove-product"),
]