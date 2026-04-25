import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <div className="grid gap-6 max-w-250 pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-green-300">
        Terms and Conditions for ShopNet
      </h1>

      <p className="text-sm">Last updated: April 25, 2026</p>

      <h2>
        <strong>Welcome to ShopNet.</strong> These Terms and Conditions apply to
        your use of ShopNet’s website and to all purchases made through it.
        ShopNet is an online store offering physical consumer products,
        including shoes, electronics, toys, bags, headphones, and similar goods.
        By placing an order or using the website, you agree to these Terms and
        Conditions.
      </h2>

      <h3 className="font-semibold">1. Scope and acceptance</h3>
      <p>
        These Terms and Conditions govern the relationship between ShopNet and
        consumers purchasing goods through the website. To complete an order,
        you must actively accept these terms during checkout before the contract
        becomes binding. Pre-ticked boxes or passive acceptance are not
        sufficient. If you do not agree with these Terms and Conditions, you
        must not place an order or continue using the website for purchases.
        ShopNet may update these terms from time to time, and the version in
        force at the time of your order will apply to that purchase.
      </p>

      <h3 className="font-semibold">2. Consumer status and eligibility</h3>
      <p>
        ShopNet sells products to any general consumer who is acting outside a
        business or professional capacity. The website is intended for private
        purchases only unless ShopNet expressly states otherwise. By placing an
        order, you confirm that the information you provide is accurate and that
        you are legally able to enter into a purchase agreement. If you are
        purchasing on behalf of another person, you confirm that you have
        authority to do so.
      </p>

      <h3 className="font-semibold">3. Products and product information</h3>
      <p>
        ShopNet sells physical products such as shoes, hard disks, toys, women’s
        bags, headphones, and other general consumer goods. We aim to ensure
        that product descriptions, images, prices, and availability information
        are accurate and up to date. However, errors may occur, and ShopNet
        reserves the right to correct mistakes and cancel orders affected by
        obvious inaccuracies. Product images are provided for illustration
        purposes and may differ slightly from the actual product in color,
        packaging, or appearance. Unless stated otherwise, accessories shown in
        product images are not included.
      </p>

      <h3 className="font-semibold">4. Orders and contract formation</h3>
      <p>
        An order placed on the website is an offer to purchase the selected
        products. The contract is formed when ShopNet confirms the order by
        email or otherwise makes clear that the order has been accepted. ShopNet
        may refuse or cancel an order if the product is unavailable, payment
        cannot be authorized, or fraud is suspected. Before submitting your
        order, you will be shown key details such as the products selected,
        total price, shipping costs, and delivery information. You are
        responsible for reviewing this information carefully before confirming
        the order.
      </p>

      <h3 className="font-semibold">5. Prices and payment</h3>
      <p>
        All prices are shown in the currency displayed on the website and may
        include applicable taxes unless otherwise stated. Shipping and other
        additional charges will be shown before you complete your purchase.
        Payment must be made using one of the payment methods offered at
        checkout. ShopNet may use third-party payment providers, and your use of
        those services may also be subject to their terms. ShopNet does not
        store your full payment card details unless explicitly stated.
      </p>

      <h3 className="font-semibold">6. Delivery</h3>
      <p>
        ShopNet will deliver the goods to the address or pickup point you
        specify during checkout. Delivery times are estimates only unless a
        specific delivery date has been expressly agreed. Delays may occur due
        to carrier issues, customs, supply problems, or other circumstances
        beyond ShopNet’s reasonable control. If delivery becomes impossible
        because of incorrect or incomplete address information provided by you,
        ShopNet is not responsible for the resulting delay or failed delivery.
        Risk in the goods passes to you when the goods are received, unless
        mandatory law provides otherwise.
      </p>

      <h3 className="font-semibold">7. Right of withdrawal</h3>
      <p>
        If you are a consumer purchasing goods online, you generally have the
        right to withdraw from the purchase within 14 days without giving any
        reason. The withdrawal period starts on the day after you receive the
        goods and the required information about your right to withdraw. To
        exercise the right of withdrawal, you must notify ShopNet clearly before
        the withdrawal period expires. You may use the cancellation form
        provided by ShopNet, or you may send an email or written notice stating
        that you wish to withdraw from the purchase. Once you have notified
        ShopNet of your decision, you must return the goods without undue delay
        and no later than 14 days after giving notice. The goods should be
        returned securely packed, and you should keep proof of posting or
        shipment.
      </p>

      <h3 className="font-semibold">8. Return costs and refunds</h3>
      <p>
        Unless ShopNet has agreed otherwise or failed to inform you that you
        must pay return costs, you are responsible for the direct cost of
        returning the goods. ShopNet may not charge a fee for exercising the
        right of withdrawal. ShopNet will reimburse the purchase price without
        undue delay and no later than 14 days after receiving notice that you
        wish to withdraw. ShopNet may withhold reimbursement until the returned
        goods are received or until you have provided evidence that the goods
        have been sent back. Refunds will be made using the same payment method
        used for the original purchase unless otherwise agreed. Any reduction in
        value caused by handling the goods beyond what is necessary to establish
        their nature, characteristics, and functioning may be deducted from the
        refund.
      </p>

      <h3 className="font-semibold">9. Inspection of goods</h3>
      <p>
        You may inspect or test the goods to the extent reasonably necessary to
        determine their nature, properties, and function. You should handle
        products carefully and only as you would be allowed to do in a physical
        store if you want to preserve your full refund rights. If you go beyond
        normal inspection and the product’s value is reduced as a result, you
        may be liable for the diminished value. This may be relevant, for
        example, if packaging is heavily damaged or the product shows signs of
        use.
      </p>

      <h3 className="font-semibold">10. Defective goods and complaints</h3>
      <p>
        If a product is defective, damaged, or does not match the description,
        you may have rights under mandatory consumer law, including repair,
        replacement, price reduction, or cancellation depending on the
        circumstances. These rights are not limited by these Terms and
        Conditions. You should inspect goods promptly after delivery and notify
        ShopNet of any defect or nonconformity as soon as reasonably possible.
        Complaint deadlines and remedies are governed by applicable consumer
        law.
      </p>

      <h3 className="font-semibold">11. User accounts</h3>
      <p>
        If you create an account, you are responsible for keeping your login
        credentials confidential and for all activity carried out under your
        account. You must notify ShopNet promptly if you suspect unauthorized
        access or misuse of your account. ShopNet may suspend or close accounts
        that are used unlawfully, fraudulently, or in breach of these Terms and
        Conditions.
      </p>

      <h3 className="font-semibold">12. Intellectual property</h3>
      <p>
        All website content, including text, graphics, product layouts, logos,
        images, and software elements, belongs to ShopNet or its licensors and
        is protected by applicable intellectual property laws. You may not copy,
        reproduce, distribute, or exploit website content without prior written
        permission, except as permitted by law.
      </p>

      <h3 className="font-semibold">13. Limitation of liability</h3>
      <p>
        ShopNet is responsible only to the extent required by mandatory law.
        Nothing in these Terms excludes liability that cannot legally be
        excluded, including liability for personal injury, fraud, or other
        mandatory consumer rights. To the fullest extent permitted by law,
        ShopNet is not liable for indirect or consequential losses arising from
        normal use of the website or products, provided ShopNet has not acted
        unlawfully or negligently in a way that gives rise to such liability.
      </p>

      <h3 className="font-semibold">14. Privacy and cookies</h3>
      <p>
        ShopNet processes personal data in accordance with its Privacy Policy
        and applicable data protection laws. By using the website, you
        acknowledge that data processing may occur as described in that policy.
        The website may use cookies and similar technologies to operate
        properly, improve user experience, and analyze traffic. Where required,
        consent will be requested in accordance with applicable law.
      </p>

      <h3 className="font-semibold">15. Governing law and disputes</h3>
      <p>
        These Terms and Conditions are governed by Norwegian law, and mandatory
        consumer protection rules apply where relevant. If any provision in
        these Terms conflicts with mandatory consumer law, the mandatory law
        will prevail. If a dispute arises, ShopNet encourages you to contact
        customer service first so the matter can be resolved quickly. Consumers
        may also have access to relevant consumer complaint bodies under
        applicable Norwegian procedures.
      </p>

      <h3 className="font-semibold">16. Contact information</h3>
      <p>
        Questions about these Terms and Conditions, returns, withdrawals,
        complaints, or orders should be directed to ShopNet’s customer support
        using the contact details published on the website. ShopNet should make
        these terms easily accessible to consumers at all times.
      </p>
    </div>
  );
}
