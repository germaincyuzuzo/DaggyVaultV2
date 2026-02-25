const ADMIN_PHONE = '250787870380' // Change this to your admin WhatsApp number (no + or spaces)

export function getAdminPhone() {
  return ADMIN_PHONE
}

export function buildWhatsAppOrderMessage({ customer, cart, total }) {
  const lines = []

  lines.push('Hello, I would like to place an order:')
  lines.push('')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  if (customer.email) {
    lines.push(`Email: ${customer.email}`)
  }
  if (customer.pickupOption === 'pickup') {
    lines.push('Pickup: In-store pickup')
  } else {
    lines.push(`Address: ${customer.address}`)
  }
  if (customer.notes) {
    lines.push(`Notes: ${customer.notes}`)
  }
  lines.push('')
  lines.push('Order:')

  cart.forEach((item, index) => {
    const sizePart = item.selectedSize ? ` | Size: ${item.selectedSize}` : ''
    lines.push(
      `${index + 1}. ${item.name}${sizePart} - Qty: ${item.quantity} - Price: $${(
        item.price * item.quantity
      ).toFixed(2)}`,
    )
  })

  lines.push('')
  lines.push(`Total: $${total.toFixed(2)}`)
  lines.push('')
  lines.push('Please confirm availability.')

  return lines.join('\n')
}

export function openWhatsAppWithOrder(payload) {
  const message = buildWhatsAppOrderMessage(payload)
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${getAdminPhone()}?text=${encoded}`
  window.open(url, '_blank')
}
