export default function SimulateurPrix ({price}) {
    const payment = {
        initial: price,
        flux_entrant: null,
        flux_sortant : null,
        payout: null
    }

    const taxes = {
        flux_entrant: 1-0.014,
        plateform: 0.9,
        flux_sortant: 1-0.0025,
        payout: 0.10
    }

    payment.flux_entrant = (payment.initial*taxes.flux_entrant)- 0.25
    payment.flux_sortant = taxes.flux_sortant*(payment.flux_entrant*taxes.plateform)
    payment.payout = payment.flux_sortant-taxes.payout
    console.log(payment);
    return (
        <ul>
            <li>Prix inital : {payment.initial}</li>
            <li>Taxe Stripe 1.4% + 25ct / Frais Stripe de transfert vers votre compte Stripe 0.25% / taxe SQMarket 10% : {payment.flux_sortant}</li>
            <li>Frais Stripe Transfert vers votre compte 0.10€: {payment.payout}</li>
        </ul>
    )
}