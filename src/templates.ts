import type { Order, Product, User } from '@/payload-types'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const mainContainerStyle = `font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;`
const h1Style = `color: #000;`
const pStyle = `line-height: 1.6;`
const buttonStyle = `display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #000; color: #fff; text-decoration: none; border-radius: 3px;`
const footerStyle = `margin-top: 20px; font-size: 12px; color: #777; text-align: center;`

/**
 * Generates a welcome email for a new user.
 * @param user - The user object, should contain at least `name`.
 * @returns HTML string for the welcome email.
 */
export const getWelcomeEmailHTML = ({ user }: { user: User }): string => `
  <div style="${mainContainerStyle}">
    <h1 style="${h1Style}">Arkeomarket'e Hoş Geldiniz${user.name ? `, ${user.name}` : ''}</h1>
    <p style="${pStyle}">
      Sizi aramızda görmekten çok mutluyuz. Benzersiz replikalarımızı keşfetmeye hazır olun.
    </p>
    <p style="${pStyle}">
      En yeni ürünlerimize göz atarak veya özel koleksiyonlarımızı inceleyerek başlayabilirsiniz.
    </p>
    <a href="${BASE_URL}/search" style="${buttonStyle}">Alışverişe Başla</a>
    <div style="${footerStyle}">
      <p>&copy; ${new Date().getFullYear()} Arkeomarket. Tüm hakları saklıdır.</p>
      <p>destek@arkeomarket.com</p>
    </div>
  </div>
`

/**
 * Generates an email to showcase a specific product.
 * @param product - The product to feature.
 * @returns HTML string for the product feature email.
 */
export const getProductRecommendationHTML = ({ product }: { product: Product }): string => {
  // The product image can be a string (ID) or a Media object. Handle both cases.
  const imageUrl =
    typeof product.gallery?.[0]?.image === 'object' && product.gallery?.[0]?.image?.url
      ? product.gallery[0].image.url
      : `${BASE_URL}/media/placeholder.jpg` // Fallback image

  return `
    <div style="${mainContainerStyle}">
      <h1 style="${h1Style}">İndirimde: ${product.title}</h1>
      <img src="${imageUrl}" alt="${product.title}" style="max-width: 100%; border-radius: 5px;" />
      <p style="${pStyle}">
        Bunun sizin hoşunuza gidebileceğini düşündük. "${
          product.title
        }" ürünü en popüler ürünlerimizden biri ve sizi bekliyor.
      </p>
      <a href="${BASE_URL}/products/${product.slug}" style="${buttonStyle}">Ürün Detaylarını Gör</a>
      <div style="${footerStyle}">
        <p>&copy; ${new Date().getFullYear()} Arkeomarket. Tüm hakları saklıdır.</p>
        <p>destek@arkeomarket.com</p>
      </div>
    </div>
  `
}

/**
 * Generates an order confirmation email.
 * @param order - The order details.
 * @returns HTML string for the order confirmation email.
 */
export const getOrderConfirmationHTML = ({ order }: { order: Order }): string => {
  const customerName = typeof order.customer === 'object' ? order?.customer?.name : ' '

  return `
    <div style="${mainContainerStyle}">
      <h1 style="${h1Style}">Siparişiniz için teşekkür ederiz!</h1>
      <p style="${pStyle}">Merhaba ${customerName},</p>
      <p style="${pStyle}">
        #${
          order.id
        } sipariş numarasını aldık ve kargo hazırlığına başladık. Gönderi yolda olduğunda sizi bilgilendireceğiz.
      </p>
      <h2 style="color: #000; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Sipariş Özeti</h2>
      <div>
        ${order.items
          ?.map((item) => {
            const product = item.product
            if (typeof product !== 'object' || !product) return '' // Ensure product is populated

            const price =
              product.priceInUSDEnabled && product.priceInUSD
                ? `$${(product.priceInUSD / 100).toFixed(2)}`
                : 'Fiyat bilgisi kullanılamıyor'

            return `
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                <span>${product.title} (x${item.quantity})</span>
                <span>${price}</span>
              </div>
            `
          })
          .join('')}
      </div>
      <div style="text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold;">
        Toplam: $${((order.amount || 0) / 100).toFixed(2)}
      </div>
      <a href="${BASE_URL}/account/orders/${order.id}" style="${buttonStyle}">Siparişinizi Görüntüleyin</a>
      <div style="${footerStyle}">
        <p>&copy; ${new Date().getFullYear()} Arkeomarket. Tüm hakları saklıdır.</p>
        <p>destek@arkeomarket.com</p>
      </div>
    </div>
  `
}
