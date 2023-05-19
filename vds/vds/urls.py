from django.contrib import admin
from django.urls import path, include, re_path
from main.views import *
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vds/product/', ProductList.as_view()),
    path('api/vds/category/', CategoryList.as_view()),
    path('api/vds/maker/', MakerList.as_view()),
    path('api/vds/sub_category/', Sub_CategoryList.as_view()),
    path('api/vds/productdetail/<int:pk>/', DetailProduct.as_view()),
    path('api/vds/review/', ReviewList.as_view()),
    path('api/vds/product_order/', OrderProductList.as_view()),
    path('api/vds/create-checkout-session/<int:pk>/<int:qu>', CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('api/vds/order-history', OrderHistory.as_view()),
    path('api/vds/webhook', stripe_webhook_view),
    path('api/vds/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
