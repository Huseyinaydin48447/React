Header.css
.header: Header (başlık) kısmının stilini tanımlar. Koyu renk arka plan, beyaz metin ve yatayda elemanları hizalama gibi özellikler içerir.
.menu-icon: Menü ikonu, küçük ekranlarda görünmesini sağlar.
@media (max-width: 768px): Bu medya sorgusu, ekran genişliği 768px ve altına düştüğünde menüyü daha esnek hale getirir ve arama kutusunun tam genişlik almasını sağlar.

Header.js
Header: Başlık bileşeni, menü linkleri ve arama çubuğundan oluşur. onSearch fonksiyonunu alır ve arama terimi değiştikçe ilgili ürünleri filtreler.
ImageModal.js
ImageModal: Ürün görseli büyütülüp modal (açılır pencere) içinde gösterilir. Modal penceresi açıldığında arka planda yarı saydam bir overlay görünür.

ProductCard.js
ProductCard: Ürün kartını gösteren bileşendir. Ürüne tıklanarak daha büyük görseli ve bilgileri gösteren modal açılır. Ayrıca, ürün sayfasına yönlendiren bir "Bilgi" butonu içerir.

ProductDetails.js
ProductDetails: Ürünün detaylı bilgilerini gösteren sayfadır. Ürün bilgilerini API üzerinden alır ve sepete ekleme butonu sunar.

ProductList.js
ProductList: Ürünlerin listelendiği bileşendir. ProductCard bileşenini kullanarak ürünleri görsel olarak listelemeye yarar.

api.js
getProducts: API'den ürün verilerini çeker. Hata durumunda boş bir dizi döner.

ProductsContext.js
ProductsContext: Ürün verilerini ve filtreleri yöneten bir React Context'tir. Uygulama genelinde ürünlere ve filtrelere erişim sağlar.

debounce.js
useDebounce: Kullanıcının girdiği değeri belirli bir süre (300ms) sonra işler. Bu, sürekli değişen arama terimlerinin her değişiklikte API'ye istek yapmasını engeller.

App.css
Genel Stil Ayarları: Uygulamanın genel stilini tanımlar. Arka plan, yazı tipi ve temel düzenlemeler gibi özellikler içerir.
Ürün Kartı: Ürünlerin kutucuklar içinde listelenmesini sağlar. Ürünler üzerine tıklandığında hover efekti ve gölgelendirme uygulanır.

App.js
App: Ana uygulama bileşeni. Ürünleri API'den çeker, filtreler ve sıralar. Kullanıcı arama yaparken, ürünler filtrelenir ve güncellenir.
