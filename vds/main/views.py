import stripe
from .serializer import *
from rest_framework import generics
from .models import *
from rest_framework.filters import OrderingFilter
from django.db.models import F , Value
from django.db.models.functions import Concat
from django.db.models.fields import CharField
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt



class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser,)
    filter_backends = [OrderingFilter]
    filterset_fields = ['category','sub_category','maker']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        sub_category = self.request.query_params.get('sub_category', None)
        if category:
            queryset = queryset.filter(category=category)
        if sub_category:
            queryset = queryset.filter(sub_category=sub_category)
        queryset = queryset.annotate(category_and_subcategory=Concat(F('category'), Value('-'), F('sub_category'),output_field=CharField()))
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(img=self.request.data.get('img1'))
        serializer.save(img=self.request.data.get('img1'))

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class MakerList(generics.ListCreateAPIView):
    serializer_class = MakerSerializer
    queryset = Maker.objects.all()

class Sub_CategoryList(generics.ListCreateAPIView):
    serializer_class = Sub_CategorySerializer
    queryset = Sub_Category.objects.all()

class DetailProduct(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = DetailProductSerializer

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class OrderProductListPaginations(PageNumberPagination):
    page_size = 4

class OrderProductList(generics.ListCreateAPIView):
    queryset = Product.objects.order_by('-date_created')
    serializer_class = ProductSerializer
    pagination_class = OrderProductListPaginations



stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateCheckoutSessionView(generics.ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        product_id = self.kwargs["pk"]
        quantity = self.kwargs["qu"]
        try:    
            product = Product.objects.get(id=product_id)
            YOUR_DOMAIN = "http://localhost:3000"
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'rub',
                            'unit_amount': int(product.price)*100,
                            'product_data': {
                                'name': product.name
                            },
                        },
                        'quantity': quantity,
                    },
                ],
                metadata={
                    "product_id": product.id
                },
                mode='payment',
                success_url=YOUR_DOMAIN + '?success=true',
                cancel_url=YOUR_DOMAIN + '?canceled=true',
            )
            return redirect(checkout_session.url, code= 303)
        except Exception as e:
            Response({"message":f'something wrong dude{str(e)}'}, status_code=500)

@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    endpoint = 'whsec_94b5a5aaf345520924110b785b1f4001f4a12d7bfd8a8203a6d8bdfe482c0113'
    try:
        event = stripe.Webhook.construct_event(
        payload, sig_header, endpoint
        )
    except ValueError as e:
    # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
     # Invalid signature
        return HttpResponse(status=400)
    if event['type'] == 'checkout.session.completed':
        print(event)
        prod_id = event['data']['object']['metadata']['product_id']
        email_user = event['data']['object']['customer_details']['email']
        price = event['data']['object']['amount_total']
        user = User.objects.get(email=email_user)
        product = Product.objects.get(id=prod_id)
        Order.objects.create(product = product,is_paid=True,user=user, price=price)

    return HttpResponse(status=200)


class OrderHistory(generics.ListCreateAPIView):
    serializer_class = OrderHistorySerializer
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user.id)
