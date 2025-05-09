from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services import ProductService, ProductCategoryService
import json
from .utils import parse_date


def get_all_products(request):
    categories = request.GET.getlist("category")
    price_min = request.GET.get("price__gte")
    price_max = request.GET.get("price__lte")
    quantity_min = request.GET.get("quantity__gte")
    quantity_max = request.GET.get("quantity__lte")
    created_at_min = request.GET.get("created_at__gte")
    created_at_max = request.GET.get("created_at__lte")
    filters = {}
    if categories:
        filters['category__in'] = []
        for cat in categories:
            cat = ProductCategoryService.get_category_by_name(cat)
            filters['category__in'].append(str(cat['id']))
    
    if price_min:
        filters['price__gte'] = int(price_min)
    if price_max:
        filters['price__lte'] = int(price_max)

    if quantity_min:
        filters['quantity__gte'] = int(quantity_min)
    if quantity_max:
        filters['quantity__lte'] = int(quantity_max)
      
    if created_at_min:
        date = parse_date(created_at_min)
        print("date: ", date)
        if date:
            filters['created_at__gte'] = date
    if created_at_max:
        date = parse_date(created_at_max)
        if date:
            filters['created_at__lte'] = date

    try:
        products = ProductService.get_all_products(filters)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"products": products})


def get_product_by_id(request, id):
    product = ProductService.get_product_by_id(id)
    if product:
        return JsonResponse(product)
    return JsonResponse({"error" : "Product not found"}, status = 404)


def get_products_with_category(request, category_id):
    products = ProductService.get_products_with_category(id=category_id)
    return products


@csrf_exempt
def create_product(request):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductService.create_new_product(data)
    return JsonResponse(response)


@csrf_exempt
def update_product(request, id):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductService.update_product(id, data)
    return JsonResponse(response)


@csrf_exempt
def delete_product(request, id):
    response = ProductService.delete_product(id)
    return JsonResponse(response) 


############# Product category APIs ##############

def get_all_categories(request):
    categories = ProductCategoryService.get_all_categories()
    return JsonResponse({"categories": categories})

def get_category_by_id(request, id):
    category = ProductCategoryService.get_category_by_id(id)
    if category:
        return JsonResponse(category)
    return JsonResponse({"error" : "category not found"}, status = 404)

@csrf_exempt
def create_category(request):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductCategoryService.create_new_category(data)
    return JsonResponse(response)

@csrf_exempt
def update_category(request, id):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductCategoryService.update_category(id, data)
    return JsonResponse(response)

@csrf_exempt
def delete_category(request, id):
    response = ProductCategoryService.delete_category(id)
    return JsonResponse(response) 

@csrf_exempt
def add_product(request, category):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductCategoryService.add_product(data, category)
    return JsonResponse(response)

@csrf_exempt
def remove_product(request, category):
    data = json.loads(request.body.decode("utf-8"))
    response = ProductCategoryService.remove_product(data)
    return JsonResponse(response)


