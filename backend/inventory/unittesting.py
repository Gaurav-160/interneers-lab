import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime
from .services import ProductCategoryService, ProductService


class TestProductService(unittest.TestCase):

    @patch('inventory.repositories.ProductRespository')
    def test_get_all_products(self, mock_product_repo):
        products = []
        for count in range(3):
            mock_product = MagicMock()
            mock_product.id = count
            mock_product.name = f"Test Product{count}"
            mock_product.category = MagicMock(title="Test Category")
            mock_product.price = 100
            mock_product.quantity = 10
            mock_product.created_at = datetime.now()
            mock_product.updated_at = datetime.now()

            products.append(mock_product)
        mock_product_repo.get_all_products.return_value = products

        result = ProductService.get_all_products(filters={})

        self.assertEqual(len(products), 3)
        self.assertEqual(result[0]['name'], 'Test Product1')
        self.assertEqual(result[0]['category'], 'Test Category')
        self.assertEqual(result[1]['name'], 'Test Product2')


    @patch('inventory.repositories.ProductRespository')
    def test_get_product_by_id(self, mock_product_repo):

        mock_product1 = MagicMock()
        mock_product1.id = 1
        mock_product1.name = "Test Product1"
        mock_product1.category = MagicMock(title="Test Category")
        mock_product1.price = 100
        mock_product1.quantity = 10
        mock_product1.created_at = datetime.now()
        mock_product1.updated_at = datetime.now()
        instance = mock_product_repo.return_value
        instance.get_product_by_id.side_effect = lambda id: mock_product1 if id == 1 else None

        result1 = ProductService.get_product_by_id(1)
        result2 = ProductService.get_product_by_id(2)

        self.assertIsNotNone(result1)
        self.assertIsNone(result2)
        self.assertEqual(result1['name'], 'Test Product1')
        self.assertEqual(result1['category'], 'Test Category')

    @patch('inventory.repositories.ProductRespository')
    def test_create_new_product(self, mock_product_repo):

        product_data = {
            'name': 'New Product',
            'category': 'New Category',
            'price': 150,
            'quantity': 5,
        }
        
        mock_product = MagicMock()
        for key, value in product_data.items():
            setattr(mock_product, key, value)

        mock_product.id = 1
        mock_product.category = MagicMock(title=product_data['category'])
        mock_product.created_at = datetime.now()
        mock_product.updated_at = datetime.now()

        instance = mock_product_repo.return_value
        instance.create_new_product.return_value = mock_product

        result = ProductService.create_new_product(product_data)    
        self.assertNotIn('error', result)
        self.assertEqual(result['name'], product_data['name'])
        self.assertEqual(result['category'], product_data['category'])

class TestProductCategoryService(unittest.TestCase):

    @patch('inventory.repositories.ProductCategoryRepository')
    def test_get_all_categories(self, mock_category_repo):
        mock_category = MagicMock()
        mock_category.id = 1
        mock_category.title = 'Test Category'
        mock_category.description = 'Description of Test Category'
        mock_category_repo.get_all_categories.return_value = [mock_category]

        result = ProductCategoryService.get_all_categories()

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['title'], 'Test Category')

    @patch('inventory.repositories.ProductCategoryRepository')
    def test_create_new_category(self, mock_category_repo):
        mock_category = MagicMock()
        mock_category.id = 1
        mock_category.title = 'New Category'
        mock_category.description = 'Description of New Category'
        mock_category_repo.get_all_categories.return_value.filter.return_value.count.return_value = 0
        mock_category_repo.create_category.return_value = mock_category

        result = ProductCategoryService.create_new_category({
            'title': 'New Category',
            'description': 'Description of New Category'
        })

        self.assertNotIn('error', result)
        self.assertEqual(result['title'], 'New Category')

if __name__ == '__main__':
    unittest.main()