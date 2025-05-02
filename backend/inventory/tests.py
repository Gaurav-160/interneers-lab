from unittest import TestCase
from django.test import RequestFactory
from django.urls import reverse
import json
from . import controllers
from .models import Product, ProductCategory
from .repositories import ProductRepository, ProductCategoryRepository

# Create your tests here.
class ProductIntegrationTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.test_id = self.id()

        category_name = f"Test Category {self.test_id}"
        self.category = ProductCategoryRepository.get_category_by_name(category_name)
        if not self.category:
            self.category = ProductCategoryRepository.create_category({
                "title": category_name,
                "description": "Testing the APIs"
            })

        self.base_data = {
            "name": f"Test Product {self.test_id}",
            "category": self.category["title"],
            "price": 29999,
            "quantity": 5,
            "brand": "TestBrand",
            "description": "Test product description"
        }

        existing_product = ProductRepository.get_product_by_name(self.base_data["name"])
        self.product = existing_product if existing_product else ProductRepository.create_product(self.base_data)

        self.created_product_name = None

    def tearDown(self):
        try:
            if self.created_product_name:
                product = ProductRepository.get_product_by_name(self.created_product_name)
                if product:
                    ProductRepository.delete_product(product)
        except Product.DoesNotExist:
            pass

        try:
            if hasattr(self, 'product') and self.product:
                ProductRepository.delete_product(self.product)
        except Product.DoesNotExist:
            pass

        try:
            if hasattr(self, 'category') and self.category:
                ProductCategoryRepository.delete_category(self.category)
        except ProductCategory.DoesNotExist:
            pass

    def test_create_product(self):
        data = {
            "name": f"New Test Product {self.test_id}",
            "category": self.category["title"],
            "price": 29999,
            "quantity": 10,
            "brand": "Test Brand",
            "description": "New test product description"
        }
        self.created_product_name = data["name"]

        request = self.factory.post(
            reverse("create-product"),
            data=json.dumps(data),
            content_type="application/json"
        )

        response = controllers.create_product(request)
        self.assertEqual(response.status_code, 200)

        response_data = json.loads(response.content)
        self.assertEqual(response_data["name"], data["name"])
        self.assertEqual(response_data["category"], self.category["title"])

    def test_get_product(self):
        request = self.factory.get(reverse("get_product_by_id", args=[self.product.id]))
        response = controllers.get_product_by_id(request, self.product.id)
        self.assertEqual(response.status_code, 200)
        result = json.loads(response.content)
        self.assertEqual(result["id"], str(self.product.id))

    def test_update_product(self):
        data = {
            "price": 100,
            "quantity": 99
        }
        request = self.factory.put(
            reverse("update-product", args=[self.product.id]),
            data=json.dumps(data),
            content_type="application/json"
        )
        response = controllers.update_product(request, self.product.id)
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        self.assertEqual(int(result["price"]), data["price"])
        self.assertEqual(result["quantity"], data["quantity"])

    def test_delete_product(self):
        request = self.factory.delete(reverse("delete-product", args=[self.product.id]))
        response = controllers.delete_product(request, self.product.id)
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        self.assertEqual(result.get("success", ""), "Product deleted.")


class ProductCategoryIntegrationTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.test_id = self.id()
        self.title = f"Test Category {self.test_id}"
        self.data = {
            "title": self.title,
            "description": "Integration Test Category"
        }

        self.category = ProductCategoryRepository.get_category_by_name(self.title)
        if not self.category:
            self.category = ProductCategoryRepository.create_category(self.data)

        self.created_category_title = None

    def tearDown(self):
        try:
            if self.created_category_title:
                category = ProductCategoryRepository.get_category_by_name(self.created_category_title)
                if category:
                    ProductCategoryRepository.delete_category(category)
        except ProductCategory.DoesNotExist:
            pass

        try:
            if hasattr(self, 'category') and self.category:
                ProductCategoryRepository.delete_category(self.category)
        except ProductCategory.DoesNotExist:
            pass

    def test_create_category(self):
        data = {
            "title": f"New Test Category {self.test_id}",
            "description": "Creating new test category"
        }

        self.created_category_title = data["title"]

        request = self.factory.post(
            reverse("create-category"),
            data=json.dumps(data),
            content_type="application/json"
        )

        response = controllers.create_category(request)
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        print("Create category response:", result)
        self.assertIn("title", result)
        self.assertIn("description", result)
        self.assertEqual(result["title"], data["title"])
        self.assertEqual(result["description"], data["description"])

    def test_get_category(self):
        request = self.factory.get(reverse("get_category_by_id", args=[self.category["id"]]))
        response = controllers.get_category_by_id(request, self.category["id"])
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        self.assertIn("title", result)
        self.assertEqual(result["title"], self.category["title"])

    def test_update_category(self):
        data = {
            "description": "Updated description"
        }

        request = self.factory.put(
            reverse("update-category", args=[self.category["id"]]),
            data=json.dumps(data),
            content_type="application/json"
        )

        response = controllers.update_category(request, self.category["id"])
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        print("Update category response:", result)
        self.assertIn("description", result)
        self.assertEqual(result["description"], data["description"])

    def test_delete_category(self):
        request = self.factory.delete(reverse("delete-category", args=[self.category["id"]]))
        response = controllers.delete_category(request, self.category["id"])
        self.assertEqual(response.status_code, 200)

        result = json.loads(response.content)
        self.assertIn("success", result)
        self.assertEqual(result["success"], "Category deleted.")
