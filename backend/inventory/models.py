from mongoengine import Document, StringField, IntField, DateTimeField, ReferenceField, NULLIFY


class ProductCategory(Document):
    title = StringField(required=True, unique=True)
    description = StringField()


class Product(Document):
    name = StringField(max_length=100, required=True)
    description = StringField()
    category = ReferenceField('ProductCategory', reverse_delete_rule = NULLIFY) # set to None if referenced category is deleted
    price = IntField(required=True)
    brand = StringField(max_length=60)
    quantity = IntField()
    created_at = DateTimeField()
    updated_at = DateTimeField()

    def __str__(self):
        return self.name
